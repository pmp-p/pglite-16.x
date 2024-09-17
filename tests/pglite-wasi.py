#!/usr/bin/env python3

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
                return call(store)
            return bound

        def __all__(self):
            return list(wasm_mod.instance.exports(wasm_mod.store).keys())


    #  #, Instance, Trap, MemoryType, Memory, Limits, WasmtimeError

    from wasmtime import WasiConfig, Linker, Engine,  Store, Module

    config = WasiConfig()
    config.argv = ["--single","postgres"]
    #config.inherit_argv()

    config.env = [
        ['ENVIRONMENT', 'wasi-embed'],
        ['REPL', 'N'],
    ]

    #config.inherit_env()

    config.inherit_stdout()
    config.inherit_stderr()

    config.preopen_dir('/tmp', '/tmp')

    linker = Linker(Engine())
    # linker.allow_shadowing = True
    linker.define_wasi()

    store = Store(linker.engine)
    store.set_wasi(config)

    def __init__(self, alias, wasmfile):
        import sys
        py_mod = type(sys)(alias)
        wasm_mod =  self.__module(self, wasmfile)

        class Memory:
            def __init__(self, mem, mod):
                self.mem = mem
                self.mod = wasm_mod

            def __getattr__(self, attr):
                if attr=='size':
                    return self.mod.mem.size(self.mod.store)
                if attr=='data_len':
                    return self.mod.mem.data_len(self.mod.store)

#        def getter(attr):
#            return wasm_mod.get(attr)
#        py_mod.__getattr__ = getter

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
    trail=''
    if intn<0:
        print(f"""

        ERROR SI round(n)<0 : {n}

        """)

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


wasm_import("pglite", "/tmp/pglite/bin/postgres.wasi")

import pglite



rv = pglite.pg_initdb()

print(f"""

initdb returned : {bin(rv)}

{pglite=} {type(pglite)=}

{SI(pglite.Memory.size)=}
{SI(pglite.Memory.data_len)=}

""")




