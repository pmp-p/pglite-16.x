#!/bin/bash
EXT=pg_bigm
GIT_URL=https://github.com/pgbigm/pg_bigm

mkdir -p build

pushd build
    if [ -d $EXT ]
    then
        echo using local $EXT
    else
        git clone --no-tags --depth 1 --single-branch --branch master $GIT_URL
    fi
popd



if which emcc
then
    echo -n
else
    reset;
    . /opt/python-wasm-sdk/wasm32-bi-emscripten-shell.sh
    export PGROOT=${PGROOT:-/tmp/pglite}
    export PATH=${PGROOT}/bin:$PATH
fi


pushd build/$EXT
    PG_CONFIG=${PGROOT}/bin/pg_config emmake make OPTFLAGS="" install || exit 30
popd


