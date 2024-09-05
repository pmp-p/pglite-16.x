#!/bin/bash
PGVERSION=${PGVERSION:-16.4}
tar xfz ../postgresql-${PGVERSION}.tar.gz
pushd postgresql-${PGVERSION}
> ./src/include/port/wasm_common.h
> ./src/template/emscripten
> ./src/include/port/emscripten.h
> ./src/makefiles/Makefile.emscripten
> ./src/template/wasi
> ./src/include/port/wasi.h
> ./src/makefiles/Makefile.wasi

popd

mkdir -p postgresql-${PGVERSION}-wasm
cp -rf ../postgresql-${PGVERSION}/* postgresql-${PGVERSION}-wasm/

rm postgresql postgresql-wasm
ln -s postgresql-${PGVERSION} postgresql
ln -s postgresql-${PGVERSION}-wasm postgresql-wasm
[ -d postgresql-wasm.patchset ] && rm postgresql-wasm.patchset/*

echo | /data/cross/pydk/makediff.sh postgresql postgresql-wasm

rm postgresql-wasm.patchset/src-timezone-Makefile.diff

for d in \
 ../patches/postgresql-wasm-${PGVERSION}  ../patches/postgresql-wasi-${PGVERSION} ../patches/postgresql-emscripten-${PGVERSION} ../patches/postgresql-pglite-${PGVERSION} \
 ../patches/postgresql-wasm  ../patches/postgresql-wasi ../patches/postgresql-emscripten ../patches/postgresql-pglite
do
    if [ -d $d ]
    then
        pushd $d
        PATCHES=$(echo *)
        popd

        echo "$d : $PATCHES"

        for onediff in $PATCHES
        do
            mv postgresql-wasm.patchset/$onediff $d
        done
    fi
done
