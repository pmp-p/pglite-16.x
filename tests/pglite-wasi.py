#!/usr/bin/env python3
import sys
import asyncio

try:
    import wasmtime
except:
    import os
    os.system(f'{sys.executable} -m pip install --user wasmtime')
    __import__('importlib').invalidate_caches()

with __import__('tarfile').open('pglite-wasi.tar.gz') as archive:
    archive.extractall(".")




class wasm_import:
    import os
    os.environ["WASMTIME_BACKTRACE_DETAILS"] = "1"

    class __module:

        def __init__(self, vm, wasmfile):
            self.store = vm.store
            self.module = vm.Module.from_file(vm.linker.engine, wasmfile)
            self.instance = vm.linker.instantiate(self.store, self.module)
            self.mem = self.instance.exports(self.store)["memory"]
            self.get('_start')()

        def get(self, export):

            call = self.instance.exports(self.store)[export]
            store = self.store
            def bound(*argv, **env):
                return call(store, *argv, **env)
            return bound

        def __all__(self):
            return list(wasm_mod.instance.exports(wasm_mod.store).keys())


    #  #, Instance, Trap, MemoryType, Memory, Limits, WasmtimeError

    from wasmtime import WasiConfig, Linker, Engine,  Store, Module

    config = WasiConfig()
    config.argv = ["--single","postgres"]
    #config.inherit_argv()

    env = [
        ['ENVIRONMENT', 'wasi-embed'],
    ]

    #config.inherit_env()

    config.inherit_stdout()
    config.inherit_stderr()



    config.preopen_dir('tmp', '/tmp')
    if not os.path.isdir("dev"):
        os.mkdir("dev")
    with open("dev/urandom","wb") as rng_out:
        rng_out.write( os.urandom(128) );
    config.preopen_dir('dev', '/dev')

    linker = Linker(Engine())
    # linker.allow_shadowing = True
    linker.define_wasi()

    store = Store(linker.engine)


    def __init__(self, alias, wasmfile, **env):
        for k,v in env.items():
            self.env.append( [k,v] )
        self.config.env = self.env
        self.store.set_wasi(self.config)

        import sys
        py_mod = type(sys)(alias)
        wasm_mod =  self.__module(self, wasmfile)

        class Memory:
            def __init__(self, mem, mod):
                self.mem = mem
                self.mod = wasm_mod

            def mpoke(self, addr, b):
                return self.mod.mem.write(self.mod.store, b, addr)

            def mpeek(self, addr, stop:None):
                return self.mod.mem.read(self.mod.store, addr, stop)


            def __getattr__(self, attr):
                if attr=='size':
                    return self.mod.mem.size(self.mod.store)
                if attr=='data_len':
                    return self.mod.mem.data_len(self.mod.store)
                return object.__getattr__(self, attr)

        for k,v in wasm_mod.instance.exports(wasm_mod.store).items():
            if k=='memory':
                setattr(py_mod, "Memory", Memory(v, wasm_mod))
                continue
            if k=='_start':
                continue
            setattr(py_mod, k, wasm_mod.get(k))

        sys.modules[alias] = py_mod

def SI(n):
    intn=int(n)
    n=float(n)
    if intn<1024:
        return '%3.0f B'%n

    if intn//1024 < 999 :
        return '%3.2f kiB'%(n/1024)

    mb=1048576
    if intn//mb < 999 :
        return '%3.2f MiB'%(n/mb)

    gb=1073741824
    if intn//gb < 999 :
        return '%3.2f GiB'%(n/gb)

    return n


wasm_import("pglite", "/tmp/pglite/bin/postgres.wasi", **{ "REPL":"N", "PGUSER":"postgres", "PGDATABASE":"postgres"} )

import pglite


rv = pglite.pg_initdb()

print(f"""

initdb returned : {bin(rv)}

{SI(pglite.Memory.size)=}

{SI(pglite.Memory.data_len)=} <= with included 32 MiB shared memory

{pglite=}
""")
for k in dir(pglite):
    print("\t", k)


TESTS="""

SHOW client_encoding;

CREATE OR REPLACE FUNCTION test_func() RETURNS TEXT AS $$ BEGIN RETURN 'test'; END; $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION addition (entier1 integer, entier2 integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
AS '
DECLARE
  resultat integer;
BEGIN
  resultat := entier1 + entier2;
  RETURN resultat;
END ' ;

SELECT test_func();

SELECT now(), current_database(), session_user, current_user;

SELECT addition(40,2);

"""

DONE = 0

async def tests():
    global DONE
    for line in TESTS.split(";\n\n"):
        await asyncio.sleep(2)

        if line.strip():
            line = line.strip()+";"
            print(f"REPL: {line}")
            sql_bytes_cstring = line.encode('utf-8')+ b"\0" # <- do not forget this one, wasmtime won't add anything!
            pglite.Memory.mpoke(1, sql_bytes_cstring)

    await asyncio.sleep(2)
    DONE = 1

async def main():
    global DONE
    pglite.use_socketfile()

    asyncio.get_running_loop().create_task(tests())
    i = 0
    while True:
        if DONE:
            break
        pglite.interactive_one()
        await asyncio.sleep(0.016)

    print("bye")

asyncio.run(main())




