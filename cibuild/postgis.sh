#================================================
# TODO move that to emsdk-extra after CI test

. /etc/lsb-release
export DISTRIB="${DISTRIB_ID}-${DISTRIB_RELEASE}"
export SDKROOT=${SDKROOT:-/opt/python-wasm-sdk}
export CIVER=${CIVER:-$DISTRIB}

TAG=emsdk

echo "making sdk-extra $TAG tarball" 1>&2

pushd /
mkdir -p /tmp/sdk /tmp/web
tar -cpPR \
    ${SDKROOT}/config \
    ${SDKROOT}/python3-was? \
    ${SDKROOT}/wasm32-*-shell.sh \
    ${SDKROOT}/*sdk \
    ${SDKROOT}/scripts/*sdk-fetch.sh \
    ${SDKROOT}/devices/* \
    ${SDKROOT}/prebuilt/* \
     > /tmp/sdk/python${PYBUILD}-${TAG}-sdk-extra-${CIVER}.tar

    lz4 -c --favor-decSpeed --best /tmp/sdk/python${PYBUILD}-${TAG}-sdk-extra-${CIVER}.tar \
     > /tmp/web/python${PYBUILD}-${TAG}-sdk-extra-${CIVER}.tar.lz4

echo "done"  1>&2
popd

#================================================

mkdir -p build

pushd build
    if [ -d postgis-3.4.2 ]
    then
        echo -n
    else
        wget -c https://download.osgeo.org/postgis/source/postgis-3.4.2.tar.gz
        tar xfz postgis-3.4.2.tar.gz
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

pushd build/postgis-3.4.2

    cat > config.site <<END
ac_cv_exeext=.cjs
POSTGIS_PROJ_VERSION=94
ICONV_CFLAGS=
ICONV_LDFLAGS=
with_libiconv=$PREFIX
ac_cv_func_iconv=no
ac_cv_func_iconvctl=no
cross_compiling=yes
ac_cv_lib_proj_pj_get_release=no
ac_cv_header_proj_api_h=no
END

    # --without-raster --without-topology --without-address-standardizer
    # --without-raster => --with-gdalconfig=
    CONFIG_SITE=config.site emconfigure ./configure --with-gdalconfig=$PREFIX/bin/gdal-config\
     --without-gui --without-phony-revision --without-protobuf \
     --without-interrupt-tests --without-json \
     --without-libiconv --without-libiconv-prefix \
     --with-pgconfig=/tmp/pglite/bin/pg_config \
     --with-xml2config=$SDKROOT/devices/emsdk/usr/bin/xml2-config \
     --with-projdir=$SDKROOT/devices/emsdk/usr \
     --with-geosconfig=$SDKROOT/devices/emsdk/usr/bin/geos-config $@

    # workaround iconv
    mkdir -p loader/no/lib

    # or would fail on some frontend functions linking.
    sed -i 's/PGSQL_FE_LDFLAGS=-L/PGSQL_FE_LDFLAGS=-sERROR_ON_UNDEFINED_SYMBOLS=0 -L/g' loader/Makefile
    EMCC_CFLAGS="-sERROR_ON_UNDEFINED_SYMBOLS=0 -Wno-unused-function -lpng -ljpeg -lsqlite3" emmake make install
    rm $PGROOT/share/postgresql/extension/postgis*.sql
    cp extensions/postgis_tiger_geocoder/sql/postgis_tiger_geocoder--TEMPLATED--TO--ANY.sql $PGROOT/share/postgresql/extension/postgis--3.4.2.sql

popd

if ${CI:-false}
then
    echo -n
else
    python3 cibuild/pack_extension.py
fi

