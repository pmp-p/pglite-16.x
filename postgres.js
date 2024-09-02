
var Module = (() => {
  var _scriptName = import.meta.url;
  
  return (
async function(moduleArg = {}) {
  var moduleRtn;

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;
var readyPromise = new Promise((resolve, reject) => {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  const { createRequire } = await import('module');
  /** @suppress{duplicate} */
  var require = createRequire(import.meta.url);

}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// include: /tmp/tmp2twb__mm.js

  if (!Module['expectedDataFileDownloads']) {
    Module['expectedDataFileDownloads'] = 0;
  }

  Module['expectedDataFileDownloads']++;
  (() => {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker) return;
    function loadPackage(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'postgres.data';
      var REMOTE_PACKAGE_BASE = 'postgres.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, (err, contents) => {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = (event) => {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module['dataFileDownloads']) Module['dataFileDownloads'] = {};
              Module['dataFileDownloads'][url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module['dataFileDownloads'][url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module['dataFileDownloads']) {
            var data = Module['dataFileDownloads'][download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module['expectedDataFileDownloads']/num);
            Module['setStatus']?.(`Downloading data... (${loaded}/${total})`);
          } else if (!Module['dataFileDownloads']) {
            Module['setStatus']?.('Downloading data...');
          }
        };
        xhr.onerror = (event) => {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = (event) => {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, (data) => {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS(Module) {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "home", true, true);
Module['FS_createPath']("/home", "web_user", true, true);
Module['FS_createPath']("/", "tmp", true, true);
Module['FS_createPath']("/tmp", "pglite", true, true);
Module['FS_createPath']("/tmp/pglite", "bin", true, true);
Module['FS_createPath']("/tmp/pglite", "lib", true, true);
Module['FS_createPath']("/tmp/pglite/lib", "postgresql", true, true);
Module['FS_createPath']("/tmp/pglite/lib/postgresql", "pgxs", true, true);
Module['FS_createPath']("/tmp/pglite/lib/postgresql/pgxs", "config", true, true);
Module['FS_createPath']("/tmp/pglite/lib/postgresql/pgxs", "src", true, true);
Module['FS_createPath']("/tmp/pglite/lib/postgresql/pgxs/src", "makefiles", true, true);
Module['FS_createPath']("/tmp/pglite/lib/postgresql/pgxs/src", "test", true, true);
Module['FS_createPath']("/tmp/pglite/lib/postgresql/pgxs/src/test", "isolation", true, true);
Module['FS_createPath']("/tmp/pglite/lib/postgresql/pgxs/src/test", "regress", true, true);
Module['FS_createPath']("/tmp/pglite", "share", true, true);
Module['FS_createPath']("/tmp/pglite/share", "postgresql", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql", "contrib", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/contrib", "postgis-3.4", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql", "extension", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql", "timezone", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Africa", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "America", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone/America", "Argentina", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone/America", "Indiana", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone/America", "Kentucky", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone/America", "North_Dakota", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Antarctica", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Arctic", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Asia", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Atlantic", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Australia", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Brazil", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Canada", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Chile", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Etc", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Europe", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Indian", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Mexico", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "Pacific", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql/timezone", "US", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql", "timezonesets", true, true);
Module['FS_createPath']("/tmp/pglite/share/postgresql", "tsearch_data", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          function make_callback(i) {
            var req = DataRequest.prototype.requests[files[i].filename];
            return () => {req.onload()};
          }
          for (var i = 0; i < files.length; ++i) {
            setTimeout(make_callback(i));
          }          Module['removeRunDependency']('datafile_postgres.data');

      };
      Module['addRunDependency']('datafile_postgres.data');

      if (!Module['preloadResults']) Module['preloadResults'] = {};

      Module['preloadResults'][PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS(Module);
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/home/web_user/.pgpass", "start": 0, "end": 135}, {"filename": "/tmp/pglite/bin/initdb", "start": 135, "end": 147}, {"filename": "/tmp/pglite/bin/postgres", "start": 147, "end": 159}, {"filename": "/tmp/pglite/lib/postgresql/cyrillic_and_mic.so", "start": 159, "end": 5738}, {"filename": "/tmp/pglite/lib/postgresql/dict_snowball.so", "start": 5738, "end": 581048}, {"filename": "/tmp/pglite/lib/postgresql/euc2004_sjis2004.so", "start": 581048, "end": 583426}, {"filename": "/tmp/pglite/lib/postgresql/euc_cn_and_mic.so", "start": 583426, "end": 584693}, {"filename": "/tmp/pglite/lib/postgresql/euc_jp_and_sjis.so", "start": 584693, "end": 592456}, {"filename": "/tmp/pglite/lib/postgresql/euc_kr_and_mic.so", "start": 592456, "end": 593763}, {"filename": "/tmp/pglite/lib/postgresql/euc_tw_and_big5.so", "start": 593763, "end": 598888}, {"filename": "/tmp/pglite/lib/postgresql/latin2_and_win1250.so", "start": 598888, "end": 600833}, {"filename": "/tmp/pglite/lib/postgresql/latin_and_mic.so", "start": 600833, "end": 602306}, {"filename": "/tmp/pglite/lib/postgresql/libpqwalreceiver.so", "start": 602306, "end": 725595}, {"filename": "/tmp/pglite/lib/postgresql/pgoutput.so", "start": 725595, "end": 741695}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/config/install-sh", "start": 741695, "end": 755692}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/config/missing", "start": 755692, "end": 757040}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/src/Makefile.global", "start": 757040, "end": 793124}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/src/Makefile.port", "start": 793124, "end": 793400}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/src/Makefile.shlib", "start": 793400, "end": 808919}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/src/makefiles/pgxs.mk", "start": 808919, "end": 823847}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/src/nls-global.mk", "start": 823847, "end": 830732}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/src/test/isolation/isolationtester", "start": 830732, "end": 927231}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/src/test/isolation/pg_isolation_regress", "start": 927231, "end": 1003906}, {"filename": "/tmp/pglite/lib/postgresql/pgxs/src/test/regress/pg_regress", "start": 1003906, "end": 1080571}, {"filename": "/tmp/pglite/lib/postgresql/plpgsql.so", "start": 1080571, "end": 1239947}, {"filename": "/tmp/pglite/lib/postgresql/postgis-3.so", "start": 1239947, "end": 11274184}, {"filename": "/tmp/pglite/lib/postgresql/postgis_raster-3.so", "start": 11274184, "end": 33039178}, {"filename": "/tmp/pglite/lib/postgresql/postgis_topology-3.so", "start": 33039178, "end": 39923040}, {"filename": "/tmp/pglite/lib/postgresql/vector.so", "start": 39923040, "end": 40030257}, {"filename": "/tmp/pglite/password", "start": 40030257, "end": 40030266}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/legacy.sql", "start": 40030266, "end": 40090536}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/legacy_gist.sql", "start": 40090536, "end": 40091761}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/legacy_minimal.sql", "start": 40091761, "end": 40094223}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/postgis.sql", "start": 40094223, "end": 40392010}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/postgis_comments.sql", "start": 40392010, "end": 40443066}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/postgis_upgrade.sql", "start": 40443066, "end": 40799382}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/raster_comments.sql", "start": 40799382, "end": 40894655}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/rtpostgis.sql", "start": 40894655, "end": 41182644}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/rtpostgis_legacy.sql", "start": 41182644, "end": 41188358}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/rtpostgis_upgrade.sql", "start": 41188358, "end": 41525609}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/sfcgal_comments.sql", "start": 41525609, "end": 41528480}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/spatial_ref_sys.sql", "start": 41528480, "end": 48695034}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/topology.sql", "start": 48695034, "end": 48926728}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/topology_comments.sql", "start": 48926728, "end": 48944537}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/topology_upgrade.sql", "start": 48944537, "end": 49144817}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/uninstall_legacy.sql", "start": 49144817, "end": 49161310}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/uninstall_postgis.sql", "start": 49161310, "end": 49227304}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/uninstall_rtpostgis.sql", "start": 49227304, "end": 49296509}, {"filename": "/tmp/pglite/share/postgresql/contrib/postgis-3.4/uninstall_topology.sql", "start": 49296509, "end": 49313829}, {"filename": "/tmp/pglite/share/postgresql/errcodes.txt", "start": 49313829, "end": 49347287}, {"filename": "/tmp/pglite/share/postgresql/extension/plpgsql--1.0.sql", "start": 49347287, "end": 49347945}, {"filename": "/tmp/pglite/share/postgresql/extension/plpgsql.control", "start": 49347945, "end": 49348138}, {"filename": "/tmp/pglite/share/postgresql/extension/postgis--3.4.2.sql", "start": 49348138, "end": 49348286}, {"filename": "/tmp/pglite/share/postgresql/extension/vector--0.7.3.sql", "start": 49348286, "end": 49378383}, {"filename": "/tmp/pglite/share/postgresql/extension/vector.control", "start": 49378383, "end": 49378528}, {"filename": "/tmp/pglite/share/postgresql/fix-CVE-2024-4317.sql", "start": 49378528, "end": 49384293}, {"filename": "/tmp/pglite/share/postgresql/information_schema.sql", "start": 49384293, "end": 49499268}, {"filename": "/tmp/pglite/share/postgresql/pg_hba.conf.sample", "start": 49499268, "end": 49504893}, {"filename": "/tmp/pglite/share/postgresql/pg_ident.conf.sample", "start": 49504893, "end": 49507533}, {"filename": "/tmp/pglite/share/postgresql/pg_service.conf.sample", "start": 49507533, "end": 49508137}, {"filename": "/tmp/pglite/share/postgresql/postgres.bki", "start": 49508137, "end": 50452241}, {"filename": "/tmp/pglite/share/postgresql/postgresql.conf.sample", "start": 50452241, "end": 50481888}, {"filename": "/tmp/pglite/share/postgresql/psqlrc.sample", "start": 50481888, "end": 50482166}, {"filename": "/tmp/pglite/share/postgresql/snowball_create.sql", "start": 50482166, "end": 50526342}, {"filename": "/tmp/pglite/share/postgresql/sql_features.txt", "start": 50526342, "end": 50562023}, {"filename": "/tmp/pglite/share/postgresql/system_constraints.sql", "start": 50562023, "end": 50570918}, {"filename": "/tmp/pglite/share/postgresql/system_functions.sql", "start": 50570918, "end": 50594233}, {"filename": "/tmp/pglite/share/postgresql/system_views.sql", "start": 50594233, "end": 50644506}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Abidjan", "start": 50644506, "end": 50644636}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Accra", "start": 50644636, "end": 50644766}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Addis_Ababa", "start": 50644766, "end": 50644957}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Algiers", "start": 50644957, "end": 50645427}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Asmara", "start": 50645427, "end": 50645618}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Asmera", "start": 50645618, "end": 50645809}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Bamako", "start": 50645809, "end": 50645939}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Bangui", "start": 50645939, "end": 50646119}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Banjul", "start": 50646119, "end": 50646249}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Bissau", "start": 50646249, "end": 50646398}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Blantyre", "start": 50646398, "end": 50646529}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Brazzaville", "start": 50646529, "end": 50646709}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Bujumbura", "start": 50646709, "end": 50646840}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Cairo", "start": 50646840, "end": 50648149}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Casablanca", "start": 50648149, "end": 50650068}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Ceuta", "start": 50650068, "end": 50650630}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Conakry", "start": 50650630, "end": 50650760}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Dakar", "start": 50650760, "end": 50650890}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Dar_es_Salaam", "start": 50650890, "end": 50651081}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Djibouti", "start": 50651081, "end": 50651272}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Douala", "start": 50651272, "end": 50651452}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/El_Aaiun", "start": 50651452, "end": 50653282}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Freetown", "start": 50653282, "end": 50653412}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Gaborone", "start": 50653412, "end": 50653543}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Harare", "start": 50653543, "end": 50653674}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Johannesburg", "start": 50653674, "end": 50653864}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Juba", "start": 50653864, "end": 50654322}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Kampala", "start": 50654322, "end": 50654513}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Khartoum", "start": 50654513, "end": 50654971}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Kigali", "start": 50654971, "end": 50655102}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Kinshasa", "start": 50655102, "end": 50655282}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Lagos", "start": 50655282, "end": 50655462}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Libreville", "start": 50655462, "end": 50655642}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Lome", "start": 50655642, "end": 50655772}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Luanda", "start": 50655772, "end": 50655952}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Lubumbashi", "start": 50655952, "end": 50656083}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Lusaka", "start": 50656083, "end": 50656214}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Malabo", "start": 50656214, "end": 50656394}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Maputo", "start": 50656394, "end": 50656525}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Maseru", "start": 50656525, "end": 50656715}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Mbabane", "start": 50656715, "end": 50656905}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Mogadishu", "start": 50656905, "end": 50657096}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Monrovia", "start": 50657096, "end": 50657260}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Nairobi", "start": 50657260, "end": 50657451}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Ndjamena", "start": 50657451, "end": 50657611}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Niamey", "start": 50657611, "end": 50657791}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Nouakchott", "start": 50657791, "end": 50657921}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Ouagadougou", "start": 50657921, "end": 50658051}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Porto-Novo", "start": 50658051, "end": 50658231}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Sao_Tome", "start": 50658231, "end": 50658404}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Timbuktu", "start": 50658404, "end": 50658534}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Tripoli", "start": 50658534, "end": 50658965}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Tunis", "start": 50658965, "end": 50659414}, {"filename": "/tmp/pglite/share/postgresql/timezone/Africa/Windhoek", "start": 50659414, "end": 50660052}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Adak", "start": 50660052, "end": 50661021}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Anchorage", "start": 50661021, "end": 50661998}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Anguilla", "start": 50661998, "end": 50662175}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Antigua", "start": 50662175, "end": 50662352}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Araguaina", "start": 50662352, "end": 50662944}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/Buenos_Aires", "start": 50662944, "end": 50663652}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/Catamarca", "start": 50663652, "end": 50664360}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/ComodRivadavia", "start": 50664360, "end": 50665068}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/Cordoba", "start": 50665068, "end": 50665776}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/Jujuy", "start": 50665776, "end": 50666466}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/La_Rioja", "start": 50666466, "end": 50667183}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/Mendoza", "start": 50667183, "end": 50667891}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/Rio_Gallegos", "start": 50667891, "end": 50668599}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/Salta", "start": 50668599, "end": 50669289}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/San_Juan", "start": 50669289, "end": 50670006}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/San_Luis", "start": 50670006, "end": 50670723}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/Tucuman", "start": 50670723, "end": 50671449}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Argentina/Ushuaia", "start": 50671449, "end": 50672157}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Aruba", "start": 50672157, "end": 50672334}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Asuncion", "start": 50672334, "end": 50673218}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Atikokan", "start": 50673218, "end": 50673367}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Atka", "start": 50673367, "end": 50674336}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Bahia", "start": 50674336, "end": 50675018}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Bahia_Banderas", "start": 50675018, "end": 50675746}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Barbados", "start": 50675746, "end": 50676024}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Belem", "start": 50676024, "end": 50676418}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Belize", "start": 50676418, "end": 50677463}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Blanc-Sablon", "start": 50677463, "end": 50677640}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Boa_Vista", "start": 50677640, "end": 50678070}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Bogota", "start": 50678070, "end": 50678249}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Boise", "start": 50678249, "end": 50679248}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Buenos_Aires", "start": 50679248, "end": 50679956}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Cambridge_Bay", "start": 50679956, "end": 50680839}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Campo_Grande", "start": 50680839, "end": 50681791}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Cancun", "start": 50681791, "end": 50682320}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Caracas", "start": 50682320, "end": 50682510}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Catamarca", "start": 50682510, "end": 50683218}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Cayenne", "start": 50683218, "end": 50683369}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Cayman", "start": 50683369, "end": 50683518}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Chicago", "start": 50683518, "end": 50685272}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Chihuahua", "start": 50685272, "end": 50685963}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Ciudad_Juarez", "start": 50685963, "end": 50686681}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Coral_Harbour", "start": 50686681, "end": 50686830}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Cordoba", "start": 50686830, "end": 50687538}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Costa_Rica", "start": 50687538, "end": 50687770}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Creston", "start": 50687770, "end": 50688010}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Cuiaba", "start": 50688010, "end": 50688944}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Curacao", "start": 50688944, "end": 50689121}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Danmarkshavn", "start": 50689121, "end": 50689568}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Dawson", "start": 50689568, "end": 50690597}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Dawson_Creek", "start": 50690597, "end": 50691280}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Denver", "start": 50691280, "end": 50692322}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Detroit", "start": 50692322, "end": 50693221}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Dominica", "start": 50693221, "end": 50693398}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Edmonton", "start": 50693398, "end": 50694368}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Eirunepe", "start": 50694368, "end": 50694804}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/El_Salvador", "start": 50694804, "end": 50694980}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Ensenada", "start": 50694980, "end": 50696005}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Fort_Nelson", "start": 50696005, "end": 50697453}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Fort_Wayne", "start": 50697453, "end": 50697984}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Fortaleza", "start": 50697984, "end": 50698468}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Glace_Bay", "start": 50698468, "end": 50699348}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Godthab", "start": 50699348, "end": 50700313}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Goose_Bay", "start": 50700313, "end": 50701893}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Grand_Turk", "start": 50701893, "end": 50702746}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Grenada", "start": 50702746, "end": 50702923}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Guadeloupe", "start": 50702923, "end": 50703100}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Guatemala", "start": 50703100, "end": 50703312}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Guayaquil", "start": 50703312, "end": 50703491}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Guyana", "start": 50703491, "end": 50703672}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Halifax", "start": 50703672, "end": 50705344}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Havana", "start": 50705344, "end": 50706461}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Hermosillo", "start": 50706461, "end": 50706747}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Indiana/Indianapolis", "start": 50706747, "end": 50707278}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Indiana/Knox", "start": 50707278, "end": 50708294}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Indiana/Marengo", "start": 50708294, "end": 50708861}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Indiana/Petersburg", "start": 50708861, "end": 50709544}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Indiana/Tell_City", "start": 50709544, "end": 50710066}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Indiana/Vevay", "start": 50710066, "end": 50710435}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Indiana/Vincennes", "start": 50710435, "end": 50710993}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Indiana/Winamac", "start": 50710993, "end": 50711605}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Indianapolis", "start": 50711605, "end": 50712136}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Inuvik", "start": 50712136, "end": 50712953}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Iqaluit", "start": 50712953, "end": 50713808}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Jamaica", "start": 50713808, "end": 50714147}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Jujuy", "start": 50714147, "end": 50714837}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Juneau", "start": 50714837, "end": 50715803}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Kentucky/Louisville", "start": 50715803, "end": 50717045}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Kentucky/Monticello", "start": 50717045, "end": 50718017}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Knox_IN", "start": 50718017, "end": 50719033}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Kralendijk", "start": 50719033, "end": 50719210}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/La_Paz", "start": 50719210, "end": 50719380}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Lima", "start": 50719380, "end": 50719663}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Los_Angeles", "start": 50719663, "end": 50720957}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Louisville", "start": 50720957, "end": 50722199}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Lower_Princes", "start": 50722199, "end": 50722376}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Maceio", "start": 50722376, "end": 50722878}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Managua", "start": 50722878, "end": 50723173}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Manaus", "start": 50723173, "end": 50723585}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Marigot", "start": 50723585, "end": 50723762}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Martinique", "start": 50723762, "end": 50723940}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Matamoros", "start": 50723940, "end": 50724377}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Mazatlan", "start": 50724377, "end": 50725095}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Mendoza", "start": 50725095, "end": 50725803}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Menominee", "start": 50725803, "end": 50726720}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Merida", "start": 50726720, "end": 50727374}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Metlakatla", "start": 50727374, "end": 50727969}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Mexico_City", "start": 50727969, "end": 50728742}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Miquelon", "start": 50728742, "end": 50729292}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Moncton", "start": 50729292, "end": 50730785}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Monterrey", "start": 50730785, "end": 50731429}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Montevideo", "start": 50731429, "end": 50732398}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Montreal", "start": 50732398, "end": 50734115}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Montserrat", "start": 50734115, "end": 50734292}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Nassau", "start": 50734292, "end": 50736009}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/New_York", "start": 50736009, "end": 50737753}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Nipigon", "start": 50737753, "end": 50739470}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Nome", "start": 50739470, "end": 50740445}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Noronha", "start": 50740445, "end": 50740929}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/North_Dakota/Beulah", "start": 50740929, "end": 50741972}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/North_Dakota/Center", "start": 50741972, "end": 50742962}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/North_Dakota/New_Salem", "start": 50742962, "end": 50743952}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Nuuk", "start": 50743952, "end": 50744917}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Ojinaga", "start": 50744917, "end": 50745626}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Panama", "start": 50745626, "end": 50745775}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Pangnirtung", "start": 50745775, "end": 50746630}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Paramaribo", "start": 50746630, "end": 50746817}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Phoenix", "start": 50746817, "end": 50747057}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Port-au-Prince", "start": 50747057, "end": 50747622}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Port_of_Spain", "start": 50747622, "end": 50747799}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Porto_Acre", "start": 50747799, "end": 50748217}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Porto_Velho", "start": 50748217, "end": 50748611}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Puerto_Rico", "start": 50748611, "end": 50748788}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Punta_Arenas", "start": 50748788, "end": 50750006}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Rainy_River", "start": 50750006, "end": 50751300}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Rankin_Inlet", "start": 50751300, "end": 50752107}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Recife", "start": 50752107, "end": 50752591}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Regina", "start": 50752591, "end": 50753229}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Resolute", "start": 50753229, "end": 50754036}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Rio_Branco", "start": 50754036, "end": 50754454}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Rosario", "start": 50754454, "end": 50755162}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Santa_Isabel", "start": 50755162, "end": 50756187}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Santarem", "start": 50756187, "end": 50756596}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Santiago", "start": 50756596, "end": 50757950}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Santo_Domingo", "start": 50757950, "end": 50758267}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Sao_Paulo", "start": 50758267, "end": 50759219}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Scoresbysund", "start": 50759219, "end": 50760203}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Shiprock", "start": 50760203, "end": 50761245}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Sitka", "start": 50761245, "end": 50762201}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/St_Barthelemy", "start": 50762201, "end": 50762378}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/St_Johns", "start": 50762378, "end": 50764256}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/St_Kitts", "start": 50764256, "end": 50764433}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/St_Lucia", "start": 50764433, "end": 50764610}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/St_Thomas", "start": 50764610, "end": 50764787}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/St_Vincent", "start": 50764787, "end": 50764964}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Swift_Current", "start": 50764964, "end": 50765332}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Tegucigalpa", "start": 50765332, "end": 50765526}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Thule", "start": 50765526, "end": 50765981}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Thunder_Bay", "start": 50765981, "end": 50767698}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Tijuana", "start": 50767698, "end": 50768723}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Toronto", "start": 50768723, "end": 50770440}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Tortola", "start": 50770440, "end": 50770617}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Vancouver", "start": 50770617, "end": 50771947}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Virgin", "start": 50771947, "end": 50772124}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Whitehorse", "start": 50772124, "end": 50773153}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Winnipeg", "start": 50773153, "end": 50774447}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Yakutat", "start": 50774447, "end": 50775393}, {"filename": "/tmp/pglite/share/postgresql/timezone/America/Yellowknife", "start": 50775393, "end": 50776363}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/Casey", "start": 50776363, "end": 50776650}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/Davis", "start": 50776650, "end": 50776847}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/DumontDUrville", "start": 50776847, "end": 50777001}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/Macquarie", "start": 50777001, "end": 50777977}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/Mawson", "start": 50777977, "end": 50778129}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/McMurdo", "start": 50778129, "end": 50779172}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/Palmer", "start": 50779172, "end": 50780059}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/Rothera", "start": 50780059, "end": 50780191}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/South_Pole", "start": 50780191, "end": 50781234}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/Syowa", "start": 50781234, "end": 50781367}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/Troll", "start": 50781367, "end": 50781544}, {"filename": "/tmp/pglite/share/postgresql/timezone/Antarctica/Vostok", "start": 50781544, "end": 50781714}, {"filename": "/tmp/pglite/share/postgresql/timezone/Arctic/Longyearbyen", "start": 50781714, "end": 50782419}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Aden", "start": 50782419, "end": 50782552}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Almaty", "start": 50782552, "end": 50783170}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Amman", "start": 50783170, "end": 50784098}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Anadyr", "start": 50784098, "end": 50784841}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Aqtau", "start": 50784841, "end": 50785447}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Aqtobe", "start": 50785447, "end": 50786062}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Ashgabat", "start": 50786062, "end": 50786437}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Ashkhabad", "start": 50786437, "end": 50786812}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Atyrau", "start": 50786812, "end": 50787428}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Baghdad", "start": 50787428, "end": 50788058}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Bahrain", "start": 50788058, "end": 50788210}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Baku", "start": 50788210, "end": 50788954}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Bangkok", "start": 50788954, "end": 50789106}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Barnaul", "start": 50789106, "end": 50789859}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Beirut", "start": 50789859, "end": 50790591}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Bishkek", "start": 50790591, "end": 50791209}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Brunei", "start": 50791209, "end": 50791529}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Calcutta", "start": 50791529, "end": 50791749}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Chita", "start": 50791749, "end": 50792499}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Choibalsan", "start": 50792499, "end": 50793118}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Chongqing", "start": 50793118, "end": 50793511}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Chungking", "start": 50793511, "end": 50793904}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Colombo", "start": 50793904, "end": 50794151}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Dacca", "start": 50794151, "end": 50794382}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Damascus", "start": 50794382, "end": 50795616}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Dhaka", "start": 50795616, "end": 50795847}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Dili", "start": 50795847, "end": 50796017}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Dubai", "start": 50796017, "end": 50796150}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Dushanbe", "start": 50796150, "end": 50796516}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Famagusta", "start": 50796516, "end": 50797456}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Gaza", "start": 50797456, "end": 50799902}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Harbin", "start": 50799902, "end": 50800295}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Hebron", "start": 50800295, "end": 50802759}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Ho_Chi_Minh", "start": 50802759, "end": 50802995}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Hong_Kong", "start": 50802995, "end": 50803770}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Hovd", "start": 50803770, "end": 50804364}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Irkutsk", "start": 50804364, "end": 50805124}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Istanbul", "start": 50805124, "end": 50806324}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Jakarta", "start": 50806324, "end": 50806572}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Jayapura", "start": 50806572, "end": 50806743}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Jerusalem", "start": 50806743, "end": 50807817}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Kabul", "start": 50807817, "end": 50807976}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Kamchatka", "start": 50807976, "end": 50808703}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Karachi", "start": 50808703, "end": 50808969}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Kashgar", "start": 50808969, "end": 50809102}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Kathmandu", "start": 50809102, "end": 50809263}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Katmandu", "start": 50809263, "end": 50809424}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Khandyga", "start": 50809424, "end": 50810199}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Kolkata", "start": 50810199, "end": 50810419}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Krasnoyarsk", "start": 50810419, "end": 50811160}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Kuala_Lumpur", "start": 50811160, "end": 50811416}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Kuching", "start": 50811416, "end": 50811736}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Kuwait", "start": 50811736, "end": 50811869}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Macao", "start": 50811869, "end": 50812660}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Macau", "start": 50812660, "end": 50813451}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Magadan", "start": 50813451, "end": 50814202}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Makassar", "start": 50814202, "end": 50814392}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Manila", "start": 50814392, "end": 50814630}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Muscat", "start": 50814630, "end": 50814763}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Nicosia", "start": 50814763, "end": 50815360}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Novokuznetsk", "start": 50815360, "end": 50816086}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Novosibirsk", "start": 50816086, "end": 50816839}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Omsk", "start": 50816839, "end": 50817580}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Oral", "start": 50817580, "end": 50818205}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Phnom_Penh", "start": 50818205, "end": 50818357}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Pontianak", "start": 50818357, "end": 50818604}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Pyongyang", "start": 50818604, "end": 50818787}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Qatar", "start": 50818787, "end": 50818939}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Qostanay", "start": 50818939, "end": 50819563}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Qyzylorda", "start": 50819563, "end": 50820187}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Rangoon", "start": 50820187, "end": 50820374}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Riyadh", "start": 50820374, "end": 50820507}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Saigon", "start": 50820507, "end": 50820743}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Sakhalin", "start": 50820743, "end": 50821498}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Samarkand", "start": 50821498, "end": 50821864}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Seoul", "start": 50821864, "end": 50822279}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Shanghai", "start": 50822279, "end": 50822672}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Singapore", "start": 50822672, "end": 50822928}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Srednekolymsk", "start": 50822928, "end": 50823670}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Taipei", "start": 50823670, "end": 50824181}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Tashkent", "start": 50824181, "end": 50824547}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Tbilisi", "start": 50824547, "end": 50825176}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Tehran", "start": 50825176, "end": 50825988}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Tel_Aviv", "start": 50825988, "end": 50827062}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Thimbu", "start": 50827062, "end": 50827216}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Thimphu", "start": 50827216, "end": 50827370}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Tokyo", "start": 50827370, "end": 50827583}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Tomsk", "start": 50827583, "end": 50828336}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Ujung_Pandang", "start": 50828336, "end": 50828526}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Ulaanbaatar", "start": 50828526, "end": 50829120}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Ulan_Bator", "start": 50829120, "end": 50829714}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Urumqi", "start": 50829714, "end": 50829847}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Ust-Nera", "start": 50829847, "end": 50830618}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Vientiane", "start": 50830618, "end": 50830770}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Vladivostok", "start": 50830770, "end": 50831512}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Yakutsk", "start": 50831512, "end": 50832253}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Yangon", "start": 50832253, "end": 50832440}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Yekaterinburg", "start": 50832440, "end": 50833200}, {"filename": "/tmp/pglite/share/postgresql/timezone/Asia/Yerevan", "start": 50833200, "end": 50833908}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Azores", "start": 50833908, "end": 50835361}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Bermuda", "start": 50835361, "end": 50836385}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Canary", "start": 50836385, "end": 50836863}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Cape_Verde", "start": 50836863, "end": 50837038}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Faeroe", "start": 50837038, "end": 50837479}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Faroe", "start": 50837479, "end": 50837920}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Jan_Mayen", "start": 50837920, "end": 50838625}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Madeira", "start": 50838625, "end": 50840078}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Reykjavik", "start": 50840078, "end": 50840208}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/South_Georgia", "start": 50840208, "end": 50840340}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/St_Helena", "start": 50840340, "end": 50840470}, {"filename": "/tmp/pglite/share/postgresql/timezone/Atlantic/Stanley", "start": 50840470, "end": 50841259}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/ACT", "start": 50841259, "end": 50842163}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Adelaide", "start": 50842163, "end": 50843084}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Brisbane", "start": 50843084, "end": 50843373}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Broken_Hill", "start": 50843373, "end": 50844314}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Canberra", "start": 50844314, "end": 50845218}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Currie", "start": 50845218, "end": 50846221}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Darwin", "start": 50846221, "end": 50846455}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Eucla", "start": 50846455, "end": 50846769}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Hobart", "start": 50846769, "end": 50847772}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/LHI", "start": 50847772, "end": 50848464}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Lindeman", "start": 50848464, "end": 50848789}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Lord_Howe", "start": 50848789, "end": 50849481}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Melbourne", "start": 50849481, "end": 50850385}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/NSW", "start": 50850385, "end": 50851289}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/North", "start": 50851289, "end": 50851523}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Perth", "start": 50851523, "end": 50851829}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Queensland", "start": 50851829, "end": 50852118}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/South", "start": 50852118, "end": 50853039}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Sydney", "start": 50853039, "end": 50853943}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Tasmania", "start": 50853943, "end": 50854946}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Victoria", "start": 50854946, "end": 50855850}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/West", "start": 50855850, "end": 50856156}, {"filename": "/tmp/pglite/share/postgresql/timezone/Australia/Yancowinna", "start": 50856156, "end": 50857097}, {"filename": "/tmp/pglite/share/postgresql/timezone/Brazil/Acre", "start": 50857097, "end": 50857515}, {"filename": "/tmp/pglite/share/postgresql/timezone/Brazil/DeNoronha", "start": 50857515, "end": 50857999}, {"filename": "/tmp/pglite/share/postgresql/timezone/Brazil/East", "start": 50857999, "end": 50858951}, {"filename": "/tmp/pglite/share/postgresql/timezone/Brazil/West", "start": 50858951, "end": 50859363}, {"filename": "/tmp/pglite/share/postgresql/timezone/CET", "start": 50859363, "end": 50859984}, {"filename": "/tmp/pglite/share/postgresql/timezone/CST6CDT", "start": 50859984, "end": 50860935}, {"filename": "/tmp/pglite/share/postgresql/timezone/Canada/Atlantic", "start": 50860935, "end": 50862607}, {"filename": "/tmp/pglite/share/postgresql/timezone/Canada/Central", "start": 50862607, "end": 50863901}, {"filename": "/tmp/pglite/share/postgresql/timezone/Canada/Eastern", "start": 50863901, "end": 50865618}, {"filename": "/tmp/pglite/share/postgresql/timezone/Canada/Mountain", "start": 50865618, "end": 50866588}, {"filename": "/tmp/pglite/share/postgresql/timezone/Canada/Newfoundland", "start": 50866588, "end": 50868466}, {"filename": "/tmp/pglite/share/postgresql/timezone/Canada/Pacific", "start": 50868466, "end": 50869796}, {"filename": "/tmp/pglite/share/postgresql/timezone/Canada/Saskatchewan", "start": 50869796, "end": 50870434}, {"filename": "/tmp/pglite/share/postgresql/timezone/Canada/Yukon", "start": 50870434, "end": 50871463}, {"filename": "/tmp/pglite/share/postgresql/timezone/Chile/Continental", "start": 50871463, "end": 50872817}, {"filename": "/tmp/pglite/share/postgresql/timezone/Chile/EasterIsland", "start": 50872817, "end": 50873991}, {"filename": "/tmp/pglite/share/postgresql/timezone/Cuba", "start": 50873991, "end": 50875108}, {"filename": "/tmp/pglite/share/postgresql/timezone/EET", "start": 50875108, "end": 50875605}, {"filename": "/tmp/pglite/share/postgresql/timezone/EST", "start": 50875605, "end": 50875716}, {"filename": "/tmp/pglite/share/postgresql/timezone/EST5EDT", "start": 50875716, "end": 50876667}, {"filename": "/tmp/pglite/share/postgresql/timezone/Egypt", "start": 50876667, "end": 50877976}, {"filename": "/tmp/pglite/share/postgresql/timezone/Eire", "start": 50877976, "end": 50879472}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT", "start": 50879472, "end": 50879583}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+0", "start": 50879583, "end": 50879694}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+1", "start": 50879694, "end": 50879807}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+10", "start": 50879807, "end": 50879921}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+11", "start": 50879921, "end": 50880035}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+12", "start": 50880035, "end": 50880149}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+2", "start": 50880149, "end": 50880262}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+3", "start": 50880262, "end": 50880375}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+4", "start": 50880375, "end": 50880488}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+5", "start": 50880488, "end": 50880601}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+6", "start": 50880601, "end": 50880714}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+7", "start": 50880714, "end": 50880827}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+8", "start": 50880827, "end": 50880940}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT+9", "start": 50880940, "end": 50881053}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-0", "start": 50881053, "end": 50881164}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-1", "start": 50881164, "end": 50881278}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-10", "start": 50881278, "end": 50881393}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-11", "start": 50881393, "end": 50881508}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-12", "start": 50881508, "end": 50881623}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-13", "start": 50881623, "end": 50881738}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-14", "start": 50881738, "end": 50881853}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-2", "start": 50881853, "end": 50881967}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-3", "start": 50881967, "end": 50882081}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-4", "start": 50882081, "end": 50882195}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-5", "start": 50882195, "end": 50882309}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-6", "start": 50882309, "end": 50882423}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-7", "start": 50882423, "end": 50882537}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-8", "start": 50882537, "end": 50882651}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT-9", "start": 50882651, "end": 50882765}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/GMT0", "start": 50882765, "end": 50882876}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/Greenwich", "start": 50882876, "end": 50882987}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/UCT", "start": 50882987, "end": 50883098}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/UTC", "start": 50883098, "end": 50883209}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/Universal", "start": 50883209, "end": 50883320}, {"filename": "/tmp/pglite/share/postgresql/timezone/Etc/Zulu", "start": 50883320, "end": 50883431}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Amsterdam", "start": 50883431, "end": 50884534}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Andorra", "start": 50884534, "end": 50884923}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Astrakhan", "start": 50884923, "end": 50885649}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Athens", "start": 50885649, "end": 50886331}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Belfast", "start": 50886331, "end": 50887930}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Belgrade", "start": 50887930, "end": 50888408}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Berlin", "start": 50888408, "end": 50889113}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Bratislava", "start": 50889113, "end": 50889836}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Brussels", "start": 50889836, "end": 50890939}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Bucharest", "start": 50890939, "end": 50891600}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Budapest", "start": 50891600, "end": 50892366}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Busingen", "start": 50892366, "end": 50892863}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Chisinau", "start": 50892863, "end": 50893618}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Copenhagen", "start": 50893618, "end": 50894323}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Dublin", "start": 50894323, "end": 50895819}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Gibraltar", "start": 50895819, "end": 50897039}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Guernsey", "start": 50897039, "end": 50898638}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Helsinki", "start": 50898638, "end": 50899119}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Isle_of_Man", "start": 50899119, "end": 50900718}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Istanbul", "start": 50900718, "end": 50901918}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Jersey", "start": 50901918, "end": 50903517}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Kaliningrad", "start": 50903517, "end": 50904421}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Kiev", "start": 50904421, "end": 50904979}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Kirov", "start": 50904979, "end": 50905714}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Kyiv", "start": 50905714, "end": 50906272}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Lisbon", "start": 50906272, "end": 50907726}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Ljubljana", "start": 50907726, "end": 50908204}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/London", "start": 50908204, "end": 50909803}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Luxembourg", "start": 50909803, "end": 50910906}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Madrid", "start": 50910906, "end": 50911803}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Malta", "start": 50911803, "end": 50912731}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Mariehamn", "start": 50912731, "end": 50913212}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Minsk", "start": 50913212, "end": 50914020}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Monaco", "start": 50914020, "end": 50915125}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Moscow", "start": 50915125, "end": 50916033}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Nicosia", "start": 50916033, "end": 50916630}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Oslo", "start": 50916630, "end": 50917335}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Paris", "start": 50917335, "end": 50918440}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Podgorica", "start": 50918440, "end": 50918918}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Prague", "start": 50918918, "end": 50919641}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Riga", "start": 50919641, "end": 50920335}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Rome", "start": 50920335, "end": 50921282}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Samara", "start": 50921282, "end": 50922014}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/San_Marino", "start": 50922014, "end": 50922961}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Sarajevo", "start": 50922961, "end": 50923439}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Saratov", "start": 50923439, "end": 50924165}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Simferopol", "start": 50924165, "end": 50925030}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Skopje", "start": 50925030, "end": 50925508}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Sofia", "start": 50925508, "end": 50926100}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Stockholm", "start": 50926100, "end": 50926805}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Tallinn", "start": 50926805, "end": 50927480}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Tirane", "start": 50927480, "end": 50928084}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Tiraspol", "start": 50928084, "end": 50928839}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Ulyanovsk", "start": 50928839, "end": 50929599}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Uzhgorod", "start": 50929599, "end": 50930157}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Vaduz", "start": 50930157, "end": 50930654}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Vatican", "start": 50930654, "end": 50931601}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Vienna", "start": 50931601, "end": 50932259}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Vilnius", "start": 50932259, "end": 50932935}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Volgograd", "start": 50932935, "end": 50933688}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Warsaw", "start": 50933688, "end": 50934611}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Zagreb", "start": 50934611, "end": 50935089}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Zaporozhye", "start": 50935089, "end": 50935647}, {"filename": "/tmp/pglite/share/postgresql/timezone/Europe/Zurich", "start": 50935647, "end": 50936144}, {"filename": "/tmp/pglite/share/postgresql/timezone/Factory", "start": 50936144, "end": 50936257}, {"filename": "/tmp/pglite/share/postgresql/timezone/GB", "start": 50936257, "end": 50937856}, {"filename": "/tmp/pglite/share/postgresql/timezone/GB-Eire", "start": 50937856, "end": 50939455}, {"filename": "/tmp/pglite/share/postgresql/timezone/GMT", "start": 50939455, "end": 50939566}, {"filename": "/tmp/pglite/share/postgresql/timezone/GMT+0", "start": 50939566, "end": 50939677}, {"filename": "/tmp/pglite/share/postgresql/timezone/GMT-0", "start": 50939677, "end": 50939788}, {"filename": "/tmp/pglite/share/postgresql/timezone/GMT0", "start": 50939788, "end": 50939899}, {"filename": "/tmp/pglite/share/postgresql/timezone/Greenwich", "start": 50939899, "end": 50940010}, {"filename": "/tmp/pglite/share/postgresql/timezone/HST", "start": 50940010, "end": 50940122}, {"filename": "/tmp/pglite/share/postgresql/timezone/Hongkong", "start": 50940122, "end": 50940897}, {"filename": "/tmp/pglite/share/postgresql/timezone/Iceland", "start": 50940897, "end": 50941027}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Antananarivo", "start": 50941027, "end": 50941218}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Chagos", "start": 50941218, "end": 50941370}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Christmas", "start": 50941370, "end": 50941522}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Cocos", "start": 50941522, "end": 50941709}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Comoro", "start": 50941709, "end": 50941900}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Kerguelen", "start": 50941900, "end": 50942052}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Mahe", "start": 50942052, "end": 50942185}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Maldives", "start": 50942185, "end": 50942337}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Mauritius", "start": 50942337, "end": 50942516}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Mayotte", "start": 50942516, "end": 50942707}, {"filename": "/tmp/pglite/share/postgresql/timezone/Indian/Reunion", "start": 50942707, "end": 50942840}, {"filename": "/tmp/pglite/share/postgresql/timezone/Iran", "start": 50942840, "end": 50943652}, {"filename": "/tmp/pglite/share/postgresql/timezone/Israel", "start": 50943652, "end": 50944726}, {"filename": "/tmp/pglite/share/postgresql/timezone/Jamaica", "start": 50944726, "end": 50945065}, {"filename": "/tmp/pglite/share/postgresql/timezone/Japan", "start": 50945065, "end": 50945278}, {"filename": "/tmp/pglite/share/postgresql/timezone/Kwajalein", "start": 50945278, "end": 50945497}, {"filename": "/tmp/pglite/share/postgresql/timezone/Libya", "start": 50945497, "end": 50945928}, {"filename": "/tmp/pglite/share/postgresql/timezone/MET", "start": 50945928, "end": 50946549}, {"filename": "/tmp/pglite/share/postgresql/timezone/MST", "start": 50946549, "end": 50946660}, {"filename": "/tmp/pglite/share/postgresql/timezone/MST7MDT", "start": 50946660, "end": 50947611}, {"filename": "/tmp/pglite/share/postgresql/timezone/Mexico/BajaNorte", "start": 50947611, "end": 50948636}, {"filename": "/tmp/pglite/share/postgresql/timezone/Mexico/BajaSur", "start": 50948636, "end": 50949354}, {"filename": "/tmp/pglite/share/postgresql/timezone/Mexico/General", "start": 50949354, "end": 50950127}, {"filename": "/tmp/pglite/share/postgresql/timezone/NZ", "start": 50950127, "end": 50951170}, {"filename": "/tmp/pglite/share/postgresql/timezone/NZ-CHAT", "start": 50951170, "end": 50951978}, {"filename": "/tmp/pglite/share/postgresql/timezone/Navajo", "start": 50951978, "end": 50953020}, {"filename": "/tmp/pglite/share/postgresql/timezone/PRC", "start": 50953020, "end": 50953413}, {"filename": "/tmp/pglite/share/postgresql/timezone/PST8PDT", "start": 50953413, "end": 50954364}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Apia", "start": 50954364, "end": 50954771}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Auckland", "start": 50954771, "end": 50955814}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Bougainville", "start": 50955814, "end": 50956015}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Chatham", "start": 50956015, "end": 50956823}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Chuuk", "start": 50956823, "end": 50956977}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Easter", "start": 50956977, "end": 50958151}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Efate", "start": 50958151, "end": 50958493}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Enderbury", "start": 50958493, "end": 50958665}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Fakaofo", "start": 50958665, "end": 50958818}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Fiji", "start": 50958818, "end": 50959214}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Funafuti", "start": 50959214, "end": 50959348}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Galapagos", "start": 50959348, "end": 50959523}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Gambier", "start": 50959523, "end": 50959655}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Guadalcanal", "start": 50959655, "end": 50959789}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Guam", "start": 50959789, "end": 50960139}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Honolulu", "start": 50960139, "end": 50960360}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Johnston", "start": 50960360, "end": 50960581}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Kanton", "start": 50960581, "end": 50960753}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Kiritimati", "start": 50960753, "end": 50960927}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Kosrae", "start": 50960927, "end": 50961169}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Kwajalein", "start": 50961169, "end": 50961388}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Majuro", "start": 50961388, "end": 50961522}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Marquesas", "start": 50961522, "end": 50961661}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Midway", "start": 50961661, "end": 50961807}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Nauru", "start": 50961807, "end": 50961990}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Niue", "start": 50961990, "end": 50962144}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Norfolk", "start": 50962144, "end": 50962391}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Noumea", "start": 50962391, "end": 50962589}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Pago_Pago", "start": 50962589, "end": 50962735}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Palau", "start": 50962735, "end": 50962883}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Pitcairn", "start": 50962883, "end": 50963036}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Pohnpei", "start": 50963036, "end": 50963170}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Ponape", "start": 50963170, "end": 50963304}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Port_Moresby", "start": 50963304, "end": 50963458}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Rarotonga", "start": 50963458, "end": 50963864}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Saipan", "start": 50963864, "end": 50964214}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Samoa", "start": 50964214, "end": 50964360}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Tahiti", "start": 50964360, "end": 50964493}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Tarawa", "start": 50964493, "end": 50964627}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Tongatapu", "start": 50964627, "end": 50964864}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Truk", "start": 50964864, "end": 50965018}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Wake", "start": 50965018, "end": 50965152}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Wallis", "start": 50965152, "end": 50965286}, {"filename": "/tmp/pglite/share/postgresql/timezone/Pacific/Yap", "start": 50965286, "end": 50965440}, {"filename": "/tmp/pglite/share/postgresql/timezone/Poland", "start": 50965440, "end": 50966363}, {"filename": "/tmp/pglite/share/postgresql/timezone/Portugal", "start": 50966363, "end": 50967817}, {"filename": "/tmp/pglite/share/postgresql/timezone/ROC", "start": 50967817, "end": 50968328}, {"filename": "/tmp/pglite/share/postgresql/timezone/ROK", "start": 50968328, "end": 50968743}, {"filename": "/tmp/pglite/share/postgresql/timezone/Singapore", "start": 50968743, "end": 50968999}, {"filename": "/tmp/pglite/share/postgresql/timezone/Turkey", "start": 50968999, "end": 50970199}, {"filename": "/tmp/pglite/share/postgresql/timezone/UCT", "start": 50970199, "end": 50970310}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Alaska", "start": 50970310, "end": 50971287}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Aleutian", "start": 50971287, "end": 50972256}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Arizona", "start": 50972256, "end": 50972496}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Central", "start": 50972496, "end": 50974250}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/East-Indiana", "start": 50974250, "end": 50974781}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Eastern", "start": 50974781, "end": 50976525}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Hawaii", "start": 50976525, "end": 50976746}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Indiana-Starke", "start": 50976746, "end": 50977762}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Michigan", "start": 50977762, "end": 50978661}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Mountain", "start": 50978661, "end": 50979703}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Pacific", "start": 50979703, "end": 50980997}, {"filename": "/tmp/pglite/share/postgresql/timezone/US/Samoa", "start": 50980997, "end": 50981143}, {"filename": "/tmp/pglite/share/postgresql/timezone/UTC", "start": 50981143, "end": 50981254}, {"filename": "/tmp/pglite/share/postgresql/timezone/Universal", "start": 50981254, "end": 50981365}, {"filename": "/tmp/pglite/share/postgresql/timezone/W-SU", "start": 50981365, "end": 50982273}, {"filename": "/tmp/pglite/share/postgresql/timezone/WET", "start": 50982273, "end": 50982767}, {"filename": "/tmp/pglite/share/postgresql/timezone/Zulu", "start": 50982767, "end": 50982878}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Africa.txt", "start": 50982878, "end": 50989851}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/America.txt", "start": 50989851, "end": 51000858}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Antarctica.txt", "start": 51000858, "end": 51001992}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Asia.txt", "start": 51001992, "end": 51010303}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Atlantic.txt", "start": 51010303, "end": 51013836}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Australia", "start": 51013836, "end": 51014971}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Australia.txt", "start": 51014971, "end": 51018355}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Default", "start": 51018355, "end": 51045605}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Etc.txt", "start": 51045605, "end": 51046855}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Europe.txt", "start": 51046855, "end": 51055637}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/India", "start": 51055637, "end": 51056230}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Indian.txt", "start": 51056230, "end": 51057491}, {"filename": "/tmp/pglite/share/postgresql/timezonesets/Pacific.txt", "start": 51057491, "end": 51061259}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/danish.stop", "start": 51061259, "end": 51061683}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/dutch.stop", "start": 51061683, "end": 51062136}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/english.stop", "start": 51062136, "end": 51062758}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/finnish.stop", "start": 51062758, "end": 51064337}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/french.stop", "start": 51064337, "end": 51065142}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/german.stop", "start": 51065142, "end": 51066491}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/hungarian.stop", "start": 51066491, "end": 51067718}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/hunspell_sample.affix", "start": 51067718, "end": 51067961}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/hunspell_sample_long.affix", "start": 51067961, "end": 51068594}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/hunspell_sample_long.dict", "start": 51068594, "end": 51068692}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/hunspell_sample_num.affix", "start": 51068692, "end": 51069154}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/hunspell_sample_num.dict", "start": 51069154, "end": 51069283}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/ispell_sample.affix", "start": 51069283, "end": 51069748}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/ispell_sample.dict", "start": 51069748, "end": 51069829}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/italian.stop", "start": 51069829, "end": 51071483}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/nepali.stop", "start": 51071483, "end": 51075744}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/norwegian.stop", "start": 51075744, "end": 51076595}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/portuguese.stop", "start": 51076595, "end": 51077862}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/russian.stop", "start": 51077862, "end": 51079097}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/spanish.stop", "start": 51079097, "end": 51081275}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/swedish.stop", "start": 51081275, "end": 51081834}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/synonym_sample.syn", "start": 51081834, "end": 51081907}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/thesaurus_sample.ths", "start": 51081907, "end": 51082380}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/turkish.stop", "start": 51082380, "end": 51082640}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/unaccent.rules", "start": 51082640, "end": 51092579}, {"filename": "/tmp/pglite/share/postgresql/tsearch_data/xsyn_sample.rules", "start": 51092579, "end": 51092718}], "remote_package_size": 51092718});

  })();

// end include: /tmp/tmp2twb__mm.js


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  // EXPORT_ES6 + ENVIRONMENT_IS_NODE always requires use of import.meta.url,
  // since there's no way getting the current absolute path of the module when
  // support for that is not available.
  scriptDirectory = require('url').fileURLToPath(new URL('./', import.meta.url)); // includes trailing slash

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  var ret = fs.readFileSync(filename);
  return ret;
};

readAsync = (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return new Promise((resolve, reject) => {
    fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(binary ? data.buffer : data);
    });
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptName) {
    scriptDirectory = _scriptName;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    return fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + ' : ' + response.url));
      })
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];

if (Module['thisProgram']) thisProgram = Module['thisProgram'];

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var dynamicLibraries = Module['dynamicLibraries'] || [];

var wasmBinary = Module['wasmBinary'];

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }

  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0 ; i < decoded.length ; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    // This build was created without ASSERTIONS defined.  `assert()` should not
    // ever be called in this configuration but in case there are callers in
    // the wild leave this simple abort() implementation here for now.
    abort(text);
  }
}

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/* BigInt64Array type is not correctly defined in closure
/** not-@type {!BigInt64Array} */
  HEAP64,
/* BigUInt64Array type is not correctly defined in closure
/** not-t@type {!BigUint64Array} */
  HEAPU64,
/** @type {!Float64Array} */
  HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
  Module['HEAP64'] = HEAP64 = new BigInt64Array(b);
  Module['HEAPU64'] = HEAPU64 = new BigUint64Array(b);
}
// end include: runtime_shared.js
// In non-standalone/normal mode, we create the memory here.
// include: runtime_init_memory.js
// Create the wasm memory. (Note: this only applies if IMPORTED_MEMORY is defined)

// check for full engine support (use string 'subarray' to avoid closure compiler confusion)

  if (Module['wasmMemory']) {
    wasmMemory = Module['wasmMemory'];
  } else
  {
    var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 268435456;

    wasmMemory = new WebAssembly.Memory({
      'initial': INITIAL_MEMORY / 65536,
      // In theory we should not need to emit the maximum if we want "unlimited"
      // or 4GB of memory, but VMs error on that atm, see
      // https://github.com/emscripten-core/emscripten/issues/14130
      // And in the pthreads case we definitely need to emit a maximum. So
      // always emit one.
      'maximum': 2147483648 / 65536,
    });
  }

  updateMemoryViews();

// end include: runtime_init_memory.js

// include: runtime_stack_check.js
// end include: runtime_stack_check.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var __RELOC_FUNCS__ = [];

var runtimeInitialized = false;

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  runtimeInitialized = true;

  callRuntimeCallbacks(__RELOC_FUNCS__);
  
if (!Module['noFSInit'] && !FS.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
SOCKFS.root = FS.mount(SOCKFS, {}, null);
PIPEFS.root = FS.mount(PIPEFS, {}, null);
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function getUniqueRunDependency(id) {
  return id;
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  what += '. Build with -sASSERTIONS for more info.';

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
// include: runtime_exceptions.js
// end include: runtime_exceptions.js
function findWasmBinary() {
  if (Module['locateFile']) {
    var f = 'postgres.wasm';
    if (!isDataURI(f)) {
      return locateFile(f);
    }
    return f;
  }
  // Use bundler-friendly `new URL(..., import.meta.url)` pattern; works in browsers too.
  return new URL('postgres.wasm', import.meta.url).href;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, load it asynchronously using readAsync.
  if (!wasmBinary
      ) {
    // Fetch the binary using readAsync
    return readAsync(binaryFile).then(
      (response) => new Uint8Array(/** @type{!ArrayBuffer} */(response)),
      // Fall back to getBinarySync if readAsync fails
      () => getBinarySync(binaryFile)
    );
  }

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming == 'function' &&
      !isDataURI(binaryFile) &&
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      !isFileURI(binaryFile) &&
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      !ENVIRONMENT_IS_NODE &&
      typeof fetch == 'function') {
    return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */
      var result = WebAssembly.instantiateStreaming(response, imports);

      return result.then(
        callback,
        function(reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err(`wasm streaming compile failed: ${reason}`);
          err('falling back to ArrayBuffer instantiation');
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
    });
  }
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
    'GOT.mem': new Proxy(wasmImports, GOTHandler),
    'GOT.func': new Proxy(wasmImports, GOTHandler),
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  var info = getWasmImports();
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    wasmExports = relocateExports(wasmExports, 67108864);

    var metadata = getDylinkMetadata(module);
    if (metadata.neededDynlibs) {
      dynamicLibraries = metadata.neededDynlibs.concat(dynamicLibraries);
    }
    mergeLibSymbols(wasmExports, 'main')
    LDSO.init();
    loadDylibs();

    

    addOnInit(wasmExports['__wasm_call_ctors']);

    __RELOC_FUNCS__.push(wasmExports['__wasm_apply_data_relocs']);

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    receiveInstance(result['instance'], result['module']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        // If instantiation fails, reject the module ready promise.
        readyPromiseReject(e);
    }
  }

  if (!wasmBinaryFile) wasmBinaryFile = findWasmBinary();

  // If instantiation fails, reject the module ready promise.
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {}; // no exports yet; we'll fill them in later
}

// include: runtime_debug.js
// end include: runtime_debug.js
// === Body ===

var ASM_CONSTS = {
  69278356: ($0) => { Module.is_worker = (typeof WorkerGlobalScope !== 'undefined') && self instanceof WorkerGlobalScope; Module.FD_BUFFER_MAX = $0; Module.emscripten_copy_to = console.warn; },  
 69278529: () => { console.warn("prerun(C-node) worker=", Module.is_worker); Module['postMessage'] = function custom_postMessage(event) { console.log("# 1219: onCustomMessage:",__FILE__, event); }; },  
 69278712: () => { console.warn("prerun(C-web) worker=", Module.is_worker); },  
 69278773: () => { if (Module.is_worker) { console.log("Main: running in a worker, setting onCustomMessage"); function onCustomMessage(event) { console.log("onCustomMessage:", event); }; Module['onCustomMessage'] = onCustomMessage; } else { console.log("Running in main thread, faking onCustomMessage"); Module['postMessage'] = function custom_postMessage(event) { switch (event.type) { case "raw" : { stringToUTF8( event.data, shm_rawinput, Module.FD_BUFFER_MAX); break; } case "stdin" : { stringToUTF8( event.data, 1, Module.FD_BUFFER_MAX); break; } case "rcon" : { stringToUTF8( event.data, shm_rcon, Module.FD_BUFFER_MAX); break; } default : console.warn("custom_postMessage?", event); } }; }; }
};
function peek_fd(fd) { return test_data.length; }
function fnc_getfd(fd) { return fnc_stdin() }
function is_web_env() { try { if (window) return 1; } catch(x) {return 0} }
is_web_env.sig = 'i';

// end include: preamble.js


  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }

  var GOT = {
  };
  
  var currentModuleWeakSymbols = new Set([]);
  var GOTHandler = {
  get(obj, symName) {
        var rtn = GOT[symName];
        if (!rtn) {
          rtn = GOT[symName] = new WebAssembly.Global({'value': 'i32', 'mutable': true});
        }
        if (!currentModuleWeakSymbols.has(symName)) {
          // Any non-weak reference to a symbol marks it as `required`, which
          // enabled `reportUndefinedSymbols` to report undefeind symbol errors
          // correctly.
          rtn.required = true;
        }
        return rtn;
      },
  };

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  var getDylinkMetadata = (binary) => {
      var offset = 0;
      var end = 0;
  
      function getU8() {
        return binary[offset++];
      }
  
      function getLEB() {
        var ret = 0;
        var mul = 1;
        while (1) {
          var byte = binary[offset++];
          ret += ((byte & 0x7f) * mul);
          mul *= 0x80;
          if (!(byte & 0x80)) break;
        }
        return ret;
      }
  
      function getString() {
        var len = getLEB();
        offset += len;
        return UTF8ArrayToString(binary, offset - len, len);
      }
  
      /** @param {string=} message */
      function failIf(condition, message) {
        if (condition) throw new Error(message);
      }
  
      var name = 'dylink.0';
      if (binary instanceof WebAssembly.Module) {
        var dylinkSection = WebAssembly.Module.customSections(binary, name);
        if (dylinkSection.length === 0) {
          name = 'dylink'
          dylinkSection = WebAssembly.Module.customSections(binary, name);
        }
        failIf(dylinkSection.length === 0, 'need dylink section');
        binary = new Uint8Array(dylinkSection[0]);
        end = binary.length
      } else {
        var int32View = new Uint32Array(new Uint8Array(binary.subarray(0, 24)).buffer);
        var magicNumberFound = int32View[0] == 0x6d736100;
        failIf(!magicNumberFound, 'need to see wasm magic number'); // \0asm
        // we should see the dylink custom section right after the magic number and wasm version
        failIf(binary[8] !== 0, 'need the dylink section to be first')
        offset = 9;
        var section_size = getLEB(); //section size
        end = offset + section_size;
        name = getString();
      }
  
      var customSection = { neededDynlibs: [], tlsExports: new Set(), weakImports: new Set() };
      if (name == 'dylink') {
        customSection.memorySize = getLEB();
        customSection.memoryAlign = getLEB();
        customSection.tableSize = getLEB();
        customSection.tableAlign = getLEB();
        // shared libraries this module needs. We need to load them first, so that
        // current module could resolve its imports. (see tools/shared.py
        // WebAssembly.make_shared_library() for "dylink" section extension format)
        var neededDynlibsCount = getLEB();
        for (var i = 0; i < neededDynlibsCount; ++i) {
          var libname = getString();
          customSection.neededDynlibs.push(libname);
        }
      } else {
        failIf(name !== 'dylink.0');
        var WASM_DYLINK_MEM_INFO = 0x1;
        var WASM_DYLINK_NEEDED = 0x2;
        var WASM_DYLINK_EXPORT_INFO = 0x3;
        var WASM_DYLINK_IMPORT_INFO = 0x4;
        var WASM_SYMBOL_TLS = 0x100;
        var WASM_SYMBOL_BINDING_MASK = 0x3;
        var WASM_SYMBOL_BINDING_WEAK = 0x1;
        while (offset < end) {
          var subsectionType = getU8();
          var subsectionSize = getLEB();
          if (subsectionType === WASM_DYLINK_MEM_INFO) {
            customSection.memorySize = getLEB();
            customSection.memoryAlign = getLEB();
            customSection.tableSize = getLEB();
            customSection.tableAlign = getLEB();
          } else if (subsectionType === WASM_DYLINK_NEEDED) {
            var neededDynlibsCount = getLEB();
            for (var i = 0; i < neededDynlibsCount; ++i) {
              libname = getString();
              customSection.neededDynlibs.push(libname);
            }
          } else if (subsectionType === WASM_DYLINK_EXPORT_INFO) {
            var count = getLEB();
            while (count--) {
              var symname = getString();
              var flags = getLEB();
              if (flags & WASM_SYMBOL_TLS) {
                customSection.tlsExports.add(symname);
              }
            }
          } else if (subsectionType === WASM_DYLINK_IMPORT_INFO) {
            var count = getLEB();
            while (count--) {
              var modname = getString();
              var symname = getString();
              var flags = getLEB();
              if ((flags & WASM_SYMBOL_BINDING_MASK) == WASM_SYMBOL_BINDING_WEAK) {
                customSection.weakImports.add(symname);
              }
            }
          } else {
            // unknown subsection
            offset += subsectionSize;
          }
        }
      }
  
      return customSection;
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP64[((ptr)>>3)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var newDSO = (name, handle, syms) => {
      var dso = {
        refcount: Infinity,
        name,
        exports: syms,
        global: true,
      };
      LDSO.loadedLibsByName[name] = dso;
      if (handle != undefined) {
        LDSO.loadedLibsByHandle[handle] = dso;
      }
      return dso;
    };
  var LDSO = {
  loadedLibsByName:{
  },
  loadedLibsByHandle:{
  },
  init() {
        newDSO('__main__', 0, wasmImports);
      },
  };
  
  
  
  var ___heap_base = 74682400;
  
  var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
      return address;
    };
  
  var alignMemory = (size, alignment) => {
      return Math.ceil(size / alignment) * alignment;
    };
  
  var getMemory = (size) => {
      // After the runtime is initialized, we must only use sbrk() normally.
      if (runtimeInitialized) {
        // Currently we don't support freeing of static data when modules are
        // unloaded via dlclose.  This function is tagged as `noleakcheck` to
        // avoid having this reported as leak.
        return zeroMemory(_malloc(size), size);
      }
      var ret = ___heap_base;
      // Keep __heap_base stack aligned.
      var end = ret + alignMemory(size, 16);
      ___heap_base = end;
      GOT['__heap_base'].value = end;
      return ret;
    };
  
  
  var isInternalSym = (symName) => {
      // TODO: find a way to mark these in the binary or avoid exporting them.
      return [
        '__cpp_exception',
        '__c_longjmp',
        '__wasm_apply_data_relocs',
        '__dso_handle',
        '__tls_size',
        '__tls_align',
        '__set_stack_limits',
        '_emscripten_tls_init',
        '__wasm_init_tls',
        '__wasm_call_ctors',
        '__start_em_asm',
        '__stop_em_asm',
        '__start_em_js',
        '__stop_em_js',
      ].includes(symName) || symName.startsWith('__em_js__')
      ;
    };
  
  var uleb128Encode = (n, target) => {
      if (n < 128) {
        target.push(n);
      } else {
        target.push((n % 128) | 128, n >> 7);
      }
    };
  
  var sigToWasmTypes = (sig) => {
      var typeNames = {
        'i': 'i32',
        'j': 'i64',
        'f': 'f32',
        'd': 'f64',
        'e': 'externref',
        'p': 'i32',
      };
      var type = {
        parameters: [],
        results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
      };
      for (var i = 1; i < sig.length; ++i) {
        type.parameters.push(typeNames[sig[i]]);
      }
      return type;
    };
  
  var generateFuncType = (sig, target) => {
      var sigRet = sig.slice(0, 1);
      var sigParam = sig.slice(1);
      var typeCodes = {
        'i': 0x7f, // i32
        'p': 0x7f, // i32
        'j': 0x7e, // i64
        'f': 0x7d, // f32
        'd': 0x7c, // f64
        'e': 0x6f, // externref
      };
  
      // Parameters, length + signatures
      target.push(0x60 /* form: func */);
      uleb128Encode(sigParam.length, target);
      for (var i = 0; i < sigParam.length; ++i) {
        target.push(typeCodes[sigParam[i]]);
      }
  
      // Return values, length + signatures
      // With no multi-return in MVP, either 0 (void) or 1 (anything else)
      if (sigRet == 'v') {
        target.push(0x00);
      } else {
        target.push(0x01, typeCodes[sigRet]);
      }
    };
  var convertJsFunctionToWasm = (func, sig) => {
  
      // If the type reflection proposal is available, use the new
      // "WebAssembly.Function" constructor.
      // Otherwise, construct a minimal wasm module importing the JS function and
      // re-exporting it.
      if (typeof WebAssembly.Function == "function") {
        return new WebAssembly.Function(sigToWasmTypes(sig), func);
      }
  
      // The module is static, with the exception of the type section, which is
      // generated based on the signature passed in.
      var typeSectionBody = [
        0x01, // count: 1
      ];
      generateFuncType(sig, typeSectionBody);
  
      // Rest of the module is static
      var bytes = [
        0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
        0x01, 0x00, 0x00, 0x00, // version: 1
        0x01, // Type section code
      ];
      // Write the overall length of the type section followed by the body
      uleb128Encode(typeSectionBody.length, bytes);
      bytes.push(...typeSectionBody);
  
      // The rest of the module is static
      bytes.push(
        0x02, 0x07, // import section
          // (import "e" "f" (func 0 (type 0)))
          0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
        0x07, 0x05, // export section
          // (export "f" (func 0 (type 0)))
          0x01, 0x01, 0x66, 0x00, 0x00,
      );
  
      // We can compile this wasm module synchronously because it is very small.
      // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
      var module = new WebAssembly.Module(new Uint8Array(bytes));
      var instance = new WebAssembly.Instance(module, { 'e': { 'f': func } });
      var wrappedFunc = instance.exports['f'];
      return wrappedFunc;
    };
  
  var wasmTableMirror = [];
  
  /** @type {WebAssembly.Table} */
  var wasmTable = new WebAssembly.Table({
    'initial': 6038,
    'element': 'anyfunc'
  });
  ;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      return func;
    };
  
  var updateTableMap = (offset, count) => {
      if (functionsInTableMap) {
        for (var i = offset; i < offset + count; i++) {
          var item = getWasmTableEntry(i);
          // Ignore null values.
          if (item) {
            functionsInTableMap.set(item, i);
          }
        }
      }
    };
  
  var functionsInTableMap;
  
  var getFunctionAddress = (func) => {
      // First, create the map if this is the first use.
      if (!functionsInTableMap) {
        functionsInTableMap = new WeakMap();
        updateTableMap(0, wasmTable.length);
      }
      return functionsInTableMap.get(func) || 0;
    };
  
  
  var freeTableIndexes = [];
  
  var getEmptyTableSlot = () => {
      // Reuse a free index if there is one, otherwise grow.
      if (freeTableIndexes.length) {
        return freeTableIndexes.pop();
      }
      // Grow the table
      try {
        wasmTable.grow(1);
      } catch (err) {
        if (!(err instanceof RangeError)) {
          throw err;
        }
        throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
      }
      return wasmTable.length - 1;
    };
  
  
  
  var setWasmTableEntry = (idx, func) => {
      wasmTable.set(idx, func);
      // With ABORT_ON_WASM_EXCEPTIONS wasmTable.get is overridden to return wrapped
      // functions so we need to call it here to retrieve the potential wrapper correctly
      // instead of just storing 'func' directly into wasmTableMirror
      wasmTableMirror[idx] = wasmTable.get(idx);
    };
  
  /** @param {string=} sig */
  var addFunction = (func, sig) => {
      // Check if the function is already in the table, to ensure each function
      // gets a unique index.
      var rtn = getFunctionAddress(func);
      if (rtn) {
        return rtn;
      }
  
      // It's not in the table, add it now.
  
      var ret = getEmptyTableSlot();
  
      // Set the new value.
      try {
        // Attempting to call this with JS function will cause of table.set() to fail
        setWasmTableEntry(ret, func);
      } catch (err) {
        if (!(err instanceof TypeError)) {
          throw err;
        }
        var wrapped = convertJsFunctionToWasm(func, sig);
        setWasmTableEntry(ret, wrapped);
      }
  
      functionsInTableMap.set(func, ret);
  
      return ret;
    };
  
  var updateGOT = (exports, replace) => {
      for (var symName in exports) {
        if (isInternalSym(symName)) {
          continue;
        }
  
        var value = exports[symName];
  
        GOT[symName] ||= new WebAssembly.Global({'value': 'i32', 'mutable': true});
        if (replace || GOT[symName].value == 0) {
          if (typeof value == 'function') {
            GOT[symName].value = addFunction(value);
          } else if (typeof value == 'number') {
            GOT[symName].value = value;
          } else {
            err(`unhandled export type for '${symName}': ${typeof value}`);
          }
        }
      }
    };
  /** @param {boolean=} replace */
  var relocateExports = (exports, memoryBase, replace) => {
      var relocated = {};
  
      for (var e in exports) {
        var value = exports[e];
        if (typeof value == 'object') {
          // a breaking change in the wasm spec, globals are now objects
          // https://github.com/WebAssembly/mutable-global/issues/1
          value = value.value;
        }
        if (typeof value == 'number') {
          value += memoryBase;
        }
        relocated[e] = value;
      }
      updateGOT(relocated, replace);
      return relocated;
    };
  
  var isSymbolDefined = (symName) => {
      // Ignore 'stub' symbols that are auto-generated as part of the original
      // `wasmImports` used to instantiate the main module.
      var existing = wasmImports[symName];
      if (!existing || existing.stub) {
        return false;
      }
      return true;
    };
  
  var dynCall = (sig, ptr, args = []) => {
      var rtn = getWasmTableEntry(ptr)(...args);
      return rtn;
    };
  
  
  var stackSave = () => _emscripten_stack_get_current();
  
  var stackRestore = (val) => __emscripten_stack_restore(val);
  var createInvokeFunction = (sig) => (ptr, ...args) => {
      var sp = stackSave();
      try {
        return dynCall(sig, ptr, args);
      } catch(e) {
        stackRestore(sp);
        // Create a try-catch guard that rethrows the Emscripten EH exception.
        // Exceptions thrown from C++ will be a pointer (number) and longjmp
        // will throw the number Infinity. Use the compact and fast "e !== e+0"
        // test to check if e was not a Number.
        if (e !== e+0) throw e;
        _setThrew(1, 0);
        // In theory this if statement could be done on
        // creating the function, but I just added this to
        // save wasting code space as it only happens on exception.
        if (sig[0] == "j") return 0n;
      }
    };
  var resolveGlobalSymbol = (symName, direct = false) => {
      var sym;
      if (isSymbolDefined(symName)) {
        sym = wasmImports[symName];
      }
      // Asm.js-style exception handling: invoke wrapper generation
      else if (symName.startsWith('invoke_')) {
        // Create (and cache) new invoke_ functions on demand.
        sym = wasmImports[symName] = createInvokeFunction(symName.split('_')[1]);
      }
      return {sym, name: symName};
    };
  
  
  
  
  
  
  
  
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  
     /**
      * @param {string=} libName
      * @param {Object=} localScope
      * @param {number=} handle
      */
  var loadWebAssemblyModule = (binary, flags, libName, localScope, handle) => {
      var metadata = getDylinkMetadata(binary);
      currentModuleWeakSymbols = metadata.weakImports;
  
      // loadModule loads the wasm module after all its dependencies have been loaded.
      // can be called both sync/async.
      function loadModule() {
        // The first thread to load a given module needs to allocate the static
        // table and memory regions.  Later threads re-use the same table region
        // and can ignore the memory region (since memory is shared between
        // threads already).
        // If `handle` is specified than it is assumed that the calling thread has
        // exclusive access to it for the duration of this function.  See the
        // locking in `dynlink.c`.
        var firstLoad = !handle || !HEAP8[(handle)+(8)];
        if (firstLoad) {
          // alignments are powers of 2
          var memAlign = Math.pow(2, metadata.memoryAlign);
          // prepare memory
          var memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0; // TODO: add to cleanups
          var tableBase = metadata.tableSize ? wasmTable.length : 0;
          if (handle) {
            HEAP8[(handle)+(8)] = 1;
            HEAPU32[(((handle)+(12))>>2)] = memoryBase;
            HEAP32[(((handle)+(16))>>2)] = metadata.memorySize;
            HEAPU32[(((handle)+(20))>>2)] = tableBase;
            HEAP32[(((handle)+(24))>>2)] = metadata.tableSize;
          }
        } else {
          memoryBase = HEAPU32[(((handle)+(12))>>2)];
          tableBase = HEAPU32[(((handle)+(20))>>2)];
        }
  
        var tableGrowthNeeded = tableBase + metadata.tableSize - wasmTable.length;
        if (tableGrowthNeeded > 0) {
          wasmTable.grow(tableGrowthNeeded);
        }
  
        // This is the export map that we ultimately return.  We declare it here
        // so it can be used within resolveSymbol.  We resolve symbols against
        // this local symbol map in the case there they are not present on the
        // global Module object.  We need this fallback because Modules sometime
        // need to import their own symbols
        var moduleExports;
  
        function resolveSymbol(sym) {
          var resolved = resolveGlobalSymbol(sym).sym;
          if (!resolved && localScope) {
            resolved = localScope[sym];
          }
          if (!resolved) {
            resolved = moduleExports[sym];
          }
          return resolved;
        }
  
        // TODO kill ↓↓↓ (except "symbols local to this module", it will likely be
        // not needed if we require that if A wants symbols from B it has to link
        // to B explicitly: similarly to -Wl,--no-undefined)
        //
        // wasm dynamic libraries are pure wasm, so they cannot assist in
        // their own loading. When side module A wants to import something
        // provided by a side module B that is loaded later, we need to
        // add a layer of indirection, but worse, we can't even tell what
        // to add the indirection for, without inspecting what A's imports
        // are. To do that here, we use a JS proxy (another option would
        // be to inspect the binary directly).
        var proxyHandler = {
          get(stubs, prop) {
            // symbols that should be local to this module
            switch (prop) {
              case '__memory_base':
                return memoryBase;
              case '__table_base':
                return tableBase;
            }
            if (prop in wasmImports && !wasmImports[prop].stub) {
              // No stub needed, symbol already exists in symbol table
              return wasmImports[prop];
            }
            // Return a stub function that will resolve the symbol
            // when first called.
            if (!(prop in stubs)) {
              var resolved;
              stubs[prop] = (...args) => {
                resolved ||= resolveSymbol(prop);
                return resolved(...args);
              };
            }
            return stubs[prop];
          }
        };
        var proxy = new Proxy({}, proxyHandler);
        var info = {
          'GOT.mem': new Proxy({}, GOTHandler),
          'GOT.func': new Proxy({}, GOTHandler),
          'env': proxy,
          'wasi_snapshot_preview1': proxy,
        };
  
        function postInstantiation(module, instance) {
          // add new entries to functionsInTableMap
          updateTableMap(tableBase, metadata.tableSize);
          moduleExports = relocateExports(instance.exports, memoryBase);
          if (!flags.allowUndefined) {
            reportUndefinedSymbols();
          }
  
          function addEmAsm(addr, body) {
            var args = [];
            var arity = 0;
            for (; arity < 16; arity++) {
              if (body.indexOf('$' + arity) != -1) {
                args.push('$' + arity);
              } else {
                break;
              }
            }
            args = args.join(',');
            var func = `(${args}) => { ${body} };`;
            ASM_CONSTS[start] = eval(func);
          }
  
          // Add any EM_ASM function that exist in the side module
          if ('__start_em_asm' in moduleExports) {
            var start = moduleExports['__start_em_asm'];
            var stop = moduleExports['__stop_em_asm'];
            
            
            while (start < stop) {
              var jsString = UTF8ToString(start);
              addEmAsm(start, jsString);
              start = HEAPU8.indexOf(0, start) + 1;
            }
          }
  
          function addEmJs(name, cSig, body) {
            // The signature here is a C signature (e.g. "(int foo, char* bar)").
            // See `create_em_js` in emcc.py` for the build-time version of this
            // code.
            var jsArgs = [];
            cSig = cSig.slice(1, -1)
            if (cSig != 'void') {
              cSig = cSig.split(',');
              for (var i in cSig) {
                var jsArg = cSig[i].split(' ').pop();
                jsArgs.push(jsArg.replaceAll('*', ''));
              }
            }
            var func = `(${jsArgs}) => ${body};`;
            moduleExports[name] = eval(func);
          }
  
          for (var name in moduleExports) {
            if (name.startsWith('__em_js__')) {
              var start = moduleExports[name]
              
              var jsString = UTF8ToString(start);
              // EM_JS strings are stored in the data section in the form
              // SIG<::>BODY.
              var parts = jsString.split('<::>');
              addEmJs(name.replace('__em_js__', ''), parts[0], parts[1]);
              delete moduleExports[name];
            }
          }
  
          // initialize the module
            var applyRelocs = moduleExports['__wasm_apply_data_relocs'];
            if (applyRelocs) {
              if (runtimeInitialized) {
                applyRelocs();
              } else {
                __RELOC_FUNCS__.push(applyRelocs);
              }
            }
            var init = moduleExports['__wasm_call_ctors'];
            if (init) {
              if (runtimeInitialized) {
                init();
              } else {
                // we aren't ready to run compiled code yet
                __ATINIT__.push(init);
              }
            }
          return moduleExports;
        }
  
        if (flags.loadAsync) {
          if (binary instanceof WebAssembly.Module) {
            var instance = new WebAssembly.Instance(binary, info);
            return Promise.resolve(postInstantiation(binary, instance));
          }
          return WebAssembly.instantiate(binary, info).then(
            (result) => postInstantiation(result.module, result.instance)
          );
        }
  
        var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary);
        var instance = new WebAssembly.Instance(module, info);
        return postInstantiation(module, instance);
      }
  
      // now load needed libraries and the module itself.
      if (flags.loadAsync) {
        return metadata.neededDynlibs
          .reduce((chain, dynNeeded) => chain.then(() =>
            loadDynamicLibrary(dynNeeded, flags, localScope)
          ), Promise.resolve())
          .then(loadModule);
      }
  
      metadata.neededDynlibs.forEach((needed) => loadDynamicLibrary(needed, flags, localScope));
      return loadModule();
    };
  
  
  var mergeLibSymbols = (exports, libName) => {
      // add symbols into global namespace TODO: weak linking etc.
      for (var [sym, exp] of Object.entries(exports)) {
  
        // When RTLD_GLOBAL is enabled, the symbols defined by this shared object
        // will be made available for symbol resolution of subsequently loaded
        // shared objects.
        //
        // We should copy the symbols (which include methods and variables) from
        // SIDE_MODULE to MAIN_MODULE.
        const setImport = (target) => {
          if (!isSymbolDefined(target)) {
            wasmImports[target] = exp;
          }
        }
        setImport(sym);
  
        // Special case for handling of main symbol:  If a side module exports
        // `main` that also acts a definition for `__main_argc_argv` and vice
        // versa.
        const main_alias = '__main_argc_argv';
        if (sym == 'main') {
          setImport(main_alias)
        }
        if (sym == main_alias) {
          setImport('main')
        }
  
        if (sym.startsWith('dynCall_') && !Module.hasOwnProperty(sym)) {
          Module[sym] = exp;
        }
      }
    };
  
  
  /** @param {boolean=} noRunDep */
  var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : '';
      readAsync(url).then(
        (arrayBuffer) => {
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency(dep);
        },
        (err) => {
          if (onerror) {
            onerror();
          } else {
            throw `Loading data file "${url}" failed.`;
          }
        }
      );
      if (dep) addRunDependency(dep);
    };
  
  var preloadPlugins = Module['preloadPlugins'] || [];
  var registerWasmPlugin = () => {
      // Use string keys here to avoid minification since the plugin consumer
      // also uses string keys.
      var wasmPlugin = {
        'promiseChainEnd': Promise.resolve(),
        'canHandle': (name) => {
          return !Module['noWasmDecoding'] && name.endsWith('.so')
        },
        'handle': (byteArray, name, onload, onerror) => {
          // loadWebAssemblyModule can not load modules out-of-order, so rather
          // than just running the promises in parallel, this makes a chain of
          // promises to run in series.
          wasmPlugin['promiseChainEnd'] = wasmPlugin['promiseChainEnd'].then(
            () => loadWebAssemblyModule(byteArray, {loadAsync: true, nodelete: true}, name, {})).then(
              (exports) => {
                preloadedWasm[name] = exports;
                onload(byteArray);
              },
              (error) => {
                err(`failed to instantiate wasm: ${name}: ${error}`);
                onerror();
              });
        }
      };
      preloadPlugins.push(wasmPlugin);
    };
  var preloadedWasm = {
  };
  
      /**
       * @param {number=} handle
       * @param {Object=} localScope
       */
  function loadDynamicLibrary(libName, flags = {global: true, nodelete: true}, localScope, handle) {
      // when loadDynamicLibrary did not have flags, libraries were loaded
      // globally & permanently
  
      var dso = LDSO.loadedLibsByName[libName];
      if (dso) {
        // the library is being loaded or has been loaded already.
        if (!flags.global) {
          if (localScope) {
            Object.assign(localScope, dso.exports);
          }
        } else if (!dso.global) {
          // The library was previously loaded only locally but not
          // we have a request with global=true.
          dso.global = true;
          mergeLibSymbols(dso.exports, libName)
        }
        // same for "nodelete"
        if (flags.nodelete && dso.refcount !== Infinity) {
          dso.refcount = Infinity;
        }
        dso.refcount++
        if (handle) {
          LDSO.loadedLibsByHandle[handle] = dso;
        }
        return flags.loadAsync ? Promise.resolve(true) : true;
      }
  
      // allocate new DSO
      dso = newDSO(libName, handle, 'loading');
      dso.refcount = flags.nodelete ? Infinity : 1;
      dso.global = flags.global;
  
      // libName -> libData
      function loadLibData() {
  
        // for wasm, we can use fetch for async, but for fs mode we can only imitate it
        if (handle) {
          var data = HEAPU32[(((handle)+(28))>>2)];
          var dataSize = HEAPU32[(((handle)+(32))>>2)];
          if (data && dataSize) {
            var libData = HEAP8.slice(data, data + dataSize);
            return flags.loadAsync ? Promise.resolve(libData) : libData;
          }
        }
  
        var libFile = locateFile(libName);
        if (flags.loadAsync) {
          return new Promise(function(resolve, reject) {
            asyncLoad(libFile, resolve, reject);
          });
        }
  
        // load the binary synchronously
        if (!readBinary) {
          throw new Error(`${libFile}: file not found, and synchronous loading of external files is not available`);
        }
        return readBinary(libFile);
      }
  
      // libName -> exports
      function getExports() {
        // lookup preloaded cache first
        var preloaded = preloadedWasm[libName];
        if (preloaded) {
          return flags.loadAsync ? Promise.resolve(preloaded) : preloaded;
        }
  
        // module not preloaded - load lib data and create new module from it
        if (flags.loadAsync) {
          return loadLibData().then((libData) => loadWebAssemblyModule(libData, flags, libName, localScope, handle));
        }
  
        return loadWebAssemblyModule(loadLibData(), flags, libName, localScope, handle);
      }
  
      // module for lib is loaded - update the dso & global namespace
      function moduleLoaded(exports) {
        if (dso.global) {
          mergeLibSymbols(exports, libName);
        } else if (localScope) {
          Object.assign(localScope, exports);
        }
        dso.exports = exports;
      }
  
      if (flags.loadAsync) {
        return getExports().then((exports) => {
          moduleLoaded(exports);
          return true;
        });
      }
  
      moduleLoaded(getExports());
      return true;
    }
  
  
  var reportUndefinedSymbols = () => {
      for (var [symName, entry] of Object.entries(GOT)) {
        if (entry.value == 0) {
          var value = resolveGlobalSymbol(symName, true).sym;
          if (!value && !entry.required) {
            // Ignore undefined symbols that are imported as weak.
            continue;
          }
          if (typeof value == 'function') {
            /** @suppress {checkTypes} */
            entry.value = addFunction(value, value.sig);
          } else if (typeof value == 'number') {
            entry.value = value;
          } else {
            throw new Error(`bad export type for '${symName}': ${typeof value}`);
          }
        }
      }
    };
  var loadDylibs = () => {
      if (!dynamicLibraries.length) {
        reportUndefinedSymbols();
        return;
      }
  
      // Load binaries asynchronously
      addRunDependency('loadDylibs');
      dynamicLibraries
        .reduce((chain, lib) => chain.then(() =>
          loadDynamicLibrary(lib, {loadAsync: true, global: true, nodelete: true, allowUndefined: true})
        ), Promise.resolve())
        .then(() => {
          // we got them all, wonderful
          reportUndefinedSymbols();
          removeRunDependency('loadDylibs');
        });
    };


  var noExitRuntime = Module['noExitRuntime'] || true;



  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': HEAP64[((ptr)>>3)] = BigInt(value); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }



  var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    };
  ___assert_fail.sig = 'vppip';

  var ___call_sighandler = (fp, sig) => getWasmTableEntry(fp)(sig);
  ___call_sighandler.sig = 'vpi';


  var ___memory_base = new WebAssembly.Global({'value': 'i32', 'mutable': false}, 67108864);

  var ___stack_pointer = new WebAssembly.Global({'value': 'i32', 'mutable': true}, 74682400);

  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
  basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },
  join:(...paths) => PATH.normalize(paths.join('/')),
  join2:(l, r) => PATH.normalize(l + '/' + r),
  };
  
  var initRandomFill = () => {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        return (view) => crypto.getRandomValues(view);
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          var randomFillSync = crypto_module['randomFillSync'];
          if (randomFillSync) {
            // nodejs with LTS crypto support
            return (view) => crypto_module['randomFillSync'](view);
          }
          // very old nodejs with the original crypto API
          var randomBytes = crypto_module['randomBytes'];
          return (view) => (
            view.set(randomBytes(view.byteLength)),
            // Return the original view to match modern native implementations.
            view
          );
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort('initRandomDevice');
    };
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    };
  
  
  
  var PATH_FS = {
  resolve:(...args) => {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? args[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  
  
  
  var FS_stdin_getChar_buffer = [];
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          // we will read data by chunks of BUFSIZE
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
  
          // For some reason we must suppress a closure warning here, even though
          // fd definitely exists on process.stdin, and is even the proper way to
          // get the fd of stdin,
          // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
          // This started to happen after moving this logic out of library_tty.js,
          // so it is related to the surrounding code in some unclear manner.
          /** @suppress {missingProperties} */
          var fd = process.stdin.fd;
  
          try {
            bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
          } catch(e) {
            // Cross-platform differences: on Windows, reading EOF throws an
            // exception, but on other OSes, reading EOF returns 0. Uniformize
            // behavior by treating the EOF exception to return 0.
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
  
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          }
        } else
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else
        {}
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  var TTY = {
  ttys:[],
  init() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
  write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char(tty) {
          return FS_stdin_getChar();
        },
  put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  ioctl_tcgets(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  },
  };
  
  
  
  var mmapAlloc = (size) => {
      size = alignMemory(size, 65536);
      var ptr = _emscripten_builtin_memalign(65536, size);
      if (!ptr) return 0;
      return zeroMemory(ptr, size);
    };
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw FS.genericErrors[44];
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  readdir(node) {
          var entries = ['.', '..'];
          for (var key of Object.keys(node.contents)) {
            entries.push(key);
          }
          return entries;
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              // Try to avoid unnecessary slices.
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              HEAP8.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  
  
  
  var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
  
  var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
  
  var FS_modeStringToFlags = (str) => {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
  
  var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
  
  
  
  
  
  
  var IDBFS = {
  dbs:{
  },
  indexedDB:() => {
        if (typeof indexedDB != 'undefined') return indexedDB;
        var ret = null;
        if (typeof window == 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        return ret;
      },
  DB_VERSION:21,
  DB_STORE_NAME:"FILE_DATA",
  queuePersist:(mount) => {
        function onPersistComplete() {
          if (mount.idbPersistState === 'again') startPersist(); // If a new sync request has appeared in between, kick off a new sync
          else mount.idbPersistState = 0; // Otherwise reset sync state back to idle to wait for a new sync later
        }
        function startPersist() {
          mount.idbPersistState = 'idb'; // Mark that we are currently running a sync operation
          IDBFS.syncfs(mount, /*populate:*/false, onPersistComplete);
        }
  
        if (!mount.idbPersistState) {
          // Programs typically write/copy/move multiple files in the in-memory
          // filesystem within a single app frame, so when a filesystem sync
          // command is triggered, do not start it immediately, but only after
          // the current frame is finished. This way all the modified files
          // inside the main loop tick will be batched up to the same sync.
          mount.idbPersistState = setTimeout(startPersist, 0);
        } else if (mount.idbPersistState === 'idb') {
          // There is an active IndexedDB sync operation in-flight, but we now
          // have accumulated more files to sync. We should therefore queue up
          // a new sync after the current one finishes so that all writes
          // will be properly persisted.
          mount.idbPersistState = 'again';
        }
      },
  mount:(mount) => {
        // reuse core MEMFS functionality
        var mnt = MEMFS.mount(mount);
        // If the automatic IDBFS persistence option has been selected, then automatically persist
        // all modifications to the filesystem as they occur.
        if (mount?.opts?.autoPersist) {
          mnt.idbPersistState = 0; // IndexedDB sync starts in idle state
          var memfs_node_ops = mnt.node_ops;
          mnt.node_ops = Object.assign({}, mnt.node_ops); // Clone node_ops to inject write tracking
          mnt.node_ops.mknod = (parent, name, mode, dev) => {
            var node = memfs_node_ops.mknod(parent, name, mode, dev);
            // Propagate injected node_ops to the newly created child node
            node.node_ops = mnt.node_ops;
            // Remember for each IDBFS node which IDBFS mount point they came from so we know which mount to persist on modification.
            node.idbfs_mount = mnt.mount;
            // Remember original MEMFS stream_ops for this node
            node.memfs_stream_ops = node.stream_ops;
            // Clone stream_ops to inject write tracking
            node.stream_ops = Object.assign({}, node.stream_ops);
  
            // Track all file writes
            node.stream_ops.write = (stream, buffer, offset, length, position, canOwn) => {
              // This file has been modified, we must persist IndexedDB when this file closes
              stream.node.isModified = true;
              return node.memfs_stream_ops.write(stream, buffer, offset, length, position, canOwn);
            };
  
            // Persist IndexedDB on file close
            node.stream_ops.close = (stream) => {
              var n = stream.node;
              if (n.isModified) {
                IDBFS.queuePersist(n.idbfs_mount);
                n.isModified = false;
              }
              if (n.memfs_stream_ops.close) return n.memfs_stream_ops.close(stream);
            };
  
            return node;
          };
          // Also kick off persisting the filesystem on other operations that modify the filesystem.
          mnt.node_ops.mkdir   = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.mkdir(...args));
          mnt.node_ops.rmdir   = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rmdir(...args));
          mnt.node_ops.symlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.symlink(...args));
          mnt.node_ops.unlink  = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.unlink(...args));
          mnt.node_ops.rename  = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rename(...args));
        }
        return mnt;
      },
  syncfs:(mount, populate, callback) => {
        IDBFS.getLocalSet(mount, (err, local) => {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, (err, remote) => {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },
  quit:() => {
        Object.values(IDBFS.dbs).forEach((value) => value.close());
        IDBFS.dbs = {};
      },
  getDB:(name, callback) => {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        if (!req) {
          return callback("Unable to connect to IndexedDB");
        }
        req.onupgradeneeded = (e) => {
          var db = /** @type {IDBDatabase} */ (e.target.result);
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
        req.onsuccess = () => {
          db = /** @type {IDBDatabase} */ (req.result);
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
      },
  getLocalSet:(mount, callback) => {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return (p) => PATH.join2(root, p);
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push(...FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { 'timestamp': stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },
  getRemoteSet:(mount, callback) => {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, (err, db) => {
          if (err) return callback(err);
  
          try {
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
            transaction.onerror = (e) => {
              callback(e.target.error);
              e.preventDefault();
            };
  
            var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
            var index = store.index('timestamp');
  
            index.openKeyCursor().onsuccess = (event) => {
              var cursor = event.target.result;
  
              if (!cursor) {
                return callback(null, { type: 'remote', db, entries });
              }
  
              entries[cursor.primaryKey] = { 'timestamp': cursor.key };
  
              cursor.continue();
            };
          } catch (e) {
            return callback(e);
          }
        });
      },
  loadLocalEntry:(path, callback) => {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { 'timestamp': stat.mtime, 'mode': stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { 'timestamp': stat.mtime, 'mode': stat.mode, 'contents': node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },
  storeLocalEntry:(path, entry, callback) => {
        try {
          if (FS.isDir(entry['mode'])) {
            FS.mkdirTree(path, entry['mode']);
          } else if (FS.isFile(entry['mode'])) {
            FS.writeFile(path, entry['contents'], { canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.chmod(path, entry['mode']);
          FS.utime(path, entry['timestamp'], entry['timestamp']);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },
  removeLocalEntry:(path, callback) => {
        try {
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },
  loadRemoteEntry:(store, path, callback) => {
        var req = store.get(path);
        req.onsuccess = (event) => callback(null, event.target.result);
        req.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
      },
  storeRemoteEntry:(store, path, entry, callback) => {
        try {
          var req = store.put(entry, path);
        } catch (e) {
          callback(e);
          return;
        }
        req.onsuccess = (event) => callback();
        req.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
      },
  removeRemoteEntry:(store, path, callback) => {
        var req = store.delete(path);
        req.onsuccess = (event) => callback();
        req.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
      },
  reconcile:(src, dst, callback) => {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e['timestamp'].getTime() != e2['timestamp'].getTime()) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          if (!src.entries[key]) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err && !errored) {
            errored = true;
            return callback(err);
          }
        };
  
        // transaction may abort if (for example) there is a QuotaExceededError
        transaction.onerror = transaction.onabort = (e) => {
          done(e.target.error);
          e.preventDefault();
        };
  
        transaction.oncomplete = (e) => {
          if (!errored) {
            callback(null);
          }
        };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach((path) => {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, (err, entry) => {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, (err, entry) => {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach((path) => {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      },
  };
  
  
  
  var ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };
  
  var NODEFS = {
  isWindows:false,
  staticInit() {
        NODEFS.isWindows = !!process.platform.match(/^win/);
        var flags = process.binding("constants");
        // Node.js 4 compatibility: it has no namespaces for constants
        if (flags["fs"]) {
          flags = flags["fs"];
        }
        NODEFS.flagsForNodeMap = {
          "1024": flags["O_APPEND"],
          "64": flags["O_CREAT"],
          "128": flags["O_EXCL"],
          "256": flags["O_NOCTTY"],
          "0": flags["O_RDONLY"],
          "2": flags["O_RDWR"],
          "4096": flags["O_SYNC"],
          "512": flags["O_TRUNC"],
          "1": flags["O_WRONLY"],
          "131072": flags["O_NOFOLLOW"],
        };
      },
  convertNodeCode(e) {
        var code = e.code;
        return ERRNO_CODES[code];
      },
  tryFSOperation(f) {
        try {
          return f();
        } catch (e) {
          if (!e.code) throw e;
          // node under windows can return code 'UNKNOWN' here:
          // https://github.com/emscripten-core/emscripten/issues/15468
          if (e.code === 'UNKNOWN') throw new FS.ErrnoError(28);
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
      },
  mount(mount) {
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },
  createNode(parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(28);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },
  getMode(path) {
        var stat;
        return NODEFS.tryFSOperation(() => {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // Node.js on Windows never represents permission bit 'x', so
            // propagate read bits to execute bits
            stat.mode |= (stat.mode & 292) >> 2;
          }
          return stat.mode;
        });
      },
  realPath(node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join(...parts);
      },
  flagsForNode(flags) {
        flags &= ~2097152; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~2048; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~32768; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~524288; // Some applications may pass it; it makes no sense for a single process.
        flags &= ~65536; // Node.js doesn't need this passed in, it errors.
        var newFlags = 0;
        for (var k in NODEFS.flagsForNodeMap) {
          if (flags & k) {
            newFlags |= NODEFS.flagsForNodeMap[k];
            flags ^= k;
          }
        }
        if (flags) {
          throw new FS.ErrnoError(28);
        }
        return newFlags;
      },
  node_ops:{
  getattr(node) {
          var path = NODEFS.realPath(node);
          var stat;
          NODEFS.tryFSOperation(() => stat = fs.lstatSync(path));
          if (NODEFS.isWindows) {
            // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake
            // them with default blksize of 4096.
            // See http://support.microsoft.com/kb/140365
            if (!stat.blksize) {
              stat.blksize = 4096;
            }
            if (!stat.blocks) {
              stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
            }
            // Node.js on Windows never represents permission bit 'x', so
            // propagate read bits to execute bits.
            stat.mode |= (stat.mode & 292) >> 2;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },
  setattr(node, attr) {
          var path = NODEFS.realPath(node);
          NODEFS.tryFSOperation(() => {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          });
        },
  lookup(parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },
  mknod(parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          NODEFS.tryFSOperation(() => {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          });
          return node;
        },
  rename(oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          NODEFS.tryFSOperation(() => fs.renameSync(oldPath, newPath));
          oldNode.name = newName;
        },
  unlink(parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          NODEFS.tryFSOperation(() => fs.unlinkSync(path));
        },
  rmdir(parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          NODEFS.tryFSOperation(() => fs.rmdirSync(path));
        },
  readdir(node) {
          var path = NODEFS.realPath(node);
          return NODEFS.tryFSOperation(() => fs.readdirSync(path));
        },
  symlink(parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          NODEFS.tryFSOperation(() => fs.symlinkSync(oldPath, newPath));
        },
  readlink(node) {
          var path = NODEFS.realPath(node);
          return NODEFS.tryFSOperation(() => fs.readlinkSync(path));
        },
  },
  stream_ops:{
  open(stream) {
          var path = NODEFS.realPath(stream.node);
          NODEFS.tryFSOperation(() => {
            if (FS.isFile(stream.node.mode)) {
              stream.shared.refcount = 1;
              stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
            }
          });
        },
  close(stream) {
          NODEFS.tryFSOperation(() => {
            if (FS.isFile(stream.node.mode) && stream.nfd && --stream.shared.refcount === 0) {
              fs.closeSync(stream.nfd);
            }
          });
        },
  dup(stream) {
          stream.shared.refcount++;
        },
  read(stream, buffer, offset, length, position) {
          // Node.js < 6 compatibility: node errors on 0 length reads
          if (length === 0) return 0;
          return NODEFS.tryFSOperation(() =>
            fs.readSync(stream.nfd, new Int8Array(buffer.buffer, offset, length), 0, length, position)
          );
        },
  write(stream, buffer, offset, length, position) {
          return NODEFS.tryFSOperation(() =>
            fs.writeSync(stream.nfd, new Int8Array(buffer.buffer, offset, length), 0, length, position)
          );
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              NODEFS.tryFSOperation(() => {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              });
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
  
          return position;
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
  
          var ptr = mmapAlloc(length);
  
          NODEFS.stream_ops.read(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          NODEFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  ErrnoError:class {
        // We set the `name` property to be able to identify `FS.ErrnoError`
        // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
        // - when using PROXYFS, an error can come from an underlying FS
        // as different FS objects have their own FS.ErrnoError each,
        // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
        // we'll use the reliable test `err.name == "ErrnoError"` instead
        constructor(errno) {
          // TODO(sbc): Use the inline member declaration syntax once we
          // support it in acorn and closure.
          this.name = 'ErrnoError';
          this.errno = errno;
        }
      },
  genericErrors:{
  },
  filesystems:null,
  syncFSRequests:0,
  FSStream:class {
        constructor() {
          // TODO(https://github.com/emscripten-core/emscripten/issues/21414):
          // Use inline field declarations.
          this.shared = {};
        }
        get object() {
          return this.node;
        }
        set object(val) {
          this.node = val;
        }
        get isRead() {
          return (this.flags & 2097155) !== 1;
        }
        get isWrite() {
          return (this.flags & 2097155) !== 0;
        }
        get isAppend() {
          return (this.flags & 1024);
        }
        get flags() {
          return this.shared.flags;
        }
        set flags(val) {
          this.shared.flags = val;
        }
        get position() {
          return this.shared.position;
        }
        set position(val) {
          this.shared.position = val;
        }
      },
  FSNode:class {
        constructor(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;  // root node sets parent to itself
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.mounted = null;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.node_ops = {};
          this.stream_ops = {};
          this.rdev = rdev;
          this.readMode = 292/*292*/ | 73/*73*/;
          this.writeMode = 146/*146*/;
        }
        get read() {
          return (this.mode & this.readMode) === this.readMode;
        }
        set read(val) {
          val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
        }
        get write() {
          return (this.mode & this.writeMode) === this.writeMode;
        }
        set write(val) {
          val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
        }
        get isFolder() {
          return FS.isDir(this.mode);
        }
        get isDevice() {
          return FS.isChrdev(this.mode);
        }
      },
  lookupPath(path, opts = {}) {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts)
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },
  getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode(parent, name, mode, rdev) {
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode(node) {
        FS.hashRemoveNode(node);
      },
  isRoot(node) {
        return node === node.parent;
      },
  isMountpoint(node) {
        return !!node.mounted;
      },
  isFile(mode) {
        return (mode & 61440) === 32768;
      },
  isDir(mode) {
        return (mode & 61440) === 16384;
      },
  isLink(mode) {
        return (mode & 61440) === 40960;
      },
  isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
  isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
  isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
  isSocket(mode) {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  MAX_OPEN_FDS:4096,
  nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
  
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream(fd) {
        FS.streams[fd] = null;
      },
  dupStream(origStream, fd = -1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream;
      },
  chrdev_stream_ops:{
  open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          stream.stream_ops.open?.(stream);
        },
  llseek() {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push(...m.mounts);
        }
  
        return mounts;
      },
  syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount(type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        node.mount.mounts.splice(idx, 1);
      },
  lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
  mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  create(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existent directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
          // update old node (we do this here to avoid each backend 
          // needing to)
          old_node.parent = new_dir;
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
  unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },
  stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
  lstat(path) {
        return FS.stat(path, true);
      },
  chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },
  lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
  fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
  chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },
  lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
  fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
  truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
  ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
  utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
  open(path, flags, mode) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        if ((flags & 64)) {
          mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed(stream) {
        return stream.fd === null;
      },
  llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read(stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write(stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  allocate(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
  mmap(stream, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        if (!length) {
          throw new FS.ErrnoError(28);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync(stream, buffer, offset, length, mmapFlags) {
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
  writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount() {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup(parent, name) {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams() {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
      },
  staticInit() {
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
          'IDBFS': IDBFS,
          'NODEFS': NODEFS,
        };
      },
  init(input, output, error) {
        FS.initialized = true;
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },
  quit() {
        FS.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
  findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },
  createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
  createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            // flush any pending line data
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else { // Command-line.
          try {
            obj.contents = readBinary(obj.url);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
      },
  createLazyFile(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array).
        // Actual getting is abstracted away for eventual reuse.
        class LazyUint8Array {
          constructor() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize)|0;
            return this.getter(chunkNum)[chunkOffset];
          }
          setDataGetter(getter) {
            this.getter = getter;
          }
          cacheLength() {
            // Find length
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
            var chunkSize = 1024*1024; // Chunk size in bytes
  
            if (!hasByteServing) chunkSize = datalength;
  
            // Function to get a range from the remote URL.
            var doXHR = (from, to) => {
              if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
              if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
              // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
              // Some hints to the browser that we want binary data.
              xhr.responseType = 'arraybuffer';
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
              }
  
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              if (xhr.response !== undefined) {
                return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
              }
              return intArrayFromString(xhr.responseText || '', true);
            };
            var lazyArray = this;
            lazyArray.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum+1) * chunkSize - 1; // including this byte
              end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
              return lazyArray.chunks[chunkNum];
            });
  
            if (usesGzip || !datalength) {
              // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
              chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out("LazyFiles on gzip forces download of the whole file when length is accessed");
            }
  
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          }
          get length() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
          get chunkSize() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
  
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  };
  
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
  doStat(func, path, buf) {
        var stat = func(path);
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        HEAP64[(((buf)+(24))>>3)] = BigInt(stat.size);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        HEAP64[(((buf)+(40))>>3)] = BigInt(Math.floor(atime / 1000));
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000;
        HEAP64[(((buf)+(56))>>3)] = BigInt(Math.floor(mtime / 1000));
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000;
        HEAP64[(((buf)+(72))>>3)] = BigInt(Math.floor(ctime / 1000));
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000;
        HEAP64[(((buf)+(88))>>3)] = BigInt(stat.ino);
        return 0;
      },
  doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  function ___syscall__newselect(nfds, readfds, writefds, exceptfds, timeout) {
  try {
  
      // readfds are supported,
      // writefds checks socket open status
      // exceptfds are supported, although on web, such exceptional conditions never arise in web sockets
      //                          and so the exceptfds list will always return empty.
      // timeout is supported, although on SOCKFS and PIPEFS these are ignored and always treated as 0 - fully async
  
      var total = 0;
  
      var srcReadLow = (readfds ? HEAP32[((readfds)>>2)] : 0),
          srcReadHigh = (readfds ? HEAP32[(((readfds)+(4))>>2)] : 0);
      var srcWriteLow = (writefds ? HEAP32[((writefds)>>2)] : 0),
          srcWriteHigh = (writefds ? HEAP32[(((writefds)+(4))>>2)] : 0);
      var srcExceptLow = (exceptfds ? HEAP32[((exceptfds)>>2)] : 0),
          srcExceptHigh = (exceptfds ? HEAP32[(((exceptfds)+(4))>>2)] : 0);
  
      var dstReadLow = 0,
          dstReadHigh = 0;
      var dstWriteLow = 0,
          dstWriteHigh = 0;
      var dstExceptLow = 0,
          dstExceptHigh = 0;
  
      var allLow = (readfds ? HEAP32[((readfds)>>2)] : 0) |
                   (writefds ? HEAP32[((writefds)>>2)] : 0) |
                   (exceptfds ? HEAP32[((exceptfds)>>2)] : 0);
      var allHigh = (readfds ? HEAP32[(((readfds)+(4))>>2)] : 0) |
                    (writefds ? HEAP32[(((writefds)+(4))>>2)] : 0) |
                    (exceptfds ? HEAP32[(((exceptfds)+(4))>>2)] : 0);
  
      var check = function(fd, low, high, val) {
        return (fd < 32 ? (low & val) : (high & val));
      };
  
      for (var fd = 0; fd < nfds; fd++) {
        var mask = 1 << (fd % 32);
        if (!(check(fd, allLow, allHigh, mask))) {
          continue;  // index isn't in the set
        }
  
        var stream = SYSCALLS.getStreamFromFD(fd);
  
        var flags = SYSCALLS.DEFAULT_POLLMASK;
  
        if (stream.stream_ops.poll) {
          var timeoutInMillis = -1;
          if (timeout) {
            // select(2) is declared to accept "struct timeval { time_t tv_sec; suseconds_t tv_usec; }".
            // However, musl passes the two values to the syscall as an array of long values.
            // Note that sizeof(time_t) != sizeof(long) in wasm32. The former is 8, while the latter is 4.
            // This means using "C_STRUCTS.timeval.tv_usec" leads to a wrong offset.
            // So, instead, we use POINTER_SIZE.
            var tv_sec = (readfds ? HEAP32[((timeout)>>2)] : 0),
                tv_usec = (readfds ? HEAP32[(((timeout)+(4))>>2)] : 0);
            timeoutInMillis = (tv_sec + tv_usec / 1000000) * 1000;
          }
          flags = stream.stream_ops.poll(stream, timeoutInMillis);
        }
  
        if ((flags & 1) && check(fd, srcReadLow, srcReadHigh, mask)) {
          fd < 32 ? (dstReadLow = dstReadLow | mask) : (dstReadHigh = dstReadHigh | mask);
          total++;
        }
        if ((flags & 4) && check(fd, srcWriteLow, srcWriteHigh, mask)) {
          fd < 32 ? (dstWriteLow = dstWriteLow | mask) : (dstWriteHigh = dstWriteHigh | mask);
          total++;
        }
        if ((flags & 2) && check(fd, srcExceptLow, srcExceptHigh, mask)) {
          fd < 32 ? (dstExceptLow = dstExceptLow | mask) : (dstExceptHigh = dstExceptHigh | mask);
          total++;
        }
      }
  
      if (readfds) {
        HEAP32[((readfds)>>2)] = dstReadLow;
        HEAP32[(((readfds)+(4))>>2)] = dstReadHigh;
      }
      if (writefds) {
        HEAP32[((writefds)>>2)] = dstWriteLow;
        HEAP32[(((writefds)+(4))>>2)] = dstWriteHigh;
      }
      if (exceptfds) {
        HEAP32[((exceptfds)>>2)] = dstExceptLow;
        HEAP32[(((exceptfds)+(4))>>2)] = dstExceptHigh;
      }
  
      return total;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall__newselect.sig = 'iipppp';

  var SOCKFS = {
  mount(mount) {
        // If Module['websocket'] has already been defined (e.g. for configuring
        // the subprotocol/url) use that, if not initialise it to a new object.
        Module['websocket'] = (Module['websocket'] &&
                               ('object' === typeof Module['websocket'])) ? Module['websocket'] : {};
  
        // Add the Event registration mechanism to the exported websocket configuration
        // object so we can register network callbacks from native JavaScript too.
        // For more documentation see system/include/emscripten/emscripten.h
        Module['websocket']._callbacks = {};
        Module['websocket']['on'] = /** @this{Object} */ function(event, callback) {
          if ('function' === typeof callback) {
            this._callbacks[event] = callback;
          }
          return this;
        };
  
        Module['websocket'].emit = /** @this{Object} */ function(event, param) {
          if ('function' === typeof this._callbacks[event]) {
            this._callbacks[event].call(this, param);
          }
        };
  
        // If debug is enabled register simple default logging callbacks for each Event.
  
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },
  createSocket(family, type, protocol) {
        type &= ~526336; // Some applications may pass it; it makes no sense for a single process.
        var streaming = type == 1;
        if (streaming && protocol && protocol != 6) {
          throw new FS.ErrnoError(66); // if SOCK_STREAM, must be tcp or 0.
        }
  
        // create our internal socket structure
        var sock = {
          family,
          type,
          protocol,
          server: null,
          error: null, // Used in getsockopt for SOL_SOCKET/SO_ERROR test
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node,
          flags: 2,
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },
  getSocket(fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },
  stream_ops:{
  poll(stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },
  ioctl(stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },
  read(stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },
  write(stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },
  close(stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        },
  },
  nextname() {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },
  websocket_sock_ops:{
  createPeer(sock, addr, port) {
          var ws;
  
          if (typeof addr == 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              // runtimeConfig gets set to true if WebSocket runtime configuration is available.
              var runtimeConfig = (Module['websocket'] && ('object' === typeof Module['websocket']));
  
              // The default value is 'ws://' the replace is needed because the compiler replaces '//' comments with '#'
              // comments without checking context, so we'd end up with ws:#, the replace swaps the '#' for '//' again.
              var url = 'ws:#'.replace('#', '//');
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['url']) {
                  url = Module['websocket']['url']; // Fetch runtime WebSocket URL config.
                }
              }
  
              if (url === 'ws://' || url === 'wss://') { // Is the supplied URL config just a prefix, if so complete it.
                var parts = addr.split('/');
                url = url + parts[0] + ":" + port + "/" + parts.slice(1).join('/');
              }
  
              // Make the WebSocket subprotocol (Sec-WebSocket-Protocol) default to binary if no configuration is set.
              var subProtocols = 'binary'; // The default value is 'binary'
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['subprotocol']) {
                  subProtocols = Module['websocket']['subprotocol']; // Fetch runtime WebSocket subprotocol config.
                }
              }
  
              // The default WebSocket options
              var opts = undefined;
  
              if (subProtocols !== 'null') {
                // The regex trims the string (removes spaces at the beginning and end, then splits the string by
                // <any space>,<any space> into an Array. Whitespace removal is important for Websockify and ws.
                subProtocols = subProtocols.replace(/^ +| +$/g,"").split(/ *, */);
  
                opts = subProtocols;
              }
  
              // some webservers (azure) does not support subprotocol header
              if (runtimeConfig && null === Module['websocket']['subprotocol']) {
                subProtocols = 'null';
                opts = undefined;
              }
  
              // If node we use the ws library.
              var WebSocketConstructor;
              if (ENVIRONMENT_IS_NODE) {
                WebSocketConstructor = /** @type{(typeof WebSocket)} */(require('ws'));
              } else
              {
                WebSocketConstructor = WebSocket;
              }
              ws = new WebSocketConstructor(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(23);
            }
          }
  
          var peer = {
            addr,
            port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport != 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },
  getPeer(sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },
  addPeer(sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },
  removePeer(sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },
  handlePeerEvents(sock, peer) {
          var first = true;
  
          var handleOpen = function () {
  
            Module['websocket'].emit('open', sock.stream.fd);
  
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            if (typeof data == 'string') {
              var encoder = new TextEncoder(); // should be utf-8
              data = encoder.encode(data); // make a typed array from the string
            } else {
              assert(data.byteLength !== undefined); // must receive an ArrayBuffer
              if (data.byteLength == 0) {
                // An empty ArrayBuffer will emit a pseudo disconnect event
                // as recv/recvmsg will return zero which indicates that a socket
                // has performed a shutdown although the connection has not been disconnected yet.
                return;
              }
              data = new Uint8Array(data); // make a typed array view on the array buffer
            }
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
            Module['websocket'].emit('message', sock.stream.fd);
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, isBinary) {
              if (!isBinary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer); // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('close', function() {
              Module['websocket'].emit('close', sock.stream.fd);
            });
            peer.socket.on('error', function(error) {
              // Although the ws library may pass errors that may be more descriptive than
              // ECONNREFUSED they are not necessarily the expected error code e.g.
              // ENOTFOUND on getaddrinfo seems to be node.js specific, so using ECONNREFUSED
              // is still probably the most useful thing to do.
              sock.error = 14; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
              Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'ECONNREFUSED: Connection refused']);
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onclose = function() {
              Module['websocket'].emit('close', sock.stream.fd);
            };
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
            peer.socket.onerror = function(error) {
              // The WebSocket spec only allows a 'simple event' to be thrown on error,
              // so we only really know as much as ECONNREFUSED.
              sock.error = 14; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
              Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'ECONNREFUSED: Connection refused']);
            };
          }
        },
  poll(sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },
  ioctl(sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)] = bytes;
              return 0;
            default:
              return 28;
          }
        },
  close(sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },
  bind(sock, addr, port) {
          if (typeof sock.saddr != 'undefined' || typeof sock.sport != 'undefined') {
            throw new FS.ErrnoError(28);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port;
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e.name === 'ErrnoError')) throw e;
              if (e.errno !== 138) throw e;
            }
          }
        },
  connect(sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(138);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr != 'undefined' && typeof sock.dport != 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(7);
              } else {
                throw new FS.ErrnoError(30);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(26);
        },
  listen(sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(138);
          }
          if (sock.server) {
             throw new FS.ErrnoError(28);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host,
            port: sock.sport
            // TODO support backlog
          });
          Module['websocket'].emit('listen', sock.stream.fd); // Send Event with listen fd.
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
              Module['websocket'].emit('connection', newsock.stream.fd);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
              Module['websocket'].emit('connection', sock.stream.fd);
            }
          });
          sock.server.on('close', function() {
            Module['websocket'].emit('close', sock.stream.fd);
            sock.server = null;
          });
          sock.server.on('error', function(error) {
            // Although the ws library may pass errors that may be more descriptive than
            // ECONNREFUSED they are not necessarily the expected error code e.g.
            // ENOTFOUND on getaddrinfo seems to be node.js specific, so using EHOSTUNREACH
            // is still probably the most useful thing to do. This error shouldn't
            // occur in a well written app as errors should get trapped in the compiled
            // app's own getaddrinfo call.
            sock.error = 23; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
            Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'EHOSTUNREACH: Host is unreachable']);
            // don't throw
          });
        },
  accept(listensock) {
          if (!listensock.server || !listensock.pending.length) {
            throw new FS.ErrnoError(28);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },
  getname(sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(53);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr, port };
        },
  sendmsg(sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(17);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(53);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(6);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          if (ArrayBuffer.isView(buffer)) {
            offset += buffer.byteOffset;
            buffer = buffer.buffer;
          }
  
          var data;
            data = buffer.slice(offset, offset + length);
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(28);
          }
        },
  recvmsg(sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(53);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(53);
              }
              if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              // else, our socket is in a valid state but truly has nothing available
              throw new FS.ErrnoError(6);
            }
            throw new FS.ErrnoError(6);
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        },
  },
  };
  
  var getSocketFromFD = (fd) => {
      var socket = SOCKFS.getSocket(fd);
      if (!socket) throw new FS.ErrnoError(8);
      return socket;
    };
  
  var Sockets = {
  BUFFER_SIZE:10240,
  MAX_BUFFER_SIZE:10485760,
  nextFd:1,
  fds:{
  },
  nextport:1,
  maxport:65535,
  peer:null,
  connections:{
  },
  portmap:{
  },
  localAddr:4261412874,
  addrPool:[33554442,50331658,67108874,83886090,100663306,117440522,134217738,150994954,167772170,184549386,201326602,218103818,234881034],
  };
  
  var inetNtop4 = (addr) => {
      return (addr & 0xff) + '.' + ((addr >> 8) & 0xff) + '.' + ((addr >> 16) & 0xff) + '.' + ((addr >> 24) & 0xff)
    };
  
  
  var inetNtop6 = (ints) => {
      //  ref:  http://www.ietf.org/rfc/rfc2373.txt - section 2.5.4
      //  Format for IPv4 compatible and mapped  128-bit IPv6 Addresses
      //  128-bits are split into eight 16-bit words
      //  stored in network byte order (big-endian)
      //  |                80 bits               | 16 |      32 bits        |
      //  +-----------------------------------------------------------------+
      //  |               10 bytes               |  2 |      4 bytes        |
      //  +--------------------------------------+--------------------------+
      //  +               5 words                |  1 |      2 words        |
      //  +--------------------------------------+--------------------------+
      //  |0000..............................0000|0000|    IPv4 ADDRESS     | (compatible)
      //  +--------------------------------------+----+---------------------+
      //  |0000..............................0000|FFFF|    IPv4 ADDRESS     | (mapped)
      //  +--------------------------------------+----+---------------------+
      var str = "";
      var word = 0;
      var longest = 0;
      var lastzero = 0;
      var zstart = 0;
      var len = 0;
      var i = 0;
      var parts = [
        ints[0] & 0xffff,
        (ints[0] >> 16),
        ints[1] & 0xffff,
        (ints[1] >> 16),
        ints[2] & 0xffff,
        (ints[2] >> 16),
        ints[3] & 0xffff,
        (ints[3] >> 16)
      ];
  
      // Handle IPv4-compatible, IPv4-mapped, loopback and any/unspecified addresses
  
      var hasipv4 = true;
      var v4part = "";
      // check if the 10 high-order bytes are all zeros (first 5 words)
      for (i = 0; i < 5; i++) {
        if (parts[i] !== 0) { hasipv4 = false; break; }
      }
  
      if (hasipv4) {
        // low-order 32-bits store an IPv4 address (bytes 13 to 16) (last 2 words)
        v4part = inetNtop4(parts[6] | (parts[7] << 16));
        // IPv4-mapped IPv6 address if 16-bit value (bytes 11 and 12) == 0xFFFF (6th word)
        if (parts[5] === -1) {
          str = "::ffff:";
          str += v4part;
          return str;
        }
        // IPv4-compatible IPv6 address if 16-bit value (bytes 11 and 12) == 0x0000 (6th word)
        if (parts[5] === 0) {
          str = "::";
          //special case IPv6 addresses
          if (v4part === "0.0.0.0") v4part = ""; // any/unspecified address
          if (v4part === "0.0.0.1") v4part = "1";// loopback address
          str += v4part;
          return str;
        }
      }
  
      // Handle all other IPv6 addresses
  
      // first run to find the longest contiguous zero words
      for (word = 0; word < 8; word++) {
        if (parts[word] === 0) {
          if (word - lastzero > 1) {
            len = 0;
          }
          lastzero = word;
          len++;
        }
        if (len > longest) {
          longest = len;
          zstart = word - longest + 1;
        }
      }
  
      for (word = 0; word < 8; word++) {
        if (longest > 1) {
          // compress contiguous zeros - to produce "::"
          if (parts[word] === 0 && word >= zstart && word < (zstart + longest) ) {
            if (word === zstart) {
              str += ":";
              if (zstart === 0) str += ":"; //leading zeros case
            }
            continue;
          }
        }
        // converts 16-bit words from big-endian to little-endian before converting to hex string
        str += Number(_ntohs(parts[word] & 0xffff)).toString(16);
        str += word < 7 ? ":" : "";
      }
      return str;
    };
  
  var readSockaddr = (sa, salen) => {
      // family / port offsets are common to both sockaddr_in and sockaddr_in6
      var family = HEAP16[((sa)>>1)];
      var port = _ntohs(HEAPU16[(((sa)+(2))>>1)]);
      var addr;
  
      switch (family) {
        case 2:
          if (salen !== 16) {
            return { errno: 28 };
          }
          addr = HEAP32[(((sa)+(4))>>2)];
          addr = inetNtop4(addr);
          break;
        case 10:
          if (salen !== 28) {
            return { errno: 28 };
          }
          addr = [
            HEAP32[(((sa)+(8))>>2)],
            HEAP32[(((sa)+(12))>>2)],
            HEAP32[(((sa)+(16))>>2)],
            HEAP32[(((sa)+(20))>>2)]
          ];
          addr = inetNtop6(addr);
          break;
        default:
          return { errno: 5 };
      }
  
      return { family: family, addr: addr, port: port };
    };
  
  
  var inetPton4 = (str) => {
      var b = str.split('.');
      for (var i = 0; i < 4; i++) {
        var tmp = Number(b[i]);
        if (isNaN(tmp)) return null;
        b[i] = tmp;
      }
      return (b[0] | (b[1] << 8) | (b[2] << 16) | (b[3] << 24)) >>> 0;
    };
  
  
  /** @suppress {checkTypes} */
  var jstoi_q = (str) => parseInt(str);
  var inetPton6 = (str) => {
      var words;
      var w, offset, z, i;
      /* http://home.deds.nl/~aeron/regex/ */
      var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
      var parts = [];
      if (!valid6regx.test(str)) {
        return null;
      }
      if (str === "::") {
        return [0, 0, 0, 0, 0, 0, 0, 0];
      }
      // Z placeholder to keep track of zeros when splitting the string on ":"
      if (str.startsWith("::")) {
        str = str.replace("::", "Z:"); // leading zeros case
      } else {
        str = str.replace("::", ":Z:");
      }
  
      if (str.indexOf(".") > 0) {
        // parse IPv4 embedded stress
        str = str.replace(new RegExp('[.]', 'g'), ":");
        words = str.split(":");
        words[words.length-4] = jstoi_q(words[words.length-4]) + jstoi_q(words[words.length-3])*256;
        words[words.length-3] = jstoi_q(words[words.length-2]) + jstoi_q(words[words.length-1])*256;
        words = words.slice(0, words.length-2);
      } else {
        words = str.split(":");
      }
  
      offset = 0; z = 0;
      for (w=0; w < words.length; w++) {
        if (typeof words[w] == 'string') {
          if (words[w] === 'Z') {
            // compressed zeros - write appropriate number of zero words
            for (z = 0; z < (8 - words.length+1); z++) {
              parts[w+z] = 0;
            }
            offset = z-1;
          } else {
            // parse hex to field to 16-bit value and write it in network byte-order
            parts[w+offset] = _htons(parseInt(words[w],16));
          }
        } else {
          // parsed IPv4 words
          parts[w+offset] = words[w];
        }
      }
      return [
        (parts[1] << 16) | parts[0],
        (parts[3] << 16) | parts[2],
        (parts[5] << 16) | parts[4],
        (parts[7] << 16) | parts[6]
      ];
    };
  var DNS = {
  address_map:{
  id:1,
  addrs:{
  },
  names:{
  },
  },
  lookup_name(name) {
        // If the name is already a valid ipv4 / ipv6 address, don't generate a fake one.
        var res = inetPton4(name);
        if (res !== null) {
          return name;
        }
        res = inetPton6(name);
        if (res !== null) {
          return name;
        }
  
        // See if this name is already mapped.
        var addr;
  
        if (DNS.address_map.addrs[name]) {
          addr = DNS.address_map.addrs[name];
        } else {
          var id = DNS.address_map.id++;
          assert(id < 65535, 'exceeded max address mappings of 65535');
  
          addr = '172.29.' + (id & 0xff) + '.' + (id & 0xff00);
  
          DNS.address_map.names[addr] = name;
          DNS.address_map.addrs[name] = addr;
        }
  
        return addr;
      },
  lookup_addr(addr) {
        if (DNS.address_map.names[addr]) {
          return DNS.address_map.names[addr];
        }
  
        return null;
      },
  };
  /** @param {boolean=} allowNull */
  var getSocketAddress = (addrp, addrlen, allowNull) => {
      if (allowNull && addrp === 0) return null;
      var info = readSockaddr(addrp, addrlen);
      if (info.errno) throw new FS.ErrnoError(info.errno);
      info.addr = DNS.lookup_addr(info.addr) || info.addr;
      return info;
    };
  function ___syscall_bind(fd, addr, addrlen, d1, d2, d3) {
  try {
  
      var sock = getSocketFromFD(fd);
      var info = getSocketAddress(addr, addrlen);
      sock.sock_ops.bind(sock, info.addr, info.port);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_bind.sig = 'iippiii';

  function ___syscall_chdir(path) {
  try {
  
      path = SYSCALLS.getStr(path);
      FS.chdir(path);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_chdir.sig = 'ip';

  function ___syscall_chmod(path, mode) {
  try {
  
      path = SYSCALLS.getStr(path);
      FS.chmod(path, mode);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_chmod.sig = 'ipi';

  
  function ___syscall_connect(fd, addr, addrlen, d1, d2, d3) {
  try {
  
      var sock = getSocketFromFD(fd);
      var info = getSocketAddress(addr, addrlen);
      sock.sock_ops.connect(sock, info.addr, info.port);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_connect.sig = 'iippiii';

  function ___syscall_dup(fd) {
  try {
  
      var old = SYSCALLS.getStreamFromFD(fd);
      return FS.dupStream(old).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_dup.sig = 'ii';

  function ___syscall_dup3(fd, newfd, flags) {
  try {
  
      var old = SYSCALLS.getStreamFromFD(fd);
      if (old.fd === newfd) return -28;
      // Check newfd is within range of valid open file descriptors.
      if (newfd < 0 || newfd >= FS.MAX_OPEN_FDS) return -8;
      var existing = FS.getStream(newfd);
      if (existing) FS.close(existing);
      return FS.dupStream(old, newfd).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_dup3.sig = 'iiii';

  function ___syscall_faccessat(dirfd, path, amode, flags) {
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      if (amode & ~7) {
        // need a valid mode
        return -28;
      }
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      if (!node) {
        return -44;
      }
      var perms = '';
      if (amode & 4) perms += 'r';
      if (amode & 2) perms += 'w';
      if (amode & 1) perms += 'x';
      if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
        return -2;
      }
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_faccessat.sig = 'iipii';

  var ___syscall_fadvise64 = (fd, offset, len, advice) => {
      return 0; // your advice is important to us (but we can't use it)
    };
  ___syscall_fadvise64.sig = 'iijji';

  
  var INT53_MAX = 9007199254740992;
  
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = (num) => (num < INT53_MIN || num > INT53_MAX) ? NaN : Number(num);
  function ___syscall_fallocate(fd, mode, offset, len) {
    offset = bigintToI53Checked(offset);
    len = bigintToI53Checked(len);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd)
      FS.allocate(stream, offset, len);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  ;
  }
  ___syscall_fallocate.sig = 'iiijj';

  function ___syscall_fchmod(fd, mode) {
  try {
  
      FS.fchmod(fd, mode);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_fchmod.sig = 'iii';

  function ___syscall_fchmodat2(dirfd, path, mode, flags) {
  try {
  
      var nofollow = flags & 256;
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      FS.chmod(path, mode, nofollow);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_fchmodat2.sig = 'iipii';

  function ___syscall_fchown32(fd, owner, group) {
  try {
  
      FS.fchown(fd, owner, group);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_fchown32.sig = 'iiii';

  /** @suppress {duplicate } */
  function syscallGetVarargI() {
      // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
      var ret = HEAP32[((+SYSCALLS.varargs)>>2)];
      SYSCALLS.varargs += 4;
      return ret;
    }
  var syscallGetVarargP = syscallGetVarargI;
  
  
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = syscallGetVarargI();
          if (arg < 0) {
            return -28;
          }
          while (FS.streams[arg]) {
            arg++;
          }
          var newStream;
          newStream = FS.dupStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = syscallGetVarargI();
          stream.flags |= arg;
          return 0;
        }
        case 12: {
          var arg = syscallGetVarargP();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 13:
        case 14:
          return 0; // Pretend that the locking is successful.
      }
      return -28;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_fcntl64.sig = 'iiip';

  function ___syscall_fdatasync(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      return 0; // we can't do anything synchronously; the in-memory FS is already synced to
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_fdatasync.sig = 'ii';

  function ___syscall_fstat64(fd, buf) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      return SYSCALLS.doStat(FS.stat, stream.path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_fstat64.sig = 'iip';

  function ___syscall_ftruncate64(fd, length) {
    length = bigintToI53Checked(length);
  
    
  try {
  
      if (isNaN(length)) return 61;
      FS.ftruncate(fd, length);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  ;
  }
  ___syscall_ftruncate64.sig = 'iij';

  
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  function ___syscall_getcwd(buf, size) {
  try {
  
      if (size === 0) return -28;
      var cwd = FS.cwd();
      var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
      if (size < cwdLengthInBytes) return -68;
      stringToUTF8(cwd, buf, size);
      return cwdLengthInBytes;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_getcwd.sig = 'ipp';

  
  function ___syscall_getdents64(fd, dirp, count) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd)
      stream.getdents ||= FS.readdir(stream.path);
  
      var struct_size = 280;
      var pos = 0;
      var off = FS.llseek(stream, 0, 1);
  
      var idx = Math.floor(off / struct_size);
  
      while (idx < stream.getdents.length && pos + struct_size <= count) {
        var id;
        var type;
        var name = stream.getdents[idx];
        if (name === '.') {
          id = stream.node.id;
          type = 4; // DT_DIR
        }
        else if (name === '..') {
          var lookup = FS.lookupPath(stream.path, { parent: true });
          id = lookup.node.id;
          type = 4; // DT_DIR
        }
        else {
          var child = FS.lookupNode(stream.node, name);
          id = child.id;
          type = FS.isChrdev(child.mode) ? 2 :  // DT_CHR, character device.
                 FS.isDir(child.mode) ? 4 :     // DT_DIR, directory.
                 FS.isLink(child.mode) ? 10 :   // DT_LNK, symbolic link.
                 8;                             // DT_REG, regular file.
        }
        HEAP64[((dirp + pos)>>3)] = BigInt(id);
        HEAP64[(((dirp + pos)+(8))>>3)] = BigInt((idx + 1) * struct_size);
        HEAP16[(((dirp + pos)+(16))>>1)] = 280;
        HEAP8[(dirp + pos)+(18)] = type;
        stringToUTF8(name, dirp + pos + 19, 256);
        pos += struct_size;
        idx += 1;
      }
      FS.llseek(stream, idx * struct_size, 0);
      return pos;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_getdents64.sig = 'iipp';

  
  
  
  
  
  /** @param {number=} addrlen */
  var writeSockaddr = (sa, family, addr, port, addrlen) => {
      switch (family) {
        case 2:
          addr = inetPton4(addr);
          zeroMemory(sa, 16);
          if (addrlen) {
            HEAP32[((addrlen)>>2)] = 16;
          }
          HEAP16[((sa)>>1)] = family;
          HEAP32[(((sa)+(4))>>2)] = addr;
          HEAP16[(((sa)+(2))>>1)] = _htons(port);
          break;
        case 10:
          addr = inetPton6(addr);
          zeroMemory(sa, 28);
          if (addrlen) {
            HEAP32[((addrlen)>>2)] = 28;
          }
          HEAP32[((sa)>>2)] = family;
          HEAP32[(((sa)+(8))>>2)] = addr[0];
          HEAP32[(((sa)+(12))>>2)] = addr[1];
          HEAP32[(((sa)+(16))>>2)] = addr[2];
          HEAP32[(((sa)+(20))>>2)] = addr[3];
          HEAP16[(((sa)+(2))>>1)] = _htons(port);
          break;
        default:
          return 5;
      }
      return 0;
    };
  
  function ___syscall_getsockname(fd, addr, addrlen, d1, d2, d3) {
  try {
  
      var sock = getSocketFromFD(fd);
      // TODO: sock.saddr should never be undefined, see TODO in websocket_sock_ops.getname
      var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(sock.saddr || '0.0.0.0'), sock.sport, addrlen);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_getsockname.sig = 'iippiii';

  function ___syscall_getsockopt(fd, level, optname, optval, optlen, d1) {
  try {
  
      var sock = getSocketFromFD(fd);
      // Minimal getsockopt aimed at resolving https://github.com/emscripten-core/emscripten/issues/2211
      // so only supports SOL_SOCKET with SO_ERROR.
      if (level === 1) {
        if (optname === 4) {
          HEAP32[((optval)>>2)] = sock.error;
          HEAP32[((optlen)>>2)] = 4;
          sock.error = null; // Clear the error (The SO_ERROR option obtains and then clears this field).
          return 0;
        }
      }
      return -50; // The option is unknown at the level indicated.
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_getsockopt.sig = 'iiiippi';

  
  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21505: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcgets) {
            var termios = stream.tty.ops.ioctl_tcgets(stream);
            var argp = syscallGetVarargP();
            HEAP32[((argp)>>2)] = termios.c_iflag || 0;
            HEAP32[(((argp)+(4))>>2)] = termios.c_oflag || 0;
            HEAP32[(((argp)+(8))>>2)] = termios.c_cflag || 0;
            HEAP32[(((argp)+(12))>>2)] = termios.c_lflag || 0;
            for (var i = 0; i < 32; i++) {
              HEAP8[(argp + i)+(17)] = termios.c_cc[i] || 0;
            }
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcsets) {
            var argp = syscallGetVarargP();
            var c_iflag = HEAP32[((argp)>>2)];
            var c_oflag = HEAP32[(((argp)+(4))>>2)];
            var c_cflag = HEAP32[(((argp)+(8))>>2)];
            var c_lflag = HEAP32[(((argp)+(12))>>2)];
            var c_cc = []
            for (var i = 0; i < 32; i++) {
              c_cc.push(HEAP8[(argp + i)+(17)]);
            }
            return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
          }
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = syscallGetVarargP();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = syscallGetVarargP();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          if (stream.tty.ops && stream.tty.ops.ioctl_tiocgwinsz) {
            var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
            var argp = syscallGetVarargP();
            HEAP16[((argp)>>1)] = winsize[0];
            HEAP16[(((argp)+(2))>>1)] = winsize[1];
          }
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        case 21515: {
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_ioctl.sig = 'iiip';

  function ___syscall_lstat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.lstat, path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_lstat64.sig = 'ipp';

  function ___syscall_mkdirat(dirfd, path, mode) {
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      // remove a trailing slash, if one - /a/b/ has basename of '', but
      // we want to create b in the context of this function
      path = PATH.normalize(path);
      if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
      FS.mkdir(path, mode, 0);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_mkdirat.sig = 'iipi';

  function ___syscall_newfstatat(dirfd, path, buf, flags) {
  try {
  
      path = SYSCALLS.getStr(path);
      var nofollow = flags & 256;
      var allowEmpty = flags & 4096;
      flags = flags & (~6400);
      path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
      return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_newfstatat.sig = 'iippi';

  
  function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? syscallGetVarargI() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_openat.sig = 'iipip';

  var PIPEFS = {
  BUCKET_BUFFER_SIZE:8192,
  mount(mount) {
        // Do not pollute the real root directory or its child nodes with pipes
        // Looks like it is OK to create another pseudo-root node not linked to the FS.root hierarchy this way
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },
  createPipe() {
        var pipe = {
          buckets: [],
          // refcnt 2 because pipe has a read end and a write end. We need to be
          // able to read from the read end after write end is closed.
          refcnt : 2,
        };
  
        pipe.buckets.push({
          buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
          offset: 0,
          roffset: 0
        });
  
        var rName = PIPEFS.nextname();
        var wName = PIPEFS.nextname();
        var rNode = FS.createNode(PIPEFS.root, rName, 4096, 0);
        var wNode = FS.createNode(PIPEFS.root, wName, 4096, 0);
  
        rNode.pipe = pipe;
        wNode.pipe = pipe;
  
        var readableStream = FS.createStream({
          path: rName,
          node: rNode,
          flags: 0,
          seekable: false,
          stream_ops: PIPEFS.stream_ops
        });
        rNode.stream = readableStream;
  
        var writableStream = FS.createStream({
          path: wName,
          node: wNode,
          flags: 1,
          seekable: false,
          stream_ops: PIPEFS.stream_ops
        });
        wNode.stream = writableStream;
  
        return {
          readable_fd: readableStream.fd,
          writable_fd: writableStream.fd
        };
      },
  stream_ops:{
  poll(stream) {
          var pipe = stream.node.pipe;
  
          if ((stream.flags & 2097155) === 1) {
            return (256 | 4);
          }
          if (pipe.buckets.length > 0) {
            for (var i = 0; i < pipe.buckets.length; i++) {
              var bucket = pipe.buckets[i];
              if (bucket.offset - bucket.roffset > 0) {
                return (64 | 1);
              }
            }
          }
  
          return 0;
        },
  ioctl(stream, request, varargs) {
          return 28;
        },
  fsync(stream) {
          return 28;
        },
  read(stream, buffer, offset, length, position /* ignored */) {
          var pipe = stream.node.pipe;
          var currentLength = 0;
  
          for (var i = 0; i < pipe.buckets.length; i++) {
            var bucket = pipe.buckets[i];
            currentLength += bucket.offset - bucket.roffset;
          }
  
          var data = buffer.subarray(offset, offset + length);
  
          if (length <= 0) {
            return 0;
          }
          if (currentLength == 0) {
            // Behave as if the read end is always non-blocking
            throw new FS.ErrnoError(6);
          }
          var toRead = Math.min(currentLength, length);
  
          var totalRead = toRead;
          var toRemove = 0;
  
          for (var i = 0; i < pipe.buckets.length; i++) {
            var currBucket = pipe.buckets[i];
            var bucketSize = currBucket.offset - currBucket.roffset;
  
            if (toRead <= bucketSize) {
              var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
              if (toRead < bucketSize) {
                tmpSlice = tmpSlice.subarray(0, toRead);
                currBucket.roffset += toRead;
              } else {
                toRemove++;
              }
              data.set(tmpSlice);
              break;
            } else {
              var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
              data.set(tmpSlice);
              data = data.subarray(tmpSlice.byteLength);
              toRead -= tmpSlice.byteLength;
              toRemove++;
            }
          }
  
          if (toRemove && toRemove == pipe.buckets.length) {
            // Do not generate excessive garbage in use cases such as
            // write several bytes, read everything, write several bytes, read everything...
            toRemove--;
            pipe.buckets[toRemove].offset = 0;
            pipe.buckets[toRemove].roffset = 0;
          }
  
          pipe.buckets.splice(0, toRemove);
  
          return totalRead;
        },
  write(stream, buffer, offset, length, position /* ignored */) {
          var pipe = stream.node.pipe;
  
          var data = buffer.subarray(offset, offset + length);
  
          var dataLen = data.byteLength;
          if (dataLen <= 0) {
            return 0;
          }
  
          var currBucket = null;
  
          if (pipe.buckets.length == 0) {
            currBucket = {
              buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
              offset: 0,
              roffset: 0
            };
            pipe.buckets.push(currBucket);
          } else {
            currBucket = pipe.buckets[pipe.buckets.length - 1];
          }
  
          assert(currBucket.offset <= PIPEFS.BUCKET_BUFFER_SIZE);
  
          var freeBytesInCurrBuffer = PIPEFS.BUCKET_BUFFER_SIZE - currBucket.offset;
          if (freeBytesInCurrBuffer >= dataLen) {
            currBucket.buffer.set(data, currBucket.offset);
            currBucket.offset += dataLen;
            return dataLen;
          } else if (freeBytesInCurrBuffer > 0) {
            currBucket.buffer.set(data.subarray(0, freeBytesInCurrBuffer), currBucket.offset);
            currBucket.offset += freeBytesInCurrBuffer;
            data = data.subarray(freeBytesInCurrBuffer, data.byteLength);
          }
  
          var numBuckets = (data.byteLength / PIPEFS.BUCKET_BUFFER_SIZE) | 0;
          var remElements = data.byteLength % PIPEFS.BUCKET_BUFFER_SIZE;
  
          for (var i = 0; i < numBuckets; i++) {
            var newBucket = {
              buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
              offset: PIPEFS.BUCKET_BUFFER_SIZE,
              roffset: 0
            };
            pipe.buckets.push(newBucket);
            newBucket.buffer.set(data.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE));
            data = data.subarray(PIPEFS.BUCKET_BUFFER_SIZE, data.byteLength);
          }
  
          if (remElements > 0) {
            var newBucket = {
              buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
              offset: data.byteLength,
              roffset: 0
            };
            pipe.buckets.push(newBucket);
            newBucket.buffer.set(data);
          }
  
          return dataLen;
        },
  close(stream) {
          var pipe = stream.node.pipe;
          pipe.refcnt--;
          if (pipe.refcnt === 0) {
            pipe.buckets = null;
          }
        },
  },
  nextname() {
        if (!PIPEFS.nextname.current) {
          PIPEFS.nextname.current = 0;
        }
        return 'pipe[' + (PIPEFS.nextname.current++) + ']';
      },
  };
  function ___syscall_pipe(fdPtr) {
  try {
  
      if (fdPtr == 0) {
        throw new FS.ErrnoError(21);
      }
  
      var res = PIPEFS.createPipe();
  
      HEAP32[((fdPtr)>>2)] = res.readable_fd;
      HEAP32[(((fdPtr)+(4))>>2)] = res.writable_fd;
  
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_pipe.sig = 'ip';

  function ___syscall_poll(fds, nfds, timeout) {
  try {
  
      var nonzero = 0;
      for (var i = 0; i < nfds; i++) {
        var pollfd = fds + 8 * i;
        var fd = HEAP32[((pollfd)>>2)];
        var events = HEAP16[(((pollfd)+(4))>>1)];
        var mask = 32;
        var stream = FS.getStream(fd);
        if (stream) {
          mask = SYSCALLS.DEFAULT_POLLMASK;
          if (stream.stream_ops.poll) {
            mask = stream.stream_ops.poll(stream, -1);
          }
        }
        mask &= events | 8 | 16;
        if (mask) nonzero++;
        HEAP16[(((pollfd)+(6))>>1)] = mask;
      }
      return nonzero;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_poll.sig = 'ipii';

  
  
  function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      if (bufsize <= 0) return -28;
      var ret = FS.readlink(path);
  
      var len = Math.min(bufsize, lengthBytesUTF8(ret));
      var endChar = HEAP8[buf+len];
      stringToUTF8(ret, buf, bufsize+1);
      // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
      // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
      HEAP8[buf+len] = endChar;
      return len;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_readlinkat.sig = 'iippp';

  
  
  function ___syscall_recvfrom(fd, buf, len, flags, addr, addrlen) {
  try {
  
      var sock = getSocketFromFD(fd);
      var msg = sock.sock_ops.recvmsg(sock, len);
      if (!msg) return 0; // socket is closed
      if (addr) {
        var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(msg.addr), msg.port, addrlen);
      }
      HEAPU8.set(msg.buffer, buf);
      return msg.buffer.byteLength;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_recvfrom.sig = 'iippipp';

  function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
  try {
  
      oldpath = SYSCALLS.getStr(oldpath);
      newpath = SYSCALLS.getStr(newpath);
      oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
      newpath = SYSCALLS.calculateAt(newdirfd, newpath);
      FS.rename(oldpath, newpath);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_renameat.sig = 'iipip';

  function ___syscall_rmdir(path) {
  try {
  
      path = SYSCALLS.getStr(path);
      FS.rmdir(path);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_rmdir.sig = 'ip';

  
  function ___syscall_sendto(fd, message, length, flags, addr, addr_len) {
  try {
  
      var sock = getSocketFromFD(fd);
      var dest = getSocketAddress(addr, addr_len, true);
      if (!dest) {
        // send, no address provided
        return FS.write(sock.stream, HEAP8, message, length);
      }
      // sendto an address
      return sock.sock_ops.sendmsg(sock, HEAP8, message, length, dest.addr, dest.port);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_sendto.sig = 'iippipp';

  function ___syscall_socket(domain, type, protocol) {
  try {
  
      var sock = SOCKFS.createSocket(domain, type, protocol);
      return sock.stream.fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_socket.sig = 'iiiiiii';

  function ___syscall_stat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.stat, path, buf);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_stat64.sig = 'ipp';

  function ___syscall_statfs64(path, size, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      // NOTE: None of the constants here are true. We're just returning safe and
      //       sane values.
      HEAP32[(((buf)+(4))>>2)] = 4096;
      HEAP32[(((buf)+(40))>>2)] = 4096;
      HEAP32[(((buf)+(8))>>2)] = 1000000;
      HEAP32[(((buf)+(12))>>2)] = 500000;
      HEAP32[(((buf)+(16))>>2)] = 500000;
      HEAP32[(((buf)+(20))>>2)] = FS.nextInode;
      HEAP32[(((buf)+(24))>>2)] = 1000000;
      HEAP32[(((buf)+(28))>>2)] = 42;
      HEAP32[(((buf)+(44))>>2)] = 2;  // ST_NOSUID
      HEAP32[(((buf)+(36))>>2)] = 255;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_statfs64.sig = 'ippp';

  function ___syscall_symlink(target, linkpath) {
  try {
  
      target = SYSCALLS.getStr(target);
      linkpath = SYSCALLS.getStr(linkpath);
      FS.symlink(target, linkpath);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_symlink.sig = 'ipp';

  
  function ___syscall_truncate64(path, length) {
    length = bigintToI53Checked(length);
  
    
  try {
  
      if (isNaN(length)) return 61;
      path = SYSCALLS.getStr(path);
      FS.truncate(path, length);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  ;
  }
  ___syscall_truncate64.sig = 'ipj';

  function ___syscall_unlinkat(dirfd, path, flags) {
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      if (flags === 0) {
        FS.unlink(path);
      } else if (flags === 512) {
        FS.rmdir(path);
      } else {
        abort('Invalid flags passed to unlinkat');
      }
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_unlinkat.sig = 'iipi';

  var readI53FromI64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAP32[(((ptr)+(4))>>2)] * 4294967296;
    };
  
  function ___syscall_utimensat(dirfd, path, times, flags) {
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path, true);
      if (!times) {
        var atime = Date.now();
        var mtime = atime;
      } else {
        var seconds = readI53FromI64(times);
        var nanoseconds = HEAP32[(((times)+(8))>>2)];
        atime = (seconds*1000) + (nanoseconds/(1000*1000));
        times += 16;
        seconds = readI53FromI64(times);
        nanoseconds = HEAP32[(((times)+(8))>>2)];
        mtime = (seconds*1000) + (nanoseconds/(1000*1000));
      }
      FS.utime(path, atime, mtime);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }
  ___syscall_utimensat.sig = 'iippi';

  var ___table_base = new WebAssembly.Global({'value': 'i32', 'mutable': false}, 1);

  var __abort_js = () => {
      abort('');
    };
  __abort_js.sig = 'v';

  var ENV = {
  };
  
  
  
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
  
  
  var dlSetError = (msg) => {
      var sp = stackSave();
      var cmsg = stringToUTF8OnStack(msg);
      ___dl_seterr(cmsg, 0);
      stackRestore(sp);
    };
  
  
  var dlopenInternal = (handle, jsflags) => {
      // void *dlopen(const char *file, int mode);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/dlopen.html
      var filename = UTF8ToString(handle + 36);
      var flags = HEAP32[(((handle)+(4))>>2)];
      filename = PATH.normalize(filename);
      var searchpaths = [];
  
      var global = Boolean(flags & 256);
      var localScope = global ? null : {};
  
      // We don't care about RTLD_NOW and RTLD_LAZY.
      var combinedFlags = {
        global,
        nodelete:  Boolean(flags & 4096),
        loadAsync: jsflags.loadAsync,
      }
  
      if (jsflags.loadAsync) {
        return loadDynamicLibrary(filename, combinedFlags, localScope, handle);
      }
  
      try {
        return loadDynamicLibrary(filename, combinedFlags, localScope, handle)
      } catch (e) {
        dlSetError(`Could not load dynamic lib: ${filename}\n${e}`);
        return 0;
      }
    };
  var __dlopen_js = (handle) => {
      return dlopenInternal(handle, { loadAsync: false });
    };
  __dlopen_js.sig = 'pp';

  
  
  
  var __dlsym_js = (handle, symbol, symbolIndex) => {
      // void *dlsym(void *restrict handle, const char *restrict name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/dlsym.html
      symbol = UTF8ToString(symbol);
      var result;
      var newSymIndex;
  
      var lib = LDSO.loadedLibsByHandle[handle];
      if (!lib.exports.hasOwnProperty(symbol) || lib.exports[symbol].stub) {
        dlSetError(`Tried to lookup unknown symbol "${symbol}" in dynamic lib: ${lib.name}`)
        return 0;
      }
      newSymIndex = Object.keys(lib.exports).indexOf(symbol);
      result = lib.exports[symbol];
  
      if (typeof result == 'function') {
  
        var addr = getFunctionAddress(result);
        if (addr) {
          result = addr;
        } else {
          // Insert the function into the wasm table.  If its a direct wasm
          // function the second argument will not be needed.  If its a JS
          // function we rely on the `sig` attribute being set based on the
          // `<func>__sig` specified in library JS file.
          result = addFunction(result, result.sig);
          HEAPU32[((symbolIndex)>>2)] = newSymIndex;
        }
      }
      return result;
    };
  __dlsym_js.sig = 'pppp';

  var nowIsMonotonic = 1;
  var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;
  __emscripten_get_now_is_monotonic.sig = 'i';

  var __emscripten_runtime_keepalive_clear = () => {
      noExitRuntime = false;
      runtimeKeepaliveCounter = 0;
    };
  __emscripten_runtime_keepalive_clear.sig = 'v';

  var __emscripten_system = (command) => {
      if (ENVIRONMENT_IS_NODE) {
        if (!command) return 1; // shell is available
  
        var cmdstr = UTF8ToString(command);
        if (!cmdstr.length) return 0; // this is what glibc seems to do (shell works test?)
  
        var cp = require('child_process');
        var ret = cp.spawnSync(cmdstr, [], {shell:true, stdio:'inherit'});
  
        var _W_EXITCODE = (ret, sig) => ((ret) << 8 | (sig));
  
        // this really only can happen if process is killed by signal
        if (ret.status === null) {
          // sadly node doesn't expose such function
          var signalToNumber = (sig) => {
            // implement only the most common ones, and fallback to SIGINT
            switch (sig) {
              case 'SIGHUP': return 1;
              case 'SIGINT': return 2;
              case 'SIGQUIT': return 3;
              case 'SIGFPE': return 8;
              case 'SIGKILL': return 9;
              case 'SIGALRM': return 14;
              case 'SIGTERM': return 15;
            }
            return 2; // SIGINT
          }
          return _W_EXITCODE(0, signalToNumber(ret.signal));
        }
  
        return _W_EXITCODE(ret.status, 0);
      }
      // int system(const char *command);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/system.html
      // Can't call external programs.
      if (!command) return 0; // no shell available
      return -52;
    };
  __emscripten_system.sig = 'ip';

  var __emscripten_throw_longjmp = () => {
      throw Infinity;
    };
  __emscripten_throw_longjmp.sig = 'v';

  function __gmtime_js(time, tmPtr) {
    time = bigintToI53Checked(time);
  
    
      var date = new Date(time * 1000);
      HEAP32[((tmPtr)>>2)] = date.getUTCSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getUTCMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getUTCHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getUTCDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getUTCMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getUTCFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = ((date.getTime() - start) / (1000 * 60 * 60 * 24))|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
    ;
  }
  __gmtime_js.sig = 'vjp';

  var isLeapYear = (year) => year%4 === 0 && (year%100 !== 0 || year%400 === 0);
  
  var MONTH_DAYS_LEAP_CUMULATIVE = [0,31,60,91,121,152,182,213,244,274,305,335];
  
  var MONTH_DAYS_REGULAR_CUMULATIVE = [0,31,59,90,120,151,181,212,243,273,304,334];
  var ydayFromDate = (date) => {
      var leap = isLeapYear(date.getFullYear());
      var monthDaysCumulative = (leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE);
      var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1; // -1 since it's days since Jan 1
  
      return yday;
    };
  
  function __localtime_js(time, tmPtr) {
    time = bigintToI53Checked(time);
  
    
      var date = new Date(time*1000);
      HEAP32[((tmPtr)>>2)] = date.getSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)] = date.getDay();
  
      var yday = ydayFromDate(date)|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
      HEAP32[(((tmPtr)+(36))>>2)] = -(date.getTimezoneOffset() * 60);
  
      // Attention: DST is in December in South, and some regions don't have DST at all.
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset))|0;
      HEAP32[(((tmPtr)+(32))>>2)] = dst;
    ;
  }
  __localtime_js.sig = 'vjp';

  
  var __mktime_js = function(tmPtr) {
  
    var ret = (() => { 
      var date = new Date(HEAP32[(((tmPtr)+(20))>>2)] + 1900,
                          HEAP32[(((tmPtr)+(16))>>2)],
                          HEAP32[(((tmPtr)+(12))>>2)],
                          HEAP32[(((tmPtr)+(8))>>2)],
                          HEAP32[(((tmPtr)+(4))>>2)],
                          HEAP32[((tmPtr)>>2)],
                          0);
  
      // There's an ambiguous hour when the time goes back; the tm_isdst field is
      // used to disambiguate it.  Date() basically guesses, so we fix it up if it
      // guessed wrong, or fill in tm_isdst with the guess if it's -1.
      var dst = HEAP32[(((tmPtr)+(32))>>2)];
      var guessedOffset = date.getTimezoneOffset();
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dstOffset = Math.min(winterOffset, summerOffset); // DST is in December in South
      if (dst < 0) {
        // Attention: some regions don't have DST at all.
        HEAP32[(((tmPtr)+(32))>>2)] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
      } else if ((dst > 0) != (dstOffset == guessedOffset)) {
        var nonDstOffset = Math.max(winterOffset, summerOffset);
        var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
        // Don't try setMinutes(date.getMinutes() + ...) -- it's messed up.
        date.setTime(date.getTime() + (trueOffset - guessedOffset)*60000);
      }
  
      HEAP32[(((tmPtr)+(24))>>2)] = date.getDay();
      var yday = ydayFromDate(date)|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
      // To match expected behavior, update fields from date
      HEAP32[((tmPtr)>>2)] = date.getSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getYear();
  
      var timeMs = date.getTime();
      if (isNaN(timeMs)) {
        return -1;
      }
      // Return time in microseconds
      return timeMs / 1000;
     })();
    return BigInt(ret);
  };
  __mktime_js.sig = 'jp';

  
  
  
  
  
  function __mmap_js(len, prot, flags, fd, offset, allocated, addr) {
    offset = bigintToI53Checked(offset);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      var res = FS.mmap(stream, len, offset, prot, flags);
      var ptr = res.ptr;
      HEAP32[((allocated)>>2)] = res.allocated;
      HEAPU32[((addr)>>2)] = ptr;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  ;
  }
  __mmap_js.sig = 'ipiiijpp';

  
  function __munmap_js(addr, len, prot, flags, fd, offset) {
    offset = bigintToI53Checked(offset);
  
    
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      if (prot & 2) {
        SYSCALLS.doMsync(addr, stream, len, flags, offset);
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  ;
  }
  __munmap_js.sig = 'ippiiij';

  var timers = {
  };
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      quit_(1, e);
    };
  
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  _proc_exit.sig = 'vi';
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  _exit.sig = 'vi';
  
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  var callUserCallback = (func) => {
      if (ABORT) {
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  
  var _emscripten_get_now;
      // Modern environment where performance.now() is supported:
      // N.B. a shorter form "_emscripten_get_now = performance.now;" is
      // unfortunately not allowed even in current browsers (e.g. FF Nightly 75).
      _emscripten_get_now = () => performance.now();
  ;
  _emscripten_get_now.sig = 'd';
  var __setitimer_js = (which, timeout_ms) => {
      // First, clear any existing timer.
      if (timers[which]) {
        clearTimeout(timers[which].id);
        delete timers[which];
      }
  
      // A timeout of zero simply cancels the current timeout so we have nothing
      // more to do.
      if (!timeout_ms) return 0;
  
      var id = setTimeout(() => {
        delete timers[which];
        callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
      }, timeout_ms);
      timers[which] = { id, timeout_ms };
      return 0;
    };
  __setitimer_js.sig = 'iid';

  var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      // TODO: Use (malleable) environment variables instead of system settings.
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
  
      // Local standard timezone offset. Local standard time is not adjusted for
      // daylight savings.  This code uses the fact that getTimezoneOffset returns
      // a greater value during Standard Time versus Daylight Saving Time (DST).
      // Thus it determines the expected output during Standard Time, and it
      // compares whether the output of the given date the same (Standard) or less
      // (DST).
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by stdTimezoneOffset.
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAPU32[((timezone)>>2)] = stdTimezoneOffset * 60;
  
      HEAP32[((daylight)>>2)] = Number(winterOffset != summerOffset);
  
      var extractZone = (timezoneOffset) => {
        // Why inverse sign?
        // Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
        var sign = timezoneOffset >= 0 ? "-" : "+";
  
        var absOffset = Math.abs(timezoneOffset)
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
  
        return `UTC${sign}${hours}${minutes}`;
      }
  
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      if (summerOffset < winterOffset) {
        // Northern hemisphere
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };
  __tzset_js.sig = 'vpppp';

  var readEmAsmArgsArray = [];
  var readEmAsmArgs = (sigPtr, buf) => {
      readEmAsmArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      while (ch = HEAPU8[sigPtr++]) {
        // Floats are always passed as doubles, so all types except for 'i'
        // are 8 bytes and require alignment.
        var wide = (ch != 105);
        wide &= (ch != 112);
        buf += wide && (buf % 8) ? 4 : 0;
        readEmAsmArgsArray.push(
          // Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
          ch == 112 ? HEAPU32[((buf)>>2)] :
          ch == 106 ? HEAP64[((buf)>>3)] :
          ch == 105 ?
            HEAP32[((buf)>>2)] :
            HEAPF64[((buf)>>3)]
        );
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    };
  var runEmAsmFunction = (code, sigPtr, argbuf) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      return ASM_CONSTS[code](...args);
    };
  var _emscripten_asm_const_int = (code, sigPtr, argbuf) => {
      return runEmAsmFunction(code, sigPtr, argbuf);
    };
  _emscripten_asm_const_int.sig = 'ippp';

  var _emscripten_date_now = () => Date.now();
  _emscripten_date_now.sig = 'd';

  
  
  var _emscripten_force_exit = (status) => {
      __emscripten_runtime_keepalive_clear();
      _exit(status);
    };
  _emscripten_force_exit.sig = 'vi';

  var getHeapMax = () =>
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      2147483648;
  var _emscripten_get_heap_max = () => getHeapMax();
  _emscripten_get_heap_max.sig = 'p';


  
  
  var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow(pages); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = growMemory(newSize);
        if (replacement) {
  
          return true;
        }
      }
      return false;
    };
  _emscripten_resize_heap.sig = 'ip';

  
  
  /** @param {number=} timeout */
  var safeSetTimeout = (func, timeout) => {
      
      return setTimeout(() => {
        
        callUserCallback(func);
      }, timeout);
    };
  
  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };
  
  
  
  
  var Browser = {
  mainLoop:{
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  pause() {
          Browser.mainLoop.scheduler = null;
          // Incrementing this signals the previous main loop that it's now become old, and it must return.
          Browser.mainLoop.currentlyRunningMainloop++;
        },
  resume() {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          // do not set timing and call scheduler, we will do it on the next lines
          setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          Browser.mainLoop.scheduler();
        },
  updateStatus() {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](`{message} ({expected - remaining}/{expected})`);
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },
  runIter(func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          callUserCallback(func);
          Module['postMainLoop']?.();
        },
  },
  useWebGL:false,
  isFullscreen:false,
  pointerLock:false,
  moduleContextCreatedCallbacks:[],
  workers:[],
  init() {
        if (Browser.initted) return;
        Browser.initted = true;
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module['noImageDecoding'] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          if (b.size !== byteArray.length) { // Safari bug #118630
            // Safari's Blob can only take an ArrayBuffer
            b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
          }
          var url = URL.createObjectURL(b);
          var img = new Image();
          img.onload = () => {
            var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            preloadedImages[name] = canvas;
            URL.revokeObjectURL(url);
            onload?.(byteArray);
          };
          img.onerror = (event) => {
            err(`Image ${url} could not be decoded`);
            onerror?.();
          };
          img.src = url;
        };
        preloadPlugins.push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module['noAudioDecoding'] && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            preloadedAudios[name] = audio;
            onload?.(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            preloadedAudios[name] = new Audio(); // empty shim
            onerror?.();
          }
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          var url = URL.createObjectURL(b); // XXX we never revoke this!
          var audio = new Audio();
          audio.addEventListener('canplaythrough', () => finish(audio), false); // use addEventListener due to chromium bug 124926
          audio.onerror = function audio_onerror(event) {
            if (done) return;
            err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
            function encode64(data) {
              var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              var PAD = '=';
              var ret = '';
              var leftchar = 0;
              var leftbits = 0;
              for (var i = 0; i < data.length; i++) {
                leftchar = (leftchar << 8) | data[i];
                leftbits += 8;
                while (leftbits >= 6) {
                  var curr = (leftchar >> (leftbits-6)) & 0x3f;
                  leftbits -= 6;
                  ret += BASE[curr];
                }
              }
              if (leftbits == 2) {
                ret += BASE[(leftchar&3) << 4];
                ret += PAD + PAD;
              } else if (leftbits == 4) {
                ret += BASE[(leftchar&0xf) << 2];
                ret += PAD;
              }
              return ret;
            }
            audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
            finish(audio); // we don't wait for confirmation this worked - but it's worth trying
          };
          audio.src = url;
          // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
          safeSetTimeout(() => {
            finish(audio); // try to use it even though it is not necessarily ready to play
          }, 10000);
        };
        preloadPlugins.push(audioPlugin);
  
        // Canvas event setup
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === Module['canvas'] ||
                                document['mozPointerLockElement'] === Module['canvas'] ||
                                document['webkitPointerLockElement'] === Module['canvas'] ||
                                document['msPointerLockElement'] === Module['canvas'];
        }
        var canvas = Module['canvas'];
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
  
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      (() => {});
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   (() => {}); // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", (ev) => {
              if (!Browser.pointerLock && Module['canvas'].requestPointerLock) {
                Module['canvas'].requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },
  createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: 1,
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
          // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
          // Browser.createContext() should not even be emitted.
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Browser.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
          Browser.init();
        }
        return ctx;
      },
  fullscreenHandlersInstalled:false,
  lockPointer:undefined,
  resizeCanvas:undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['fullscreenElement'] || document['mozFullScreenElement'] ||
               document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
  
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          Module['onFullScreen']?.(Browser.isFullscreen);
          Module['onFullscreen']?.(Browser.isFullscreen);
        }
  
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullscreenChange, false);
          document.addEventListener('mozfullscreenchange', fullscreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
          document.addEventListener('MSFullscreenChange', fullscreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullscreen = canvasContainer['requestFullscreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullscreen'] ? () => canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']) : null) ||
                                           (canvasContainer['webkitRequestFullScreen'] ? () => canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) : null);
  
        canvasContainer.requestFullscreen();
      },
  exitFullscreen() {
        // This is workaround for chrome. Trying to exit from fullscreen
        // not in fullscreen state will cause "TypeError: Document not active"
        // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
        if (!Browser.isFullscreen) {
          return false;
        }
  
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['msExitFullscreen'] ||
                  document['webkitCancelFullScreen'] ||
            (() => {});
        CFS.apply(document, []);
        return true;
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = Browser.fakeRequestAnimationFrame;
        RAF(func);
      },
  safeSetTimeout(func, timeout) {
        // Legacy function, this is used by the SDL2 port so we need to keep it
        // around at least until that is updated.
        // See https://github.com/libsdl-org/SDL/pull/6304
        return safeSetTimeout(func, timeout);
      },
  safeRequestAnimationFrame(func) {
        
        return Browser.requestAnimationFrame(() => {
          
          callUserCallback(func);
        });
      },
  getMimetype(name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },
  getUserMedia(func) {
        window.getUserMedia ||= navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        window.getUserMedia(func);
      },
  getMovementX(event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },
  getMovementY(event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },
  getMouseWheelDelta(event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            // 3 lines make up a step
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            // 120 units make up a step
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                // DOM_DELTA_PIXEL: 100 pixels make up a step
                delta /= 100;
                break;
              case 1:
                // DOM_DELTA_LINE: 3 lines make up a step
                delta /= 3;
                break;
              case 2:
                // DOM_DELTA_PAGE: A page makes up 80 steps
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },
  mouseX:0,
  mouseY:0,
  mouseMovementX:0,
  mouseMovementY:0,
  touches:{
  },
  lastTouches:{
  },
  calculateMouseCoords(pageX, pageY) {
        // Calculate the movement based on the changes
        // in the coordinates.
        var rect = Module["canvas"].getBoundingClientRect();
        var cw = Module["canvas"].width;
        var ch = Module["canvas"].height;
  
        // Neither .scrollX or .pageXOffset are defined in a spec, but
        // we prefer .scrollX because it is currently in a spec draft.
        // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
        var scrollX = ((typeof window.scrollX != 'undefined') ? window.scrollX : window.pageXOffset);
        var scrollY = ((typeof window.scrollY != 'undefined') ? window.scrollY : window.pageYOffset);
        var adjustedX = pageX - (scrollX + rect.left);
        var adjustedY = pageY - (scrollY + rect.top);
  
        // the canvas might be CSS-scaled compared to its backbuffer;
        // SDL-using content will want mouse coordinates in terms
        // of backbuffer units.
        adjustedX = adjustedX * (cw / rect.width);
        adjustedY = adjustedY * (ch / rect.height);
  
        return { x: adjustedX, y: adjustedY };
      },
  setMouseCoords(pageX, pageY) {
        const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
        Browser.mouseMovementX = x - Browser.mouseX;
        Browser.mouseMovementY = y - Browser.mouseY;
        Browser.mouseX = x;
        Browser.mouseY = y;
      },
  calculateMouseEvent(event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
  
          // add the mouse delta to the current absolute mouse position
          Browser.mouseX += Browser.mouseMovementX;
          Browser.mouseY += Browser.mouseMovementY;
        } else {
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
  
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              last ||= coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
  
          Browser.setMouseCoords(event.pageX, event.pageY);
        }
      },
  resizeListeners:[],
  updateResizeListeners() {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
      },
  setCanvasSize(width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },
  windowedWidth:0,
  windowedHeight:0,
  setFullscreenCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  setWindowedCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  updateCanvasDimensions(canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['fullscreenElement'] || document['mozFullScreenElement'] ||
             document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },
  };
  var _emscripten_set_main_loop_timing = (mode, value) => {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!Browser.mainLoop.running) {
        
        Browser.mainLoop.running = true;
      }
      if (mode == 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(Browser.mainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof Browser.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var Browser_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", Browser_setImmediate_messageHandler, true);
            Browser.setImmediate = /** @type{function(function(): ?, ...?): number} */(function Browser_emulated_setImmediate(func) {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                Module['setImmediates'] ??= [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            Browser.setImmediate = setImmediate;
          }
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          Browser.setImmediate(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'immediate';
      }
      return 0;
    };
  _emscripten_set_main_loop_timing.sig = 'iii';
  
  
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      Browser.mainLoop.func = browserIterationFunc;
      Browser.mainLoop.arg = arg;
  
      // Closure compiler bug(?): Closure does not see that the assignment
      //   var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop
      // is a value copy of a number (even with the JSDoc @type annotation)
      // but optimizeis the code as if the assignment was a reference assignment,
      // which results in Browser.mainLoop.pause() not working. Hence use a
      // workaround to make Closure believe this is a value copy that should occur:
      // (TODO: Minimize this down to a small test case and report - was unable
      // to reproduce in a small written test case)
      /** @type{number} */
      var thisMainLoopId = (() => Browser.mainLoop.currentlyRunningMainloop)();
      function checkIsRunning() {
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
          
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      Browser.mainLoop.running = false;
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          Browser.mainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          Browser.mainLoop.scheduler();
          return;
        } else if (Browser.mainLoop.timingMode == 0) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
  
        Browser.mainLoop.runIter(browserIterationFunc);
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        // Queue new audio data. This is important to be right after the main loop invocation, so that we will immediately be able
        // to queue the newest produced audio samples.
        // TODO: Consider adding pre- and post- rAF callbacks so that GL.newRenderingFrameStarted() and SDL.audio.queueNewAudioData()
        //       do not need to be hardcoded into this function, but can be more generic.
        if (typeof SDL == 'object') SDL.audio?.queueNewAudioData?.();
  
        Browser.mainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        Browser.mainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  
  
  var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
      var browserIterationFunc = getWasmTableEntry(func);
      setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop);
    };
  _emscripten_set_main_loop.sig = 'vpii';

  
  var getExecutableName = () => {
      return thisProgram || './this.program';
    };
  var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
  
  var stringToAscii = (str, buffer) => {
      for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++] = str.charCodeAt(i);
      }
      // Null-terminate the string
      HEAP8[buffer] = 0;
    };
  var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      getEnvStrings().forEach((string, i) => {
        var ptr = environ_buf + bufSize;
        HEAPU32[(((__environ)+(i*4))>>2)] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    };
  _environ_get.sig = 'ipp';

  var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      strings.forEach((string) => bufSize += string.length + 1);
      HEAPU32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    };
  _environ_sizes_get.sig = 'ipp';


  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }
  _fd_close.sig = 'ii';

  function _fd_fdstat_get(fd, pbuf) {
  try {
  
      var rightsBase = 0;
      var rightsInheriting = 0;
      var flags = 0;
      {
        var stream = SYSCALLS.getStreamFromFD(fd);
        // All character devices are terminals (other things a Linux system would
        // assume is a character device, like the mouse, we have special APIs for).
        var type = stream.tty ? 2 :
                   FS.isDir(stream.mode) ? 3 :
                   FS.isLink(stream.mode) ? 7 :
                   4;
      }
      HEAP8[pbuf] = type;
      HEAP16[(((pbuf)+(2))>>1)] = flags;
      HEAP64[(((pbuf)+(8))>>3)] = BigInt(rightsBase);
      HEAP64[(((pbuf)+(16))>>3)] = BigInt(rightsInheriting);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }
  _fd_fdstat_get.sig = 'iip';

  /** @param {number=} offset */
  var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  
  function _fd_pread(fd, iov, iovcnt, offset, pnum) {
    offset = bigintToI53Checked(offset);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd)
      var num = doReadv(stream, iov, iovcnt, offset);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }
  _fd_pread.sig = 'iippjp';

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) {
          // No more space to write.
          break;
        }
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  
  function _fd_pwrite(fd, iov, iovcnt, offset, pnum) {
    offset = bigintToI53Checked(offset);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd)
      var num = doWritev(stream, iov, iovcnt, offset);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }
  _fd_pwrite.sig = 'iippjp';

  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }
  _fd_read.sig = 'iippp';

  
  function _fd_seek(fd, offset, whence, newOffset) {
    offset = bigintToI53Checked(offset);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      HEAP64[((newOffset)>>3)] = BigInt(stream.position);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }
  _fd_seek.sig = 'iijip';

  function _fd_sync(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      if (stream.stream_ops?.fsync) {
        return stream.stream_ops.fsync(stream);
      }
      return 0; // we can't do anything synchronously; the in-memory FS is already synced to
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }
  _fd_sync.sig = 'ii';

  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }
  _fd_write.sig = 'iippp';

  
  
  
  
  
  
  
  
  
  var _getaddrinfo = (node, service, hint, out) => {
      // Note getaddrinfo currently only returns a single addrinfo with ai_next defaulting to NULL. When NULL
      // hints are specified or ai_family set to AF_UNSPEC or ai_socktype or ai_protocol set to 0 then we
      // really should provide a linked list of suitable addrinfo values.
      var addrs = [];
      var canon = null;
      var addr = 0;
      var port = 0;
      var flags = 0;
      var family = 0;
      var type = 0;
      var proto = 0;
      var ai, last;
  
      function allocaddrinfo(family, type, proto, canon, addr, port) {
        var sa, salen, ai;
        var errno;
  
        salen = family === 10 ?
          28 :
          16;
        addr = family === 10 ?
          inetNtop6(addr) :
          inetNtop4(addr);
        sa = _malloc(salen);
        errno = writeSockaddr(sa, family, addr, port);
        assert(!errno);
  
        ai = _malloc(32);
        HEAP32[(((ai)+(4))>>2)] = family;
        HEAP32[(((ai)+(8))>>2)] = type;
        HEAP32[(((ai)+(12))>>2)] = proto;
        HEAPU32[(((ai)+(24))>>2)] = canon;
        HEAPU32[(((ai)+(20))>>2)] = sa;
        if (family === 10) {
          HEAP32[(((ai)+(16))>>2)] = 28;
        } else {
          HEAP32[(((ai)+(16))>>2)] = 16;
        }
        HEAP32[(((ai)+(28))>>2)] = 0;
  
        return ai;
      }
  
      if (hint) {
        flags = HEAP32[((hint)>>2)];
        family = HEAP32[(((hint)+(4))>>2)];
        type = HEAP32[(((hint)+(8))>>2)];
        proto = HEAP32[(((hint)+(12))>>2)];
      }
      if (type && !proto) {
        proto = type === 2 ? 17 : 6;
      }
      if (!type && proto) {
        type = proto === 17 ? 2 : 1;
      }
  
      // If type or proto are set to zero in hints we should really be returning multiple addrinfo values, but for
      // now default to a TCP STREAM socket so we can at least return a sensible addrinfo given NULL hints.
      if (proto === 0) {
        proto = 6;
      }
      if (type === 0) {
        type = 1;
      }
  
      if (!node && !service) {
        return -2;
      }
      if (flags & ~(1|2|4|
          1024|8|16|32)) {
        return -1;
      }
      if (hint !== 0 && (HEAP32[((hint)>>2)] & 2) && !node) {
        return -1;
      }
      if (flags & 32) {
        // TODO
        return -2;
      }
      if (type !== 0 && type !== 1 && type !== 2) {
        return -7;
      }
      if (family !== 0 && family !== 2 && family !== 10) {
        return -6;
      }
  
      if (service) {
        service = UTF8ToString(service);
        port = parseInt(service, 10);
  
        if (isNaN(port)) {
          if (flags & 1024) {
            return -2;
          }
          // TODO support resolving well-known service names from:
          // http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.txt
          return -8;
        }
      }
  
      if (!node) {
        if (family === 0) {
          family = 2;
        }
        if ((flags & 1) === 0) {
          if (family === 2) {
            addr = _htonl(2130706433);
          } else {
            addr = [0, 0, 0, 1];
          }
        }
        ai = allocaddrinfo(family, type, proto, null, addr, port);
        HEAPU32[((out)>>2)] = ai;
        return 0;
      }
  
      //
      // try as a numeric address
      //
      node = UTF8ToString(node);
      addr = inetPton4(node);
      if (addr !== null) {
        // incoming node is a valid ipv4 address
        if (family === 0 || family === 2) {
          family = 2;
        }
        else if (family === 10 && (flags & 8)) {
          addr = [0, 0, _htonl(0xffff), addr];
          family = 10;
        } else {
          return -2;
        }
      } else {
        addr = inetPton6(node);
        if (addr !== null) {
          // incoming node is a valid ipv6 address
          if (family === 0 || family === 10) {
            family = 10;
          } else {
            return -2;
          }
        }
      }
      if (addr != null) {
        ai = allocaddrinfo(family, type, proto, node, addr, port);
        HEAPU32[((out)>>2)] = ai;
        return 0;
      }
      if (flags & 4) {
        return -2;
      }
  
      //
      // try as a hostname
      //
      // resolve the hostname to a temporary fake address
      node = DNS.lookup_name(node);
      addr = inetPton4(node);
      if (family === 0) {
        family = 2;
      } else if (family === 10) {
        addr = [0, 0, _htonl(0xffff), addr];
      }
      ai = allocaddrinfo(family, type, proto, null, addr, port);
      HEAPU32[((out)>>2)] = ai;
      return 0;
    };
  _getaddrinfo.sig = 'ipppp';

  
  
  
  var _getnameinfo = (sa, salen, node, nodelen, serv, servlen, flags) => {
      var info = readSockaddr(sa, salen);
      if (info.errno) {
        return -6;
      }
      var port = info.port;
      var addr = info.addr;
  
      var overflowed = false;
  
      if (node && nodelen) {
        var lookup;
        if ((flags & 1) || !(lookup = DNS.lookup_addr(addr))) {
          if (flags & 8) {
            return -2;
          }
        } else {
          addr = lookup;
        }
        var numBytesWrittenExclNull = stringToUTF8(addr, node, nodelen);
  
        if (numBytesWrittenExclNull+1 >= nodelen) {
          overflowed = true;
        }
      }
  
      if (serv && servlen) {
        port = '' + port;
        var numBytesWrittenExclNull = stringToUTF8(port, serv, servlen);
  
        if (numBytesWrittenExclNull+1 >= servlen) {
          overflowed = true;
        }
      }
  
      if (overflowed) {
        // Note: even when we overflow, getnameinfo() is specced to write out the truncated results.
        return -12;
      }
  
      return 0;
    };
  _getnameinfo.sig = 'ipipipii';











  
  
  var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };


  var getCFunc = (ident) => {
      var func = Module['_' + ident]; // closure exported function
      return func;
    };
  
  var writeArrayToMemory = (array, buffer) => {
      HEAP8.set(array, buffer);
    };
  
  
  
  
  
  
    /**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Arguments|Array=} args
     * @param {Object=} opts
     */
  var ccall = (ident, returnType, argTypes, args, opts) => {
      // For fast lookup of conversion functions
      var toC = {
        'string': (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) { // null string
            // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
            ret = stringToUTF8OnStack(str);
          }
          return ret;
        },
        'array': (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        }
      };
  
      function convertReturnValue(ret) {
        if (returnType === 'string') {
          
          return UTF8ToString(ret);
        }
        if (returnType === 'boolean') return Boolean(ret);
        return ret;
      }
  
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func(...cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
  
      ret = onDone(ret);
      return ret;
    };

  
  
    /**
     * @param {string=} returnType
     * @param {Array=} argTypes
     * @param {Object=} opts
     */
  var cwrap = (ident, returnType, argTypes, opts) => {
      // When the function takes numbers and returns a number, we can just return
      // the original function
      var numericArgs = !argTypes || argTypes.every((type) => type === 'number' || type === 'boolean');
      var numericRet = returnType !== 'string';
      if (numericRet && numericArgs && !opts) {
        return getCFunc(ident);
      }
      return (...args) => ccall(ident, returnType, argTypes, args, opts);
    };

  var FS_createPath = FS.createPath;



  var FS_unlink = (path) => FS.unlink(path);

  var FS_createLazyFile = FS.createLazyFile;

  var FS_createDevice = FS.createDevice;

  /** @suppress {duplicate } */
  var setTempRet0 = (val) => __emscripten_tempret_set(val);
  var _setTempRet0 = setTempRet0;
  Module['_setTempRet0'] = _setTempRet0;

  /** @suppress {duplicate } */
  var getTempRet0 = (val) => __emscripten_tempret_get();
  var _getTempRet0 = getTempRet0;
  Module['_getTempRet0'] = _getTempRet0;

  var _sched_yield = () => 0;
  Module['_sched_yield'] = _sched_yield;
  _sched_yield.sig = 'i';


  var uncaughtExceptionCount = 0;
  var ___cxa_uncaught_exceptions = () => uncaughtExceptionCount;
  Module['___cxa_uncaught_exceptions'] = ___cxa_uncaught_exceptions;
  ___cxa_uncaught_exceptions.sig = 'i';

  var exceptionCaught =  [];
  
  var ___cxa_current_primary_exception = () => {
      if (!exceptionCaught.length) {
        return 0;
      }
      var info = exceptionCaught[exceptionCaught.length - 1];
      ___cxa_increment_exception_refcount(info.excPtr);
      return info.excPtr;
    };
  Module['___cxa_current_primary_exception'] = ___cxa_current_primary_exception;
  ___cxa_current_primary_exception.sig = 'p';

  class ExceptionInfo {
      // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
  
      set_type(type) {
        HEAPU32[(((this.ptr)+(4))>>2)] = type;
      }
  
      get_type() {
        return HEAPU32[(((this.ptr)+(4))>>2)];
      }
  
      set_destructor(destructor) {
        HEAPU32[(((this.ptr)+(8))>>2)] = destructor;
      }
  
      get_destructor() {
        return HEAPU32[(((this.ptr)+(8))>>2)];
      }
  
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[(this.ptr)+(12)] = caught;
      }
  
      get_caught() {
        return HEAP8[(this.ptr)+(12)] != 0;
      }
  
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(this.ptr)+(13)] = rethrown;
      }
  
      get_rethrown() {
        return HEAP8[(this.ptr)+(13)] != 0;
      }
  
      // Initialize native structure fields. Should be called once after allocated.
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
  
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[(((this.ptr)+(16))>>2)] = adjustedPtr;
      }
  
      get_adjusted_ptr() {
        return HEAPU32[(((this.ptr)+(16))>>2)];
      }
  
      // Get pointer which is expected to be received by catch clause in C++ code. It may be adjusted
      // when the pointer is casted to some of the exception object base classes (e.g. when virtual
      // inheritance is used). When a pointer is thrown this method should return the thrown pointer
      // itself.
      get_exception_ptr() {
        // Work around a fastcomp bug, this code is still included for some reason in a build without
        // exceptions support.
        var isPointer = ___cxa_is_pointer_type(this.get_type());
        if (isPointer) {
          return HEAPU32[((this.excPtr)>>2)];
        }
        var adjusted = this.get_adjusted_ptr();
        if (adjusted !== 0) return adjusted;
        return this.excPtr;
      }
    }
  
  
  
  var exceptionLast = 0;
  
  var ___cxa_rethrow = () => {
      var info = exceptionCaught.pop();
      if (!info) {
        abort('no exception to throw');
      }
      var ptr = info.excPtr;
      if (!info.get_rethrown()) {
        // Only pop if the corresponding push was through rethrow_primary_exception
        exceptionCaught.push(info);
        info.set_rethrown(true);
        info.set_caught(false);
        uncaughtExceptionCount++;
      }
      exceptionLast = ptr;
      throw exceptionLast;
    };
  ___cxa_rethrow.sig = 'v';
  var ___cxa_rethrow_primary_exception = (ptr) => {
      if (!ptr) return;
      var info = new ExceptionInfo(ptr);
      exceptionCaught.push(info);
      info.set_rethrown(true);
      ___cxa_rethrow();
    };
  Module['___cxa_rethrow_primary_exception'] = ___cxa_rethrow_primary_exception;
  ___cxa_rethrow_primary_exception.sig = 'vp';

      registerWasmPlugin();
      ;

  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();
  // Set module methods based on EXPORTED_RUNTIME_METHODS
  Module["FS_createPath"] = FS.createPath;
  Module["FS_createDataFile"] = FS.createDataFile;
  Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
  Module["FS_unlink"] = FS.unlink;
  Module["FS_createLazyFile"] = FS.createLazyFile;
  Module["FS_createDevice"] = FS.createDevice;
  ;
if (ENVIRONMENT_IS_NODE) { NODEFS.staticInit(); };

      // exports
      Module["requestFullscreen"] = Browser.requestFullscreen;
      Module["requestAnimationFrame"] = Browser.requestAnimationFrame;
      Module["setCanvasSize"] = Browser.setCanvasSize;
      Module["pauseMainLoop"] = Browser.mainLoop.pause;
      Module["resumeMainLoop"] = Browser.mainLoop.resume;
      Module["getUserMedia"] = Browser.getUserMedia;
      Module["createContext"] = Browser.createContext;
      var preloadedImages = {};
      var preloadedAudios = {};;
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  __call_sighandler: ___call_sighandler,
  /** @export */
  __cxa_current_primary_exception: ___cxa_current_primary_exception,
  /** @export */
  __cxa_rethrow_primary_exception: ___cxa_rethrow_primary_exception,
  /** @export */
  __cxa_uncaught_exceptions: ___cxa_uncaught_exceptions,
  /** @export */
  __heap_base: ___heap_base,
  /** @export */
  __indirect_function_table: wasmTable,
  /** @export */
  __memory_base: ___memory_base,
  /** @export */
  __stack_pointer: ___stack_pointer,
  /** @export */
  __syscall__newselect: ___syscall__newselect,
  /** @export */
  __syscall_bind: ___syscall_bind,
  /** @export */
  __syscall_chdir: ___syscall_chdir,
  /** @export */
  __syscall_chmod: ___syscall_chmod,
  /** @export */
  __syscall_connect: ___syscall_connect,
  /** @export */
  __syscall_dup: ___syscall_dup,
  /** @export */
  __syscall_dup3: ___syscall_dup3,
  /** @export */
  __syscall_faccessat: ___syscall_faccessat,
  /** @export */
  __syscall_fadvise64: ___syscall_fadvise64,
  /** @export */
  __syscall_fallocate: ___syscall_fallocate,
  /** @export */
  __syscall_fchmod: ___syscall_fchmod,
  /** @export */
  __syscall_fchmodat2: ___syscall_fchmodat2,
  /** @export */
  __syscall_fchown32: ___syscall_fchown32,
  /** @export */
  __syscall_fcntl64: ___syscall_fcntl64,
  /** @export */
  __syscall_fdatasync: ___syscall_fdatasync,
  /** @export */
  __syscall_fstat64: ___syscall_fstat64,
  /** @export */
  __syscall_ftruncate64: ___syscall_ftruncate64,
  /** @export */
  __syscall_getcwd: ___syscall_getcwd,
  /** @export */
  __syscall_getdents64: ___syscall_getdents64,
  /** @export */
  __syscall_getsockname: ___syscall_getsockname,
  /** @export */
  __syscall_getsockopt: ___syscall_getsockopt,
  /** @export */
  __syscall_ioctl: ___syscall_ioctl,
  /** @export */
  __syscall_lstat64: ___syscall_lstat64,
  /** @export */
  __syscall_mkdirat: ___syscall_mkdirat,
  /** @export */
  __syscall_newfstatat: ___syscall_newfstatat,
  /** @export */
  __syscall_openat: ___syscall_openat,
  /** @export */
  __syscall_pipe: ___syscall_pipe,
  /** @export */
  __syscall_poll: ___syscall_poll,
  /** @export */
  __syscall_readlinkat: ___syscall_readlinkat,
  /** @export */
  __syscall_recvfrom: ___syscall_recvfrom,
  /** @export */
  __syscall_renameat: ___syscall_renameat,
  /** @export */
  __syscall_rmdir: ___syscall_rmdir,
  /** @export */
  __syscall_sendto: ___syscall_sendto,
  /** @export */
  __syscall_socket: ___syscall_socket,
  /** @export */
  __syscall_stat64: ___syscall_stat64,
  /** @export */
  __syscall_statfs64: ___syscall_statfs64,
  /** @export */
  __syscall_symlink: ___syscall_symlink,
  /** @export */
  __syscall_truncate64: ___syscall_truncate64,
  /** @export */
  __syscall_unlinkat: ___syscall_unlinkat,
  /** @export */
  __syscall_utimensat: ___syscall_utimensat,
  /** @export */
  __table_base: ___table_base,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _dlopen_js: __dlopen_js,
  /** @export */
  _dlsym_js: __dlsym_js,
  /** @export */
  _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
  /** @export */
  _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
  /** @export */
  _emscripten_system: __emscripten_system,
  /** @export */
  _emscripten_throw_longjmp: __emscripten_throw_longjmp,
  /** @export */
  _gmtime_js: __gmtime_js,
  /** @export */
  _localtime_js: __localtime_js,
  /** @export */
  _mktime_js: __mktime_js,
  /** @export */
  _mmap_js: __mmap_js,
  /** @export */
  _munmap_js: __munmap_js,
  /** @export */
  _setitimer_js: __setitimer_js,
  /** @export */
  _tzset_js: __tzset_js,
  /** @export */
  emscripten_asm_const_int: _emscripten_asm_const_int,
  /** @export */
  emscripten_date_now: _emscripten_date_now,
  /** @export */
  emscripten_force_exit: _emscripten_force_exit,
  /** @export */
  emscripten_get_heap_max: _emscripten_get_heap_max,
  /** @export */
  emscripten_get_now: _emscripten_get_now,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  emscripten_set_main_loop: _emscripten_set_main_loop,
  /** @export */
  environ_get: _environ_get,
  /** @export */
  environ_sizes_get: _environ_sizes_get,
  /** @export */
  exit: _exit,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_fdstat_get: _fd_fdstat_get,
  /** @export */
  fd_pread: _fd_pread,
  /** @export */
  fd_pwrite: _fd_pwrite,
  /** @export */
  fd_read: _fd_read,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_sync: _fd_sync,
  /** @export */
  fd_write: _fd_write,
  /** @export */
  getTempRet0: _getTempRet0,
  /** @export */
  getaddrinfo: _getaddrinfo,
  /** @export */
  getnameinfo: _getnameinfo,
  /** @export */
  invoke_di,
  /** @export */
  invoke_i,
  /** @export */
  invoke_id,
  /** @export */
  invoke_ii,
  /** @export */
  invoke_iii,
  /** @export */
  invoke_iiii,
  /** @export */
  invoke_iiiii,
  /** @export */
  invoke_iiiiii,
  /** @export */
  invoke_iiiiiii,
  /** @export */
  invoke_iiiiiiii,
  /** @export */
  invoke_iiiiiiiii,
  /** @export */
  invoke_iiiiiiiiii,
  /** @export */
  invoke_iiiiiiiiiiiiiiiii,
  /** @export */
  invoke_iiiiiji,
  /** @export */
  invoke_iiiij,
  /** @export */
  invoke_iiiijii,
  /** @export */
  invoke_iiij,
  /** @export */
  invoke_iiji,
  /** @export */
  invoke_ij,
  /** @export */
  invoke_ijiiiii,
  /** @export */
  invoke_ijiiiiii,
  /** @export */
  invoke_j,
  /** @export */
  invoke_ji,
  /** @export */
  invoke_jii,
  /** @export */
  invoke_jiiii,
  /** @export */
  invoke_jiiiii,
  /** @export */
  invoke_jiiiiiiii,
  /** @export */
  invoke_v,
  /** @export */
  invoke_vi,
  /** @export */
  invoke_vid,
  /** @export */
  invoke_vii,
  /** @export */
  invoke_viii,
  /** @export */
  invoke_viiii,
  /** @export */
  invoke_viiiii,
  /** @export */
  invoke_viiiiii,
  /** @export */
  invoke_viiiiiii,
  /** @export */
  invoke_viiiiiiii,
  /** @export */
  invoke_viiiiiiiii,
  /** @export */
  invoke_viiiiiiiiiiii,
  /** @export */
  invoke_viiij,
  /** @export */
  invoke_viij,
  /** @export */
  invoke_viiji,
  /** @export */
  invoke_viijii,
  /** @export */
  invoke_viijiiii,
  /** @export */
  invoke_vij,
  /** @export */
  invoke_viji,
  /** @export */
  invoke_vijiji,
  /** @export */
  invoke_vj,
  /** @export */
  invoke_vji,
  /** @export */
  is_web_env,
  /** @export */
  memory: wasmMemory,
  /** @export */
  proc_exit: _proc_exit,
  /** @export */
  sched_yield: _sched_yield,
  /** @export */
  setTempRet0: _setTempRet0
};
var wasmExports = createWasm();
var ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports['__wasm_call_ctors'])();
var ___wasm_apply_data_relocs = () => (___wasm_apply_data_relocs = wasmExports['__wasm_apply_data_relocs'])();
var _ScanKeywordLookup = Module['_ScanKeywordLookup'] = (a0, a1) => (_ScanKeywordLookup = Module['_ScanKeywordLookup'] = wasmExports['ScanKeywordLookup'])(a0, a1);
var _pg_snprintf = Module['_pg_snprintf'] = (a0, a1, a2, a3) => (_pg_snprintf = Module['_pg_snprintf'] = wasmExports['pg_snprintf'])(a0, a1, a2, a3);
var _strlen = Module['_strlen'] = (a0) => (_strlen = Module['_strlen'] = wasmExports['strlen'])(a0);
var _memset = Module['_memset'] = (a0, a1, a2) => (_memset = Module['_memset'] = wasmExports['memset'])(a0, a1, a2);
var _strchr = Module['_strchr'] = (a0, a1) => (_strchr = Module['_strchr'] = wasmExports['strchr'])(a0, a1);
var _PQserverVersion = Module['_PQserverVersion'] = (a0) => (_PQserverVersion = Module['_PQserverVersion'] = wasmExports['PQserverVersion'])(a0);
var _strstr = Module['_strstr'] = (a0, a1) => (_strstr = Module['_strstr'] = wasmExports['strstr'])(a0, a1);
var _pg_fprintf = Module['_pg_fprintf'] = (a0, a1, a2) => (_pg_fprintf = Module['_pg_fprintf'] = wasmExports['pg_fprintf'])(a0, a1, a2);
var _strspn = Module['_strspn'] = (a0, a1) => (_strspn = Module['_strspn'] = wasmExports['strspn'])(a0, a1);
var _malloc = Module['_malloc'] = (a0) => (_malloc = Module['_malloc'] = wasmExports['malloc'])(a0);
var _pg_strcasecmp = Module['_pg_strcasecmp'] = (a0, a1) => (_pg_strcasecmp = Module['_pg_strcasecmp'] = wasmExports['pg_strcasecmp'])(a0, a1);
var _strcmp = Module['_strcmp'] = (a0, a1) => (_strcmp = Module['_strcmp'] = wasmExports['strcmp'])(a0, a1);
var _free = Module['_free'] = (a0) => (_free = Module['_free'] = wasmExports['free'])(a0);
var _pg_tolower = Module['_pg_tolower'] = (a0) => (_pg_tolower = Module['_pg_tolower'] = wasmExports['pg_tolower'])(a0);
var _memchr = Module['_memchr'] = (a0, a1, a2) => (_memchr = Module['_memchr'] = wasmExports['memchr'])(a0, a1, a2);
var _getenv = Module['_getenv'] = (a0) => (_getenv = Module['_getenv'] = wasmExports['getenv'])(a0);
var _fileno = Module['_fileno'] = (a0) => (_fileno = Module['_fileno'] = wasmExports['fileno'])(a0);
var _isatty = Module['_isatty'] = (a0) => (_isatty = Module['_isatty'] = wasmExports['isatty'])(a0);
var _strdup = Module['_strdup'] = (a0) => (_strdup = Module['_strdup'] = wasmExports['strdup'])(a0);
var _strtok = Module['_strtok'] = (a0, a1) => (_strtok = Module['_strtok'] = wasmExports['strtok'])(a0, a1);
var ___errno_location = Module['___errno_location'] = () => (___errno_location = Module['___errno_location'] = wasmExports['__errno_location'])();
var _fflush = Module['_fflush'] = (a0) => (_fflush = Module['_fflush'] = wasmExports['fflush'])(a0);
var _pg_vsnprintf = Module['_pg_vsnprintf'] = (a0, a1, a2, a3) => (_pg_vsnprintf = Module['_pg_vsnprintf'] = wasmExports['pg_vsnprintf'])(a0, a1, a2, a3);
var _pg_malloc_extended = Module['_pg_malloc_extended'] = (a0, a1) => (_pg_malloc_extended = Module['_pg_malloc_extended'] = wasmExports['pg_malloc_extended'])(a0, a1);
var _palloc_extended = Module['_palloc_extended'] = (a0, a1) => (_palloc_extended = Module['_palloc_extended'] = wasmExports['palloc_extended'])(a0, a1);
var _memcpy = Module['_memcpy'] = (a0, a1, a2) => (_memcpy = Module['_memcpy'] = wasmExports['memcpy'])(a0, a1, a2);
var _pfree = Module['_pfree'] = (a0) => (_pfree = Module['_pfree'] = wasmExports['pfree'])(a0);
var _ProcessInterrupts = Module['_ProcessInterrupts'] = () => (_ProcessInterrupts = Module['_ProcessInterrupts'] = wasmExports['ProcessInterrupts'])();
var _memcmp = Module['_memcmp'] = (a0, a1, a2) => (_memcmp = Module['_memcmp'] = wasmExports['memcmp'])(a0, a1, a2);
var _pg_regcomp = Module['_pg_regcomp'] = (a0, a1, a2, a3, a4) => (_pg_regcomp = Module['_pg_regcomp'] = wasmExports['pg_regcomp'])(a0, a1, a2, a3, a4);
var _errstart_cold = Module['_errstart_cold'] = (a0, a1) => (_errstart_cold = Module['_errstart_cold'] = wasmExports['errstart_cold'])(a0, a1);
var _errcode = Module['_errcode'] = (a0) => (_errcode = Module['_errcode'] = wasmExports['errcode'])(a0);
var _errmsg = Module['_errmsg'] = (a0, a1) => (_errmsg = Module['_errmsg'] = wasmExports['errmsg'])(a0, a1);
var _errhint = Module['_errhint'] = (a0, a1) => (_errhint = Module['_errhint'] = wasmExports['errhint'])(a0, a1);
var _errfinish = Module['_errfinish'] = (a0, a1, a2) => (_errfinish = Module['_errfinish'] = wasmExports['errfinish'])(a0, a1, a2);
var _puts = Module['_puts'] = (a0) => (_puts = Module['_puts'] = wasmExports['puts'])(a0);
var _GetDatabaseEncoding = Module['_GetDatabaseEncoding'] = () => (_GetDatabaseEncoding = Module['_GetDatabaseEncoding'] = wasmExports['GetDatabaseEncoding'])();
var _pg_qsort = Module['_pg_qsort'] = (a0, a1, a2, a3) => (_pg_qsort = Module['_pg_qsort'] = wasmExports['pg_qsort'])(a0, a1, a2, a3);
var _iswprint_l = Module['_iswprint_l'] = (a0, a1) => (_iswprint_l = Module['_iswprint_l'] = wasmExports['iswprint_l'])(a0, a1);
var _iswdigit_l = Module['_iswdigit_l'] = (a0, a1) => (_iswdigit_l = Module['_iswdigit_l'] = wasmExports['iswdigit_l'])(a0, a1);
var _isdigit_l = Module['_isdigit_l'] = (a0, a1) => (_isdigit_l = Module['_isdigit_l'] = wasmExports['isdigit_l'])(a0, a1);
var _iswlower_l = Module['_iswlower_l'] = (a0, a1) => (_iswlower_l = Module['_iswlower_l'] = wasmExports['iswlower_l'])(a0, a1);
var _iswupper_l = Module['_iswupper_l'] = (a0, a1) => (_iswupper_l = Module['_iswupper_l'] = wasmExports['iswupper_l'])(a0, a1);
var _realloc = Module['_realloc'] = (a0, a1) => (_realloc = Module['_realloc'] = wasmExports['realloc'])(a0, a1);
var _isalnum = Module['_isalnum'] = (a0) => (_isalnum = Module['_isalnum'] = wasmExports['isalnum'])(a0);
var _iswalpha_l = Module['_iswalpha_l'] = (a0, a1) => (_iswalpha_l = Module['_iswalpha_l'] = wasmExports['iswalpha_l'])(a0, a1);
var _iswpunct_l = Module['_iswpunct_l'] = (a0, a1) => (_iswpunct_l = Module['_iswpunct_l'] = wasmExports['iswpunct_l'])(a0, a1);
var _iswspace_l = Module['_iswspace_l'] = (a0, a1) => (_iswspace_l = Module['_iswspace_l'] = wasmExports['iswspace_l'])(a0, a1);
var _tolower = Module['_tolower'] = (a0) => (_tolower = Module['_tolower'] = wasmExports['tolower'])(a0);
var _towlower_l = Module['_towlower_l'] = (a0, a1) => (_towlower_l = Module['_towlower_l'] = wasmExports['towlower_l'])(a0, a1);
var _tolower_l = Module['_tolower_l'] = (a0, a1) => (_tolower_l = Module['_tolower_l'] = wasmExports['tolower_l'])(a0, a1);
var _toupper = Module['_toupper'] = (a0) => (_toupper = Module['_toupper'] = wasmExports['toupper'])(a0);
var _towupper_l = Module['_towupper_l'] = (a0, a1) => (_towupper_l = Module['_towupper_l'] = wasmExports['towupper_l'])(a0, a1);
var _toupper_l = Module['_toupper_l'] = (a0, a1) => (_toupper_l = Module['_toupper_l'] = wasmExports['toupper_l'])(a0, a1);
var _pg_reg_getinitialstate = Module['_pg_reg_getinitialstate'] = (a0) => (_pg_reg_getinitialstate = Module['_pg_reg_getinitialstate'] = wasmExports['pg_reg_getinitialstate'])(a0);
var _pg_reg_getfinalstate = Module['_pg_reg_getfinalstate'] = (a0) => (_pg_reg_getfinalstate = Module['_pg_reg_getfinalstate'] = wasmExports['pg_reg_getfinalstate'])(a0);
var _pg_reg_getnumoutarcs = Module['_pg_reg_getnumoutarcs'] = (a0, a1) => (_pg_reg_getnumoutarcs = Module['_pg_reg_getnumoutarcs'] = wasmExports['pg_reg_getnumoutarcs'])(a0, a1);
var _check_stack_depth = Module['_check_stack_depth'] = () => (_check_stack_depth = Module['_check_stack_depth'] = wasmExports['check_stack_depth'])();
var _pg_reg_getoutarcs = Module['_pg_reg_getoutarcs'] = (a0, a1, a2, a3) => (_pg_reg_getoutarcs = Module['_pg_reg_getoutarcs'] = wasmExports['pg_reg_getoutarcs'])(a0, a1, a2, a3);
var _pg_reg_getnumcolors = Module['_pg_reg_getnumcolors'] = (a0) => (_pg_reg_getnumcolors = Module['_pg_reg_getnumcolors'] = wasmExports['pg_reg_getnumcolors'])(a0);
var _pg_reg_colorisbegin = Module['_pg_reg_colorisbegin'] = (a0, a1) => (_pg_reg_colorisbegin = Module['_pg_reg_colorisbegin'] = wasmExports['pg_reg_colorisbegin'])(a0, a1);
var _pg_reg_colorisend = Module['_pg_reg_colorisend'] = (a0, a1) => (_pg_reg_colorisend = Module['_pg_reg_colorisend'] = wasmExports['pg_reg_colorisend'])(a0, a1);
var _pg_reg_getnumcharacters = Module['_pg_reg_getnumcharacters'] = (a0, a1) => (_pg_reg_getnumcharacters = Module['_pg_reg_getnumcharacters'] = wasmExports['pg_reg_getnumcharacters'])(a0, a1);
var _pg_reg_getcharacters = Module['_pg_reg_getcharacters'] = (a0, a1, a2, a3) => (_pg_reg_getcharacters = Module['_pg_reg_getcharacters'] = wasmExports['pg_reg_getcharacters'])(a0, a1, a2, a3);
var _pg_regerror = Module['_pg_regerror'] = (a0, a1, a2, a3) => (_pg_regerror = Module['_pg_regerror'] = wasmExports['pg_regerror'])(a0, a1, a2, a3);
var _pg_sprintf = Module['_pg_sprintf'] = (a0, a1, a2) => (_pg_sprintf = Module['_pg_sprintf'] = wasmExports['pg_sprintf'])(a0, a1, a2);
var _atoi = Module['_atoi'] = (a0) => (_atoi = Module['_atoi'] = wasmExports['atoi'])(a0);
var _strcpy = Module['_strcpy'] = (a0, a1) => (_strcpy = Module['_strcpy'] = wasmExports['strcpy'])(a0, a1);
var _palloc = Module['_palloc'] = (a0) => (_palloc = Module['_palloc'] = wasmExports['palloc'])(a0);
var _palloc0 = Module['_palloc0'] = (a0) => (_palloc0 = Module['_palloc0'] = wasmExports['palloc0'])(a0);
var _lookup_type_cache = Module['_lookup_type_cache'] = (a0, a1) => (_lookup_type_cache = Module['_lookup_type_cache'] = wasmExports['lookup_type_cache'])(a0, a1);
var _errmsg_internal = Module['_errmsg_internal'] = (a0, a1) => (_errmsg_internal = Module['_errmsg_internal'] = wasmExports['errmsg_internal'])(a0, a1);
var _SearchSysCache2 = Module['_SearchSysCache2'] = (a0, a1, a2) => (_SearchSysCache2 = Module['_SearchSysCache2'] = wasmExports['SearchSysCache2'])(a0, a1, a2);
var _SysCacheGetAttr = Module['_SysCacheGetAttr'] = (a0, a1, a2, a3) => (_SysCacheGetAttr = Module['_SysCacheGetAttr'] = wasmExports['SysCacheGetAttr'])(a0, a1, a2, a3);
var _pg_detoast_datum_packed = Module['_pg_detoast_datum_packed'] = (a0) => (_pg_detoast_datum_packed = Module['_pg_detoast_datum_packed'] = wasmExports['pg_detoast_datum_packed'])(a0);
var _ReleaseSysCache = Module['_ReleaseSysCache'] = (a0) => (_ReleaseSysCache = Module['_ReleaseSysCache'] = wasmExports['ReleaseSysCache'])(a0);
var _initStringInfo = Module['_initStringInfo'] = (a0) => (_initStringInfo = Module['_initStringInfo'] = wasmExports['initStringInfo'])(a0);
var _appendStringInfoChar = Module['_appendStringInfoChar'] = (a0, a1) => (_appendStringInfoChar = Module['_appendStringInfoChar'] = wasmExports['appendStringInfoChar'])(a0, a1);
var _appendStringInfoString = Module['_appendStringInfoString'] = (a0, a1) => (_appendStringInfoString = Module['_appendStringInfoString'] = wasmExports['appendStringInfoString'])(a0, a1);
var _appendStringInfo = Module['_appendStringInfo'] = (a0, a1, a2) => (_appendStringInfo = Module['_appendStringInfo'] = wasmExports['appendStringInfo'])(a0, a1, a2);
var _pg_detoast_datum = Module['_pg_detoast_datum'] = (a0) => (_pg_detoast_datum = Module['_pg_detoast_datum'] = wasmExports['pg_detoast_datum'])(a0);
var _repalloc = Module['_repalloc'] = (a0, a1) => (_repalloc = Module['_repalloc'] = wasmExports['repalloc'])(a0, a1);
var _init_MultiFuncCall = Module['_init_MultiFuncCall'] = (a0) => (_init_MultiFuncCall = Module['_init_MultiFuncCall'] = wasmExports['init_MultiFuncCall'])(a0);
var _get_call_result_type = Module['_get_call_result_type'] = (a0, a1, a2) => (_get_call_result_type = Module['_get_call_result_type'] = wasmExports['get_call_result_type'])(a0, a1, a2);
var _BlessTupleDesc = Module['_BlessTupleDesc'] = (a0) => (_BlessTupleDesc = Module['_BlessTupleDesc'] = wasmExports['BlessTupleDesc'])(a0);
var _TupleDescGetAttInMetadata = Module['_TupleDescGetAttInMetadata'] = (a0) => (_TupleDescGetAttInMetadata = Module['_TupleDescGetAttInMetadata'] = wasmExports['TupleDescGetAttInMetadata'])(a0);
var _per_MultiFuncCall = Module['_per_MultiFuncCall'] = (a0) => (_per_MultiFuncCall = Module['_per_MultiFuncCall'] = wasmExports['per_MultiFuncCall'])(a0);
var _accumArrayResult = Module['_accumArrayResult'] = (a0, a1, a2, a3, a4) => (_accumArrayResult = Module['_accumArrayResult'] = wasmExports['accumArrayResult'])(a0, a1, a2, a3, a4);
var _getTypeOutputInfo = Module['_getTypeOutputInfo'] = (a0, a1, a2) => (_getTypeOutputInfo = Module['_getTypeOutputInfo'] = wasmExports['getTypeOutputInfo'])(a0, a1, a2);
var _fmgr_info = Module['_fmgr_info'] = (a0, a1) => (_fmgr_info = Module['_fmgr_info'] = wasmExports['fmgr_info'])(a0, a1);
var _FunctionCall1Coll = Module['_FunctionCall1Coll'] = (a0, a1, a2) => (_FunctionCall1Coll = Module['_FunctionCall1Coll'] = wasmExports['FunctionCall1Coll'])(a0, a1, a2);
var _cstring_to_text = Module['_cstring_to_text'] = (a0) => (_cstring_to_text = Module['_cstring_to_text'] = wasmExports['cstring_to_text'])(a0);
var _makeArrayResult = Module['_makeArrayResult'] = (a0, a1) => (_makeArrayResult = Module['_makeArrayResult'] = wasmExports['makeArrayResult'])(a0, a1);
var _Float8GetDatum = Module['_Float8GetDatum'] = (a0) => (_Float8GetDatum = Module['_Float8GetDatum'] = wasmExports['Float8GetDatum'])(a0);
var _heap_form_tuple = Module['_heap_form_tuple'] = (a0, a1, a2) => (_heap_form_tuple = Module['_heap_form_tuple'] = wasmExports['heap_form_tuple'])(a0, a1, a2);
var _HeapTupleHeaderGetDatum = Module['_HeapTupleHeaderGetDatum'] = (a0) => (_HeapTupleHeaderGetDatum = Module['_HeapTupleHeaderGetDatum'] = wasmExports['HeapTupleHeaderGetDatum'])(a0);
var _end_MultiFuncCall = Module['_end_MultiFuncCall'] = (a0, a1) => (_end_MultiFuncCall = Module['_end_MultiFuncCall'] = wasmExports['end_MultiFuncCall'])(a0, a1);
var _FunctionCall2Coll = Module['_FunctionCall2Coll'] = (a0, a1, a2, a3) => (_FunctionCall2Coll = Module['_FunctionCall2Coll'] = wasmExports['FunctionCall2Coll'])(a0, a1, a2, a3);
var _get_typlenbyvalalign = Module['_get_typlenbyvalalign'] = (a0, a1, a2, a3) => (_get_typlenbyvalalign = Module['_get_typlenbyvalalign'] = wasmExports['get_typlenbyvalalign'])(a0, a1, a2, a3);
var _deconstruct_array = Module['_deconstruct_array'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_deconstruct_array = Module['_deconstruct_array'] = wasmExports['deconstruct_array'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _list_make1_impl = Module['_list_make1_impl'] = (a0, a1) => (_list_make1_impl = Module['_list_make1_impl'] = wasmExports['list_make1_impl'])(a0, a1);
var _bms_num_members = Module['_bms_num_members'] = (a0) => (_bms_num_members = Module['_bms_num_members'] = wasmExports['bms_num_members'])(a0);
var _equal = Module['_equal'] = (a0, a1) => (_equal = Module['_equal'] = wasmExports['equal'])(a0, a1);
var _AllocSetContextCreateInternal = Module['_AllocSetContextCreateInternal'] = (a0, a1, a2, a3, a4) => (_AllocSetContextCreateInternal = Module['_AllocSetContextCreateInternal'] = wasmExports['AllocSetContextCreateInternal'])(a0, a1, a2, a3, a4);
var _MemoryContextReset = Module['_MemoryContextReset'] = (a0) => (_MemoryContextReset = Module['_MemoryContextReset'] = wasmExports['MemoryContextReset'])(a0);
var _MemoryContextDelete = Module['_MemoryContextDelete'] = (a0) => (_MemoryContextDelete = Module['_MemoryContextDelete'] = wasmExports['MemoryContextDelete'])(a0);
var _bms_is_member = Module['_bms_is_member'] = (a0, a1) => (_bms_is_member = Module['_bms_is_member'] = wasmExports['bms_is_member'])(a0, a1);
var _bms_add_member = Module['_bms_add_member'] = (a0, a1) => (_bms_add_member = Module['_bms_add_member'] = wasmExports['bms_add_member'])(a0, a1);
var _bms_membership = Module['_bms_membership'] = (a0) => (_bms_membership = Module['_bms_membership'] = wasmExports['bms_membership'])(a0);
var _bms_free = Module['_bms_free'] = (a0) => (_bms_free = Module['_bms_free'] = wasmExports['bms_free'])(a0);
var _bms_next_member = Module['_bms_next_member'] = (a0, a1) => (_bms_next_member = Module['_bms_next_member'] = wasmExports['bms_next_member'])(a0, a1);
var _bms_del_member = Module['_bms_del_member'] = (a0, a1) => (_bms_del_member = Module['_bms_del_member'] = wasmExports['bms_del_member'])(a0, a1);
var _lappend = Module['_lappend'] = (a0, a1) => (_lappend = Module['_lappend'] = wasmExports['lappend'])(a0, a1);
var _table_open = Module['_table_open'] = (a0, a1) => (_table_open = Module['_table_open'] = wasmExports['table_open'])(a0, a1);
var _errstart = Module['_errstart'] = (a0, a1) => (_errstart = Module['_errstart'] = wasmExports['errstart'])(a0, a1);
var _get_namespace_name = Module['_get_namespace_name'] = (a0) => (_get_namespace_name = Module['_get_namespace_name'] = wasmExports['get_namespace_name'])(a0);
var _getmissingattr = Module['_getmissingattr'] = (a0, a1, a2) => (_getmissingattr = Module['_getmissingattr'] = wasmExports['getmissingattr'])(a0, a1, a2);
var _nocachegetattr = Module['_nocachegetattr'] = (a0, a1, a2) => (_nocachegetattr = Module['_nocachegetattr'] = wasmExports['nocachegetattr'])(a0, a1, a2);
var _heap_getsysattr = Module['_heap_getsysattr'] = (a0, a1, a2, a3) => (_heap_getsysattr = Module['_heap_getsysattr'] = wasmExports['heap_getsysattr'])(a0, a1, a2, a3);
var _CreateExecutorState = Module['_CreateExecutorState'] = () => (_CreateExecutorState = Module['_CreateExecutorState'] = wasmExports['CreateExecutorState'])();
var _MakePerTupleExprContext = Module['_MakePerTupleExprContext'] = (a0) => (_MakePerTupleExprContext = Module['_MakePerTupleExprContext'] = wasmExports['MakePerTupleExprContext'])(a0);
var _MakeSingleTupleTableSlot = Module['_MakeSingleTupleTableSlot'] = (a0, a1) => (_MakeSingleTupleTableSlot = Module['_MakeSingleTupleTableSlot'] = wasmExports['MakeSingleTupleTableSlot'])(a0, a1);
var _ExecStoreHeapTuple = Module['_ExecStoreHeapTuple'] = (a0, a1, a2) => (_ExecStoreHeapTuple = Module['_ExecStoreHeapTuple'] = wasmExports['ExecStoreHeapTuple'])(a0, a1, a2);
var _ExecDropSingleTupleTableSlot = Module['_ExecDropSingleTupleTableSlot'] = (a0) => (_ExecDropSingleTupleTableSlot = Module['_ExecDropSingleTupleTableSlot'] = wasmExports['ExecDropSingleTupleTableSlot'])(a0);
var _FreeExecutorState = Module['_FreeExecutorState'] = (a0) => (_FreeExecutorState = Module['_FreeExecutorState'] = wasmExports['FreeExecutorState'])(a0);
var _ExecPrepareExpr = Module['_ExecPrepareExpr'] = (a0, a1) => (_ExecPrepareExpr = Module['_ExecPrepareExpr'] = wasmExports['ExecPrepareExpr'])(a0, a1);
var _datumCopy = Module['_datumCopy'] = (a0, a1, a2) => (_datumCopy = Module['_datumCopy'] = wasmExports['datumCopy'])(a0, a1, a2);
var _get_rel_type_id = Module['_get_rel_type_id'] = (a0) => (_get_rel_type_id = Module['_get_rel_type_id'] = wasmExports['get_rel_type_id'])(a0);
var _construct_array_builtin = Module['_construct_array_builtin'] = (a0, a1, a2) => (_construct_array_builtin = Module['_construct_array_builtin'] = wasmExports['construct_array_builtin'])(a0, a1, a2);
var _construct_array = Module['_construct_array'] = (a0, a1, a2, a3, a4, a5) => (_construct_array = Module['_construct_array'] = wasmExports['construct_array'])(a0, a1, a2, a3, a4, a5);
var _table_close = Module['_table_close'] = (a0, a1) => (_table_close = Module['_table_close'] = wasmExports['table_close'])(a0, a1);
var _heap_freetuple = Module['_heap_freetuple'] = (a0) => (_heap_freetuple = Module['_heap_freetuple'] = wasmExports['heap_freetuple'])(a0);
var _pgstat_progress_update_param = Module['_pgstat_progress_update_param'] = (a0, a1) => (_pgstat_progress_update_param = Module['_pgstat_progress_update_param'] = wasmExports['pgstat_progress_update_param'])(a0, a1);
var _list_free = Module['_list_free'] = (a0) => (_list_free = Module['_list_free'] = wasmExports['list_free'])(a0);
var _ScanKeyInit = Module['_ScanKeyInit'] = (a0, a1, a2, a3, a4) => (_ScanKeyInit = Module['_ScanKeyInit'] = wasmExports['ScanKeyInit'])(a0, a1, a2, a3, a4);
var _systable_beginscan = Module['_systable_beginscan'] = (a0, a1, a2, a3, a4, a5) => (_systable_beginscan = Module['_systable_beginscan'] = wasmExports['systable_beginscan'])(a0, a1, a2, a3, a4, a5);
var _systable_getnext = Module['_systable_getnext'] = (a0) => (_systable_getnext = Module['_systable_getnext'] = wasmExports['systable_getnext'])(a0);
var _pstrdup = Module['_pstrdup'] = (a0) => (_pstrdup = Module['_pstrdup'] = wasmExports['pstrdup'])(a0);
var _SysCacheGetAttrNotNull = Module['_SysCacheGetAttrNotNull'] = (a0, a1, a2) => (_SysCacheGetAttrNotNull = Module['_SysCacheGetAttrNotNull'] = wasmExports['SysCacheGetAttrNotNull'])(a0, a1, a2);
var _lappend_int = Module['_lappend_int'] = (a0, a1) => (_lappend_int = Module['_lappend_int'] = wasmExports['lappend_int'])(a0, a1);
var _text_to_cstring = Module['_text_to_cstring'] = (a0) => (_text_to_cstring = Module['_text_to_cstring'] = wasmExports['text_to_cstring'])(a0);
var _stringToNode = Module['_stringToNode'] = (a0) => (_stringToNode = Module['_stringToNode'] = wasmExports['stringToNode'])(a0);
var _systable_endscan = Module['_systable_endscan'] = (a0) => (_systable_endscan = Module['_systable_endscan'] = wasmExports['systable_endscan'])(a0);
var _exprType = Module['_exprType'] = (a0) => (_exprType = Module['_exprType'] = wasmExports['exprType'])(a0);
var _exprTypmod = Module['_exprTypmod'] = (a0) => (_exprTypmod = Module['_exprTypmod'] = wasmExports['exprTypmod'])(a0);
var _OidFunctionCall1Coll = Module['_OidFunctionCall1Coll'] = (a0, a1, a2) => (_OidFunctionCall1Coll = Module['_OidFunctionCall1Coll'] = wasmExports['OidFunctionCall1Coll'])(a0, a1, a2);
var _std_typanalyze = Module['_std_typanalyze'] = (a0) => (_std_typanalyze = Module['_std_typanalyze'] = wasmExports['std_typanalyze'])(a0);
var _get_typlen = Module['_get_typlen'] = (a0) => (_get_typlen = Module['_get_typlen'] = wasmExports['get_typlen'])(a0);
var _toast_raw_datum_size = Module['_toast_raw_datum_size'] = (a0) => (_toast_raw_datum_size = Module['_toast_raw_datum_size'] = wasmExports['toast_raw_datum_size'])(a0);
var _bms_is_subset = Module['_bms_is_subset'] = (a0, a1) => (_bms_is_subset = Module['_bms_is_subset'] = wasmExports['bms_is_subset'])(a0, a1);
var _bms_add_members = Module['_bms_add_members'] = (a0, a1) => (_bms_add_members = Module['_bms_add_members'] = wasmExports['bms_add_members'])(a0, a1);
var _GetUserId = Module['_GetUserId'] = () => (_GetUserId = Module['_GetUserId'] = wasmExports['GetUserId'])();
var _pg_class_aclcheck = Module['_pg_class_aclcheck'] = (a0, a1, a2) => (_pg_class_aclcheck = Module['_pg_class_aclcheck'] = wasmExports['pg_class_aclcheck'])(a0, a1, a2);
var _pull_varattnos = Module['_pull_varattnos'] = (a0, a1, a2) => (_pull_varattnos = Module['_pull_varattnos'] = wasmExports['pull_varattnos'])(a0, a1, a2);
var _before_shmem_exit = Module['_before_shmem_exit'] = (a0, a1) => (_before_shmem_exit = Module['_before_shmem_exit'] = wasmExports['before_shmem_exit'])(a0, a1);
var _ConditionVariableCancelSleep = Module['_ConditionVariableCancelSleep'] = () => (_ConditionVariableCancelSleep = Module['_ConditionVariableCancelSleep'] = wasmExports['ConditionVariableCancelSleep'])();
var _SignalHandlerForConfigReload = Module['_SignalHandlerForConfigReload'] = (a0) => (_SignalHandlerForConfigReload = Module['_SignalHandlerForConfigReload'] = wasmExports['SignalHandlerForConfigReload'])(a0);
var _pqsignal = Module['_pqsignal'] = (a0, a1) => (_pqsignal = Module['_pqsignal'] = wasmExports['pqsignal'])(a0, a1);
var ___wasm_setjmp_test = Module['___wasm_setjmp_test'] = (a0, a1) => (___wasm_setjmp_test = Module['___wasm_setjmp_test'] = wasmExports['__wasm_setjmp_test'])(a0, a1);
var _SignalHandlerForShutdownRequest = Module['_SignalHandlerForShutdownRequest'] = (a0) => (_SignalHandlerForShutdownRequest = Module['_SignalHandlerForShutdownRequest'] = wasmExports['SignalHandlerForShutdownRequest'])(a0);
var _procsignal_sigusr1_handler = Module['_procsignal_sigusr1_handler'] = (a0) => (_procsignal_sigusr1_handler = Module['_procsignal_sigusr1_handler'] = wasmExports['procsignal_sigusr1_handler'])(a0);
var ___wasm_setjmp = Module['___wasm_setjmp'] = (a0, a1, a2) => (___wasm_setjmp = Module['___wasm_setjmp'] = wasmExports['__wasm_setjmp'])(a0, a1, a2);
var _EmitErrorReport = Module['_EmitErrorReport'] = () => (_EmitErrorReport = Module['_EmitErrorReport'] = wasmExports['EmitErrorReport'])();
var _FlushErrorState = Module['_FlushErrorState'] = () => (_FlushErrorState = Module['_FlushErrorState'] = wasmExports['FlushErrorState'])();
var _pg_usleep = Module['_pg_usleep'] = (a0) => (_pg_usleep = Module['_pg_usleep'] = wasmExports['pg_usleep'])(a0);
var _ResetLatch = Module['_ResetLatch'] = (a0) => (_ResetLatch = Module['_ResetLatch'] = wasmExports['ResetLatch'])(a0);
var _ProcessConfigFile = Module['_ProcessConfigFile'] = (a0) => (_ProcessConfigFile = Module['_ProcessConfigFile'] = wasmExports['ProcessConfigFile'])(a0);
var _WaitLatch = Module['_WaitLatch'] = (a0, a1, a2, a3) => (_WaitLatch = Module['_WaitLatch'] = wasmExports['WaitLatch'])(a0, a1, a2, a3);
var _emscripten_longjmp = Module['_emscripten_longjmp'] = (a0, a1) => (_emscripten_longjmp = Module['_emscripten_longjmp'] = wasmExports['emscripten_longjmp'])(a0, a1);
var _time = Module['_time'] = (a0) => (_time = Module['_time'] = wasmExports['time'])(a0);
var _tas_sema = Module['_tas_sema'] = (a0) => (_tas_sema = Module['_tas_sema'] = wasmExports['tas_sema'])(a0);
var _s_lock = Module['_s_lock'] = (a0, a1, a2, a3) => (_s_lock = Module['_s_lock'] = wasmExports['s_lock'])(a0, a1, a2, a3);
var _s_unlock_sema = Module['_s_unlock_sema'] = (a0) => (_s_unlock_sema = Module['_s_unlock_sema'] = wasmExports['s_unlock_sema'])(a0);
var _RecoveryInProgress = Module['_RecoveryInProgress'] = () => (_RecoveryInProgress = Module['_RecoveryInProgress'] = wasmExports['RecoveryInProgress'])();
var _errmsg_plural = Module['_errmsg_plural'] = (a0, a1, a2, a3) => (_errmsg_plural = Module['_errmsg_plural'] = wasmExports['errmsg_plural'])(a0, a1, a2, a3);
var _GetXLogReplayRecPtr = Module['_GetXLogReplayRecPtr'] = (a0) => (_GetXLogReplayRecPtr = Module['_GetXLogReplayRecPtr'] = wasmExports['GetXLogReplayRecPtr'])(a0);
var _LWLockAcquire = Module['_LWLockAcquire'] = (a0, a1) => (_LWLockAcquire = Module['_LWLockAcquire'] = wasmExports['LWLockAcquire'])(a0, a1);
var _LWLockRelease = Module['_LWLockRelease'] = (a0) => (_LWLockRelease = Module['_LWLockRelease'] = wasmExports['LWLockRelease'])(a0);
var _gettimeofday = Module['_gettimeofday'] = (a0, a1) => (_gettimeofday = Module['_gettimeofday'] = wasmExports['gettimeofday'])(a0, a1);
var _add_size = Module['_add_size'] = (a0, a1) => (_add_size = Module['_add_size'] = wasmExports['add_size'])(a0, a1);
var _ShmemInitStruct = Module['_ShmemInitStruct'] = (a0, a1, a2) => (_ShmemInitStruct = Module['_ShmemInitStruct'] = wasmExports['ShmemInitStruct'])(a0, a1, a2);
var _s_init_lock_sema = Module['_s_init_lock_sema'] = (a0, a1) => (_s_init_lock_sema = Module['_s_init_lock_sema'] = wasmExports['s_init_lock_sema'])(a0, a1);
var _ConditionVariableInit = Module['_ConditionVariableInit'] = (a0) => (_ConditionVariableInit = Module['_ConditionVariableInit'] = wasmExports['ConditionVariableInit'])(a0);
var _ConditionVariableSleep = Module['_ConditionVariableSleep'] = (a0, a1) => (_ConditionVariableSleep = Module['_ConditionVariableSleep'] = wasmExports['ConditionVariableSleep'])(a0, a1);
var _hash_create = Module['_hash_create'] = (a0, a1, a2, a3) => (_hash_create = Module['_hash_create'] = wasmExports['hash_create'])(a0, a1, a2, a3);
var _hash_search = Module['_hash_search'] = (a0, a1, a2, a3) => (_hash_search = Module['_hash_search'] = wasmExports['hash_search'])(a0, a1, a2, a3);
var _hash_destroy = Module['_hash_destroy'] = (a0) => (_hash_destroy = Module['_hash_destroy'] = wasmExports['hash_destroy'])(a0);
var _fork = Module['_fork'] = () => (_fork = Module['_fork'] = wasmExports['fork'])();
var _open = Module['_open'] = (a0, a1, a2) => (_open = Module['_open'] = wasmExports['open'])(a0, a1, a2);
var _write = Module['_write'] = (a0, a1, a2) => (_write = Module['_write'] = wasmExports['write'])(a0, a1, a2);
var _close = Module['_close'] = (a0) => (_close = Module['_close'] = wasmExports['close'])(a0);
var _on_shmem_exit = Module['_on_shmem_exit'] = (a0, a1) => (_on_shmem_exit = Module['_on_shmem_exit'] = wasmExports['on_shmem_exit'])(a0, a1);
var _errdetail = Module['_errdetail'] = (a0, a1) => (_errdetail = Module['_errdetail'] = wasmExports['errdetail'])(a0, a1);
var _stat = Module['_stat'] = (a0, a1) => (_stat = Module['_stat'] = wasmExports['stat'])(a0, a1);
var _errcode_for_file_access = Module['_errcode_for_file_access'] = () => (_errcode_for_file_access = Module['_errcode_for_file_access'] = wasmExports['errcode_for_file_access'])();
var _AllocateDir = Module['_AllocateDir'] = (a0) => (_AllocateDir = Module['_AllocateDir'] = wasmExports['AllocateDir'])(a0);
var _ReadDir = Module['_ReadDir'] = (a0, a1) => (_ReadDir = Module['_ReadDir'] = wasmExports['ReadDir'])(a0, a1);
var _FreeDir = Module['_FreeDir'] = (a0) => (_FreeDir = Module['_FreeDir'] = wasmExports['FreeDir'])(a0);
var _unlink = Module['_unlink'] = (a0) => (_unlink = Module['_unlink'] = wasmExports['unlink'])(a0);
var _rename = Module['_rename'] = (a0, a1) => (_rename = Module['_rename'] = wasmExports['rename'])(a0, a1);
var _pipe = Module['_pipe'] = (a0) => (_pipe = Module['_pipe'] = wasmExports['pipe'])(a0);
var _dup2 = Module['_dup2'] = (a0, a1) => (_dup2 = Module['_dup2'] = wasmExports['dup2'])(a0, a1);
var _fclose = Module['_fclose'] = (a0) => (_fclose = Module['_fclose'] = wasmExports['fclose'])(a0);
var _strlcpy = Module['_strlcpy'] = (a0, a1, a2) => (_strlcpy = Module['_strlcpy'] = wasmExports['strlcpy'])(a0, a1, a2);
var _fopen = Module['_fopen'] = (a0, a1) => (_fopen = Module['_fopen'] = wasmExports['fopen'])(a0, a1);
var _AddWaitEventToSet = Module['_AddWaitEventToSet'] = (a0, a1, a2, a3, a4) => (_AddWaitEventToSet = Module['_AddWaitEventToSet'] = wasmExports['AddWaitEventToSet'])(a0, a1, a2, a3, a4);
var _ftell = Module['_ftell'] = (a0) => (_ftell = Module['_ftell'] = wasmExports['ftell'])(a0);
var _read = Module['_read'] = (a0, a1, a2) => (_read = Module['_read'] = wasmExports['read'])(a0, a1, a2);
var _pg_popcount = Module['_pg_popcount'] = (a0, a1) => (_pg_popcount = Module['_pg_popcount'] = wasmExports['pg_popcount'])(a0, a1);
var _appendBinaryStringInfo = Module['_appendBinaryStringInfo'] = (a0, a1, a2) => (_appendBinaryStringInfo = Module['_appendBinaryStringInfo'] = wasmExports['appendBinaryStringInfo'])(a0, a1, a2);
var _fwrite = Module['_fwrite'] = (a0, a1, a2, a3) => (_fwrite = Module['_fwrite'] = wasmExports['fwrite'])(a0, a1, a2, a3);
var _memmove = Module['_memmove'] = (a0, a1, a2) => (_memmove = Module['_memmove'] = wasmExports['memmove'])(a0, a1, a2);
var _BackgroundWorkerUnblockSignals = Module['_BackgroundWorkerUnblockSignals'] = () => (_BackgroundWorkerUnblockSignals = Module['_BackgroundWorkerUnblockSignals'] = wasmExports['BackgroundWorkerUnblockSignals'])();
var _RegisterBackgroundWorker = Module['_RegisterBackgroundWorker'] = (a0) => (_RegisterBackgroundWorker = Module['_RegisterBackgroundWorker'] = wasmExports['RegisterBackgroundWorker'])(a0);
var _RegisterDynamicBackgroundWorker = Module['_RegisterDynamicBackgroundWorker'] = (a0, a1) => (_RegisterDynamicBackgroundWorker = Module['_RegisterDynamicBackgroundWorker'] = wasmExports['RegisterDynamicBackgroundWorker'])(a0, a1);
var _WaitForBackgroundWorkerStartup = Module['_WaitForBackgroundWorkerStartup'] = (a0, a1) => (_WaitForBackgroundWorkerStartup = Module['_WaitForBackgroundWorkerStartup'] = wasmExports['WaitForBackgroundWorkerStartup'])(a0, a1);
var _WaitForBackgroundWorkerShutdown = Module['_WaitForBackgroundWorkerShutdown'] = (a0) => (_WaitForBackgroundWorkerShutdown = Module['_WaitForBackgroundWorkerShutdown'] = wasmExports['WaitForBackgroundWorkerShutdown'])(a0);
var _GetCurrentTimestamp = Module['_GetCurrentTimestamp'] = () => (_GetCurrentTimestamp = Module['_GetCurrentTimestamp'] = wasmExports['GetCurrentTimestamp'])();
var _getpid = Module['_getpid'] = () => (_getpid = Module['_getpid'] = wasmExports['getpid'])();
var __exit = Module['__exit'] = (a0) => (__exit = Module['__exit'] = wasmExports['_exit'])(a0);
var _SetConfigOption = Module['_SetConfigOption'] = (a0, a1, a2, a3) => (_SetConfigOption = Module['_SetConfigOption'] = wasmExports['SetConfigOption'])(a0, a1, a2, a3);
var _AllocateFile = Module['_AllocateFile'] = (a0, a1) => (_AllocateFile = Module['_AllocateFile'] = wasmExports['AllocateFile'])(a0, a1);
var _FreeFile = Module['_FreeFile'] = (a0) => (_FreeFile = Module['_FreeFile'] = wasmExports['FreeFile'])(a0);
var _fcntl = Module['_fcntl'] = (a0, a1, a2) => (_fcntl = Module['_fcntl'] = wasmExports['fcntl'])(a0, a1, a2);
var _GetConfigOption = Module['_GetConfigOption'] = (a0, a1, a2) => (_GetConfigOption = Module['_GetConfigOption'] = wasmExports['GetConfigOption'])(a0, a1, a2);
var _list_free_deep = Module['_list_free_deep'] = (a0) => (_list_free_deep = Module['_list_free_deep'] = wasmExports['list_free_deep'])(a0);
var _pg_strong_random = Module['_pg_strong_random'] = (a0, a1) => (_pg_strong_random = Module['_pg_strong_random'] = wasmExports['pg_strong_random'])(a0, a1);
var _pg_prng_seed_check = Module['_pg_prng_seed_check'] = (a0) => (_pg_prng_seed_check = Module['_pg_prng_seed_check'] = wasmExports['pg_prng_seed_check'])(a0);
var _pg_prng_seed = Module['_pg_prng_seed'] = (a0, a1) => (_pg_prng_seed = Module['_pg_prng_seed'] = wasmExports['pg_prng_seed'])(a0, a1);
var _pg_prng_uint32 = Module['_pg_prng_uint32'] = (a0) => (_pg_prng_uint32 = Module['_pg_prng_uint32'] = wasmExports['pg_prng_uint32'])(a0);
var _fputc = Module['_fputc'] = (a0, a1) => (_fputc = Module['_fputc'] = wasmExports['fputc'])(a0, a1);
var _MemoryContextAlloc = Module['_MemoryContextAlloc'] = (a0, a1) => (_MemoryContextAlloc = Module['_MemoryContextAlloc'] = wasmExports['MemoryContextAlloc'])(a0, a1);
var _TimestampDifferenceMilliseconds = Module['_TimestampDifferenceMilliseconds'] = (a0, a1) => (_TimestampDifferenceMilliseconds = Module['_TimestampDifferenceMilliseconds'] = wasmExports['TimestampDifferenceMilliseconds'])(a0, a1);
var _waitpid = Module['_waitpid'] = (a0, a1, a2) => (_waitpid = Module['_waitpid'] = wasmExports['waitpid'])(a0, a1, a2);
var _calloc = Module['_calloc'] = (a0, a1) => (_calloc = Module['_calloc'] = wasmExports['calloc'])(a0, a1);
var _send = Module['_send'] = (a0, a1, a2, a3) => (_send = Module['_send'] = wasmExports['send'])(a0, a1, a2, a3);
var _pg_printf = Module['_pg_printf'] = (a0, a1) => (_pg_printf = Module['_pg_printf'] = wasmExports['pg_printf'])(a0, a1);
var _parse_bool = Module['_parse_bool'] = (a0, a1) => (_parse_bool = Module['_parse_bool'] = wasmExports['parse_bool'])(a0, a1);
var _strncmp = Module['_strncmp'] = (a0, a1, a2) => (_strncmp = Module['_strncmp'] = wasmExports['strncmp'])(a0, a1, a2);
var _enlargeStringInfo = Module['_enlargeStringInfo'] = (a0, a1) => (_enlargeStringInfo = Module['_enlargeStringInfo'] = wasmExports['enlargeStringInfo'])(a0, a1);
var _psprintf = Module['_psprintf'] = (a0, a1) => (_psprintf = Module['_psprintf'] = wasmExports['psprintf'])(a0, a1);
var _ReleaseExternalFD = Module['_ReleaseExternalFD'] = () => (_ReleaseExternalFD = Module['_ReleaseExternalFD'] = wasmExports['ReleaseExternalFD'])();
var _BackgroundWorkerInitializeConnectionByOid = Module['_BackgroundWorkerInitializeConnectionByOid'] = (a0, a1, a2) => (_BackgroundWorkerInitializeConnectionByOid = Module['_BackgroundWorkerInitializeConnectionByOid'] = wasmExports['BackgroundWorkerInitializeConnectionByOid'])(a0, a1, a2);
var _pg_getnameinfo_all = Module['_pg_getnameinfo_all'] = (a0, a1, a2, a3, a4, a5, a6) => (_pg_getnameinfo_all = Module['_pg_getnameinfo_all'] = wasmExports['pg_getnameinfo_all'])(a0, a1, a2, a3, a4, a5, a6);
var _gai_strerror = Module['_gai_strerror'] = (a0) => (_gai_strerror = Module['_gai_strerror'] = wasmExports['gai_strerror'])(a0);
var _die = Module['_die'] = (a0) => (_die = Module['_die'] = wasmExports['die'])(a0);
var _TransactionIdPrecedes = Module['_TransactionIdPrecedes'] = (a0, a1) => (_TransactionIdPrecedes = Module['_TransactionIdPrecedes'] = wasmExports['TransactionIdPrecedes'])(a0, a1);
var _MultiXactIdPrecedes = Module['_MultiXactIdPrecedes'] = (a0, a1) => (_MultiXactIdPrecedes = Module['_MultiXactIdPrecedes'] = wasmExports['MultiXactIdPrecedes'])(a0, a1);
var _hash_seq_init = Module['_hash_seq_init'] = (a0, a1) => (_hash_seq_init = Module['_hash_seq_init'] = wasmExports['hash_seq_init'])(a0, a1);
var _hash_seq_search = Module['_hash_seq_search'] = (a0) => (_hash_seq_search = Module['_hash_seq_search'] = wasmExports['hash_seq_search'])(a0);
var _StartTransactionCommand = Module['_StartTransactionCommand'] = () => (_StartTransactionCommand = Module['_StartTransactionCommand'] = wasmExports['StartTransactionCommand'])();
var _GetTransactionSnapshot = Module['_GetTransactionSnapshot'] = () => (_GetTransactionSnapshot = Module['_GetTransactionSnapshot'] = wasmExports['GetTransactionSnapshot'])();
var _heap_getnext = Module['_heap_getnext'] = (a0, a1) => (_heap_getnext = Module['_heap_getnext'] = wasmExports['heap_getnext'])(a0, a1);
var _CommitTransactionCommand = Module['_CommitTransactionCommand'] = () => (_CommitTransactionCommand = Module['_CommitTransactionCommand'] = wasmExports['CommitTransactionCommand'])();
var _SearchSysCache1 = Module['_SearchSysCache1'] = (a0, a1) => (_SearchSysCache1 = Module['_SearchSysCache1'] = wasmExports['SearchSysCache1'])(a0, a1);
var _CreateTupleDescCopy = Module['_CreateTupleDescCopy'] = (a0) => (_CreateTupleDescCopy = Module['_CreateTupleDescCopy'] = wasmExports['CreateTupleDescCopy'])(a0);
var _lappend_oid = Module['_lappend_oid'] = (a0, a1) => (_lappend_oid = Module['_lappend_oid'] = wasmExports['lappend_oid'])(a0, a1);
var _pgstat_report_activity = Module['_pgstat_report_activity'] = (a0, a1) => (_pgstat_report_activity = Module['_pgstat_report_activity'] = wasmExports['pgstat_report_activity'])(a0, a1);
var _makeRangeVar = Module['_makeRangeVar'] = (a0, a1, a2) => (_makeRangeVar = Module['_makeRangeVar'] = wasmExports['makeRangeVar'])(a0, a1, a2);
var _set_errcontext_domain = Module['_set_errcontext_domain'] = (a0) => (_set_errcontext_domain = Module['_set_errcontext_domain'] = wasmExports['set_errcontext_domain'])(a0);
var _errcontext_msg = Module['_errcontext_msg'] = (a0, a1) => (_errcontext_msg = Module['_errcontext_msg'] = wasmExports['errcontext_msg'])(a0, a1);
var _get_rel_name = Module['_get_rel_name'] = (a0) => (_get_rel_name = Module['_get_rel_name'] = wasmExports['get_rel_name'])(a0);
var _get_rel_namespace = Module['_get_rel_namespace'] = (a0) => (_get_rel_namespace = Module['_get_rel_namespace'] = wasmExports['get_rel_namespace'])(a0);
var _Int64GetDatum = Module['_Int64GetDatum'] = (a0) => (_Int64GetDatum = Module['_Int64GetDatum'] = wasmExports['Int64GetDatum'])(a0);
var _DirectFunctionCall2Coll = Module['_DirectFunctionCall2Coll'] = (a0, a1, a2, a3) => (_DirectFunctionCall2Coll = Module['_DirectFunctionCall2Coll'] = wasmExports['DirectFunctionCall2Coll'])(a0, a1, a2, a3);
var _table_openrv = Module['_table_openrv'] = (a0, a1) => (_table_openrv = Module['_table_openrv'] = wasmExports['table_openrv'])(a0, a1);
var _CreateTemplateTupleDesc = Module['_CreateTemplateTupleDesc'] = (a0) => (_CreateTemplateTupleDesc = Module['_CreateTemplateTupleDesc'] = wasmExports['CreateTemplateTupleDesc'])(a0);
var _TupleDescInitEntry = Module['_TupleDescInitEntry'] = (a0, a1, a2, a3, a4, a5) => (_TupleDescInitEntry = Module['_TupleDescInitEntry'] = wasmExports['TupleDescInitEntry'])(a0, a1, a2, a3, a4, a5);
var _CommandCounterIncrement = Module['_CommandCounterIncrement'] = () => (_CommandCounterIncrement = Module['_CommandCounterIncrement'] = wasmExports['CommandCounterIncrement'])();
var _MemoryContextAllocZeroAligned = Module['_MemoryContextAllocZeroAligned'] = (a0, a1) => (_MemoryContextAllocZeroAligned = Module['_MemoryContextAllocZeroAligned'] = wasmExports['MemoryContextAllocZeroAligned'])(a0, a1);
var _list_make2_impl = Module['_list_make2_impl'] = (a0, a1, a2) => (_list_make2_impl = Module['_list_make2_impl'] = wasmExports['list_make2_impl'])(a0, a1, a2);
var _RangeVarGetRelidExtended = Module['_RangeVarGetRelidExtended'] = (a0, a1, a2, a3, a4) => (_RangeVarGetRelidExtended = Module['_RangeVarGetRelidExtended'] = wasmExports['RangeVarGetRelidExtended'])(a0, a1, a2, a3, a4);
var _makeTypeNameFromNameList = Module['_makeTypeNameFromNameList'] = (a0) => (_makeTypeNameFromNameList = Module['_makeTypeNameFromNameList'] = wasmExports['makeTypeNameFromNameList'])(a0);
var _list_concat = Module['_list_concat'] = (a0, a1) => (_list_concat = Module['_list_concat'] = wasmExports['list_concat'])(a0, a1);
var _pg_detoast_datum_copy = Module['_pg_detoast_datum_copy'] = (a0) => (_pg_detoast_datum_copy = Module['_pg_detoast_datum_copy'] = wasmExports['pg_detoast_datum_copy'])(a0);
var _get_attnum = Module['_get_attnum'] = (a0, a1) => (_get_attnum = Module['_get_attnum'] = wasmExports['get_attnum'])(a0, a1);
var _has_privs_of_role = Module['_has_privs_of_role'] = (a0, a1) => (_has_privs_of_role = Module['_has_privs_of_role'] = wasmExports['has_privs_of_role'])(a0, a1);
var _SearchSysCache3 = Module['_SearchSysCache3'] = (a0, a1, a2, a3) => (_SearchSysCache3 = Module['_SearchSysCache3'] = wasmExports['SearchSysCache3'])(a0, a1, a2, a3);
var _aclcheck_error = Module['_aclcheck_error'] = (a0, a1, a2) => (_aclcheck_error = Module['_aclcheck_error'] = wasmExports['aclcheck_error'])(a0, a1, a2);
var _get_element_type = Module['_get_element_type'] = (a0) => (_get_element_type = Module['_get_element_type'] = wasmExports['get_element_type'])(a0);
var _format_type_be = Module['_format_type_be'] = (a0) => (_format_type_be = Module['_format_type_be'] = wasmExports['format_type_be'])(a0);
var _superuser_arg = Module['_superuser_arg'] = (a0) => (_superuser_arg = Module['_superuser_arg'] = wasmExports['superuser_arg'])(a0);
var _object_aclcheck = Module['_object_aclcheck'] = (a0, a1, a2, a3) => (_object_aclcheck = Module['_object_aclcheck'] = wasmExports['object_aclcheck'])(a0, a1, a2, a3);
var _object_ownercheck = Module['_object_ownercheck'] = (a0, a1, a2) => (_object_ownercheck = Module['_object_ownercheck'] = wasmExports['object_ownercheck'])(a0, a1, a2);
var _errdetail_relkind_not_supported = Module['_errdetail_relkind_not_supported'] = (a0) => (_errdetail_relkind_not_supported = Module['_errdetail_relkind_not_supported'] = wasmExports['errdetail_relkind_not_supported'])(a0);
var _errdetail_internal = Module['_errdetail_internal'] = (a0, a1) => (_errdetail_internal = Module['_errdetail_internal'] = wasmExports['errdetail_internal'])(a0, a1);
var _NameListToString = Module['_NameListToString'] = (a0) => (_NameListToString = Module['_NameListToString'] = wasmExports['NameListToString'])(a0);
var _get_func_name = Module['_get_func_name'] = (a0) => (_get_func_name = Module['_get_func_name'] = wasmExports['get_func_name'])(a0);
var _ExecStoreVirtualTuple = Module['_ExecStoreVirtualTuple'] = (a0) => (_ExecStoreVirtualTuple = Module['_ExecStoreVirtualTuple'] = wasmExports['ExecStoreVirtualTuple'])(a0);
var _SearchSysCacheExists = Module['_SearchSysCacheExists'] = (a0, a1, a2, a3, a4) => (_SearchSysCacheExists = Module['_SearchSysCacheExists'] = wasmExports['SearchSysCacheExists'])(a0, a1, a2, a3, a4);
var _smgropen = Module['_smgropen'] = (a0, a1) => (_smgropen = Module['_smgropen'] = wasmExports['smgropen'])(a0, a1);
var _XLogBeginInsert = Module['_XLogBeginInsert'] = () => (_XLogBeginInsert = Module['_XLogBeginInsert'] = wasmExports['XLogBeginInsert'])();
var _XLogRegisterData = Module['_XLogRegisterData'] = (a0, a1) => (_XLogRegisterData = Module['_XLogRegisterData'] = wasmExports['XLogRegisterData'])(a0, a1);
var _XLogInsert = Module['_XLogInsert'] = (a0, a1) => (_XLogInsert = Module['_XLogInsert'] = wasmExports['XLogInsert'])(a0, a1);
var _GetCurrentTransactionNestLevel = Module['_GetCurrentTransactionNestLevel'] = () => (_GetCurrentTransactionNestLevel = Module['_GetCurrentTransactionNestLevel'] = wasmExports['GetCurrentTransactionNestLevel'])();
var _smgrsetowner = Module['_smgrsetowner'] = (a0, a1) => (_smgrsetowner = Module['_smgrsetowner'] = wasmExports['smgrsetowner'])(a0, a1);
var _smgrexists = Module['_smgrexists'] = (a0, a1) => (_smgrexists = Module['_smgrexists'] = wasmExports['smgrexists'])(a0, a1);
var _visibilitymap_prepare_truncate = Module['_visibilitymap_prepare_truncate'] = (a0, a1) => (_visibilitymap_prepare_truncate = Module['_visibilitymap_prepare_truncate'] = wasmExports['visibilitymap_prepare_truncate'])(a0, a1);
var _smgrtruncate = Module['_smgrtruncate'] = (a0, a1, a2, a3) => (_smgrtruncate = Module['_smgrtruncate'] = wasmExports['smgrtruncate'])(a0, a1, a2, a3);
var _smgrread = Module['_smgrread'] = (a0, a1, a2, a3) => (_smgrread = Module['_smgrread'] = wasmExports['smgrread'])(a0, a1, a2, a3);
var _hash_get_num_entries = Module['_hash_get_num_entries'] = (a0) => (_hash_get_num_entries = Module['_hash_get_num_entries'] = wasmExports['hash_get_num_entries'])(a0);
var _log_newpage_range = Module['_log_newpage_range'] = (a0, a1, a2, a3, a4) => (_log_newpage_range = Module['_log_newpage_range'] = wasmExports['log_newpage_range'])(a0, a1, a2, a3, a4);
var _SearchSysCacheList = Module['_SearchSysCacheList'] = (a0, a1, a2, a3, a4) => (_SearchSysCacheList = Module['_SearchSysCacheList'] = wasmExports['SearchSysCacheList'])(a0, a1, a2, a3, a4);
var _ReleaseCatCacheList = Module['_ReleaseCatCacheList'] = (a0) => (_ReleaseCatCacheList = Module['_ReleaseCatCacheList'] = wasmExports['ReleaseCatCacheList'])(a0);
var _GetSysCacheOid = Module['_GetSysCacheOid'] = (a0, a1, a2, a3, a4, a5) => (_GetSysCacheOid = Module['_GetSysCacheOid'] = wasmExports['GetSysCacheOid'])(a0, a1, a2, a3, a4, a5);
var _relation_open = Module['_relation_open'] = (a0, a1) => (_relation_open = Module['_relation_open'] = wasmExports['relation_open'])(a0, a1);
var _relation_close = Module['_relation_close'] = (a0, a1) => (_relation_close = Module['_relation_close'] = wasmExports['relation_close'])(a0, a1);
var _deconstruct_array_builtin = Module['_deconstruct_array_builtin'] = (a0, a1, a2, a3, a4) => (_deconstruct_array_builtin = Module['_deconstruct_array_builtin'] = wasmExports['deconstruct_array_builtin'])(a0, a1, a2, a3, a4);
var _makeString = Module['_makeString'] = (a0) => (_makeString = Module['_makeString'] = wasmExports['makeString'])(a0);
var _access = Module['_access'] = (a0, a1) => (_access = Module['_access'] = wasmExports['access'])(a0, a1);
var _superuser = Module['_superuser'] = () => (_superuser = Module['_superuser'] = wasmExports['superuser'])();
var _index_open = Module['_index_open'] = (a0, a1) => (_index_open = Module['_index_open'] = wasmExports['index_open'])(a0, a1);
var _SearchSysCacheAttName = Module['_SearchSysCacheAttName'] = (a0, a1) => (_SearchSysCacheAttName = Module['_SearchSysCacheAttName'] = wasmExports['SearchSysCacheAttName'])(a0, a1);
var _index_close = Module['_index_close'] = (a0, a1) => (_index_close = Module['_index_close'] = wasmExports['index_close'])(a0, a1);
var _getExtensionOfObject = Module['_getExtensionOfObject'] = (a0, a1) => (_getExtensionOfObject = Module['_getExtensionOfObject'] = wasmExports['getExtensionOfObject'])(a0, a1);
var _get_rel_relkind = Module['_get_rel_relkind'] = (a0) => (_get_rel_relkind = Module['_get_rel_relkind'] = wasmExports['get_rel_relkind'])(a0);
var _pg_encoding_to_char_private = Module['_pg_encoding_to_char_private'] = (a0) => (_pg_encoding_to_char_private = Module['_pg_encoding_to_char_private'] = wasmExports['pg_encoding_to_char_private'])(a0);
var _GetActiveSnapshot = Module['_GetActiveSnapshot'] = () => (_GetActiveSnapshot = Module['_GetActiveSnapshot'] = wasmExports['GetActiveSnapshot'])();
var _list_member_oid = Module['_list_member_oid'] = (a0, a1) => (_list_member_oid = Module['_list_member_oid'] = wasmExports['list_member_oid'])(a0, a1);
var _makeRangeVarFromNameList = Module['_makeRangeVarFromNameList'] = (a0) => (_makeRangeVarFromNameList = Module['_makeRangeVarFromNameList'] = wasmExports['makeRangeVarFromNameList'])(a0);
var _relation_openrv = Module['_relation_openrv'] = (a0, a1) => (_relation_openrv = Module['_relation_openrv'] = wasmExports['relation_openrv'])(a0, a1);
var _get_extension_oid = Module['_get_extension_oid'] = (a0, a1) => (_get_extension_oid = Module['_get_extension_oid'] = wasmExports['get_extension_oid'])(a0, a1);
var _get_role_oid = Module['_get_role_oid'] = (a0, a1) => (_get_role_oid = Module['_get_role_oid'] = wasmExports['get_role_oid'])(a0, a1);
var _get_collation_oid = Module['_get_collation_oid'] = (a0, a1) => (_get_collation_oid = Module['_get_collation_oid'] = wasmExports['get_collation_oid'])(a0, a1);
var _GetForeignServerByName = Module['_GetForeignServerByName'] = (a0, a1) => (_GetForeignServerByName = Module['_GetForeignServerByName'] = wasmExports['GetForeignServerByName'])(a0, a1);
var _GetPublicationByName = Module['_GetPublicationByName'] = (a0, a1) => (_GetPublicationByName = Module['_GetPublicationByName'] = wasmExports['GetPublicationByName'])(a0, a1);
var _LookupTypeName = Module['_LookupTypeName'] = (a0, a1, a2, a3) => (_LookupTypeName = Module['_LookupTypeName'] = wasmExports['LookupTypeName'])(a0, a1, a2, a3);
var _typeStringToTypeName = Module['_typeStringToTypeName'] = (a0, a1) => (_typeStringToTypeName = Module['_typeStringToTypeName'] = wasmExports['typeStringToTypeName'])(a0, a1);
var _GetUserNameFromId = Module['_GetUserNameFromId'] = (a0, a1) => (_GetUserNameFromId = Module['_GetUserNameFromId'] = wasmExports['GetUserNameFromId'])(a0, a1);
var _get_relkind_objtype = Module['_get_relkind_objtype'] = (a0) => (_get_relkind_objtype = Module['_get_relkind_objtype'] = wasmExports['get_relkind_objtype'])(a0);
var _get_attname = Module['_get_attname'] = (a0, a1, a2) => (_get_attname = Module['_get_attname'] = wasmExports['get_attname'])(a0, a1, a2);
var _format_type_extended = Module['_format_type_extended'] = (a0, a1, a2) => (_format_type_extended = Module['_format_type_extended'] = wasmExports['format_type_extended'])(a0, a1, a2);
var _quote_qualified_identifier = Module['_quote_qualified_identifier'] = (a0, a1) => (_quote_qualified_identifier = Module['_quote_qualified_identifier'] = wasmExports['quote_qualified_identifier'])(a0, a1);
var _format_operator = Module['_format_operator'] = (a0) => (_format_operator = Module['_format_operator'] = wasmExports['format_operator'])(a0);
var _format_procedure = Module['_format_procedure'] = (a0) => (_format_procedure = Module['_format_procedure'] = wasmExports['format_procedure'])(a0);
var _GetForeignServerExtended = Module['_GetForeignServerExtended'] = (a0, a1) => (_GetForeignServerExtended = Module['_GetForeignServerExtended'] = wasmExports['GetForeignServerExtended'])(a0, a1);
var _GetForeignServer = Module['_GetForeignServer'] = (a0) => (_GetForeignServer = Module['_GetForeignServer'] = wasmExports['GetForeignServer'])(a0);
var _RelationIsVisible = Module['_RelationIsVisible'] = (a0) => (_RelationIsVisible = Module['_RelationIsVisible'] = wasmExports['RelationIsVisible'])(a0);
var _quote_identifier = Module['_quote_identifier'] = (a0) => (_quote_identifier = Module['_quote_identifier'] = wasmExports['quote_identifier'])(a0);
var _construct_empty_array = Module['_construct_empty_array'] = (a0) => (_construct_empty_array = Module['_construct_empty_array'] = wasmExports['construct_empty_array'])(a0);
var _get_namespace_name_or_temp = Module['_get_namespace_name_or_temp'] = (a0) => (_get_namespace_name_or_temp = Module['_get_namespace_name_or_temp'] = wasmExports['get_namespace_name_or_temp'])(a0);
var _list_make3_impl = Module['_list_make3_impl'] = (a0, a1, a2, a3) => (_list_make3_impl = Module['_list_make3_impl'] = wasmExports['list_make3_impl'])(a0, a1, a2, a3);
var _construct_md_array = Module['_construct_md_array'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (_construct_md_array = Module['_construct_md_array'] = wasmExports['construct_md_array'])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
var _is_publishable_relation = Module['_is_publishable_relation'] = (a0) => (_is_publishable_relation = Module['_is_publishable_relation'] = wasmExports['is_publishable_relation'])(a0);
var _GetTopMostAncestorInPublication = Module['_GetTopMostAncestorInPublication'] = (a0, a1, a2) => (_GetTopMostAncestorInPublication = Module['_GetTopMostAncestorInPublication'] = wasmExports['GetTopMostAncestorInPublication'])(a0, a1, a2);
var _GetRelationPublications = Module['_GetRelationPublications'] = (a0) => (_GetRelationPublications = Module['_GetRelationPublications'] = wasmExports['GetRelationPublications'])(a0);
var _GetSchemaPublications = Module['_GetSchemaPublications'] = (a0) => (_GetSchemaPublications = Module['_GetSchemaPublications'] = wasmExports['GetSchemaPublications'])(a0);
var _pub_collist_to_bitmapset = Module['_pub_collist_to_bitmapset'] = (a0, a1, a2) => (_pub_collist_to_bitmapset = Module['_pub_collist_to_bitmapset'] = wasmExports['pub_collist_to_bitmapset'])(a0, a1, a2);
var _list_sort = Module['_list_sort'] = (a0, a1) => (_list_sort = Module['_list_sort'] = wasmExports['list_sort'])(a0, a1);
var _get_rel_relispartition = Module['_get_rel_relispartition'] = (a0) => (_get_rel_relispartition = Module['_get_rel_relispartition'] = wasmExports['get_rel_relispartition'])(a0);
var _get_partition_ancestors = Module['_get_partition_ancestors'] = (a0) => (_get_partition_ancestors = Module['_get_partition_ancestors'] = wasmExports['get_partition_ancestors'])(a0);
var _list_delete_cell = Module['_list_delete_cell'] = (a0, a1) => (_list_delete_cell = Module['_list_delete_cell'] = wasmExports['list_delete_cell'])(a0, a1);
var _RelnameGetRelid = Module['_RelnameGetRelid'] = (a0) => (_RelnameGetRelid = Module['_RelnameGetRelid'] = wasmExports['RelnameGetRelid'])(a0);
var _GetCurrentSubTransactionId = Module['_GetCurrentSubTransactionId'] = () => (_GetCurrentSubTransactionId = Module['_GetCurrentSubTransactionId'] = wasmExports['GetCurrentSubTransactionId'])();
var _SplitIdentifierString = Module['_SplitIdentifierString'] = (a0, a1, a2) => (_SplitIdentifierString = Module['_SplitIdentifierString'] = wasmExports['SplitIdentifierString'])(a0, a1, a2);
var _list_copy = Module['_list_copy'] = (a0) => (_list_copy = Module['_list_copy'] = wasmExports['list_copy'])(a0);
var _TypenameGetTypid = Module['_TypenameGetTypid'] = (a0) => (_TypenameGetTypid = Module['_TypenameGetTypid'] = wasmExports['TypenameGetTypid'])(a0);
var _FuncnameGetCandidates = Module['_FuncnameGetCandidates'] = (a0, a1, a2, a3, a4, a5, a6) => (_FuncnameGetCandidates = Module['_FuncnameGetCandidates'] = wasmExports['FuncnameGetCandidates'])(a0, a1, a2, a3, a4, a5, a6);
var _get_func_arg_info = Module['_get_func_arg_info'] = (a0, a1, a2, a3) => (_get_func_arg_info = Module['_get_func_arg_info'] = wasmExports['get_func_arg_info'])(a0, a1, a2, a3);
var _GetDatabaseEncodingName = Module['_GetDatabaseEncodingName'] = () => (_GetDatabaseEncodingName = Module['_GetDatabaseEncodingName'] = wasmExports['GetDatabaseEncodingName'])();
var _PushActiveSnapshot = Module['_PushActiveSnapshot'] = (a0) => (_PushActiveSnapshot = Module['_PushActiveSnapshot'] = wasmExports['PushActiveSnapshot'])(a0);
var _PopActiveSnapshot = Module['_PopActiveSnapshot'] = () => (_PopActiveSnapshot = Module['_PopActiveSnapshot'] = wasmExports['PopActiveSnapshot'])();
var _pre_format_elog_string = Module['_pre_format_elog_string'] = (a0, a1) => (_pre_format_elog_string = Module['_pre_format_elog_string'] = wasmExports['pre_format_elog_string'])(a0, a1);
var _format_elog_string = Module['_format_elog_string'] = (a0, a1) => (_format_elog_string = Module['_format_elog_string'] = wasmExports['format_elog_string'])(a0, a1);
var _CacheRegisterSyscacheCallback = Module['_CacheRegisterSyscacheCallback'] = (a0, a1, a2) => (_CacheRegisterSyscacheCallback = Module['_CacheRegisterSyscacheCallback'] = wasmExports['CacheRegisterSyscacheCallback'])(a0, a1, a2);
var _RelationGetIndexList = Module['_RelationGetIndexList'] = (a0) => (_RelationGetIndexList = Module['_RelationGetIndexList'] = wasmExports['RelationGetIndexList'])(a0);
var _bms_overlap = Module['_bms_overlap'] = (a0, a1) => (_bms_overlap = Module['_bms_overlap'] = wasmExports['bms_overlap'])(a0, a1);
var _get_typtype = Module['_get_typtype'] = (a0) => (_get_typtype = Module['_get_typtype'] = wasmExports['get_typtype'])(a0);
var _getBaseType = Module['_getBaseType'] = (a0) => (_getBaseType = Module['_getBaseType'] = wasmExports['getBaseType'])(a0);
var _list_delete_last = Module['_list_delete_last'] = (a0) => (_list_delete_last = Module['_list_delete_last'] = wasmExports['list_delete_last'])(a0);
var _transformExpr = Module['_transformExpr'] = (a0, a1, a2) => (_transformExpr = Module['_transformExpr'] = wasmExports['transformExpr'])(a0, a1, a2);
var _pull_var_clause = Module['_pull_var_clause'] = (a0, a1) => (_pull_var_clause = Module['_pull_var_clause'] = wasmExports['pull_var_clause'])(a0, a1);
var _coerce_to_target_type = Module['_coerce_to_target_type'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_coerce_to_target_type = Module['_coerce_to_target_type'] = wasmExports['coerce_to_target_type'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _parser_errposition = Module['_parser_errposition'] = (a0, a1) => (_parser_errposition = Module['_parser_errposition'] = wasmExports['parser_errposition'])(a0, a1);
var _pnstrdup = Module['_pnstrdup'] = (a0, a1) => (_pnstrdup = Module['_pnstrdup'] = wasmExports['pnstrdup'])(a0, a1);
var _GetCurrentCommandId = Module['_GetCurrentCommandId'] = (a0) => (_GetCurrentCommandId = Module['_GetCurrentCommandId'] = wasmExports['GetCurrentCommandId'])(a0);
var _ExecFetchSlotHeapTuple = Module['_ExecFetchSlotHeapTuple'] = (a0, a1, a2) => (_ExecFetchSlotHeapTuple = Module['_ExecFetchSlotHeapTuple'] = wasmExports['ExecFetchSlotHeapTuple'])(a0, a1, a2);
var _NewGUCNestLevel = Module['_NewGUCNestLevel'] = () => (_NewGUCNestLevel = Module['_NewGUCNestLevel'] = wasmExports['NewGUCNestLevel'])();
var _AtEOXact_GUC = Module['_AtEOXact_GUC'] = (a0, a1) => (_AtEOXact_GUC = Module['_AtEOXact_GUC'] = wasmExports['AtEOXact_GUC'])(a0, a1);
var _CheckFunctionValidatorAccess = Module['_CheckFunctionValidatorAccess'] = (a0, a1) => (_CheckFunctionValidatorAccess = Module['_CheckFunctionValidatorAccess'] = wasmExports['CheckFunctionValidatorAccess'])(a0, a1);
var _get_func_result_type = Module['_get_func_result_type'] = (a0, a1, a2) => (_get_func_result_type = Module['_get_func_result_type'] = wasmExports['get_func_result_type'])(a0, a1, a2);
var _function_parse_error_transpose = Module['_function_parse_error_transpose'] = (a0) => (_function_parse_error_transpose = Module['_function_parse_error_transpose'] = wasmExports['function_parse_error_transpose'])(a0);
var _geterrposition = Module['_geterrposition'] = () => (_geterrposition = Module['_geterrposition'] = wasmExports['geterrposition'])();
var _getinternalerrposition = Module['_getinternalerrposition'] = () => (_getinternalerrposition = Module['_getinternalerrposition'] = wasmExports['getinternalerrposition'])();
var _pg_mbstrlen_with_len = Module['_pg_mbstrlen_with_len'] = (a0, a1) => (_pg_mbstrlen_with_len = Module['_pg_mbstrlen_with_len'] = wasmExports['pg_mbstrlen_with_len'])(a0, a1);
var _pg_mblen = Module['_pg_mblen'] = (a0) => (_pg_mblen = Module['_pg_mblen'] = wasmExports['pg_mblen'])(a0);
var _errposition = Module['_errposition'] = (a0) => (_errposition = Module['_errposition'] = wasmExports['errposition'])(a0);
var _internalerrposition = Module['_internalerrposition'] = (a0) => (_internalerrposition = Module['_internalerrposition'] = wasmExports['internalerrposition'])(a0);
var _internalerrquery = Module['_internalerrquery'] = (a0) => (_internalerrquery = Module['_internalerrquery'] = wasmExports['internalerrquery'])(a0);
var _get_base_element_type = Module['_get_base_element_type'] = (a0) => (_get_base_element_type = Module['_get_base_element_type'] = wasmExports['get_base_element_type'])(a0);
var _RelationGetNumberOfBlocksInFork = Module['_RelationGetNumberOfBlocksInFork'] = (a0, a1) => (_RelationGetNumberOfBlocksInFork = Module['_RelationGetNumberOfBlocksInFork'] = wasmExports['RelationGetNumberOfBlocksInFork'])(a0, a1);
var _plan_create_index_workers = Module['_plan_create_index_workers'] = (a0, a1) => (_plan_create_index_workers = Module['_plan_create_index_workers'] = wasmExports['plan_create_index_workers'])(a0, a1);
var _GetUserIdAndSecContext = Module['_GetUserIdAndSecContext'] = (a0, a1) => (_GetUserIdAndSecContext = Module['_GetUserIdAndSecContext'] = wasmExports['GetUserIdAndSecContext'])(a0, a1);
var _SetUserIdAndSecContext = Module['_SetUserIdAndSecContext'] = (a0, a1) => (_SetUserIdAndSecContext = Module['_SetUserIdAndSecContext'] = wasmExports['SetUserIdAndSecContext'])(a0, a1);
var _RegisterSnapshot = Module['_RegisterSnapshot'] = (a0) => (_RegisterSnapshot = Module['_RegisterSnapshot'] = wasmExports['RegisterSnapshot'])(a0);
var _UnregisterSnapshot = Module['_UnregisterSnapshot'] = (a0) => (_UnregisterSnapshot = Module['_UnregisterSnapshot'] = wasmExports['UnregisterSnapshot'])(a0);
var _BuildIndexInfo = Module['_BuildIndexInfo'] = (a0) => (_BuildIndexInfo = Module['_BuildIndexInfo'] = wasmExports['BuildIndexInfo'])(a0);
var _IndexGetRelation = Module['_IndexGetRelation'] = (a0, a1) => (_IndexGetRelation = Module['_IndexGetRelation'] = wasmExports['IndexGetRelation'])(a0, a1);
var _get_opfamily_member = Module['_get_opfamily_member'] = (a0, a1, a2, a3) => (_get_opfamily_member = Module['_get_opfamily_member'] = wasmExports['get_opfamily_member'])(a0, a1, a2, a3);
var _slot_getsomeattrs_int = Module['_slot_getsomeattrs_int'] = (a0, a1) => (_slot_getsomeattrs_int = Module['_slot_getsomeattrs_int'] = wasmExports['slot_getsomeattrs_int'])(a0, a1);
var _tuplesort_performsort = Module['_tuplesort_performsort'] = (a0) => (_tuplesort_performsort = Module['_tuplesort_performsort'] = wasmExports['tuplesort_performsort'])(a0);
var _tuplesort_end = Module['_tuplesort_end'] = (a0) => (_tuplesort_end = Module['_tuplesort_end'] = wasmExports['tuplesort_end'])(a0);
var _defGetString = Module['_defGetString'] = (a0) => (_defGetString = Module['_defGetString'] = wasmExports['defGetString'])(a0);
var _atof = Module['_atof'] = (a0) => (_atof = Module['_atof'] = wasmExports['atof'])(a0);
var _defGetBoolean = Module['_defGetBoolean'] = (a0) => (_defGetBoolean = Module['_defGetBoolean'] = wasmExports['defGetBoolean'])(a0);
var _DirectFunctionCall1Coll = Module['_DirectFunctionCall1Coll'] = (a0, a1, a2) => (_DirectFunctionCall1Coll = Module['_DirectFunctionCall1Coll'] = wasmExports['DirectFunctionCall1Coll'])(a0, a1, a2);
var _guc_malloc = Module['_guc_malloc'] = (a0, a1) => (_guc_malloc = Module['_guc_malloc'] = wasmExports['guc_malloc'])(a0, a1);
var _DirectFunctionCall3Coll = Module['_DirectFunctionCall3Coll'] = (a0, a1, a2, a3, a4) => (_DirectFunctionCall3Coll = Module['_DirectFunctionCall3Coll'] = wasmExports['DirectFunctionCall3Coll'])(a0, a1, a2, a3, a4);
var _strtod = Module['_strtod'] = (a0, a1) => (_strtod = Module['_strtod'] = wasmExports['strtod'])(a0, a1);
var _canonicalize_path = Module['_canonicalize_path'] = (a0) => (_canonicalize_path = Module['_canonicalize_path'] = wasmExports['canonicalize_path'])(a0);
var _typenameTypeIdAndMod = Module['_typenameTypeIdAndMod'] = (a0, a1, a2, a3) => (_typenameTypeIdAndMod = Module['_typenameTypeIdAndMod'] = wasmExports['typenameTypeIdAndMod'])(a0, a1, a2, a3);
var _format_type_with_typemod = Module['_format_type_with_typemod'] = (a0, a1) => (_format_type_with_typemod = Module['_format_type_with_typemod'] = wasmExports['format_type_with_typemod'])(a0, a1);
var _free_attrmap = Module['_free_attrmap'] = (a0) => (_free_attrmap = Module['_free_attrmap'] = wasmExports['free_attrmap'])(a0);
var _copyObjectImpl = Module['_copyObjectImpl'] = (a0) => (_copyObjectImpl = Module['_copyObjectImpl'] = wasmExports['copyObjectImpl'])(a0);
var _contain_mutable_functions = Module['_contain_mutable_functions'] = (a0) => (_contain_mutable_functions = Module['_contain_mutable_functions'] = wasmExports['contain_mutable_functions'])(a0);
var _pg_re_throw = Module['_pg_re_throw'] = () => (_pg_re_throw = Module['_pg_re_throw'] = wasmExports['pg_re_throw'])();
var _makeVar = Module['_makeVar'] = (a0, a1, a2, a3, a4, a5) => (_makeVar = Module['_makeVar'] = wasmExports['makeVar'])(a0, a1, a2, a3, a4, a5);
var _CreateTupleDescCopyConstr = Module['_CreateTupleDescCopyConstr'] = (a0) => (_CreateTupleDescCopyConstr = Module['_CreateTupleDescCopyConstr'] = wasmExports['CreateTupleDescCopyConstr'])(a0);
var _MemoryContextStrdup = Module['_MemoryContextStrdup'] = (a0, a1) => (_MemoryContextStrdup = Module['_MemoryContextStrdup'] = wasmExports['MemoryContextStrdup'])(a0, a1);
var _try_relation_open = Module['_try_relation_open'] = (a0, a1) => (_try_relation_open = Module['_try_relation_open'] = wasmExports['try_relation_open'])(a0, a1);
var _GetForeignDataWrapper = Module['_GetForeignDataWrapper'] = (a0) => (_GetForeignDataWrapper = Module['_GetForeignDataWrapper'] = wasmExports['GetForeignDataWrapper'])(a0);
var _lookup_rowtype_tupdesc = Module['_lookup_rowtype_tupdesc'] = (a0, a1) => (_lookup_rowtype_tupdesc = Module['_lookup_rowtype_tupdesc'] = wasmExports['lookup_rowtype_tupdesc'])(a0, a1);
var _DecrTupleDescRefCount = Module['_DecrTupleDescRefCount'] = (a0) => (_DecrTupleDescRefCount = Module['_DecrTupleDescRefCount'] = wasmExports['DecrTupleDescRefCount'])(a0);
var _untransformRelOptions = Module['_untransformRelOptions'] = (a0) => (_untransformRelOptions = Module['_untransformRelOptions'] = wasmExports['untransformRelOptions'])(a0);
var _strip_implicit_coercions = Module['_strip_implicit_coercions'] = (a0) => (_strip_implicit_coercions = Module['_strip_implicit_coercions'] = wasmExports['strip_implicit_coercions'])(a0);
var _bms_make_singleton = Module['_bms_make_singleton'] = (a0) => (_bms_make_singleton = Module['_bms_make_singleton'] = wasmExports['bms_make_singleton'])(a0);
var _get_typcollation = Module['_get_typcollation'] = (a0) => (_get_typcollation = Module['_get_typcollation'] = wasmExports['get_typcollation'])(a0);
var _find_coercion_pathway = Module['_find_coercion_pathway'] = (a0, a1, a2, a3) => (_find_coercion_pathway = Module['_find_coercion_pathway'] = wasmExports['find_coercion_pathway'])(a0, a1, a2, a3);
var _build_attrmap_by_name_if_req = Module['_build_attrmap_by_name_if_req'] = (a0, a1, a2) => (_build_attrmap_by_name_if_req = Module['_build_attrmap_by_name_if_req'] = wasmExports['build_attrmap_by_name_if_req'])(a0, a1, a2);
var _raw_parser = Module['_raw_parser'] = (a0, a1) => (_raw_parser = Module['_raw_parser'] = wasmExports['raw_parser'])(a0, a1);
var _ExecInitExpr = Module['_ExecInitExpr'] = (a0, a1) => (_ExecInitExpr = Module['_ExecInitExpr'] = wasmExports['ExecInitExpr'])(a0, a1);
var _ExecStoreAllNullTuple = Module['_ExecStoreAllNullTuple'] = (a0) => (_ExecStoreAllNullTuple = Module['_ExecStoreAllNullTuple'] = wasmExports['ExecStoreAllNullTuple'])(a0);
var _LookupFuncName = Module['_LookupFuncName'] = (a0, a1, a2, a3) => (_LookupFuncName = Module['_LookupFuncName'] = wasmExports['LookupFuncName'])(a0, a1, a2, a3);
var _namein = Module['_namein'] = (a0) => (_namein = Module['_namein'] = wasmExports['namein'])(a0);
var _execute_attr_map_slot = Module['_execute_attr_map_slot'] = (a0, a1, a2) => (_execute_attr_map_slot = Module['_execute_attr_map_slot'] = wasmExports['execute_attr_map_slot'])(a0, a1, a2);
var _tuplestore_begin_heap = Module['_tuplestore_begin_heap'] = (a0, a1, a2) => (_tuplestore_begin_heap = Module['_tuplestore_begin_heap'] = wasmExports['tuplestore_begin_heap'])(a0, a1, a2);
var _ExecForceStoreHeapTuple = Module['_ExecForceStoreHeapTuple'] = (a0, a1, a2) => (_ExecForceStoreHeapTuple = Module['_ExecForceStoreHeapTuple'] = wasmExports['ExecForceStoreHeapTuple'])(a0, a1, a2);
var _tuplestore_end = Module['_tuplestore_end'] = (a0) => (_tuplestore_end = Module['_tuplestore_end'] = wasmExports['tuplestore_end'])(a0);
var _MemoryContextAllocZero = Module['_MemoryContextAllocZero'] = (a0, a1) => (_MemoryContextAllocZero = Module['_MemoryContextAllocZero'] = wasmExports['MemoryContextAllocZero'])(a0, a1);
var _bms_equal = Module['_bms_equal'] = (a0, a1) => (_bms_equal = Module['_bms_equal'] = wasmExports['bms_equal'])(a0, a1);
var _exprLocation = Module['_exprLocation'] = (a0) => (_exprLocation = Module['_exprLocation'] = wasmExports['exprLocation'])(a0);
var _func_volatile = Module['_func_volatile'] = (a0) => (_func_volatile = Module['_func_volatile'] = wasmExports['func_volatile'])(a0);
var _timestamptz_in = Module['_timestamptz_in'] = (a0) => (_timestamptz_in = Module['_timestamptz_in'] = wasmExports['timestamptz_in'])(a0);
var _plain_crypt_verify = Module['_plain_crypt_verify'] = (a0, a1, a2, a3) => (_plain_crypt_verify = Module['_plain_crypt_verify'] = wasmExports['plain_crypt_verify'])(a0, a1, a2, a3);
var _InitMaterializedSRF = Module['_InitMaterializedSRF'] = (a0, a1) => (_InitMaterializedSRF = Module['_InitMaterializedSRF'] = wasmExports['InitMaterializedSRF'])(a0, a1);
var _strrchr = Module['_strrchr'] = (a0, a1) => (_strrchr = Module['_strrchr'] = wasmExports['strrchr'])(a0, a1);
var _tuplestore_putvalues = Module['_tuplestore_putvalues'] = (a0, a1, a2, a3) => (_tuplestore_putvalues = Module['_tuplestore_putvalues'] = wasmExports['tuplestore_putvalues'])(a0, a1, a2, a3);
var _set_config_option = Module['_set_config_option'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_set_config_option = Module['_set_config_option'] = wasmExports['set_config_option'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _fread = Module['_fread'] = (a0, a1, a2, a3) => (_fread = Module['_fread'] = wasmExports['fread'])(a0, a1, a2, a3);
var _ferror = Module['_ferror'] = (a0) => (_ferror = Module['_ferror'] = wasmExports['ferror'])(a0);
var _pg_any_to_server = Module['_pg_any_to_server'] = (a0, a1, a2) => (_pg_any_to_server = Module['_pg_any_to_server'] = wasmExports['pg_any_to_server'])(a0, a1, a2);
var _DirectFunctionCall4Coll = Module['_DirectFunctionCall4Coll'] = (a0, a1, a2, a3, a4, a5) => (_DirectFunctionCall4Coll = Module['_DirectFunctionCall4Coll'] = wasmExports['DirectFunctionCall4Coll'])(a0, a1, a2, a3, a4, a5);
var _strpbrk = Module['_strpbrk'] = (a0, a1) => (_strpbrk = Module['_strpbrk'] = wasmExports['strpbrk'])(a0, a1);
var _CreateDestReceiver = Module['_CreateDestReceiver'] = (a0) => (_CreateDestReceiver = Module['_CreateDestReceiver'] = wasmExports['CreateDestReceiver'])(a0);
var _wasm_OpenPipeStream = Module['_wasm_OpenPipeStream'] = (a0, a1) => (_wasm_OpenPipeStream = Module['_wasm_OpenPipeStream'] = wasmExports['wasm_OpenPipeStream'])(a0, a1);
var _fgets = Module['_fgets'] = (a0, a1, a2) => (_fgets = Module['_fgets'] = wasmExports['fgets'])(a0, a1, a2);
var _pg_is_ascii = Module['_pg_is_ascii'] = (a0) => (_pg_is_ascii = Module['_pg_is_ascii'] = wasmExports['pg_is_ascii'])(a0);
var _pg_get_encoding_from_locale = Module['_pg_get_encoding_from_locale'] = (a0, a1) => (_pg_get_encoding_from_locale = Module['_pg_get_encoding_from_locale'] = wasmExports['pg_get_encoding_from_locale'])(a0, a1);
var _ClosePipeStream = Module['_ClosePipeStream'] = (a0) => (_ClosePipeStream = Module['_ClosePipeStream'] = wasmExports['ClosePipeStream'])(a0);
var _GetOldestNonRemovableTransactionId = Module['_GetOldestNonRemovableTransactionId'] = (a0) => (_GetOldestNonRemovableTransactionId = Module['_GetOldestNonRemovableTransactionId'] = wasmExports['GetOldestNonRemovableTransactionId'])(a0);
var _BlockSampler_Init = Module['_BlockSampler_Init'] = (a0, a1, a2, a3) => (_BlockSampler_Init = Module['_BlockSampler_Init'] = wasmExports['BlockSampler_Init'])(a0, a1, a2, a3);
var _reservoir_init_selection_state = Module['_reservoir_init_selection_state'] = (a0, a1) => (_reservoir_init_selection_state = Module['_reservoir_init_selection_state'] = wasmExports['reservoir_init_selection_state'])(a0, a1);
var _BlockSampler_HasMore = Module['_BlockSampler_HasMore'] = (a0) => (_BlockSampler_HasMore = Module['_BlockSampler_HasMore'] = wasmExports['BlockSampler_HasMore'])(a0);
var _BlockSampler_Next = Module['_BlockSampler_Next'] = (a0) => (_BlockSampler_Next = Module['_BlockSampler_Next'] = wasmExports['BlockSampler_Next'])(a0);
var _PrefetchBuffer = Module['_PrefetchBuffer'] = (a0, a1, a2, a3) => (_PrefetchBuffer = Module['_PrefetchBuffer'] = wasmExports['PrefetchBuffer'])(a0, a1, a2, a3);
var _vacuum_delay_point = Module['_vacuum_delay_point'] = () => (_vacuum_delay_point = Module['_vacuum_delay_point'] = wasmExports['vacuum_delay_point'])();
var _reservoir_get_next_S = Module['_reservoir_get_next_S'] = (a0, a1, a2) => (_reservoir_get_next_S = Module['_reservoir_get_next_S'] = wasmExports['reservoir_get_next_S'])(a0, a1, a2);
var _sampler_random_fract = Module['_sampler_random_fract'] = (a0) => (_sampler_random_fract = Module['_sampler_random_fract'] = wasmExports['sampler_random_fract'])(a0);
var _execute_attr_map_tuple = Module['_execute_attr_map_tuple'] = (a0, a1) => (_execute_attr_map_tuple = Module['_execute_attr_map_tuple'] = wasmExports['execute_attr_map_tuple'])(a0, a1);
var _makeStringInfo = Module['_makeStringInfo'] = () => (_makeStringInfo = Module['_makeStringInfo'] = wasmExports['makeStringInfo'])();
var _ExplainBeginOutput = Module['_ExplainBeginOutput'] = (a0) => (_ExplainBeginOutput = Module['_ExplainBeginOutput'] = wasmExports['ExplainBeginOutput'])(a0);
var _NewExplainState = Module['_NewExplainState'] = () => (_NewExplainState = Module['_NewExplainState'] = wasmExports['NewExplainState'])();
var _clock_gettime = Module['_clock_gettime'] = (a0, a1) => (_clock_gettime = Module['_clock_gettime'] = wasmExports['clock_gettime'])(a0, a1);
var _BufferUsageAccumDiff = Module['_BufferUsageAccumDiff'] = (a0, a1, a2) => (_BufferUsageAccumDiff = Module['_BufferUsageAccumDiff'] = wasmExports['BufferUsageAccumDiff'])(a0, a1, a2);
var _ExplainEndOutput = Module['_ExplainEndOutput'] = (a0) => (_ExplainEndOutput = Module['_ExplainEndOutput'] = wasmExports['ExplainEndOutput'])(a0);
var _appendStringInfoSpaces = Module['_appendStringInfoSpaces'] = (a0, a1) => (_appendStringInfoSpaces = Module['_appendStringInfoSpaces'] = wasmExports['appendStringInfoSpaces'])(a0, a1);
var _escape_json = Module['_escape_json'] = (a0, a1) => (_escape_json = Module['_escape_json'] = wasmExports['escape_json'])(a0, a1);
var _ExplainPrintPlan = Module['_ExplainPrintPlan'] = (a0, a1) => (_ExplainPrintPlan = Module['_ExplainPrintPlan'] = wasmExports['ExplainPrintPlan'])(a0, a1);
var _ExplainPrintTriggers = Module['_ExplainPrintTriggers'] = (a0, a1) => (_ExplainPrintTriggers = Module['_ExplainPrintTriggers'] = wasmExports['ExplainPrintTriggers'])(a0, a1);
var _GetConfigOptionByName = Module['_GetConfigOptionByName'] = (a0, a1, a2) => (_GetConfigOptionByName = Module['_GetConfigOptionByName'] = wasmExports['GetConfigOptionByName'])(a0, a1, a2);
var _ExplainPrintJITSummary = Module['_ExplainPrintJITSummary'] = (a0, a1) => (_ExplainPrintJITSummary = Module['_ExplainPrintJITSummary'] = wasmExports['ExplainPrintJITSummary'])(a0, a1);
var _InstrEndLoop = Module['_InstrEndLoop'] = (a0) => (_InstrEndLoop = Module['_InstrEndLoop'] = wasmExports['InstrEndLoop'])(a0);
var _ExplainPropertyInteger = Module['_ExplainPropertyInteger'] = (a0, a1, a2, a3) => (_ExplainPropertyInteger = Module['_ExplainPropertyInteger'] = wasmExports['ExplainPropertyInteger'])(a0, a1, a2, a3);
var _make_orclause = Module['_make_orclause'] = (a0) => (_make_orclause = Module['_make_orclause'] = wasmExports['make_orclause'])(a0);
var _ExplainQueryText = Module['_ExplainQueryText'] = (a0, a1) => (_ExplainQueryText = Module['_ExplainQueryText'] = wasmExports['ExplainQueryText'])(a0, a1);
var _ExplainPropertyText = Module['_ExplainPropertyText'] = (a0, a1, a2) => (_ExplainPropertyText = Module['_ExplainPropertyText'] = wasmExports['ExplainPropertyText'])(a0, a1, a2);
var _ExplainQueryParameters = Module['_ExplainQueryParameters'] = (a0, a1, a2) => (_ExplainQueryParameters = Module['_ExplainQueryParameters'] = wasmExports['ExplainQueryParameters'])(a0, a1, a2);
var _get_func_namespace = Module['_get_func_namespace'] = (a0) => (_get_func_namespace = Module['_get_func_namespace'] = wasmExports['get_func_namespace'])(a0);
var _resetStringInfo = Module['_resetStringInfo'] = (a0) => (_resetStringInfo = Module['_resetStringInfo'] = wasmExports['resetStringInfo'])(a0);
var _path_is_prefix_of_path = Module['_path_is_prefix_of_path'] = (a0, a1) => (_path_is_prefix_of_path = Module['_path_is_prefix_of_path'] = wasmExports['path_is_prefix_of_path'])(a0, a1);
var _symlink = Module['_symlink'] = (a0, a1) => (_symlink = Module['_symlink'] = wasmExports['symlink'])(a0, a1);
var _rmdir = Module['_rmdir'] = (a0) => (_rmdir = Module['_rmdir'] = wasmExports['rmdir'])(a0);
var _lstat = Module['_lstat'] = (a0, a1) => (_lstat = Module['_lstat'] = wasmExports['lstat'])(a0, a1);
var _parse_int = Module['_parse_int'] = (a0, a1, a2, a3) => (_parse_int = Module['_parse_int'] = wasmExports['parse_int'])(a0, a1, a2, a3);
var _MultiXactIdPrecedesOrEquals = Module['_MultiXactIdPrecedesOrEquals'] = (a0, a1) => (_MultiXactIdPrecedesOrEquals = Module['_MultiXactIdPrecedesOrEquals'] = wasmExports['MultiXactIdPrecedesOrEquals'])(a0, a1);
var _vac_estimate_reltuples = Module['_vac_estimate_reltuples'] = (a0, a1, a2, a3) => (_vac_estimate_reltuples = Module['_vac_estimate_reltuples'] = wasmExports['vac_estimate_reltuples'])(a0, a1, a2, a3);
var _bsearch = Module['_bsearch'] = (a0, a1, a2, a3, a4) => (_bsearch = Module['_bsearch'] = wasmExports['bsearch'])(a0, a1, a2, a3, a4);
var _scanner_isspace = Module['_scanner_isspace'] = (a0) => (_scanner_isspace = Module['_scanner_isspace'] = wasmExports['scanner_isspace'])(a0);
var _SetTuplestoreDestReceiverParams = Module['_SetTuplestoreDestReceiverParams'] = (a0, a1, a2, a3, a4, a5) => (_SetTuplestoreDestReceiverParams = Module['_SetTuplestoreDestReceiverParams'] = wasmExports['SetTuplestoreDestReceiverParams'])(a0, a1, a2, a3, a4, a5);
var _MemoryContextDeleteChildren = Module['_MemoryContextDeleteChildren'] = (a0) => (_MemoryContextDeleteChildren = Module['_MemoryContextDeleteChildren'] = wasmExports['MemoryContextDeleteChildren'])(a0);
var _UnlockReleaseBuffer = Module['_UnlockReleaseBuffer'] = (a0) => (_UnlockReleaseBuffer = Module['_UnlockReleaseBuffer'] = wasmExports['UnlockReleaseBuffer'])(a0);
var _ReadBuffer = Module['_ReadBuffer'] = (a0, a1) => (_ReadBuffer = Module['_ReadBuffer'] = wasmExports['ReadBuffer'])(a0, a1);
var _LockBuffer = Module['_LockBuffer'] = (a0, a1) => (_LockBuffer = Module['_LockBuffer'] = wasmExports['LockBuffer'])(a0, a1);
var _nextval = Module['_nextval'] = (a0) => (_nextval = Module['_nextval'] = wasmExports['nextval'])(a0);
var _textToQualifiedNameList = Module['_textToQualifiedNameList'] = (a0) => (_textToQualifiedNameList = Module['_textToQualifiedNameList'] = wasmExports['textToQualifiedNameList'])(a0);
var _MarkBufferDirty = Module['_MarkBufferDirty'] = (a0) => (_MarkBufferDirty = Module['_MarkBufferDirty'] = wasmExports['MarkBufferDirty'])(a0);
var _makeDefElem = Module['_makeDefElem'] = (a0, a1, a2) => (_makeDefElem = Module['_makeDefElem'] = wasmExports['makeDefElem'])(a0, a1, a2);
var _makeBoolean = Module['_makeBoolean'] = (a0) => (_makeBoolean = Module['_makeBoolean'] = wasmExports['makeBoolean'])(a0);
var _PageInit = Module['_PageInit'] = (a0, a1, a2) => (_PageInit = Module['_PageInit'] = wasmExports['PageInit'])(a0, a1, a2);
var _PageAddItemExtended = Module['_PageAddItemExtended'] = (a0, a1, a2, a3, a4) => (_PageAddItemExtended = Module['_PageAddItemExtended'] = wasmExports['PageAddItemExtended'])(a0, a1, a2, a3, a4);
var _ExtendBufferedRel = Module['_ExtendBufferedRel'] = (a0, a1, a2, a3) => (_ExtendBufferedRel = Module['_ExtendBufferedRel'] = wasmExports['ExtendBufferedRel'])(a0, a1, a2, a3);
var _Async_Notify = Module['_Async_Notify'] = (a0, a1) => (_Async_Notify = Module['_Async_Notify'] = wasmExports['Async_Notify'])(a0, a1);
var _GetCurrentTransactionId = Module['_GetCurrentTransactionId'] = () => (_GetCurrentTransactionId = Module['_GetCurrentTransactionId'] = wasmExports['GetCurrentTransactionId'])();
var _TransactionIdDidCommit = Module['_TransactionIdDidCommit'] = (a0) => (_TransactionIdDidCommit = Module['_TransactionIdDidCommit'] = wasmExports['TransactionIdDidCommit'])(a0);
var _hash_bytes = Module['_hash_bytes'] = (a0, a1) => (_hash_bytes = Module['_hash_bytes'] = wasmExports['hash_bytes'])(a0, a1);
var _ProcessCopyOptions = Module['_ProcessCopyOptions'] = (a0, a1, a2, a3) => (_ProcessCopyOptions = Module['_ProcessCopyOptions'] = wasmExports['ProcessCopyOptions'])(a0, a1, a2, a3);
var _list_member_int = Module['_list_member_int'] = (a0, a1) => (_list_member_int = Module['_list_member_int'] = wasmExports['list_member_int'])(a0, a1);
var _pg_database_encoding_max_length = Module['_pg_database_encoding_max_length'] = () => (_pg_database_encoding_max_length = Module['_pg_database_encoding_max_length'] = wasmExports['pg_database_encoding_max_length'])();
var _fstat = Module['_fstat'] = (a0, a1) => (_fstat = Module['_fstat'] = wasmExports['fstat'])(a0, a1);
var _pg_server_to_any = Module['_pg_server_to_any'] = (a0, a1, a2) => (_pg_server_to_any = Module['_pg_server_to_any'] = wasmExports['pg_server_to_any'])(a0, a1, a2);
var _pg_encoding_mblen = Module['_pg_encoding_mblen'] = (a0, a1) => (_pg_encoding_mblen = Module['_pg_encoding_mblen'] = wasmExports['pg_encoding_mblen'])(a0, a1);
var _OutputFunctionCall = Module['_OutputFunctionCall'] = (a0, a1) => (_OutputFunctionCall = Module['_OutputFunctionCall'] = wasmExports['OutputFunctionCall'])(a0, a1);
var _wait_result_to_str = Module['_wait_result_to_str'] = (a0) => (_wait_result_to_str = Module['_wait_result_to_str'] = wasmExports['wait_result_to_str'])(a0);
var _GetCommandTagName = Module['_GetCommandTagName'] = (a0) => (_GetCommandTagName = Module['_GetCommandTagName'] = wasmExports['GetCommandTagName'])(a0);
var _CreateExprContext = Module['_CreateExprContext'] = (a0) => (_CreateExprContext = Module['_CreateExprContext'] = wasmExports['CreateExprContext'])(a0);
var _EnsurePortalSnapshotExists = Module['_EnsurePortalSnapshotExists'] = () => (_EnsurePortalSnapshotExists = Module['_EnsurePortalSnapshotExists'] = wasmExports['EnsurePortalSnapshotExists'])();
var _CopyFromErrorCallback = Module['_CopyFromErrorCallback'] = (a0) => (_CopyFromErrorCallback = Module['_CopyFromErrorCallback'] = wasmExports['CopyFromErrorCallback'])(a0);
var _ExecInitRangeTable = Module['_ExecInitRangeTable'] = (a0, a1, a2) => (_ExecInitRangeTable = Module['_ExecInitRangeTable'] = wasmExports['ExecInitRangeTable'])(a0, a1, a2);
var _NextCopyFrom = Module['_NextCopyFrom'] = (a0, a1, a2, a3) => (_NextCopyFrom = Module['_NextCopyFrom'] = wasmExports['NextCopyFrom'])(a0, a1, a2, a3);
var _BeginCopyFrom = Module['_BeginCopyFrom'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_BeginCopyFrom = Module['_BeginCopyFrom'] = wasmExports['BeginCopyFrom'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _getTypeInputInfo = Module['_getTypeInputInfo'] = (a0, a1, a2) => (_getTypeInputInfo = Module['_getTypeInputInfo'] = wasmExports['getTypeInputInfo'])(a0, a1, a2);
var _EndCopyFrom = Module['_EndCopyFrom'] = (a0) => (_EndCopyFrom = Module['_EndCopyFrom'] = wasmExports['EndCopyFrom'])(a0);
var _pg_encoding_max_length = Module['_pg_encoding_max_length'] = (a0) => (_pg_encoding_max_length = Module['_pg_encoding_max_length'] = wasmExports['pg_encoding_max_length'])(a0);
var _report_invalid_encoding = Module['_report_invalid_encoding'] = (a0, a1, a2) => (_report_invalid_encoding = Module['_report_invalid_encoding'] = wasmExports['report_invalid_encoding'])(a0, a1, a2);
var _isxdigit = Module['_isxdigit'] = (a0) => (_isxdigit = Module['_isxdigit'] = wasmExports['isxdigit'])(a0);
var _InputFunctionCall = Module['_InputFunctionCall'] = (a0, a1, a2, a3) => (_InputFunctionCall = Module['_InputFunctionCall'] = wasmExports['InputFunctionCall'])(a0, a1, a2, a3);
var _makeParamList = Module['_makeParamList'] = (a0) => (_makeParamList = Module['_makeParamList'] = wasmExports['makeParamList'])(a0);
var _ReleaseCachedPlan = Module['_ReleaseCachedPlan'] = (a0, a1) => (_ReleaseCachedPlan = Module['_ReleaseCachedPlan'] = wasmExports['ReleaseCachedPlan'])(a0, a1);
var _defGetStreamingMode = Module['_defGetStreamingMode'] = (a0) => (_defGetStreamingMode = Module['_defGetStreamingMode'] = wasmExports['defGetStreamingMode'])(a0);
var _pg_lsn_in = Module['_pg_lsn_in'] = (a0) => (_pg_lsn_in = Module['_pg_lsn_in'] = wasmExports['pg_lsn_in'])(a0);
var _list_delete = Module['_list_delete'] = (a0, a1) => (_list_delete = Module['_list_delete'] = wasmExports['list_delete'])(a0, a1);
var _list_member = Module['_list_member'] = (a0, a1) => (_list_member = Module['_list_member'] = wasmExports['list_member'])(a0, a1);
var _quote_literal_cstr = Module['_quote_literal_cstr'] = (a0) => (_quote_literal_cstr = Module['_quote_literal_cstr'] = wasmExports['quote_literal_cstr'])(a0);
var _pg_char_to_encoding_private = Module['_pg_char_to_encoding_private'] = (a0) => (_pg_char_to_encoding_private = Module['_pg_char_to_encoding_private'] = wasmExports['pg_char_to_encoding_private'])(a0);
var _MemoryContextSetIdentifier = Module['_MemoryContextSetIdentifier'] = (a0, a1) => (_MemoryContextSetIdentifier = Module['_MemoryContextSetIdentifier'] = wasmExports['MemoryContextSetIdentifier'])(a0, a1);
var _MemoryContextSetParent = Module['_MemoryContextSetParent'] = (a0, a1) => (_MemoryContextSetParent = Module['_MemoryContextSetParent'] = wasmExports['MemoryContextSetParent'])(a0, a1);
var _cancel_before_shmem_exit = Module['_cancel_before_shmem_exit'] = (a0, a1) => (_cancel_before_shmem_exit = Module['_cancel_before_shmem_exit'] = wasmExports['cancel_before_shmem_exit'])(a0, a1);
var _GetAccessStrategy = Module['_GetAccessStrategy'] = (a0) => (_GetAccessStrategy = Module['_GetAccessStrategy'] = wasmExports['GetAccessStrategy'])(a0);
var _BufferGetBlockNumber = Module['_BufferGetBlockNumber'] = (a0) => (_BufferGetBlockNumber = Module['_BufferGetBlockNumber'] = wasmExports['BufferGetBlockNumber'])(a0);
var _HeapTupleSatisfiesVisibility = Module['_HeapTupleSatisfiesVisibility'] = (a0, a1, a2) => (_HeapTupleSatisfiesVisibility = Module['_HeapTupleSatisfiesVisibility'] = wasmExports['HeapTupleSatisfiesVisibility'])(a0, a1, a2);
var _OpenTransientFile = Module['_OpenTransientFile'] = (a0, a1) => (_OpenTransientFile = Module['_OpenTransientFile'] = wasmExports['OpenTransientFile'])(a0, a1);
var _fd_fsync_fname = Module['_fd_fsync_fname'] = (a0, a1) => (_fd_fsync_fname = Module['_fd_fsync_fname'] = wasmExports['fd_fsync_fname'])(a0, a1);
var _CloseTransientFile = Module['_CloseTransientFile'] = (a0) => (_CloseTransientFile = Module['_CloseTransientFile'] = wasmExports['CloseTransientFile'])(a0);
var _get_commutator = Module['_get_commutator'] = (a0) => (_get_commutator = Module['_get_commutator'] = wasmExports['get_commutator'])(a0);
var _EnterParallelMode = Module['_EnterParallelMode'] = () => (_EnterParallelMode = Module['_EnterParallelMode'] = wasmExports['EnterParallelMode'])();
var _CreateParallelContext = Module['_CreateParallelContext'] = (a0, a1, a2) => (_CreateParallelContext = Module['_CreateParallelContext'] = wasmExports['CreateParallelContext'])(a0, a1, a2);
var _InitializeParallelDSM = Module['_InitializeParallelDSM'] = (a0) => (_InitializeParallelDSM = Module['_InitializeParallelDSM'] = wasmExports['InitializeParallelDSM'])(a0);
var _shm_toc_allocate = Module['_shm_toc_allocate'] = (a0, a1) => (_shm_toc_allocate = Module['_shm_toc_allocate'] = wasmExports['shm_toc_allocate'])(a0, a1);
var _shm_toc_insert = Module['_shm_toc_insert'] = (a0, a1, a2) => (_shm_toc_insert = Module['_shm_toc_insert'] = wasmExports['shm_toc_insert'])(a0, a1, a2);
var _DestroyParallelContext = Module['_DestroyParallelContext'] = (a0) => (_DestroyParallelContext = Module['_DestroyParallelContext'] = wasmExports['DestroyParallelContext'])(a0);
var _ExitParallelMode = Module['_ExitParallelMode'] = () => (_ExitParallelMode = Module['_ExitParallelMode'] = wasmExports['ExitParallelMode'])();
var _LaunchParallelWorkers = Module['_LaunchParallelWorkers'] = (a0) => (_LaunchParallelWorkers = Module['_LaunchParallelWorkers'] = wasmExports['LaunchParallelWorkers'])(a0);
var _WaitForParallelWorkersToFinish = Module['_WaitForParallelWorkersToFinish'] = (a0) => (_WaitForParallelWorkersToFinish = Module['_WaitForParallelWorkersToFinish'] = wasmExports['WaitForParallelWorkersToFinish'])(a0);
var _shm_toc_lookup = Module['_shm_toc_lookup'] = (a0, a1, a2) => (_shm_toc_lookup = Module['_shm_toc_lookup'] = wasmExports['shm_toc_lookup'])(a0, a1, a2);
var _FreeAccessStrategy = Module['_FreeAccessStrategy'] = (a0) => (_FreeAccessStrategy = Module['_FreeAccessStrategy'] = wasmExports['FreeAccessStrategy'])(a0);
var _cstring_to_text_with_len = Module['_cstring_to_text_with_len'] = (a0, a1) => (_cstring_to_text_with_len = Module['_cstring_to_text_with_len'] = wasmExports['cstring_to_text_with_len'])(a0, a1);
var _makeInteger = Module['_makeInteger'] = (a0) => (_makeInteger = Module['_makeInteger'] = wasmExports['makeInteger'])(a0);
var _SPI_connect = Module['_SPI_connect'] = () => (_SPI_connect = Module['_SPI_connect'] = wasmExports['SPI_connect'])();
var _SPI_exec = Module['_SPI_exec'] = (a0, a1) => (_SPI_exec = Module['_SPI_exec'] = wasmExports['SPI_exec'])(a0, a1);
var _SPI_execute = Module['_SPI_execute'] = (a0, a1, a2) => (_SPI_execute = Module['_SPI_execute'] = wasmExports['SPI_execute'])(a0, a1, a2);
var _SPI_getvalue = Module['_SPI_getvalue'] = (a0, a1, a2) => (_SPI_getvalue = Module['_SPI_getvalue'] = wasmExports['SPI_getvalue'])(a0, a1, a2);
var _SPI_finish = Module['_SPI_finish'] = () => (_SPI_finish = Module['_SPI_finish'] = wasmExports['SPI_finish'])();
var _iprintf = Module['_iprintf'] = (a0, a1) => (_iprintf = Module['_iprintf'] = wasmExports['iprintf'])(a0, a1);
var _abort = Module['_abort'] = () => (_abort = Module['_abort'] = wasmExports['abort'])();
var _mmap = Module['_mmap'] = (a0, a1, a2, a3, a4, a5) => (_mmap = Module['_mmap'] = wasmExports['mmap'])(a0, a1, a2, a3, a4, a5);
var _munmap = Module['_munmap'] = (a0, a1) => (_munmap = Module['_munmap'] = wasmExports['munmap'])(a0, a1);
var _find_base_rel = Module['_find_base_rel'] = (a0, a1) => (_find_base_rel = Module['_find_base_rel'] = wasmExports['find_base_rel'])(a0, a1);
var _fmgr_info_copy = Module['_fmgr_info_copy'] = (a0, a1, a2) => (_fmgr_info_copy = Module['_fmgr_info_copy'] = wasmExports['fmgr_info_copy'])(a0, a1, a2);
var _fmgr_info_cxt = Module['_fmgr_info_cxt'] = (a0, a1, a2) => (_fmgr_info_cxt = Module['_fmgr_info_cxt'] = wasmExports['fmgr_info_cxt'])(a0, a1, a2);
var _make_opclause = Module['_make_opclause'] = (a0, a1, a2, a3, a4, a5, a6) => (_make_opclause = Module['_make_opclause'] = wasmExports['make_opclause'])(a0, a1, a2, a3, a4, a5, a6);
var _makeFuncExpr = Module['_makeFuncExpr'] = (a0, a1, a2, a3, a4, a5) => (_makeFuncExpr = Module['_makeFuncExpr'] = wasmExports['makeFuncExpr'])(a0, a1, a2, a3, a4, a5);
var _qsort_arg = Module['_qsort_arg'] = (a0, a1, a2, a3, a4) => (_qsort_arg = Module['_qsort_arg'] = wasmExports['qsort_arg'])(a0, a1, a2, a3, a4);
var _datumIsEqual = Module['_datumIsEqual'] = (a0, a1, a2, a3) => (_datumIsEqual = Module['_datumIsEqual'] = wasmExports['datumIsEqual'])(a0, a1, a2, a3);
var _get_fn_expr_argtype = Module['_get_fn_expr_argtype'] = (a0, a1) => (_get_fn_expr_argtype = Module['_get_fn_expr_argtype'] = wasmExports['get_fn_expr_argtype'])(a0, a1);
var _pq_getmsgint = Module['_pq_getmsgint'] = (a0, a1) => (_pq_getmsgint = Module['_pq_getmsgint'] = wasmExports['pq_getmsgint'])(a0, a1);
var _pg_strtoint32 = Module['_pg_strtoint32'] = (a0) => (_pg_strtoint32 = Module['_pg_strtoint32'] = wasmExports['pg_strtoint32'])(a0);
var _pq_sendtext = Module['_pq_sendtext'] = (a0, a1, a2) => (_pq_sendtext = Module['_pq_sendtext'] = wasmExports['pq_sendtext'])(a0, a1, a2);
var _pq_sendfloat4 = Module['_pq_sendfloat4'] = (a0, a1) => (_pq_sendfloat4 = Module['_pq_sendfloat4'] = wasmExports['pq_sendfloat4'])(a0, a1);
var _pq_sendfloat8 = Module['_pq_sendfloat8'] = (a0, a1) => (_pq_sendfloat8 = Module['_pq_sendfloat8'] = wasmExports['pq_sendfloat8'])(a0, a1);
var _pq_begintypsend = Module['_pq_begintypsend'] = (a0) => (_pq_begintypsend = Module['_pq_begintypsend'] = wasmExports['pq_begintypsend'])(a0);
var _pq_endtypsend = Module['_pq_endtypsend'] = (a0) => (_pq_endtypsend = Module['_pq_endtypsend'] = wasmExports['pq_endtypsend'])(a0);
var _pq_getmsgfloat4 = Module['_pq_getmsgfloat4'] = (a0) => (_pq_getmsgfloat4 = Module['_pq_getmsgfloat4'] = wasmExports['pq_getmsgfloat4'])(a0);
var _pq_getmsgfloat8 = Module['_pq_getmsgfloat8'] = (a0) => (_pq_getmsgfloat8 = Module['_pq_getmsgfloat8'] = wasmExports['pq_getmsgfloat8'])(a0);
var _pq_getmsgtext = Module['_pq_getmsgtext'] = (a0, a1, a2) => (_pq_getmsgtext = Module['_pq_getmsgtext'] = wasmExports['pq_getmsgtext'])(a0, a1, a2);
var _replace_percent_placeholders = Module['_replace_percent_placeholders'] = (a0, a1, a2, a3) => (_replace_percent_placeholders = Module['_replace_percent_placeholders'] = wasmExports['replace_percent_placeholders'])(a0, a1, a2, a3);
var _explicit_bzero = Module['_explicit_bzero'] = (a0, a1) => (_explicit_bzero = Module['_explicit_bzero'] = wasmExports['explicit_bzero'])(a0, a1);
var _pg_strip_crlf = Module['_pg_strip_crlf'] = (a0) => (_pg_strip_crlf = Module['_pg_strip_crlf'] = wasmExports['pg_strip_crlf'])(a0);
var _geteuid = Module['_geteuid'] = () => (_geteuid = Module['_geteuid'] = wasmExports['geteuid'])();
var _feof = Module['_feof'] = (a0) => (_feof = Module['_feof'] = wasmExports['feof'])(a0);
var _pg_getaddrinfo_all = Module['_pg_getaddrinfo_all'] = (a0, a1, a2, a3) => (_pg_getaddrinfo_all = Module['_pg_getaddrinfo_all'] = wasmExports['pg_getaddrinfo_all'])(a0, a1, a2, a3);
var _pg_freeaddrinfo_all = Module['_pg_freeaddrinfo_all'] = (a0, a1) => (_pg_freeaddrinfo_all = Module['_pg_freeaddrinfo_all'] = wasmExports['pg_freeaddrinfo_all'])(a0, a1);
var _pg_mb2wchar_with_len = Module['_pg_mb2wchar_with_len'] = (a0, a1, a2) => (_pg_mb2wchar_with_len = Module['_pg_mb2wchar_with_len'] = wasmExports['pg_mb2wchar_with_len'])(a0, a1, a2);
var _strcat = Module['_strcat'] = (a0, a1) => (_strcat = Module['_strcat'] = wasmExports['strcat'])(a0, a1);
var _pg_md5_encrypt = Module['_pg_md5_encrypt'] = (a0, a1, a2, a3, a4) => (_pg_md5_encrypt = Module['_pg_md5_encrypt'] = wasmExports['pg_md5_encrypt'])(a0, a1, a2, a3, a4);
var _strtol = Module['_strtol'] = (a0, a1, a2) => (_strtol = Module['_strtol'] = wasmExports['strtol'])(a0, a1, a2);
var _be_lo_unlink = Module['_be_lo_unlink'] = (a0) => (_be_lo_unlink = Module['_be_lo_unlink'] = wasmExports['be_lo_unlink'])(a0);
var _text_to_cstring_buffer = Module['_text_to_cstring_buffer'] = (a0, a1, a2) => (_text_to_cstring_buffer = Module['_text_to_cstring_buffer'] = wasmExports['text_to_cstring_buffer'])(a0, a1, a2);
var _sigemptyset = Module['_sigemptyset'] = (a0) => (_sigemptyset = Module['_sigemptyset'] = wasmExports['sigemptyset'])(a0);
var _socket = Module['_socket'] = (a0, a1, a2) => (_socket = Module['_socket'] = wasmExports['socket'])(a0, a1, a2);
var _setsockopt = Module['_setsockopt'] = (a0, a1, a2, a3, a4) => (_setsockopt = Module['_setsockopt'] = wasmExports['setsockopt'])(a0, a1, a2, a3, a4);
var _strtoul = Module['_strtoul'] = (a0, a1, a2) => (_strtoul = Module['_strtoul'] = wasmExports['strtoul'])(a0, a1, a2);
var _getsockname = Module['_getsockname'] = (a0, a1, a2) => (_getsockname = Module['_getsockname'] = wasmExports['getsockname'])(a0, a1, a2);
var _pq_recvbuf_fill = Module['_pq_recvbuf_fill'] = (a0, a1) => (_pq_recvbuf_fill = Module['_pq_recvbuf_fill'] = wasmExports['pq_recvbuf_fill'])(a0, a1);
var _getsockopt = Module['_getsockopt'] = (a0, a1, a2, a3, a4) => (_getsockopt = Module['_getsockopt'] = wasmExports['getsockopt'])(a0, a1, a2, a3, a4);
var _getpeereid = Module['_getpeereid'] = (a0, a1, a2) => (_getpeereid = Module['_getpeereid'] = wasmExports['getpeereid'])(a0, a1, a2);
var _connect = Module['_connect'] = (a0, a1, a2) => (_connect = Module['_connect'] = wasmExports['connect'])(a0, a1, a2);
var _recv = Module['_recv'] = (a0, a1, a2, a3) => (_recv = Module['_recv'] = wasmExports['recv'])(a0, a1, a2, a3);
var _pg_b64_enc_len = Module['_pg_b64_enc_len'] = (a0) => (_pg_b64_enc_len = Module['_pg_b64_enc_len'] = wasmExports['pg_b64_enc_len'])(a0);
var _pg_b64_encode = Module['_pg_b64_encode'] = (a0, a1, a2, a3) => (_pg_b64_encode = Module['_pg_b64_encode'] = wasmExports['pg_b64_encode'])(a0, a1, a2, a3);
var _pg_b64_dec_len = Module['_pg_b64_dec_len'] = (a0) => (_pg_b64_dec_len = Module['_pg_b64_dec_len'] = wasmExports['pg_b64_dec_len'])(a0);
var _pg_b64_decode = Module['_pg_b64_decode'] = (a0, a1, a2, a3) => (_pg_b64_decode = Module['_pg_b64_decode'] = wasmExports['pg_b64_decode'])(a0, a1, a2, a3);
var _pg_hmac_create = Module['_pg_hmac_create'] = (a0) => (_pg_hmac_create = Module['_pg_hmac_create'] = wasmExports['pg_hmac_create'])(a0);
var _pg_hmac_init = Module['_pg_hmac_init'] = (a0, a1, a2) => (_pg_hmac_init = Module['_pg_hmac_init'] = wasmExports['pg_hmac_init'])(a0, a1, a2);
var _pg_hmac_update = Module['_pg_hmac_update'] = (a0, a1, a2) => (_pg_hmac_update = Module['_pg_hmac_update'] = wasmExports['pg_hmac_update'])(a0, a1, a2);
var _pg_hmac_final = Module['_pg_hmac_final'] = (a0, a1, a2) => (_pg_hmac_final = Module['_pg_hmac_final'] = wasmExports['pg_hmac_final'])(a0, a1, a2);
var _pg_hmac_error = Module['_pg_hmac_error'] = (a0) => (_pg_hmac_error = Module['_pg_hmac_error'] = wasmExports['pg_hmac_error'])(a0);
var _pg_hmac_free = Module['_pg_hmac_free'] = (a0) => (_pg_hmac_free = Module['_pg_hmac_free'] = wasmExports['pg_hmac_free'])(a0);
var _scram_H = Module['_scram_H'] = (a0, a1, a2, a3, a4) => (_scram_H = Module['_scram_H'] = wasmExports['scram_H'])(a0, a1, a2, a3, a4);
var _pg_saslprep = Module['_pg_saslprep'] = (a0, a1) => (_pg_saslprep = Module['_pg_saslprep'] = wasmExports['pg_saslprep'])(a0, a1);
var _scram_build_secret = Module['_scram_build_secret'] = (a0, a1, a2, a3, a4, a5, a6) => (_scram_build_secret = Module['_scram_build_secret'] = wasmExports['scram_build_secret'])(a0, a1, a2, a3, a4, a5, a6);
var _scram_SaltedPassword = Module['_scram_SaltedPassword'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_scram_SaltedPassword = Module['_scram_SaltedPassword'] = wasmExports['scram_SaltedPassword'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _scram_ServerKey = Module['_scram_ServerKey'] = (a0, a1, a2, a3, a4) => (_scram_ServerKey = Module['_scram_ServerKey'] = wasmExports['scram_ServerKey'])(a0, a1, a2, a3, a4);
var _ldexp = Module['_ldexp'] = (a0, a1) => (_ldexp = Module['_ldexp'] = wasmExports['ldexp'])(a0, a1);
var _log = Module['_log'] = (a0) => (_log = Module['_log'] = wasmExports['log'])(a0);
var _LWLockInitialize = Module['_LWLockInitialize'] = (a0, a1) => (_LWLockInitialize = Module['_LWLockInitialize'] = wasmExports['LWLockInitialize'])(a0, a1);
var _bloom_create = Module['_bloom_create'] = (a0, a1, a2) => (_bloom_create = Module['_bloom_create'] = wasmExports['bloom_create'])(a0, a1, a2);
var _bloom_free = Module['_bloom_free'] = (a0) => (_bloom_free = Module['_bloom_free'] = wasmExports['bloom_free'])(a0);
var _bloom_add_element = Module['_bloom_add_element'] = (a0, a1, a2) => (_bloom_add_element = Module['_bloom_add_element'] = wasmExports['bloom_add_element'])(a0, a1, a2);
var _hash_bytes_extended = Module['_hash_bytes_extended'] = (a0, a1, a2) => (_hash_bytes_extended = Module['_hash_bytes_extended'] = wasmExports['hash_bytes_extended'])(a0, a1, a2);
var _bloom_lacks_element = Module['_bloom_lacks_element'] = (a0, a1, a2) => (_bloom_lacks_element = Module['_bloom_lacks_element'] = wasmExports['bloom_lacks_element'])(a0, a1, a2);
var _bloom_prop_bits_set = Module['_bloom_prop_bits_set'] = (a0) => (_bloom_prop_bits_set = Module['_bloom_prop_bits_set'] = wasmExports['bloom_prop_bits_set'])(a0);
var _pairingheap_allocate = Module['_pairingheap_allocate'] = (a0, a1) => (_pairingheap_allocate = Module['_pairingheap_allocate'] = wasmExports['pairingheap_allocate'])(a0, a1);
var _pairingheap_free = Module['_pairingheap_free'] = (a0) => (_pairingheap_free = Module['_pairingheap_free'] = wasmExports['pairingheap_free'])(a0);
var _pairingheap_add = Module['_pairingheap_add'] = (a0, a1) => (_pairingheap_add = Module['_pairingheap_add'] = wasmExports['pairingheap_add'])(a0, a1);
var _pairingheap_first = Module['_pairingheap_first'] = (a0) => (_pairingheap_first = Module['_pairingheap_first'] = wasmExports['pairingheap_first'])(a0);
var _pairingheap_remove_first = Module['_pairingheap_remove_first'] = (a0) => (_pairingheap_remove_first = Module['_pairingheap_remove_first'] = wasmExports['pairingheap_remove_first'])(a0);
var _getc = Module['_getc'] = (a0) => (_getc = Module['_getc'] = wasmExports['getc'])(a0);
var _clearerr = Module['_clearerr'] = (a0) => (_clearerr = Module['_clearerr'] = wasmExports['clearerr'])(a0);
var _RmgrNotFound = Module['_RmgrNotFound'] = (a0) => (_RmgrNotFound = Module['_RmgrNotFound'] = wasmExports['RmgrNotFound'])(a0);
var _XLogReaderAllocate = Module['_XLogReaderAllocate'] = (a0, a1, a2, a3) => (_XLogReaderAllocate = Module['_XLogReaderAllocate'] = wasmExports['XLogReaderAllocate'])(a0, a1, a2, a3);
var _XLogReadRecord = Module['_XLogReadRecord'] = (a0, a1) => (_XLogReadRecord = Module['_XLogReadRecord'] = wasmExports['XLogReadRecord'])(a0, a1);
var _XLogReaderFree = Module['_XLogReaderFree'] = (a0) => (_XLogReaderFree = Module['_XLogReaderFree'] = wasmExports['XLogReaderFree'])(a0);
var _OutputPluginPrepareWrite = Module['_OutputPluginPrepareWrite'] = (a0, a1) => (_OutputPluginPrepareWrite = Module['_OutputPluginPrepareWrite'] = wasmExports['OutputPluginPrepareWrite'])(a0, a1);
var _OutputPluginWrite = Module['_OutputPluginWrite'] = (a0, a1) => (_OutputPluginWrite = Module['_OutputPluginWrite'] = wasmExports['OutputPluginWrite'])(a0, a1);
var _OutputPluginUpdateProgress = Module['_OutputPluginUpdateProgress'] = (a0, a1) => (_OutputPluginUpdateProgress = Module['_OutputPluginUpdateProgress'] = wasmExports['OutputPluginUpdateProgress'])(a0, a1);
var _tuplestore_tuple_count = Module['_tuplestore_tuple_count'] = (a0) => (_tuplestore_tuple_count = Module['_tuplestore_tuple_count'] = wasmExports['tuplestore_tuple_count'])(a0);
var _WaitLatchOrSocket = Module['_WaitLatchOrSocket'] = (a0, a1, a2, a3, a4) => (_WaitLatchOrSocket = Module['_WaitLatchOrSocket'] = wasmExports['WaitLatchOrSocket'])(a0, a1, a2, a3, a4);
var _logicalrep_write_begin = Module['_logicalrep_write_begin'] = (a0, a1) => (_logicalrep_write_begin = Module['_logicalrep_write_begin'] = wasmExports['logicalrep_write_begin'])(a0, a1);
var _logicalrep_write_commit = Module['_logicalrep_write_commit'] = (a0, a1, a2) => (_logicalrep_write_commit = Module['_logicalrep_write_commit'] = wasmExports['logicalrep_write_commit'])(a0, a1, a2);
var _logicalrep_write_begin_prepare = Module['_logicalrep_write_begin_prepare'] = (a0, a1) => (_logicalrep_write_begin_prepare = Module['_logicalrep_write_begin_prepare'] = wasmExports['logicalrep_write_begin_prepare'])(a0, a1);
var _logicalrep_write_prepare = Module['_logicalrep_write_prepare'] = (a0, a1, a2) => (_logicalrep_write_prepare = Module['_logicalrep_write_prepare'] = wasmExports['logicalrep_write_prepare'])(a0, a1, a2);
var _logicalrep_write_commit_prepared = Module['_logicalrep_write_commit_prepared'] = (a0, a1, a2) => (_logicalrep_write_commit_prepared = Module['_logicalrep_write_commit_prepared'] = wasmExports['logicalrep_write_commit_prepared'])(a0, a1, a2);
var _logicalrep_write_rollback_prepared = Module['_logicalrep_write_rollback_prepared'] = (a0, a1, a2, a3) => (_logicalrep_write_rollback_prepared = Module['_logicalrep_write_rollback_prepared'] = wasmExports['logicalrep_write_rollback_prepared'])(a0, a1, a2, a3);
var _logicalrep_write_stream_prepare = Module['_logicalrep_write_stream_prepare'] = (a0, a1, a2) => (_logicalrep_write_stream_prepare = Module['_logicalrep_write_stream_prepare'] = wasmExports['logicalrep_write_stream_prepare'])(a0, a1, a2);
var _logicalrep_write_origin = Module['_logicalrep_write_origin'] = (a0, a1, a2) => (_logicalrep_write_origin = Module['_logicalrep_write_origin'] = wasmExports['logicalrep_write_origin'])(a0, a1, a2);
var _logicalrep_write_insert = Module['_logicalrep_write_insert'] = (a0, a1, a2, a3, a4, a5) => (_logicalrep_write_insert = Module['_logicalrep_write_insert'] = wasmExports['logicalrep_write_insert'])(a0, a1, a2, a3, a4, a5);
var _OidOutputFunctionCall = Module['_OidOutputFunctionCall'] = (a0, a1) => (_OidOutputFunctionCall = Module['_OidOutputFunctionCall'] = wasmExports['OidOutputFunctionCall'])(a0, a1);
var _logicalrep_write_update = Module['_logicalrep_write_update'] = (a0, a1, a2, a3, a4, a5, a6) => (_logicalrep_write_update = Module['_logicalrep_write_update'] = wasmExports['logicalrep_write_update'])(a0, a1, a2, a3, a4, a5, a6);
var _logicalrep_write_delete = Module['_logicalrep_write_delete'] = (a0, a1, a2, a3, a4, a5) => (_logicalrep_write_delete = Module['_logicalrep_write_delete'] = wasmExports['logicalrep_write_delete'])(a0, a1, a2, a3, a4, a5);
var _logicalrep_write_truncate = Module['_logicalrep_write_truncate'] = (a0, a1, a2, a3, a4, a5) => (_logicalrep_write_truncate = Module['_logicalrep_write_truncate'] = wasmExports['logicalrep_write_truncate'])(a0, a1, a2, a3, a4, a5);
var _logicalrep_write_message = Module['_logicalrep_write_message'] = (a0, a1, a2, a3, a4, a5, a6) => (_logicalrep_write_message = Module['_logicalrep_write_message'] = wasmExports['logicalrep_write_message'])(a0, a1, a2, a3, a4, a5, a6);
var _logicalrep_write_rel = Module['_logicalrep_write_rel'] = (a0, a1, a2, a3) => (_logicalrep_write_rel = Module['_logicalrep_write_rel'] = wasmExports['logicalrep_write_rel'])(a0, a1, a2, a3);
var _logicalrep_write_typ = Module['_logicalrep_write_typ'] = (a0, a1, a2) => (_logicalrep_write_typ = Module['_logicalrep_write_typ'] = wasmExports['logicalrep_write_typ'])(a0, a1, a2);
var _logicalrep_write_stream_start = Module['_logicalrep_write_stream_start'] = (a0, a1, a2) => (_logicalrep_write_stream_start = Module['_logicalrep_write_stream_start'] = wasmExports['logicalrep_write_stream_start'])(a0, a1, a2);
var _logicalrep_write_stream_stop = Module['_logicalrep_write_stream_stop'] = (a0) => (_logicalrep_write_stream_stop = Module['_logicalrep_write_stream_stop'] = wasmExports['logicalrep_write_stream_stop'])(a0);
var _logicalrep_write_stream_commit = Module['_logicalrep_write_stream_commit'] = (a0, a1, a2) => (_logicalrep_write_stream_commit = Module['_logicalrep_write_stream_commit'] = wasmExports['logicalrep_write_stream_commit'])(a0, a1, a2);
var _logicalrep_write_stream_abort = Module['_logicalrep_write_stream_abort'] = (a0, a1, a2, a3, a4, a5) => (_logicalrep_write_stream_abort = Module['_logicalrep_write_stream_abort'] = wasmExports['logicalrep_write_stream_abort'])(a0, a1, a2, a3, a4, a5);
var _GenerationContextCreate = Module['_GenerationContextCreate'] = (a0, a1, a2, a3, a4) => (_GenerationContextCreate = Module['_GenerationContextCreate'] = wasmExports['GenerationContextCreate'])(a0, a1, a2, a3, a4);
var _BeginInternalSubTransaction = Module['_BeginInternalSubTransaction'] = (a0) => (_BeginInternalSubTransaction = Module['_BeginInternalSubTransaction'] = wasmExports['BeginInternalSubTransaction'])(a0);
var _RollbackAndReleaseCurrentSubTransaction = Module['_RollbackAndReleaseCurrentSubTransaction'] = () => (_RollbackAndReleaseCurrentSubTransaction = Module['_RollbackAndReleaseCurrentSubTransaction'] = wasmExports['RollbackAndReleaseCurrentSubTransaction'])();
var _sscanf = Module['_sscanf'] = (a0, a1, a2) => (_sscanf = Module['_sscanf'] = wasmExports['sscanf'])(a0, a1, a2);
var _CopyErrorData = Module['_CopyErrorData'] = () => (_CopyErrorData = Module['_CopyErrorData'] = wasmExports['CopyErrorData'])();
var _FreeErrorData = Module['_FreeErrorData'] = (a0) => (_FreeErrorData = Module['_FreeErrorData'] = wasmExports['FreeErrorData'])(a0);
var _RelidByRelfilenumber = Module['_RelidByRelfilenumber'] = (a0, a1) => (_RelidByRelfilenumber = Module['_RelidByRelfilenumber'] = wasmExports['RelidByRelfilenumber'])(a0, a1);
var _RelationIdGetRelation = Module['_RelationIdGetRelation'] = (a0) => (_RelationIdGetRelation = Module['_RelationIdGetRelation'] = wasmExports['RelationIdGetRelation'])(a0);
var _heap_deform_tuple = Module['_heap_deform_tuple'] = (a0, a1, a2, a3) => (_heap_deform_tuple = Module['_heap_deform_tuple'] = wasmExports['heap_deform_tuple'])(a0, a1, a2, a3);
var _RelationClose = Module['_RelationClose'] = (a0) => (_RelationClose = Module['_RelationClose'] = wasmExports['RelationClose'])(a0);
var _TransactionIdIsCurrentTransactionId = Module['_TransactionIdIsCurrentTransactionId'] = (a0) => (_TransactionIdIsCurrentTransactionId = Module['_TransactionIdIsCurrentTransactionId'] = wasmExports['TransactionIdIsCurrentTransactionId'])(a0);
var _dsm_create = Module['_dsm_create'] = (a0, a1) => (_dsm_create = Module['_dsm_create'] = wasmExports['dsm_create'])(a0, a1);
var _dsm_segment_address = Module['_dsm_segment_address'] = (a0) => (_dsm_segment_address = Module['_dsm_segment_address'] = wasmExports['dsm_segment_address'])(a0);
var _dsm_segment_handle = Module['_dsm_segment_handle'] = (a0) => (_dsm_segment_handle = Module['_dsm_segment_handle'] = wasmExports['dsm_segment_handle'])(a0);
var _dsm_attach = Module['_dsm_attach'] = (a0) => (_dsm_attach = Module['_dsm_attach'] = wasmExports['dsm_attach'])(a0);
var _dsm_detach = Module['_dsm_detach'] = (a0) => (_dsm_detach = Module['_dsm_detach'] = wasmExports['dsm_detach'])(a0);
var _list_member_xid = Module['_list_member_xid'] = (a0, a1) => (_list_member_xid = Module['_list_member_xid'] = wasmExports['list_member_xid'])(a0, a1);
var _lappend_xid = Module['_lappend_xid'] = (a0, a1) => (_lappend_xid = Module['_lappend_xid'] = wasmExports['lappend_xid'])(a0, a1);
var _addRTEPermissionInfo = Module['_addRTEPermissionInfo'] = (a0, a1) => (_addRTEPermissionInfo = Module['_addRTEPermissionInfo'] = wasmExports['addRTEPermissionInfo'])(a0, a1);
var _GetFlushRecPtr = Module['_GetFlushRecPtr'] = (a0) => (_GetFlushRecPtr = Module['_GetFlushRecPtr'] = wasmExports['GetFlushRecPtr'])(a0);
var _CacheRegisterRelcacheCallback = Module['_CacheRegisterRelcacheCallback'] = (a0, a1) => (_CacheRegisterRelcacheCallback = Module['_CacheRegisterRelcacheCallback'] = wasmExports['CacheRegisterRelcacheCallback'])(a0, a1);
var _hash_seq_term = Module['_hash_seq_term'] = (a0) => (_hash_seq_term = Module['_hash_seq_term'] = wasmExports['hash_seq_term'])(a0);
var _replorigin_by_oid = Module['_replorigin_by_oid'] = (a0, a1, a2) => (_replorigin_by_oid = Module['_replorigin_by_oid'] = wasmExports['replorigin_by_oid'])(a0, a1, a2);
var _fd_durable_rename = Module['_fd_durable_rename'] = (a0, a1, a2) => (_fd_durable_rename = Module['_fd_durable_rename'] = wasmExports['fd_durable_rename'])(a0, a1, a2);
var _array_contains_nulls = Module['_array_contains_nulls'] = (a0) => (_array_contains_nulls = Module['_array_contains_nulls'] = wasmExports['array_contains_nulls'])(a0);
var _wal_segment_close = Module['_wal_segment_close'] = (a0) => (_wal_segment_close = Module['_wal_segment_close'] = wasmExports['wal_segment_close'])(a0);
var _wal_segment_open = Module['_wal_segment_open'] = (a0, a1, a2) => (_wal_segment_open = Module['_wal_segment_open'] = wasmExports['wal_segment_open'])(a0, a1, a2);
var _PQconnectStartParams = Module['_PQconnectStartParams'] = (a0, a1, a2) => (_PQconnectStartParams = Module['_PQconnectStartParams'] = wasmExports['PQconnectStartParams'])(a0, a1, a2);
var _PQstatus = Module['_PQstatus'] = (a0) => (_PQstatus = Module['_PQstatus'] = wasmExports['PQstatus'])(a0);
var _PQsocket = Module['_PQsocket'] = (a0) => (_PQsocket = Module['_PQsocket'] = wasmExports['PQsocket'])(a0);
var _ProcessWalRcvInterrupts = Module['_ProcessWalRcvInterrupts'] = () => (_ProcessWalRcvInterrupts = Module['_ProcessWalRcvInterrupts'] = wasmExports['ProcessWalRcvInterrupts'])();
var _PQconnectPoll = Module['_PQconnectPoll'] = (a0) => (_PQconnectPoll = Module['_PQconnectPoll'] = wasmExports['PQconnectPoll'])(a0);
var _PQconnectionUsedPassword = Module['_PQconnectionUsedPassword'] = (a0) => (_PQconnectionUsedPassword = Module['_PQconnectionUsedPassword'] = wasmExports['PQconnectionUsedPassword'])(a0);
var _PQfinish = Module['_PQfinish'] = (a0) => (_PQfinish = Module['_PQfinish'] = wasmExports['PQfinish'])(a0);
var _PQresultStatus = Module['_PQresultStatus'] = (a0) => (_PQresultStatus = Module['_PQresultStatus'] = wasmExports['PQresultStatus'])(a0);
var _PQclear = Module['_PQclear'] = (a0) => (_PQclear = Module['_PQclear'] = wasmExports['PQclear'])(a0);
var _PQerrorMessage = Module['_PQerrorMessage'] = (a0) => (_PQerrorMessage = Module['_PQerrorMessage'] = wasmExports['PQerrorMessage'])(a0);
var _pchomp = Module['_pchomp'] = (a0) => (_pchomp = Module['_pchomp'] = wasmExports['pchomp'])(a0);
var _PQnfields = Module['_PQnfields'] = (a0) => (_PQnfields = Module['_PQnfields'] = wasmExports['PQnfields'])(a0);
var _PQntuples = Module['_PQntuples'] = (a0) => (_PQntuples = Module['_PQntuples'] = wasmExports['PQntuples'])(a0);
var _PQgetvalue = Module['_PQgetvalue'] = (a0, a1, a2) => (_PQgetvalue = Module['_PQgetvalue'] = wasmExports['PQgetvalue'])(a0, a1, a2);
var _PQconsumeInput = Module['_PQconsumeInput'] = (a0) => (_PQconsumeInput = Module['_PQconsumeInput'] = wasmExports['PQconsumeInput'])(a0);
var _PQgetisnull = Module['_PQgetisnull'] = (a0, a1, a2) => (_PQgetisnull = Module['_PQgetisnull'] = wasmExports['PQgetisnull'])(a0, a1, a2);
var _BuildTupleFromCStrings = Module['_BuildTupleFromCStrings'] = (a0, a1) => (_BuildTupleFromCStrings = Module['_BuildTupleFromCStrings'] = wasmExports['BuildTupleFromCStrings'])(a0, a1);
var _tuplestore_puttuple = Module['_tuplestore_puttuple'] = (a0, a1) => (_tuplestore_puttuple = Module['_tuplestore_puttuple'] = wasmExports['tuplestore_puttuple'])(a0, a1);
var _PQresultErrorField = Module['_PQresultErrorField'] = (a0, a1) => (_PQresultErrorField = Module['_PQresultErrorField'] = wasmExports['PQresultErrorField'])(a0, a1);
var _PQsendQuery = Module['_PQsendQuery'] = (a0, a1) => (_PQsendQuery = Module['_PQsendQuery'] = wasmExports['PQsendQuery'])(a0, a1);
var _PQisBusy = Module['_PQisBusy'] = (a0) => (_PQisBusy = Module['_PQisBusy'] = wasmExports['PQisBusy'])(a0);
var _PQgetResult = Module['_PQgetResult'] = (a0) => (_PQgetResult = Module['_PQgetResult'] = wasmExports['PQgetResult'])(a0);
var _pwrite = Module['_pwrite'] = (a0, a1, a2, a3) => (_pwrite = Module['_pwrite'] = wasmExports['pwrite'])(a0, a1, a2, a3);
var _timestamptz_to_str = Module['_timestamptz_to_str'] = (a0) => (_timestamptz_to_str = Module['_timestamptz_to_str'] = wasmExports['timestamptz_to_str'])(a0);
var _ResourceOwnerDelete = Module['_ResourceOwnerDelete'] = (a0) => (_ResourceOwnerDelete = Module['_ResourceOwnerDelete'] = wasmExports['ResourceOwnerDelete'])(a0);
var _lseek = Module['_lseek'] = (a0, a1, a2) => (_lseek = Module['_lseek'] = wasmExports['lseek'])(a0, a1, a2);
var _truncate_identifier = Module['_truncate_identifier'] = (a0, a1, a2) => (_truncate_identifier = Module['_truncate_identifier'] = wasmExports['truncate_identifier'])(a0, a1, a2);
var _downcase_truncate_identifier = Module['_downcase_truncate_identifier'] = (a0, a1, a2) => (_downcase_truncate_identifier = Module['_downcase_truncate_identifier'] = wasmExports['downcase_truncate_identifier'])(a0, a1, a2);
var _bms_union = Module['_bms_union'] = (a0, a1) => (_bms_union = Module['_bms_union'] = wasmExports['bms_union'])(a0, a1);
var _make_restrictinfo = Module['_make_restrictinfo'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) => (_make_restrictinfo = Module['_make_restrictinfo'] = wasmExports['make_restrictinfo'])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
var _add_path = Module['_add_path'] = (a0, a1) => (_add_path = Module['_add_path'] = wasmExports['add_path'])(a0, a1);
var _makeTargetEntry = Module['_makeTargetEntry'] = (a0, a1, a2, a3) => (_makeTargetEntry = Module['_makeTargetEntry'] = wasmExports['makeTargetEntry'])(a0, a1, a2, a3);
var _GetSysCacheHashValue = Module['_GetSysCacheHashValue'] = (a0, a1, a2, a3, a4) => (_GetSysCacheHashValue = Module['_GetSysCacheHashValue'] = wasmExports['GetSysCacheHashValue'])(a0, a1, a2, a3, a4);
var _tlist_member = Module['_tlist_member'] = (a0, a1) => (_tlist_member = Module['_tlist_member'] = wasmExports['tlist_member'])(a0, a1);
var _extract_actual_clauses = Module['_extract_actual_clauses'] = (a0, a1) => (_extract_actual_clauses = Module['_extract_actual_clauses'] = wasmExports['extract_actual_clauses'])(a0, a1);
var _cost_sort = Module['_cost_sort'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (_cost_sort = Module['_cost_sort'] = wasmExports['cost_sort'])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
var _pathkeys_contained_in = Module['_pathkeys_contained_in'] = (a0, a1) => (_pathkeys_contained_in = Module['_pathkeys_contained_in'] = wasmExports['pathkeys_contained_in'])(a0, a1);
var _change_plan_targetlist = Module['_change_plan_targetlist'] = (a0, a1, a2) => (_change_plan_targetlist = Module['_change_plan_targetlist'] = wasmExports['change_plan_targetlist'])(a0, a1, a2);
var _make_foreignscan = Module['_make_foreignscan'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_make_foreignscan = Module['_make_foreignscan'] = wasmExports['make_foreignscan'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _list_member_ptr = Module['_list_member_ptr'] = (a0, a1) => (_list_member_ptr = Module['_list_member_ptr'] = wasmExports['list_member_ptr'])(a0, a1);
var _get_sortgroupref_tle = Module['_get_sortgroupref_tle'] = (a0, a1) => (_get_sortgroupref_tle = Module['_get_sortgroupref_tle'] = wasmExports['get_sortgroupref_tle'])(a0, a1);
var _bms_nonempty_difference = Module['_bms_nonempty_difference'] = (a0, a1) => (_bms_nonempty_difference = Module['_bms_nonempty_difference'] = wasmExports['bms_nonempty_difference'])(a0, a1);
var _clamp_row_est = Module['_clamp_row_est'] = (a0) => (_clamp_row_est = Module['_clamp_row_est'] = wasmExports['clamp_row_est'])(a0);
var _type_is_rowtype = Module['_type_is_rowtype'] = (a0) => (_type_is_rowtype = Module['_type_is_rowtype'] = wasmExports['type_is_rowtype'])(a0);
var _standard_planner = Module['_standard_planner'] = (a0, a1, a2, a3) => (_standard_planner = Module['_standard_planner'] = wasmExports['standard_planner'])(a0, a1, a2, a3);
var _estimate_expression_value = Module['_estimate_expression_value'] = (a0, a1) => (_estimate_expression_value = Module['_estimate_expression_value'] = wasmExports['estimate_expression_value'])(a0, a1);
var _add_new_columns_to_pathtarget = Module['_add_new_columns_to_pathtarget'] = (a0, a1) => (_add_new_columns_to_pathtarget = Module['_add_new_columns_to_pathtarget'] = wasmExports['add_new_columns_to_pathtarget'])(a0, a1);
var _get_sortgroupref_clause_noerr = Module['_get_sortgroupref_clause_noerr'] = (a0, a1) => (_get_sortgroupref_clause_noerr = Module['_get_sortgroupref_clause_noerr'] = wasmExports['get_sortgroupref_clause_noerr'])(a0, a1);
var _get_agg_clause_costs = Module['_get_agg_clause_costs'] = (a0, a1, a2) => (_get_agg_clause_costs = Module['_get_agg_clause_costs'] = wasmExports['get_agg_clause_costs'])(a0, a1, a2);
var _grouping_is_sortable = Module['_grouping_is_sortable'] = (a0) => (_grouping_is_sortable = Module['_grouping_is_sortable'] = wasmExports['grouping_is_sortable'])(a0);
var _create_sort_path = Module['_create_sort_path'] = (a0, a1, a2, a3, a4) => (_create_sort_path = Module['_create_sort_path'] = wasmExports['create_sort_path'])(a0, a1, a2, a3, a4);
var _copy_pathtarget = Module['_copy_pathtarget'] = (a0) => (_copy_pathtarget = Module['_copy_pathtarget'] = wasmExports['copy_pathtarget'])(a0);
var _get_sortgrouplist_exprs = Module['_get_sortgrouplist_exprs'] = (a0, a1) => (_get_sortgrouplist_exprs = Module['_get_sortgrouplist_exprs'] = wasmExports['get_sortgrouplist_exprs'])(a0, a1);
var _estimate_num_groups = Module['_estimate_num_groups'] = (a0, a1, a2, a3, a4) => (_estimate_num_groups = Module['_estimate_num_groups'] = wasmExports['estimate_num_groups'])(a0, a1, a2, a3, a4);
var _cost_qual_eval = Module['_cost_qual_eval'] = (a0, a1, a2) => (_cost_qual_eval = Module['_cost_qual_eval'] = wasmExports['cost_qual_eval'])(a0, a1, a2);
var _create_projection_path = Module['_create_projection_path'] = (a0, a1, a2, a3) => (_create_projection_path = Module['_create_projection_path'] = wasmExports['create_projection_path'])(a0, a1, a2, a3);
var _set_baserel_size_estimates = Module['_set_baserel_size_estimates'] = (a0, a1) => (_set_baserel_size_estimates = Module['_set_baserel_size_estimates'] = wasmExports['set_baserel_size_estimates'])(a0, a1);
var _join_clause_is_movable_to = Module['_join_clause_is_movable_to'] = (a0, a1) => (_join_clause_is_movable_to = Module['_join_clause_is_movable_to'] = wasmExports['join_clause_is_movable_to'])(a0, a1);
var _generate_implied_equalities_for_column = Module['_generate_implied_equalities_for_column'] = (a0, a1, a2, a3, a4) => (_generate_implied_equalities_for_column = Module['_generate_implied_equalities_for_column'] = wasmExports['generate_implied_equalities_for_column'])(a0, a1, a2, a3, a4);
var _get_plan_rowmark = Module['_get_plan_rowmark'] = (a0, a1) => (_get_plan_rowmark = Module['_get_plan_rowmark'] = wasmExports['get_plan_rowmark'])(a0, a1);
var _is_pseudo_constant_for_index = Module['_is_pseudo_constant_for_index'] = (a0, a1, a2) => (_is_pseudo_constant_for_index = Module['_is_pseudo_constant_for_index'] = wasmExports['is_pseudo_constant_for_index'])(a0, a1, a2);
var _GetMemoryChunkContext = Module['_GetMemoryChunkContext'] = (a0) => (_GetMemoryChunkContext = Module['_GetMemoryChunkContext'] = wasmExports['GetMemoryChunkContext'])(a0);
var _find_join_rel = Module['_find_join_rel'] = (a0, a1) => (_find_join_rel = Module['_find_join_rel'] = wasmExports['find_join_rel'])(a0, a1);
var _clauselist_selectivity = Module['_clauselist_selectivity'] = (a0, a1, a2, a3, a4) => (_clauselist_selectivity = Module['_clauselist_selectivity'] = wasmExports['clauselist_selectivity'])(a0, a1, a2, a3, a4);
var _make_canonical_pathkey = Module['_make_canonical_pathkey'] = (a0, a1, a2, a3, a4) => (_make_canonical_pathkey = Module['_make_canonical_pathkey'] = wasmExports['make_canonical_pathkey'])(a0, a1, a2, a3, a4);
var _eclass_useful_for_merging = Module['_eclass_useful_for_merging'] = (a0, a1, a2) => (_eclass_useful_for_merging = Module['_eclass_useful_for_merging'] = wasmExports['eclass_useful_for_merging'])(a0, a1, a2);
var _update_mergeclause_eclasses = Module['_update_mergeclause_eclasses'] = (a0, a1) => (_update_mergeclause_eclasses = Module['_update_mergeclause_eclasses'] = wasmExports['update_mergeclause_eclasses'])(a0, a1);
var _get_tablespace_page_costs = Module['_get_tablespace_page_costs'] = (a0, a1, a2) => (_get_tablespace_page_costs = Module['_get_tablespace_page_costs'] = wasmExports['get_tablespace_page_costs'])(a0, a1, a2);
var _add_to_flat_tlist = Module['_add_to_flat_tlist'] = (a0, a1) => (_add_to_flat_tlist = Module['_add_to_flat_tlist'] = wasmExports['add_to_flat_tlist'])(a0, a1);
var _get_translated_update_targetlist = Module['_get_translated_update_targetlist'] = (a0, a1, a2, a3) => (_get_translated_update_targetlist = Module['_get_translated_update_targetlist'] = wasmExports['get_translated_update_targetlist'])(a0, a1, a2, a3);
var _add_row_identity_var = Module['_add_row_identity_var'] = (a0, a1, a2, a3) => (_add_row_identity_var = Module['_add_row_identity_var'] = wasmExports['add_row_identity_var'])(a0, a1, a2, a3);
var _get_rel_all_updated_cols = Module['_get_rel_all_updated_cols'] = (a0, a1) => (_get_rel_all_updated_cols = Module['_get_rel_all_updated_cols'] = wasmExports['get_rel_all_updated_cols'])(a0, a1);
var _get_typlenbyval = Module['_get_typlenbyval'] = (a0, a1, a2) => (_get_typlenbyval = Module['_get_typlenbyval'] = wasmExports['get_typlenbyval'])(a0, a1, a2);
var _ArrayGetNItems = Module['_ArrayGetNItems'] = (a0, a1) => (_ArrayGetNItems = Module['_ArrayGetNItems'] = wasmExports['ArrayGetNItems'])(a0, a1);
var _lookup_rowtype_tupdesc_domain = Module['_lookup_rowtype_tupdesc_domain'] = (a0, a1, a2) => (_lookup_rowtype_tupdesc_domain = Module['_lookup_rowtype_tupdesc_domain'] = wasmExports['lookup_rowtype_tupdesc_domain'])(a0, a1, a2);
var _list_append_unique_ptr = Module['_list_append_unique_ptr'] = (a0, a1) => (_list_append_unique_ptr = Module['_list_append_unique_ptr'] = wasmExports['list_append_unique_ptr'])(a0, a1);
var _get_baserel_parampathinfo = Module['_get_baserel_parampathinfo'] = (a0, a1, a2) => (_get_baserel_parampathinfo = Module['_get_baserel_parampathinfo'] = wasmExports['get_baserel_parampathinfo'])(a0, a1, a2);
var _create_foreignscan_path = Module['_create_foreignscan_path'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) => (_create_foreignscan_path = Module['_create_foreignscan_path'] = wasmExports['create_foreignscan_path'])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
var _create_foreign_join_path = Module['_create_foreign_join_path'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) => (_create_foreign_join_path = Module['_create_foreign_join_path'] = wasmExports['create_foreign_join_path'])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
var _create_foreign_upper_path = Module['_create_foreign_upper_path'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (_create_foreign_upper_path = Module['_create_foreign_upper_path'] = wasmExports['create_foreign_upper_path'])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
var _adjust_limit_rows_costs = Module['_adjust_limit_rows_costs'] = (a0, a1, a2, a3, a4) => (_adjust_limit_rows_costs = Module['_adjust_limit_rows_costs'] = wasmExports['adjust_limit_rows_costs'])(a0, a1, a2, a3, a4);
var _exp2 = Module['_exp2'] = (a0) => (_exp2 = Module['_exp2'] = wasmExports['exp2'])(a0);
var _pg_prng_double = Module['_pg_prng_double'] = (a0) => (_pg_prng_double = Module['_pg_prng_double'] = wasmExports['pg_prng_double'])(a0);
var _pg_prng_uint64_range = Module['_pg_prng_uint64_range'] = (a0, a1, a2) => (_pg_prng_uint64_range = Module['_pg_prng_uint64_range'] = wasmExports['pg_prng_uint64_range'])(a0, a1, a2);
var _ExecOpenScanRelation = Module['_ExecOpenScanRelation'] = (a0, a1, a2) => (_ExecOpenScanRelation = Module['_ExecOpenScanRelation'] = wasmExports['ExecOpenScanRelation'])(a0, a1, a2);
var _ItemPointerCompare = Module['_ItemPointerCompare'] = (a0, a1) => (_ItemPointerCompare = Module['_ItemPointerCompare'] = wasmExports['ItemPointerCompare'])(a0, a1);
var _ExecInitExprList = Module['_ExecInitExprList'] = (a0, a1) => (_ExecInitExprList = Module['_ExecInitExprList'] = wasmExports['ExecInitExprList'])(a0, a1);
var _ExecReScan = Module['_ExecReScan'] = (a0) => (_ExecReScan = Module['_ExecReScan'] = wasmExports['ExecReScan'])(a0);
var _ExecFindJunkAttributeInTlist = Module['_ExecFindJunkAttributeInTlist'] = (a0, a1) => (_ExecFindJunkAttributeInTlist = Module['_ExecFindJunkAttributeInTlist'] = wasmExports['ExecFindJunkAttributeInTlist'])(a0, a1);
var _MakeExpandedObjectReadOnlyInternal = Module['_MakeExpandedObjectReadOnlyInternal'] = (a0) => (_MakeExpandedObjectReadOnlyInternal = Module['_MakeExpandedObjectReadOnlyInternal'] = wasmExports['MakeExpandedObjectReadOnlyInternal'])(a0);
var _tuplesort_puttupleslot = Module['_tuplesort_puttupleslot'] = (a0, a1) => (_tuplesort_puttupleslot = Module['_tuplesort_puttupleslot'] = wasmExports['tuplesort_puttupleslot'])(a0, a1);
var _DatumGetEOHP = Module['_DatumGetEOHP'] = (a0) => (_DatumGetEOHP = Module['_DatumGetEOHP'] = wasmExports['DatumGetEOHP'])(a0);
var _expanded_record_fetch_tupdesc = Module['_expanded_record_fetch_tupdesc'] = (a0) => (_expanded_record_fetch_tupdesc = Module['_expanded_record_fetch_tupdesc'] = wasmExports['expanded_record_fetch_tupdesc'])(a0);
var _expanded_record_fetch_field = Module['_expanded_record_fetch_field'] = (a0, a1, a2) => (_expanded_record_fetch_field = Module['_expanded_record_fetch_field'] = wasmExports['expanded_record_fetch_field'])(a0, a1, a2);
var _MemoryContextAllocExtended = Module['_MemoryContextAllocExtended'] = (a0, a1, a2) => (_MemoryContextAllocExtended = Module['_MemoryContextAllocExtended'] = wasmExports['MemoryContextAllocExtended'])(a0, a1, a2);
var _MemoryContextGetParent = Module['_MemoryContextGetParent'] = (a0) => (_MemoryContextGetParent = Module['_MemoryContextGetParent'] = wasmExports['MemoryContextGetParent'])(a0);
var _DeleteExpandedObject = Module['_DeleteExpandedObject'] = (a0) => (_DeleteExpandedObject = Module['_DeleteExpandedObject'] = wasmExports['DeleteExpandedObject'])(a0);
var _ExecAsyncResponse = Module['_ExecAsyncResponse'] = (a0) => (_ExecAsyncResponse = Module['_ExecAsyncResponse'] = wasmExports['ExecAsyncResponse'])(a0);
var _ExecAsyncRequestDone = Module['_ExecAsyncRequestDone'] = (a0, a1) => (_ExecAsyncRequestDone = Module['_ExecAsyncRequestDone'] = wasmExports['ExecAsyncRequestDone'])(a0, a1);
var _ExecAsyncRequestPending = Module['_ExecAsyncRequestPending'] = (a0) => (_ExecAsyncRequestPending = Module['_ExecAsyncRequestPending'] = wasmExports['ExecAsyncRequestPending'])(a0);
var _InstrAlloc = Module['_InstrAlloc'] = (a0, a1, a2) => (_InstrAlloc = Module['_InstrAlloc'] = wasmExports['InstrAlloc'])(a0, a1, a2);
var _TupleDescInitEntryCollation = Module['_TupleDescInitEntryCollation'] = (a0, a1, a2) => (_TupleDescInitEntryCollation = Module['_TupleDescInitEntryCollation'] = wasmExports['TupleDescInitEntryCollation'])(a0, a1, a2);
var _ExecInitExprWithParams = Module['_ExecInitExprWithParams'] = (a0, a1) => (_ExecInitExprWithParams = Module['_ExecInitExprWithParams'] = wasmExports['ExecInitExprWithParams'])(a0, a1);
var _convert_tuples_by_position = Module['_convert_tuples_by_position'] = (a0, a1, a2) => (_convert_tuples_by_position = Module['_convert_tuples_by_position'] = wasmExports['convert_tuples_by_position'])(a0, a1, a2);
var _detoast_external_attr = Module['_detoast_external_attr'] = (a0) => (_detoast_external_attr = Module['_detoast_external_attr'] = wasmExports['detoast_external_attr'])(a0);
var _WinGetPartitionLocalMemory = Module['_WinGetPartitionLocalMemory'] = (a0, a1) => (_WinGetPartitionLocalMemory = Module['_WinGetPartitionLocalMemory'] = wasmExports['WinGetPartitionLocalMemory'])(a0, a1);
var _WinGetCurrentPosition = Module['_WinGetCurrentPosition'] = (a0) => (_WinGetCurrentPosition = Module['_WinGetCurrentPosition'] = wasmExports['WinGetCurrentPosition'])(a0);
var _WinGetPartitionRowCount = Module['_WinGetPartitionRowCount'] = (a0) => (_WinGetPartitionRowCount = Module['_WinGetPartitionRowCount'] = wasmExports['WinGetPartitionRowCount'])(a0);
var _WinGetFuncArgInPartition = Module['_WinGetFuncArgInPartition'] = (a0, a1, a2, a3, a4, a5, a6) => (_WinGetFuncArgInPartition = Module['_WinGetFuncArgInPartition'] = wasmExports['WinGetFuncArgInPartition'])(a0, a1, a2, a3, a4, a5, a6);
var _WinGetFuncArgCurrent = Module['_WinGetFuncArgCurrent'] = (a0, a1, a2) => (_WinGetFuncArgCurrent = Module['_WinGetFuncArgCurrent'] = wasmExports['WinGetFuncArgCurrent'])(a0, a1, a2);
var _get_attstatsslot = Module['_get_attstatsslot'] = (a0, a1, a2, a3, a4) => (_get_attstatsslot = Module['_get_attstatsslot'] = wasmExports['get_attstatsslot'])(a0, a1, a2, a3, a4);
var _free_attstatsslot = Module['_free_attstatsslot'] = (a0) => (_free_attstatsslot = Module['_free_attstatsslot'] = wasmExports['free_attstatsslot'])(a0);
var _tuplesort_begin_heap = Module['_tuplesort_begin_heap'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (_tuplesort_begin_heap = Module['_tuplesort_begin_heap'] = wasmExports['tuplesort_begin_heap'])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
var _tuplesort_gettupleslot = Module['_tuplesort_gettupleslot'] = (a0, a1, a2, a3, a4) => (_tuplesort_gettupleslot = Module['_tuplesort_gettupleslot'] = wasmExports['tuplesort_gettupleslot'])(a0, a1, a2, a3, a4);
var _ExecGetReturningSlot = Module['_ExecGetReturningSlot'] = (a0, a1) => (_ExecGetReturningSlot = Module['_ExecGetReturningSlot'] = wasmExports['ExecGetReturningSlot'])(a0, a1);
var _ItemPointerEquals = Module['_ItemPointerEquals'] = (a0, a1) => (_ItemPointerEquals = Module['_ItemPointerEquals'] = wasmExports['ItemPointerEquals'])(a0, a1);
var _ReleaseBuffer = Module['_ReleaseBuffer'] = (a0) => (_ReleaseBuffer = Module['_ReleaseBuffer'] = wasmExports['ReleaseBuffer'])(a0);
var _visibilitymap_get_status = Module['_visibilitymap_get_status'] = (a0, a1, a2) => (_visibilitymap_get_status = Module['_visibilitymap_get_status'] = wasmExports['visibilitymap_get_status'])(a0, a1, a2);
var _table_parallelscan_estimate = Module['_table_parallelscan_estimate'] = (a0, a1) => (_table_parallelscan_estimate = Module['_table_parallelscan_estimate'] = wasmExports['table_parallelscan_estimate'])(a0, a1);
var _table_parallelscan_initialize = Module['_table_parallelscan_initialize'] = (a0, a1, a2) => (_table_parallelscan_initialize = Module['_table_parallelscan_initialize'] = wasmExports['table_parallelscan_initialize'])(a0, a1, a2);
var _table_beginscan_parallel = Module['_table_beginscan_parallel'] = (a0, a1) => (_table_beginscan_parallel = Module['_table_beginscan_parallel'] = wasmExports['table_beginscan_parallel'])(a0, a1);
var _SPI_connect_ext = Module['_SPI_connect_ext'] = (a0) => (_SPI_connect_ext = Module['_SPI_connect_ext'] = wasmExports['SPI_connect_ext'])(a0);
var _SPI_commit = Module['_SPI_commit'] = () => (_SPI_commit = Module['_SPI_commit'] = wasmExports['SPI_commit'])();
var _ReThrowError = Module['_ReThrowError'] = (a0) => (_ReThrowError = Module['_ReThrowError'] = wasmExports['ReThrowError'])(a0);
var _SPI_commit_and_chain = Module['_SPI_commit_and_chain'] = () => (_SPI_commit_and_chain = Module['_SPI_commit_and_chain'] = wasmExports['SPI_commit_and_chain'])();
var _SPI_rollback = Module['_SPI_rollback'] = () => (_SPI_rollback = Module['_SPI_rollback'] = wasmExports['SPI_rollback'])();
var _SPI_rollback_and_chain = Module['_SPI_rollback_and_chain'] = () => (_SPI_rollback_and_chain = Module['_SPI_rollback_and_chain'] = wasmExports['SPI_rollback_and_chain'])();
var _SPI_freetuptable = Module['_SPI_freetuptable'] = (a0) => (_SPI_freetuptable = Module['_SPI_freetuptable'] = wasmExports['SPI_freetuptable'])(a0);
var _SPI_execute_extended = Module['_SPI_execute_extended'] = (a0, a1) => (_SPI_execute_extended = Module['_SPI_execute_extended'] = wasmExports['SPI_execute_extended'])(a0, a1);
var _SPI_execute_plan = Module['_SPI_execute_plan'] = (a0, a1, a2, a3, a4) => (_SPI_execute_plan = Module['_SPI_execute_plan'] = wasmExports['SPI_execute_plan'])(a0, a1, a2, a3, a4);
var _SPI_execp = Module['_SPI_execp'] = (a0, a1, a2, a3) => (_SPI_execp = Module['_SPI_execp'] = wasmExports['SPI_execp'])(a0, a1, a2, a3);
var _SPI_execute_plan_extended = Module['_SPI_execute_plan_extended'] = (a0, a1) => (_SPI_execute_plan_extended = Module['_SPI_execute_plan_extended'] = wasmExports['SPI_execute_plan_extended'])(a0, a1);
var _SPI_execute_plan_with_paramlist = Module['_SPI_execute_plan_with_paramlist'] = (a0, a1, a2, a3) => (_SPI_execute_plan_with_paramlist = Module['_SPI_execute_plan_with_paramlist'] = wasmExports['SPI_execute_plan_with_paramlist'])(a0, a1, a2, a3);
var _SPI_execute_with_args = Module['_SPI_execute_with_args'] = (a0, a1, a2, a3, a4, a5, a6) => (_SPI_execute_with_args = Module['_SPI_execute_with_args'] = wasmExports['SPI_execute_with_args'])(a0, a1, a2, a3, a4, a5, a6);
var _SPI_prepare = Module['_SPI_prepare'] = (a0, a1, a2) => (_SPI_prepare = Module['_SPI_prepare'] = wasmExports['SPI_prepare'])(a0, a1, a2);
var _SPI_prepare_extended = Module['_SPI_prepare_extended'] = (a0, a1) => (_SPI_prepare_extended = Module['_SPI_prepare_extended'] = wasmExports['SPI_prepare_extended'])(a0, a1);
var _SPI_keepplan = Module['_SPI_keepplan'] = (a0) => (_SPI_keepplan = Module['_SPI_keepplan'] = wasmExports['SPI_keepplan'])(a0);
var _SPI_freeplan = Module['_SPI_freeplan'] = (a0) => (_SPI_freeplan = Module['_SPI_freeplan'] = wasmExports['SPI_freeplan'])(a0);
var _SPI_copytuple = Module['_SPI_copytuple'] = (a0) => (_SPI_copytuple = Module['_SPI_copytuple'] = wasmExports['SPI_copytuple'])(a0);
var _SPI_returntuple = Module['_SPI_returntuple'] = (a0, a1) => (_SPI_returntuple = Module['_SPI_returntuple'] = wasmExports['SPI_returntuple'])(a0, a1);
var _SPI_modifytuple = Module['_SPI_modifytuple'] = (a0, a1, a2, a3, a4, a5) => (_SPI_modifytuple = Module['_SPI_modifytuple'] = wasmExports['SPI_modifytuple'])(a0, a1, a2, a3, a4, a5);
var _SPI_fnumber = Module['_SPI_fnumber'] = (a0, a1) => (_SPI_fnumber = Module['_SPI_fnumber'] = wasmExports['SPI_fnumber'])(a0, a1);
var _SPI_fname = Module['_SPI_fname'] = (a0, a1) => (_SPI_fname = Module['_SPI_fname'] = wasmExports['SPI_fname'])(a0, a1);
var _SPI_getbinval = Module['_SPI_getbinval'] = (a0, a1, a2, a3) => (_SPI_getbinval = Module['_SPI_getbinval'] = wasmExports['SPI_getbinval'])(a0, a1, a2, a3);
var _SPI_gettype = Module['_SPI_gettype'] = (a0, a1) => (_SPI_gettype = Module['_SPI_gettype'] = wasmExports['SPI_gettype'])(a0, a1);
var _SPI_gettypeid = Module['_SPI_gettypeid'] = (a0, a1) => (_SPI_gettypeid = Module['_SPI_gettypeid'] = wasmExports['SPI_gettypeid'])(a0, a1);
var _SPI_getrelname = Module['_SPI_getrelname'] = (a0) => (_SPI_getrelname = Module['_SPI_getrelname'] = wasmExports['SPI_getrelname'])(a0);
var _SPI_palloc = Module['_SPI_palloc'] = (a0) => (_SPI_palloc = Module['_SPI_palloc'] = wasmExports['SPI_palloc'])(a0);
var _SPI_repalloc = Module['_SPI_repalloc'] = (a0, a1) => (_SPI_repalloc = Module['_SPI_repalloc'] = wasmExports['SPI_repalloc'])(a0, a1);
var _SPI_pfree = Module['_SPI_pfree'] = (a0) => (_SPI_pfree = Module['_SPI_pfree'] = wasmExports['SPI_pfree'])(a0);
var _SPI_datumTransfer = Module['_SPI_datumTransfer'] = (a0, a1, a2) => (_SPI_datumTransfer = Module['_SPI_datumTransfer'] = wasmExports['SPI_datumTransfer'])(a0, a1, a2);
var _datumTransfer = Module['_datumTransfer'] = (a0, a1, a2) => (_datumTransfer = Module['_datumTransfer'] = wasmExports['datumTransfer'])(a0, a1, a2);
var _SPI_cursor_open_with_args = Module['_SPI_cursor_open_with_args'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_SPI_cursor_open_with_args = Module['_SPI_cursor_open_with_args'] = wasmExports['SPI_cursor_open_with_args'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _SPI_cursor_open_with_paramlist = Module['_SPI_cursor_open_with_paramlist'] = (a0, a1, a2, a3) => (_SPI_cursor_open_with_paramlist = Module['_SPI_cursor_open_with_paramlist'] = wasmExports['SPI_cursor_open_with_paramlist'])(a0, a1, a2, a3);
var _SPI_cursor_parse_open = Module['_SPI_cursor_parse_open'] = (a0, a1, a2) => (_SPI_cursor_parse_open = Module['_SPI_cursor_parse_open'] = wasmExports['SPI_cursor_parse_open'])(a0, a1, a2);
var _SPI_cursor_find = Module['_SPI_cursor_find'] = (a0) => (_SPI_cursor_find = Module['_SPI_cursor_find'] = wasmExports['SPI_cursor_find'])(a0);
var _SPI_cursor_fetch = Module['_SPI_cursor_fetch'] = (a0, a1, a2) => (_SPI_cursor_fetch = Module['_SPI_cursor_fetch'] = wasmExports['SPI_cursor_fetch'])(a0, a1, a2);
var _SPI_scroll_cursor_fetch = Module['_SPI_scroll_cursor_fetch'] = (a0, a1, a2) => (_SPI_scroll_cursor_fetch = Module['_SPI_scroll_cursor_fetch'] = wasmExports['SPI_scroll_cursor_fetch'])(a0, a1, a2);
var _SPI_scroll_cursor_move = Module['_SPI_scroll_cursor_move'] = (a0, a1, a2) => (_SPI_scroll_cursor_move = Module['_SPI_scroll_cursor_move'] = wasmExports['SPI_scroll_cursor_move'])(a0, a1, a2);
var _SPI_cursor_close = Module['_SPI_cursor_close'] = (a0) => (_SPI_cursor_close = Module['_SPI_cursor_close'] = wasmExports['SPI_cursor_close'])(a0);
var _SPI_result_code_string = Module['_SPI_result_code_string'] = (a0) => (_SPI_result_code_string = Module['_SPI_result_code_string'] = wasmExports['SPI_result_code_string'])(a0);
var _SPI_plan_get_plan_sources = Module['_SPI_plan_get_plan_sources'] = (a0) => (_SPI_plan_get_plan_sources = Module['_SPI_plan_get_plan_sources'] = wasmExports['SPI_plan_get_plan_sources'])(a0);
var _SPI_plan_get_cached_plan = Module['_SPI_plan_get_cached_plan'] = (a0) => (_SPI_plan_get_cached_plan = Module['_SPI_plan_get_cached_plan'] = wasmExports['SPI_plan_get_cached_plan'])(a0);
var _SPI_register_trigger_data = Module['_SPI_register_trigger_data'] = (a0) => (_SPI_register_trigger_data = Module['_SPI_register_trigger_data'] = wasmExports['SPI_register_trigger_data'])(a0);
var _FreeExprContext = Module['_FreeExprContext'] = (a0, a1) => (_FreeExprContext = Module['_FreeExprContext'] = wasmExports['FreeExprContext'])(a0, a1);
var _GetAttributeByName = Module['_GetAttributeByName'] = (a0, a1, a2) => (_GetAttributeByName = Module['_GetAttributeByName'] = wasmExports['GetAttributeByName'])(a0, a1, a2);
var _GetAttributeByNum = Module['_GetAttributeByNum'] = (a0, a1, a2) => (_GetAttributeByNum = Module['_GetAttributeByNum'] = wasmExports['GetAttributeByNum'])(a0, a1, a2);
var _ExecGetResultRelCheckAsUser = Module['_ExecGetResultRelCheckAsUser'] = (a0, a1) => (_ExecGetResultRelCheckAsUser = Module['_ExecGetResultRelCheckAsUser'] = wasmExports['ExecGetResultRelCheckAsUser'])(a0, a1);
var _index_deform_tuple = Module['_index_deform_tuple'] = (a0, a1, a2, a3) => (_index_deform_tuple = Module['_index_deform_tuple'] = wasmExports['index_deform_tuple'])(a0, a1, a2, a3);
var _standard_ExecutorStart = Module['_standard_ExecutorStart'] = (a0, a1) => (_standard_ExecutorStart = Module['_standard_ExecutorStart'] = wasmExports['standard_ExecutorStart'])(a0, a1);
var _standard_ExecutorRun = Module['_standard_ExecutorRun'] = (a0, a1, a2, a3) => (_standard_ExecutorRun = Module['_standard_ExecutorRun'] = wasmExports['standard_ExecutorRun'])(a0, a1, a2, a3);
var _standard_ExecutorFinish = Module['_standard_ExecutorFinish'] = (a0) => (_standard_ExecutorFinish = Module['_standard_ExecutorFinish'] = wasmExports['standard_ExecutorFinish'])(a0);
var _standard_ExecutorEnd = Module['_standard_ExecutorEnd'] = (a0) => (_standard_ExecutorEnd = Module['_standard_ExecutorEnd'] = wasmExports['standard_ExecutorEnd'])(a0);
var _MakeTupleTableSlot = Module['_MakeTupleTableSlot'] = (a0, a1) => (_MakeTupleTableSlot = Module['_MakeTupleTableSlot'] = wasmExports['MakeTupleTableSlot'])(a0, a1);
var _AggCheckCallContext = Module['_AggCheckCallContext'] = (a0, a1) => (_AggCheckCallContext = Module['_AggCheckCallContext'] = wasmExports['AggCheckCallContext'])(a0, a1);
var _MemoryContextMemAllocated = Module['_MemoryContextMemAllocated'] = (a0, a1) => (_MemoryContextMemAllocated = Module['_MemoryContextMemAllocated'] = wasmExports['MemoryContextMemAllocated'])(a0, a1);
var _WalUsageAccumDiff = Module['_WalUsageAccumDiff'] = (a0, a1, a2) => (_WalUsageAccumDiff = Module['_WalUsageAccumDiff'] = wasmExports['WalUsageAccumDiff'])(a0, a1, a2);
var _InstrUpdateTupleCount = Module['_InstrUpdateTupleCount'] = (a0, a1) => (_InstrUpdateTupleCount = Module['_InstrUpdateTupleCount'] = wasmExports['InstrUpdateTupleCount'])(a0, a1);
var _get_call_expr_argtype = Module['_get_call_expr_argtype'] = (a0, a1) => (_get_call_expr_argtype = Module['_get_call_expr_argtype'] = wasmExports['get_call_expr_argtype'])(a0, a1);
var _tuplesort_reset = Module['_tuplesort_reset'] = (a0) => (_tuplesort_reset = Module['_tuplesort_reset'] = wasmExports['tuplesort_reset'])(a0);
var _EOH_get_flat_size = Module['_EOH_get_flat_size'] = (a0) => (_EOH_get_flat_size = Module['_EOH_get_flat_size'] = wasmExports['EOH_get_flat_size'])(a0);
var _EOH_flatten_into = Module['_EOH_flatten_into'] = (a0, a1, a2) => (_EOH_flatten_into = Module['_EOH_flatten_into'] = wasmExports['EOH_flatten_into'])(a0, a1, a2);
var _GetNumRegisteredWaitEvents = Module['_GetNumRegisteredWaitEvents'] = (a0) => (_GetNumRegisteredWaitEvents = Module['_GetNumRegisteredWaitEvents'] = wasmExports['GetNumRegisteredWaitEvents'])(a0);
var _ExprEvalPushStep = Module['_ExprEvalPushStep'] = (a0, a1) => (_ExprEvalPushStep = Module['_ExprEvalPushStep'] = wasmExports['ExprEvalPushStep'])(a0, a1);
var _ResourceOwnerCreate = Module['_ResourceOwnerCreate'] = (a0, a1) => (_ResourceOwnerCreate = Module['_ResourceOwnerCreate'] = wasmExports['ResourceOwnerCreate'])(a0, a1);
var _ResourceOwnerReleaseAllPlanCacheRefs = Module['_ResourceOwnerReleaseAllPlanCacheRefs'] = (a0) => (_ResourceOwnerReleaseAllPlanCacheRefs = Module['_ResourceOwnerReleaseAllPlanCacheRefs'] = wasmExports['ResourceOwnerReleaseAllPlanCacheRefs'])(a0);
var _RegisterResourceReleaseCallback = Module['_RegisterResourceReleaseCallback'] = (a0, a1) => (_RegisterResourceReleaseCallback = Module['_RegisterResourceReleaseCallback'] = wasmExports['RegisterResourceReleaseCallback'])(a0, a1);
var _dlsym = Module['_dlsym'] = (a0, a1) => (_dlsym = Module['_dlsym'] = wasmExports['dlsym'])(a0, a1);
var _dlopen = Module['_dlopen'] = (a0, a1) => (_dlopen = Module['_dlopen'] = wasmExports['dlopen'])(a0, a1);
var _dlerror = Module['_dlerror'] = () => (_dlerror = Module['_dlerror'] = wasmExports['dlerror'])();
var _dlclose = Module['_dlclose'] = (a0) => (_dlclose = Module['_dlclose'] = wasmExports['dlclose'])(a0);
var _find_rendezvous_variable = Module['_find_rendezvous_variable'] = (a0) => (_find_rendezvous_variable = Module['_find_rendezvous_variable'] = wasmExports['find_rendezvous_variable'])(a0);
var _resolve_polymorphic_argtypes = Module['_resolve_polymorphic_argtypes'] = (a0, a1, a2, a3) => (_resolve_polymorphic_argtypes = Module['_resolve_polymorphic_argtypes'] = wasmExports['resolve_polymorphic_argtypes'])(a0, a1, a2, a3);
var _RelationNameGetTupleDesc = Module['_RelationNameGetTupleDesc'] = (a0) => (_RelationNameGetTupleDesc = Module['_RelationNameGetTupleDesc'] = wasmExports['RelationNameGetTupleDesc'])(a0);
var _stringToQualifiedNameList = Module['_stringToQualifiedNameList'] = (a0, a1) => (_stringToQualifiedNameList = Module['_stringToQualifiedNameList'] = wasmExports['stringToQualifiedNameList'])(a0, a1);
var _DirectFunctionCall5Coll = Module['_DirectFunctionCall5Coll'] = (a0, a1, a2, a3, a4, a5, a6) => (_DirectFunctionCall5Coll = Module['_DirectFunctionCall5Coll'] = wasmExports['DirectFunctionCall5Coll'])(a0, a1, a2, a3, a4, a5, a6);
var _CallerFInfoFunctionCall1 = Module['_CallerFInfoFunctionCall1'] = (a0, a1, a2, a3) => (_CallerFInfoFunctionCall1 = Module['_CallerFInfoFunctionCall1'] = wasmExports['CallerFInfoFunctionCall1'])(a0, a1, a2, a3);
var _CallerFInfoFunctionCall2 = Module['_CallerFInfoFunctionCall2'] = (a0, a1, a2, a3, a4) => (_CallerFInfoFunctionCall2 = Module['_CallerFInfoFunctionCall2'] = wasmExports['CallerFInfoFunctionCall2'])(a0, a1, a2, a3, a4);
var _FunctionCall0Coll = Module['_FunctionCall0Coll'] = (a0, a1) => (_FunctionCall0Coll = Module['_FunctionCall0Coll'] = wasmExports['FunctionCall0Coll'])(a0, a1);
var _FunctionCall4Coll = Module['_FunctionCall4Coll'] = (a0, a1, a2, a3, a4, a5) => (_FunctionCall4Coll = Module['_FunctionCall4Coll'] = wasmExports['FunctionCall4Coll'])(a0, a1, a2, a3, a4, a5);
var _pg_detoast_datum_slice = Module['_pg_detoast_datum_slice'] = (a0, a1, a2) => (_pg_detoast_datum_slice = Module['_pg_detoast_datum_slice'] = wasmExports['pg_detoast_datum_slice'])(a0, a1, a2);
var _get_fn_expr_rettype = Module['_get_fn_expr_rettype'] = (a0) => (_get_fn_expr_rettype = Module['_get_fn_expr_rettype'] = wasmExports['get_fn_expr_rettype'])(a0);
var _has_fn_opclass_options = Module['_has_fn_opclass_options'] = (a0) => (_has_fn_opclass_options = Module['_has_fn_opclass_options'] = wasmExports['has_fn_opclass_options'])(a0);
var _get_fn_opclass_options = Module['_get_fn_opclass_options'] = (a0) => (_get_fn_opclass_options = Module['_get_fn_opclass_options'] = wasmExports['get_fn_opclass_options'])(a0);
var __bt_mkscankey = Module['__bt_mkscankey'] = (a0, a1) => (__bt_mkscankey = Module['__bt_mkscankey'] = wasmExports['_bt_mkscankey'])(a0, a1);
var _nocache_index_getattr = Module['_nocache_index_getattr'] = (a0, a1, a2) => (_nocache_index_getattr = Module['_nocache_index_getattr'] = wasmExports['nocache_index_getattr'])(a0, a1, a2);
var _tuplesort_estimate_shared = Module['_tuplesort_estimate_shared'] = (a0) => (_tuplesort_estimate_shared = Module['_tuplesort_estimate_shared'] = wasmExports['tuplesort_estimate_shared'])(a0);
var _tuplesort_initialize_shared = Module['_tuplesort_initialize_shared'] = (a0, a1, a2) => (_tuplesort_initialize_shared = Module['_tuplesort_initialize_shared'] = wasmExports['tuplesort_initialize_shared'])(a0, a1, a2);
var _tuplesort_attach_shared = Module['_tuplesort_attach_shared'] = (a0, a1) => (_tuplesort_attach_shared = Module['_tuplesort_attach_shared'] = wasmExports['tuplesort_attach_shared'])(a0, a1);
var _textout = Module['_textout'] = (a0) => (_textout = Module['_textout'] = wasmExports['textout'])(a0);
var _tidin = Module['_tidin'] = (a0) => (_tidin = Module['_tidin'] = wasmExports['tidin'])(a0);
var _tidout = Module['_tidout'] = (a0) => (_tidout = Module['_tidout'] = wasmExports['tidout'])(a0);
var _texteq = Module['_texteq'] = (a0) => (_texteq = Module['_texteq'] = wasmExports['texteq'])(a0);
var _btint2cmp = Module['_btint2cmp'] = (a0) => (_btint2cmp = Module['_btint2cmp'] = wasmExports['btint2cmp'])(a0);
var _btint4cmp = Module['_btint4cmp'] = (a0) => (_btint4cmp = Module['_btint4cmp'] = wasmExports['btint4cmp'])(a0);
var _btfloat4cmp = Module['_btfloat4cmp'] = (a0) => (_btfloat4cmp = Module['_btfloat4cmp'] = wasmExports['btfloat4cmp'])(a0);
var _btfloat8cmp = Module['_btfloat8cmp'] = (a0) => (_btfloat8cmp = Module['_btfloat8cmp'] = wasmExports['btfloat8cmp'])(a0);
var _btoidcmp = Module['_btoidcmp'] = (a0) => (_btoidcmp = Module['_btoidcmp'] = wasmExports['btoidcmp'])(a0);
var _btcharcmp = Module['_btcharcmp'] = (a0) => (_btcharcmp = Module['_btcharcmp'] = wasmExports['btcharcmp'])(a0);
var _btnamecmp = Module['_btnamecmp'] = (a0) => (_btnamecmp = Module['_btnamecmp'] = wasmExports['btnamecmp'])(a0);
var _bttextcmp = Module['_bttextcmp'] = (a0) => (_bttextcmp = Module['_bttextcmp'] = wasmExports['bttextcmp'])(a0);
var _cash_cmp = Module['_cash_cmp'] = (a0) => (_cash_cmp = Module['_cash_cmp'] = wasmExports['cash_cmp'])(a0);
var _text_lt = Module['_text_lt'] = (a0) => (_text_lt = Module['_text_lt'] = wasmExports['text_lt'])(a0);
var _text_le = Module['_text_le'] = (a0) => (_text_le = Module['_text_le'] = wasmExports['text_le'])(a0);
var _text_gt = Module['_text_gt'] = (a0) => (_text_gt = Module['_text_gt'] = wasmExports['text_gt'])(a0);
var _text_ge = Module['_text_ge'] = (a0) => (_text_ge = Module['_text_ge'] = wasmExports['text_ge'])(a0);
var _current_query = Module['_current_query'] = (a0) => (_current_query = Module['_current_query'] = wasmExports['current_query'])(a0);
var _macaddr_eq = Module['_macaddr_eq'] = (a0) => (_macaddr_eq = Module['_macaddr_eq'] = wasmExports['macaddr_eq'])(a0);
var _macaddr_lt = Module['_macaddr_lt'] = (a0) => (_macaddr_lt = Module['_macaddr_lt'] = wasmExports['macaddr_lt'])(a0);
var _macaddr_le = Module['_macaddr_le'] = (a0) => (_macaddr_le = Module['_macaddr_le'] = wasmExports['macaddr_le'])(a0);
var _macaddr_gt = Module['_macaddr_gt'] = (a0) => (_macaddr_gt = Module['_macaddr_gt'] = wasmExports['macaddr_gt'])(a0);
var _macaddr_ge = Module['_macaddr_ge'] = (a0) => (_macaddr_ge = Module['_macaddr_ge'] = wasmExports['macaddr_ge'])(a0);
var _macaddr_cmp = Module['_macaddr_cmp'] = (a0) => (_macaddr_cmp = Module['_macaddr_cmp'] = wasmExports['macaddr_cmp'])(a0);
var _btint8cmp = Module['_btint8cmp'] = (a0) => (_btint8cmp = Module['_btint8cmp'] = wasmExports['btint8cmp'])(a0);
var _inet_in = Module['_inet_in'] = (a0) => (_inet_in = Module['_inet_in'] = wasmExports['inet_in'])(a0);
var _network_cmp = Module['_network_cmp'] = (a0) => (_network_cmp = Module['_network_cmp'] = wasmExports['network_cmp'])(a0);
var _bpchareq = Module['_bpchareq'] = (a0) => (_bpchareq = Module['_bpchareq'] = wasmExports['bpchareq'])(a0);
var _bpcharlt = Module['_bpcharlt'] = (a0) => (_bpcharlt = Module['_bpcharlt'] = wasmExports['bpcharlt'])(a0);
var _bpcharle = Module['_bpcharle'] = (a0) => (_bpcharle = Module['_bpcharle'] = wasmExports['bpcharle'])(a0);
var _bpchargt = Module['_bpchargt'] = (a0) => (_bpchargt = Module['_bpchargt'] = wasmExports['bpchargt'])(a0);
var _bpcharge = Module['_bpcharge'] = (a0) => (_bpcharge = Module['_bpcharge'] = wasmExports['bpcharge'])(a0);
var _bpcharcmp = Module['_bpcharcmp'] = (a0) => (_bpcharcmp = Module['_bpcharcmp'] = wasmExports['bpcharcmp'])(a0);
var _date_eq = Module['_date_eq'] = (a0) => (_date_eq = Module['_date_eq'] = wasmExports['date_eq'])(a0);
var _date_lt = Module['_date_lt'] = (a0) => (_date_lt = Module['_date_lt'] = wasmExports['date_lt'])(a0);
var _date_le = Module['_date_le'] = (a0) => (_date_le = Module['_date_le'] = wasmExports['date_le'])(a0);
var _date_gt = Module['_date_gt'] = (a0) => (_date_gt = Module['_date_gt'] = wasmExports['date_gt'])(a0);
var _date_ge = Module['_date_ge'] = (a0) => (_date_ge = Module['_date_ge'] = wasmExports['date_ge'])(a0);
var _date_cmp = Module['_date_cmp'] = (a0) => (_date_cmp = Module['_date_cmp'] = wasmExports['date_cmp'])(a0);
var _time_lt = Module['_time_lt'] = (a0) => (_time_lt = Module['_time_lt'] = wasmExports['time_lt'])(a0);
var _time_le = Module['_time_le'] = (a0) => (_time_le = Module['_time_le'] = wasmExports['time_le'])(a0);
var _time_gt = Module['_time_gt'] = (a0) => (_time_gt = Module['_time_gt'] = wasmExports['time_gt'])(a0);
var _time_ge = Module['_time_ge'] = (a0) => (_time_ge = Module['_time_ge'] = wasmExports['time_ge'])(a0);
var _time_cmp = Module['_time_cmp'] = (a0) => (_time_cmp = Module['_time_cmp'] = wasmExports['time_cmp'])(a0);
var _date_mi = Module['_date_mi'] = (a0) => (_date_mi = Module['_date_mi'] = wasmExports['date_mi'])(a0);
var _time_eq = Module['_time_eq'] = (a0) => (_time_eq = Module['_time_eq'] = wasmExports['time_eq'])(a0);
var _timestamp_eq = Module['_timestamp_eq'] = (a0) => (_timestamp_eq = Module['_timestamp_eq'] = wasmExports['timestamp_eq'])(a0);
var _timestamp_lt = Module['_timestamp_lt'] = (a0) => (_timestamp_lt = Module['_timestamp_lt'] = wasmExports['timestamp_lt'])(a0);
var _timestamp_le = Module['_timestamp_le'] = (a0) => (_timestamp_le = Module['_timestamp_le'] = wasmExports['timestamp_le'])(a0);
var _timestamp_ge = Module['_timestamp_ge'] = (a0) => (_timestamp_ge = Module['_timestamp_ge'] = wasmExports['timestamp_ge'])(a0);
var _timestamp_gt = Module['_timestamp_gt'] = (a0) => (_timestamp_gt = Module['_timestamp_gt'] = wasmExports['timestamp_gt'])(a0);
var _interval_eq = Module['_interval_eq'] = (a0) => (_interval_eq = Module['_interval_eq'] = wasmExports['interval_eq'])(a0);
var _interval_lt = Module['_interval_lt'] = (a0) => (_interval_lt = Module['_interval_lt'] = wasmExports['interval_lt'])(a0);
var _interval_le = Module['_interval_le'] = (a0) => (_interval_le = Module['_interval_le'] = wasmExports['interval_le'])(a0);
var _interval_ge = Module['_interval_ge'] = (a0) => (_interval_ge = Module['_interval_ge'] = wasmExports['interval_ge'])(a0);
var _interval_gt = Module['_interval_gt'] = (a0) => (_interval_gt = Module['_interval_gt'] = wasmExports['interval_gt'])(a0);
var _interval_um = Module['_interval_um'] = (a0) => (_interval_um = Module['_interval_um'] = wasmExports['interval_um'])(a0);
var _interval_mi = Module['_interval_mi'] = (a0) => (_interval_mi = Module['_interval_mi'] = wasmExports['interval_mi'])(a0);
var _timestamp_mi = Module['_timestamp_mi'] = (a0) => (_timestamp_mi = Module['_timestamp_mi'] = wasmExports['timestamp_mi'])(a0);
var _quote_ident = Module['_quote_ident'] = (a0) => (_quote_ident = Module['_quote_ident'] = wasmExports['quote_ident'])(a0);
var _timestamp_in = Module['_timestamp_in'] = (a0) => (_timestamp_in = Module['_timestamp_in'] = wasmExports['timestamp_in'])(a0);
var _timestamp_cmp = Module['_timestamp_cmp'] = (a0) => (_timestamp_cmp = Module['_timestamp_cmp'] = wasmExports['timestamp_cmp'])(a0);
var _interval_cmp = Module['_interval_cmp'] = (a0) => (_interval_cmp = Module['_interval_cmp'] = wasmExports['interval_cmp'])(a0);
var _timetz_cmp = Module['_timetz_cmp'] = (a0) => (_timetz_cmp = Module['_timetz_cmp'] = wasmExports['timetz_cmp'])(a0);
var _bit_in = Module['_bit_in'] = (a0) => (_bit_in = Module['_bit_in'] = wasmExports['bit_in'])(a0);
var _varbit_in = Module['_varbit_in'] = (a0) => (_varbit_in = Module['_varbit_in'] = wasmExports['varbit_in'])(a0);
var _biteq = Module['_biteq'] = (a0) => (_biteq = Module['_biteq'] = wasmExports['biteq'])(a0);
var _bitge = Module['_bitge'] = (a0) => (_bitge = Module['_bitge'] = wasmExports['bitge'])(a0);
var _bitgt = Module['_bitgt'] = (a0) => (_bitgt = Module['_bitgt'] = wasmExports['bitgt'])(a0);
var _bitle = Module['_bitle'] = (a0) => (_bitle = Module['_bitle'] = wasmExports['bitle'])(a0);
var _bitlt = Module['_bitlt'] = (a0) => (_bitlt = Module['_bitlt'] = wasmExports['bitlt'])(a0);
var _bitcmp = Module['_bitcmp'] = (a0) => (_bitcmp = Module['_bitcmp'] = wasmExports['bitcmp'])(a0);
var _time_mi_time = Module['_time_mi_time'] = (a0) => (_time_mi_time = Module['_time_mi_time'] = wasmExports['time_mi_time'])(a0);
var _btboolcmp = Module['_btboolcmp'] = (a0) => (_btboolcmp = Module['_btboolcmp'] = wasmExports['btboolcmp'])(a0);
var _numeric_in = Module['_numeric_in'] = (a0) => (_numeric_in = Module['_numeric_in'] = wasmExports['numeric_in'])(a0);
var _numeric_eq = Module['_numeric_eq'] = (a0) => (_numeric_eq = Module['_numeric_eq'] = wasmExports['numeric_eq'])(a0);
var _numeric_gt = Module['_numeric_gt'] = (a0) => (_numeric_gt = Module['_numeric_gt'] = wasmExports['numeric_gt'])(a0);
var _numeric_ge = Module['_numeric_ge'] = (a0) => (_numeric_ge = Module['_numeric_ge'] = wasmExports['numeric_ge'])(a0);
var _numeric_lt = Module['_numeric_lt'] = (a0) => (_numeric_lt = Module['_numeric_lt'] = wasmExports['numeric_lt'])(a0);
var _numeric_le = Module['_numeric_le'] = (a0) => (_numeric_le = Module['_numeric_le'] = wasmExports['numeric_le'])(a0);
var _numeric_sub = Module['_numeric_sub'] = (a0) => (_numeric_sub = Module['_numeric_sub'] = wasmExports['numeric_sub'])(a0);
var _numeric_div = Module['_numeric_div'] = (a0) => (_numeric_div = Module['_numeric_div'] = wasmExports['numeric_div'])(a0);
var _numeric_float4 = Module['_numeric_float4'] = (a0) => (_numeric_float4 = Module['_numeric_float4'] = wasmExports['numeric_float4'])(a0);
var _numeric_cmp = Module['_numeric_cmp'] = (a0) => (_numeric_cmp = Module['_numeric_cmp'] = wasmExports['numeric_cmp'])(a0);
var _byteaeq = Module['_byteaeq'] = (a0) => (_byteaeq = Module['_byteaeq'] = wasmExports['byteaeq'])(a0);
var _bytealt = Module['_bytealt'] = (a0) => (_bytealt = Module['_bytealt'] = wasmExports['bytealt'])(a0);
var _byteale = Module['_byteale'] = (a0) => (_byteale = Module['_byteale'] = wasmExports['byteale'])(a0);
var _byteagt = Module['_byteagt'] = (a0) => (_byteagt = Module['_byteagt'] = wasmExports['byteagt'])(a0);
var _byteage = Module['_byteage'] = (a0) => (_byteage = Module['_byteage'] = wasmExports['byteage'])(a0);
var _byteacmp = Module['_byteacmp'] = (a0) => (_byteacmp = Module['_byteacmp'] = wasmExports['byteacmp'])(a0);
var _to_hex32 = Module['_to_hex32'] = (a0) => (_to_hex32 = Module['_to_hex32'] = wasmExports['to_hex32'])(a0);
var _regclassin = Module['_regclassin'] = (a0) => (_regclassin = Module['_regclassin'] = wasmExports['regclassin'])(a0);
var _uuid_in = Module['_uuid_in'] = (a0) => (_uuid_in = Module['_uuid_in'] = wasmExports['uuid_in'])(a0);
var _uuid_out = Module['_uuid_out'] = (a0) => (_uuid_out = Module['_uuid_out'] = wasmExports['uuid_out'])(a0);
var _uuid_cmp = Module['_uuid_cmp'] = (a0) => (_uuid_cmp = Module['_uuid_cmp'] = wasmExports['uuid_cmp'])(a0);
var _gen_random_uuid = Module['_gen_random_uuid'] = (a0) => (_gen_random_uuid = Module['_gen_random_uuid'] = wasmExports['gen_random_uuid'])(a0);
var _enum_lt = Module['_enum_lt'] = (a0) => (_enum_lt = Module['_enum_lt'] = wasmExports['enum_lt'])(a0);
var _enum_gt = Module['_enum_gt'] = (a0) => (_enum_gt = Module['_enum_gt'] = wasmExports['enum_gt'])(a0);
var _enum_le = Module['_enum_le'] = (a0) => (_enum_le = Module['_enum_le'] = wasmExports['enum_le'])(a0);
var _enum_ge = Module['_enum_ge'] = (a0) => (_enum_ge = Module['_enum_ge'] = wasmExports['enum_ge'])(a0);
var _enum_cmp = Module['_enum_cmp'] = (a0) => (_enum_cmp = Module['_enum_cmp'] = wasmExports['enum_cmp'])(a0);
var _jsonb_in = Module['_jsonb_in'] = (a0) => (_jsonb_in = Module['_jsonb_in'] = wasmExports['jsonb_in'])(a0);
var _arraycontsel = Module['_arraycontsel'] = (a0) => (_arraycontsel = Module['_arraycontsel'] = wasmExports['arraycontsel'])(a0);
var _arraycontjoinsel = Module['_arraycontjoinsel'] = (a0) => (_arraycontjoinsel = Module['_arraycontjoinsel'] = wasmExports['arraycontjoinsel'])(a0);
var _macaddr8_eq = Module['_macaddr8_eq'] = (a0) => (_macaddr8_eq = Module['_macaddr8_eq'] = wasmExports['macaddr8_eq'])(a0);
var _macaddr8_lt = Module['_macaddr8_lt'] = (a0) => (_macaddr8_lt = Module['_macaddr8_lt'] = wasmExports['macaddr8_lt'])(a0);
var _macaddr8_le = Module['_macaddr8_le'] = (a0) => (_macaddr8_le = Module['_macaddr8_le'] = wasmExports['macaddr8_le'])(a0);
var _macaddr8_gt = Module['_macaddr8_gt'] = (a0) => (_macaddr8_gt = Module['_macaddr8_gt'] = wasmExports['macaddr8_gt'])(a0);
var _macaddr8_ge = Module['_macaddr8_ge'] = (a0) => (_macaddr8_ge = Module['_macaddr8_ge'] = wasmExports['macaddr8_ge'])(a0);
var _macaddr8_cmp = Module['_macaddr8_cmp'] = (a0) => (_macaddr8_cmp = Module['_macaddr8_cmp'] = wasmExports['macaddr8_cmp'])(a0);
var _in_error_recursion_trouble = Module['_in_error_recursion_trouble'] = () => (_in_error_recursion_trouble = Module['_in_error_recursion_trouble'] = wasmExports['in_error_recursion_trouble'])();
var _errsave_start = Module['_errsave_start'] = (a0, a1) => (_errsave_start = Module['_errsave_start'] = wasmExports['errsave_start'])(a0, a1);
var _errsave_finish = Module['_errsave_finish'] = (a0, a1, a2, a3) => (_errsave_finish = Module['_errsave_finish'] = wasmExports['errsave_finish'])(a0, a1, a2, a3);
var _errhidestmt = Module['_errhidestmt'] = (a0) => (_errhidestmt = Module['_errhidestmt'] = wasmExports['errhidestmt'])(a0);
var _err_generic_string = Module['_err_generic_string'] = (a0, a1) => (_err_generic_string = Module['_err_generic_string'] = wasmExports['err_generic_string'])(a0, a1);
var _GetErrorContextStack = Module['_GetErrorContextStack'] = () => (_GetErrorContextStack = Module['_GetErrorContextStack'] = wasmExports['GetErrorContextStack'])();
var _freopen = Module['_freopen'] = (a0, a1, a2) => (_freopen = Module['_freopen'] = wasmExports['freopen'])(a0, a1, a2);
var _unpack_sql_state = Module['_unpack_sql_state'] = (a0) => (_unpack_sql_state = Module['_unpack_sql_state'] = wasmExports['unpack_sql_state'])(a0);
var _MemoryContextRegisterResetCallback = Module['_MemoryContextRegisterResetCallback'] = (a0, a1) => (_MemoryContextRegisterResetCallback = Module['_MemoryContextRegisterResetCallback'] = wasmExports['MemoryContextRegisterResetCallback'])(a0, a1);
var _MemoryContextAllocHuge = Module['_MemoryContextAllocHuge'] = (a0, a1) => (_MemoryContextAllocHuge = Module['_MemoryContextAllocHuge'] = wasmExports['MemoryContextAllocHuge'])(a0, a1);
var _strnlen = Module['_strnlen'] = (a0, a1) => (_strnlen = Module['_strnlen'] = wasmExports['strnlen'])(a0, a1);
var _PinPortal = Module['_PinPortal'] = (a0) => (_PinPortal = Module['_PinPortal'] = wasmExports['PinPortal'])(a0);
var _UnpinPortal = Module['_UnpinPortal'] = (a0) => (_UnpinPortal = Module['_UnpinPortal'] = wasmExports['UnpinPortal'])(a0);
var _hash_estimate_size = Module['_hash_estimate_size'] = (a0, a1) => (_hash_estimate_size = Module['_hash_estimate_size'] = wasmExports['hash_estimate_size'])(a0, a1);
var _fscanf = Module['_fscanf'] = (a0, a1, a2) => (_fscanf = Module['_fscanf'] = wasmExports['fscanf'])(a0, a1, a2);
var _chdir = Module['_chdir'] = (a0) => (_chdir = Module['_chdir'] = wasmExports['chdir'])(a0);
var _strlcat = Module['_strlcat'] = (a0, a1, a2) => (_strlcat = Module['_strlcat'] = wasmExports['strlcat'])(a0, a1, a2);
var _atol = Module['_atol'] = (a0) => (_atol = Module['_atol'] = wasmExports['atol'])(a0);
var _pg_bindtextdomain = Module['_pg_bindtextdomain'] = (a0) => (_pg_bindtextdomain = Module['_pg_bindtextdomain'] = wasmExports['pg_bindtextdomain'])(a0);
var _CachedPlanAllowsSimpleValidityCheck = Module['_CachedPlanAllowsSimpleValidityCheck'] = (a0, a1, a2) => (_CachedPlanAllowsSimpleValidityCheck = Module['_CachedPlanAllowsSimpleValidityCheck'] = wasmExports['CachedPlanAllowsSimpleValidityCheck'])(a0, a1, a2);
var _CachedPlanIsSimplyValid = Module['_CachedPlanIsSimplyValid'] = (a0, a1, a2) => (_CachedPlanIsSimplyValid = Module['_CachedPlanIsSimplyValid'] = wasmExports['CachedPlanIsSimplyValid'])(a0, a1, a2);
var _GetCachedExpression = Module['_GetCachedExpression'] = (a0) => (_GetCachedExpression = Module['_GetCachedExpression'] = wasmExports['GetCachedExpression'])(a0);
var _FreeCachedExpression = Module['_FreeCachedExpression'] = (a0) => (_FreeCachedExpression = Module['_FreeCachedExpression'] = wasmExports['FreeCachedExpression'])(a0);
var _lookup_ts_dictionary_cache = Module['_lookup_ts_dictionary_cache'] = (a0) => (_lookup_ts_dictionary_cache = Module['_lookup_ts_dictionary_cache'] = wasmExports['lookup_ts_dictionary_cache'])(a0);
var _systable_beginscan_ordered = Module['_systable_beginscan_ordered'] = (a0, a1, a2, a3, a4) => (_systable_beginscan_ordered = Module['_systable_beginscan_ordered'] = wasmExports['systable_beginscan_ordered'])(a0, a1, a2, a3, a4);
var _systable_getnext_ordered = Module['_systable_getnext_ordered'] = (a0, a1) => (_systable_getnext_ordered = Module['_systable_getnext_ordered'] = wasmExports['systable_getnext_ordered'])(a0, a1);
var _systable_endscan_ordered = Module['_systable_endscan_ordered'] = (a0) => (_systable_endscan_ordered = Module['_systable_endscan_ordered'] = wasmExports['systable_endscan_ordered'])(a0);
var _index_getprocid = Module['_index_getprocid'] = (a0, a1, a2) => (_index_getprocid = Module['_index_getprocid'] = wasmExports['index_getprocid'])(a0, a1, a2);
var _get_typbyval = Module['_get_typbyval'] = (a0) => (_get_typbyval = Module['_get_typbyval'] = wasmExports['get_typbyval'])(a0);
var _get_typsubscript = Module['_get_typsubscript'] = (a0, a1) => (_get_typsubscript = Module['_get_typsubscript'] = wasmExports['get_typsubscript'])(a0, a1);
var _fgetc = Module['_fgetc'] = (a0) => (_fgetc = Module['_fgetc'] = wasmExports['fgetc'])(a0);
var _fseek = Module['_fseek'] = (a0, a1, a2) => (_fseek = Module['_fseek'] = wasmExports['fseek'])(a0, a1, a2);
var _pgstat_assoc_relation = Module['_pgstat_assoc_relation'] = (a0) => (_pgstat_assoc_relation = Module['_pgstat_assoc_relation'] = wasmExports['pgstat_assoc_relation'])(a0);
var _appendStringInfoStringQuoted = Module['_appendStringInfoStringQuoted'] = (a0, a1, a2) => (_appendStringInfoStringQuoted = Module['_appendStringInfoStringQuoted'] = wasmExports['appendStringInfoStringQuoted'])(a0, a1, a2);
var _local2local = Module['_local2local'] = (a0, a1, a2, a3, a4, a5, a6) => (_local2local = Module['_local2local'] = wasmExports['local2local'])(a0, a1, a2, a3, a4, a5, a6);
var _report_untranslatable_char = Module['_report_untranslatable_char'] = (a0, a1, a2, a3) => (_report_untranslatable_char = Module['_report_untranslatable_char'] = wasmExports['report_untranslatable_char'])(a0, a1, a2, a3);
var _latin2mic = Module['_latin2mic'] = (a0, a1, a2, a3, a4, a5) => (_latin2mic = Module['_latin2mic'] = wasmExports['latin2mic'])(a0, a1, a2, a3, a4, a5);
var _mic2latin = Module['_mic2latin'] = (a0, a1, a2, a3, a4, a5) => (_mic2latin = Module['_mic2latin'] = wasmExports['mic2latin'])(a0, a1, a2, a3, a4, a5);
var _latin2mic_with_table = Module['_latin2mic_with_table'] = (a0, a1, a2, a3, a4, a5, a6) => (_latin2mic_with_table = Module['_latin2mic_with_table'] = wasmExports['latin2mic_with_table'])(a0, a1, a2, a3, a4, a5, a6);
var _mic2latin_with_table = Module['_mic2latin_with_table'] = (a0, a1, a2, a3, a4, a5, a6) => (_mic2latin_with_table = Module['_mic2latin_with_table'] = wasmExports['mic2latin_with_table'])(a0, a1, a2, a3, a4, a5, a6);
var _pg_utf_mblen = Module['_pg_utf_mblen'] = (a0) => (_pg_utf_mblen = Module['_pg_utf_mblen'] = wasmExports['pg_utf_mblen'])(a0);
var _pg_encoding_verifymbchar = Module['_pg_encoding_verifymbchar'] = (a0, a1, a2) => (_pg_encoding_verifymbchar = Module['_pg_encoding_verifymbchar'] = wasmExports['pg_encoding_verifymbchar'])(a0, a1, a2);
var _pg_do_encoding_conversion = Module['_pg_do_encoding_conversion'] = (a0, a1, a2, a3) => (_pg_do_encoding_conversion = Module['_pg_do_encoding_conversion'] = wasmExports['pg_do_encoding_conversion'])(a0, a1, a2, a3);
var _pg_wchar2mb_with_len = Module['_pg_wchar2mb_with_len'] = (a0, a1, a2) => (_pg_wchar2mb_with_len = Module['_pg_wchar2mb_with_len'] = wasmExports['pg_wchar2mb_with_len'])(a0, a1, a2);
var _check_encoding_conversion_args = Module['_check_encoding_conversion_args'] = (a0, a1, a2, a3, a4) => (_check_encoding_conversion_args = Module['_check_encoding_conversion_args'] = wasmExports['check_encoding_conversion_args'])(a0, a1, a2, a3, a4);
var _sampler_random_init_state = Module['_sampler_random_init_state'] = (a0, a1) => (_sampler_random_init_state = Module['_sampler_random_init_state'] = wasmExports['sampler_random_init_state'])(a0, a1);
var _exp = Module['_exp'] = (a0) => (_exp = Module['_exp'] = wasmExports['exp'])(a0);
var _find_option = Module['_find_option'] = (a0, a1, a2, a3) => (_find_option = Module['_find_option'] = wasmExports['find_option'])(a0, a1, a2, a3);
var _parse_real = Module['_parse_real'] = (a0, a1, a2, a3) => (_parse_real = Module['_parse_real'] = wasmExports['parse_real'])(a0, a1, a2, a3);
var _DefineCustomBoolVariable = Module['_DefineCustomBoolVariable'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) => (_DefineCustomBoolVariable = Module['_DefineCustomBoolVariable'] = wasmExports['DefineCustomBoolVariable'])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
var _DefineCustomIntVariable = Module['_DefineCustomIntVariable'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) => (_DefineCustomIntVariable = Module['_DefineCustomIntVariable'] = wasmExports['DefineCustomIntVariable'])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
var _DefineCustomRealVariable = Module['_DefineCustomRealVariable'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) => (_DefineCustomRealVariable = Module['_DefineCustomRealVariable'] = wasmExports['DefineCustomRealVariable'])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
var _DefineCustomStringVariable = Module['_DefineCustomStringVariable'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) => (_DefineCustomStringVariable = Module['_DefineCustomStringVariable'] = wasmExports['DefineCustomStringVariable'])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
var _DefineCustomEnumVariable = Module['_DefineCustomEnumVariable'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) => (_DefineCustomEnumVariable = Module['_DefineCustomEnumVariable'] = wasmExports['DefineCustomEnumVariable'])(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
var _MarkGUCPrefixReserved = Module['_MarkGUCPrefixReserved'] = (a0) => (_MarkGUCPrefixReserved = Module['_MarkGUCPrefixReserved'] = wasmExports['MarkGUCPrefixReserved'])(a0);
var _strcspn = Module['_strcspn'] = (a0, a1) => (_strcspn = Module['_strcspn'] = wasmExports['strcspn'])(a0, a1);
var ___multi3 = Module['___multi3'] = (a0, a1, a2, a3, a4) => (___multi3 = Module['___multi3'] = wasmExports['__multi3'])(a0, a1, a2, a3, a4);
var _str_tolower = Module['_str_tolower'] = (a0, a1, a2) => (_str_tolower = Module['_str_tolower'] = wasmExports['str_tolower'])(a0, a1, a2);
var _pg_get_indexdef_columns_extended = Module['_pg_get_indexdef_columns_extended'] = (a0, a1) => (_pg_get_indexdef_columns_extended = Module['_pg_get_indexdef_columns_extended'] = wasmExports['pg_get_indexdef_columns_extended'])(a0, a1);
var _exprIsLengthCoercion = Module['_exprIsLengthCoercion'] = (a0, a1) => (_exprIsLengthCoercion = Module['_exprIsLengthCoercion'] = wasmExports['exprIsLengthCoercion'])(a0, a1);
var _ArrayGetIntegerTypmods = Module['_ArrayGetIntegerTypmods'] = (a0, a1) => (_ArrayGetIntegerTypmods = Module['_ArrayGetIntegerTypmods'] = wasmExports['ArrayGetIntegerTypmods'])(a0, a1);
var _varstr_cmp = Module['_varstr_cmp'] = (a0, a1, a2, a3, a4) => (_varstr_cmp = Module['_varstr_cmp'] = wasmExports['varstr_cmp'])(a0, a1, a2, a3, a4);
var _expand_array = Module['_expand_array'] = (a0, a1, a2) => (_expand_array = Module['_expand_array'] = wasmExports['expand_array'])(a0, a1, a2);
var _strtoull = Module['_strtoull'] = (a0, a1, a2) => (_strtoull = Module['_strtoull'] = wasmExports['strtoull'])(a0, a1, a2);
var _pg_ltoa = Module['_pg_ltoa'] = (a0, a1) => (_pg_ltoa = Module['_pg_ltoa'] = wasmExports['pg_ltoa'])(a0, a1);
var _initArrayResult = Module['_initArrayResult'] = (a0, a1, a2) => (_initArrayResult = Module['_initArrayResult'] = wasmExports['initArrayResult'])(a0, a1, a2);
var _array_create_iterator = Module['_array_create_iterator'] = (a0, a1, a2) => (_array_create_iterator = Module['_array_create_iterator'] = wasmExports['array_create_iterator'])(a0, a1, a2);
var _array_iterate = Module['_array_iterate'] = (a0, a1, a2) => (_array_iterate = Module['_array_iterate'] = wasmExports['array_iterate'])(a0, a1, a2);
var _array_free_iterator = Module['_array_free_iterator'] = (a0) => (_array_free_iterator = Module['_array_free_iterator'] = wasmExports['array_free_iterator'])(a0);
var _TransactionIdIsInProgress = Module['_TransactionIdIsInProgress'] = (a0) => (_TransactionIdIsInProgress = Module['_TransactionIdIsInProgress'] = wasmExports['TransactionIdIsInProgress'])(a0);
var _numeric_is_nan = Module['_numeric_is_nan'] = (a0) => (_numeric_is_nan = Module['_numeric_is_nan'] = wasmExports['numeric_is_nan'])(a0);
var _heap_modify_tuple_by_cols = Module['_heap_modify_tuple_by_cols'] = (a0, a1, a2, a3, a4, a5) => (_heap_modify_tuple_by_cols = Module['_heap_modify_tuple_by_cols'] = wasmExports['heap_modify_tuple_by_cols'])(a0, a1, a2, a3, a4, a5);
var _init_local_reloptions = Module['_init_local_reloptions'] = (a0, a1) => (_init_local_reloptions = Module['_init_local_reloptions'] = wasmExports['init_local_reloptions'])(a0, a1);
var _add_local_int_reloption = Module['_add_local_int_reloption'] = (a0, a1, a2, a3, a4, a5, a6) => (_add_local_int_reloption = Module['_add_local_int_reloption'] = wasmExports['add_local_int_reloption'])(a0, a1, a2, a3, a4, a5, a6);
var _strncpy = Module['_strncpy'] = (a0, a1, a2) => (_strncpy = Module['_strncpy'] = wasmExports['strncpy'])(a0, a1, a2);
var _varstr_levenshtein = Module['_varstr_levenshtein'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_varstr_levenshtein = Module['_varstr_levenshtein'] = wasmExports['varstr_levenshtein'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _varstr_levenshtein_less_equal = Module['_varstr_levenshtein_less_equal'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (_varstr_levenshtein_less_equal = Module['_varstr_levenshtein_less_equal'] = wasmExports['varstr_levenshtein_less_equal'])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
var _initClosestMatch = Module['_initClosestMatch'] = (a0, a1, a2) => (_initClosestMatch = Module['_initClosestMatch'] = wasmExports['initClosestMatch'])(a0, a1, a2);
var _updateClosestMatch = Module['_updateClosestMatch'] = (a0, a1) => (_updateClosestMatch = Module['_updateClosestMatch'] = wasmExports['updateClosestMatch'])(a0, a1);
var _getClosestMatch = Module['_getClosestMatch'] = (a0) => (_getClosestMatch = Module['_getClosestMatch'] = wasmExports['getClosestMatch'])(a0);
var _utf8_to_unicode = Module['_utf8_to_unicode'] = (a0) => (_utf8_to_unicode = Module['_utf8_to_unicode'] = wasmExports['utf8_to_unicode'])(a0);
var _float_overflow_error = Module['_float_overflow_error'] = () => (_float_overflow_error = Module['_float_overflow_error'] = wasmExports['float_overflow_error'])();
var _float_underflow_error = Module['_float_underflow_error'] = () => (_float_underflow_error = Module['_float_underflow_error'] = wasmExports['float_underflow_error'])();
var _float4in_internal = Module['_float4in_internal'] = (a0, a1, a2, a3, a4) => (_float4in_internal = Module['_float4in_internal'] = wasmExports['float4in_internal'])(a0, a1, a2, a3, a4);
var _strtof = Module['_strtof'] = (a0, a1) => (_strtof = Module['_strtof'] = wasmExports['strtof'])(a0, a1);
var _float_to_shortest_decimal_buf = Module['_float_to_shortest_decimal_buf'] = (a0, a1) => (_float_to_shortest_decimal_buf = Module['_float_to_shortest_decimal_buf'] = wasmExports['float_to_shortest_decimal_buf'])(a0, a1);
var _float8in_internal = Module['_float8in_internal'] = (a0, a1, a2, a3, a4) => (_float8in_internal = Module['_float8in_internal'] = wasmExports['float8in_internal'])(a0, a1, a2, a3, a4);
var _float8out_internal = Module['_float8out_internal'] = (a0) => (_float8out_internal = Module['_float8out_internal'] = wasmExports['float8out_internal'])(a0);
var _cbrt = Module['_cbrt'] = (a0) => (_cbrt = Module['_cbrt'] = wasmExports['cbrt'])(a0);
var _pow = Module['_pow'] = (a0, a1) => (_pow = Module['_pow'] = wasmExports['pow'])(a0, a1);
var _log10 = Module['_log10'] = (a0) => (_log10 = Module['_log10'] = wasmExports['log10'])(a0);
var _acos = Module['_acos'] = (a0) => (_acos = Module['_acos'] = wasmExports['acos'])(a0);
var _asin = Module['_asin'] = (a0) => (_asin = Module['_asin'] = wasmExports['asin'])(a0);
var _atan = Module['_atan'] = (a0) => (_atan = Module['_atan'] = wasmExports['atan'])(a0);
var _atan2 = Module['_atan2'] = (a0, a1) => (_atan2 = Module['_atan2'] = wasmExports['atan2'])(a0, a1);
var _cos = Module['_cos'] = (a0) => (_cos = Module['_cos'] = wasmExports['cos'])(a0);
var _tan = Module['_tan'] = (a0) => (_tan = Module['_tan'] = wasmExports['tan'])(a0);
var _sin = Module['_sin'] = (a0) => (_sin = Module['_sin'] = wasmExports['sin'])(a0);
var _fmod = Module['_fmod'] = (a0, a1) => (_fmod = Module['_fmod'] = wasmExports['fmod'])(a0, a1);
var _sinh = Module['_sinh'] = (a0) => (_sinh = Module['_sinh'] = wasmExports['sinh'])(a0);
var _cosh = Module['_cosh'] = (a0) => (_cosh = Module['_cosh'] = wasmExports['cosh'])(a0);
var _tanh = Module['_tanh'] = (a0) => (_tanh = Module['_tanh'] = wasmExports['tanh'])(a0);
var _asinh = Module['_asinh'] = (a0) => (_asinh = Module['_asinh'] = wasmExports['asinh'])(a0);
var _acosh = Module['_acosh'] = (a0) => (_acosh = Module['_acosh'] = wasmExports['acosh'])(a0);
var _atanh = Module['_atanh'] = (a0) => (_atanh = Module['_atanh'] = wasmExports['atanh'])(a0);
var _get_restriction_variable = Module['_get_restriction_variable'] = (a0, a1, a2, a3, a4, a5) => (_get_restriction_variable = Module['_get_restriction_variable'] = wasmExports['get_restriction_variable'])(a0, a1, a2, a3, a4, a5);
var _TransferExpandedObject = Module['_TransferExpandedObject'] = (a0, a1) => (_TransferExpandedObject = Module['_TransferExpandedObject'] = wasmExports['TransferExpandedObject'])(a0, a1);
var _ParseDateTime = Module['_ParseDateTime'] = (a0, a1, a2, a3, a4, a5, a6) => (_ParseDateTime = Module['_ParseDateTime'] = wasmExports['ParseDateTime'])(a0, a1, a2, a3, a4, a5, a6);
var _DecodeDateTime = Module['_DecodeDateTime'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_DecodeDateTime = Module['_DecodeDateTime'] = wasmExports['DecodeDateTime'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _tm2timestamp = Module['_tm2timestamp'] = (a0, a1, a2, a3) => (_tm2timestamp = Module['_tm2timestamp'] = wasmExports['tm2timestamp'])(a0, a1, a2, a3);
var _j2date = Module['_j2date'] = (a0, a1, a2, a3) => (_j2date = Module['_j2date'] = wasmExports['j2date'])(a0, a1, a2, a3);
var _EncodeDateTime = Module['_EncodeDateTime'] = (a0, a1, a2, a3, a4, a5, a6) => (_EncodeDateTime = Module['_EncodeDateTime'] = wasmExports['EncodeDateTime'])(a0, a1, a2, a3, a4, a5, a6);
var _EncodeSpecialTimestamp = Module['_EncodeSpecialTimestamp'] = (a0, a1) => (_EncodeSpecialTimestamp = Module['_EncodeSpecialTimestamp'] = wasmExports['EncodeSpecialTimestamp'])(a0, a1);
var _timestamp2tm = Module['_timestamp2tm'] = (a0, a1, a2, a3, a4, a5) => (_timestamp2tm = Module['_timestamp2tm'] = wasmExports['timestamp2tm'])(a0, a1, a2, a3, a4, a5);
var _int64_to_numeric = Module['_int64_to_numeric'] = (a0) => (_int64_to_numeric = Module['_int64_to_numeric'] = wasmExports['int64_to_numeric'])(a0);
var _pg_inet_net_ntop = Module['_pg_inet_net_ntop'] = (a0, a1, a2, a3, a4) => (_pg_inet_net_ntop = Module['_pg_inet_net_ntop'] = wasmExports['pg_inet_net_ntop'])(a0, a1, a2, a3, a4);
var _convert_network_to_scalar = Module['_convert_network_to_scalar'] = (a0, a1, a2) => (_convert_network_to_scalar = Module['_convert_network_to_scalar'] = wasmExports['convert_network_to_scalar'])(a0, a1, a2);
var _forkname_to_number = Module['_forkname_to_number'] = (a0) => (_forkname_to_number = Module['_forkname_to_number'] = wasmExports['forkname_to_number'])(a0);
var _t_isalnum = Module['_t_isalnum'] = (a0) => (_t_isalnum = Module['_t_isalnum'] = wasmExports['t_isalnum'])(a0);
var _t_isspace = Module['_t_isspace'] = (a0) => (_t_isspace = Module['_t_isspace'] = wasmExports['t_isspace'])(a0);
var _t_isdigit = Module['_t_isdigit'] = (a0) => (_t_isdigit = Module['_t_isdigit'] = wasmExports['t_isdigit'])(a0);
var _make_expanded_record_from_typeid = Module['_make_expanded_record_from_typeid'] = (a0, a1, a2) => (_make_expanded_record_from_typeid = Module['_make_expanded_record_from_typeid'] = wasmExports['make_expanded_record_from_typeid'])(a0, a1, a2);
var _make_expanded_record_from_tupdesc = Module['_make_expanded_record_from_tupdesc'] = (a0, a1) => (_make_expanded_record_from_tupdesc = Module['_make_expanded_record_from_tupdesc'] = wasmExports['make_expanded_record_from_tupdesc'])(a0, a1);
var _make_expanded_record_from_exprecord = Module['_make_expanded_record_from_exprecord'] = (a0, a1) => (_make_expanded_record_from_exprecord = Module['_make_expanded_record_from_exprecord'] = wasmExports['make_expanded_record_from_exprecord'])(a0, a1);
var _expanded_record_set_tuple = Module['_expanded_record_set_tuple'] = (a0, a1, a2, a3) => (_expanded_record_set_tuple = Module['_expanded_record_set_tuple'] = wasmExports['expanded_record_set_tuple'])(a0, a1, a2, a3);
var _domain_check = Module['_domain_check'] = (a0, a1, a2, a3, a4) => (_domain_check = Module['_domain_check'] = wasmExports['domain_check'])(a0, a1, a2, a3, a4);
var _expanded_record_get_tuple = Module['_expanded_record_get_tuple'] = (a0) => (_expanded_record_get_tuple = Module['_expanded_record_get_tuple'] = wasmExports['expanded_record_get_tuple'])(a0);
var _deconstruct_expanded_record = Module['_deconstruct_expanded_record'] = (a0) => (_deconstruct_expanded_record = Module['_deconstruct_expanded_record'] = wasmExports['deconstruct_expanded_record'])(a0);
var _expanded_record_lookup_field = Module['_expanded_record_lookup_field'] = (a0, a1, a2) => (_expanded_record_lookup_field = Module['_expanded_record_lookup_field'] = wasmExports['expanded_record_lookup_field'])(a0, a1, a2);
var _expanded_record_set_field_internal = Module['_expanded_record_set_field_internal'] = (a0, a1, a2, a3, a4, a5) => (_expanded_record_set_field_internal = Module['_expanded_record_set_field_internal'] = wasmExports['expanded_record_set_field_internal'])(a0, a1, a2, a3, a4, a5);
var _expanded_record_set_fields = Module['_expanded_record_set_fields'] = (a0, a1, a2, a3) => (_expanded_record_set_fields = Module['_expanded_record_set_fields'] = wasmExports['expanded_record_set_fields'])(a0, a1, a2, a3);
var _JsonbValueToJsonb = Module['_JsonbValueToJsonb'] = (a0) => (_JsonbValueToJsonb = Module['_JsonbValueToJsonb'] = wasmExports['JsonbValueToJsonb'])(a0);
var _pushJsonbValue = Module['_pushJsonbValue'] = (a0, a1, a2) => (_pushJsonbValue = Module['_pushJsonbValue'] = wasmExports['pushJsonbValue'])(a0, a1, a2);
var _setlocale = Module['_setlocale'] = (a0, a1) => (_setlocale = Module['_setlocale'] = wasmExports['setlocale'])(a0, a1);
var _setenv = Module['_setenv'] = (a0, a1, a2) => (_setenv = Module['_setenv'] = wasmExports['setenv'])(a0, a1, a2);
var _localeconv = Module['_localeconv'] = () => (_localeconv = Module['_localeconv'] = wasmExports['localeconv'])();
var _localtime = Module['_localtime'] = (a0) => (_localtime = Module['_localtime'] = wasmExports['localtime'])(a0);
var _strftime = Module['_strftime'] = (a0, a1, a2, a3) => (_strftime = Module['_strftime'] = wasmExports['strftime'])(a0, a1, a2, a3);
var _newlocale = Module['_newlocale'] = (a0, a1, a2) => (_newlocale = Module['_newlocale'] = wasmExports['newlocale'])(a0, a1, a2);
var _strcoll_l = Module['_strcoll_l'] = (a0, a1, a2) => (_strcoll_l = Module['_strcoll_l'] = wasmExports['strcoll_l'])(a0, a1, a2);
var _uselocale = Module['_uselocale'] = (a0) => (_uselocale = Module['_uselocale'] = wasmExports['uselocale'])(a0);
var _asc_tolower = Module['_asc_tolower'] = (a0, a1) => (_asc_tolower = Module['_asc_tolower'] = wasmExports['asc_tolower'])(a0, a1);
var _strtoll = Module['_strtoll'] = (a0, a1, a2) => (_strtoll = Module['_strtoll'] = wasmExports['strtoll'])(a0, a1, a2);
var _EncodeDateOnly = Module['_EncodeDateOnly'] = (a0, a1, a2) => (_EncodeDateOnly = Module['_EncodeDateOnly'] = wasmExports['EncodeDateOnly'])(a0, a1, a2);
var _EncodeTimeOnly = Module['_EncodeTimeOnly'] = (a0, a1, a2, a3, a4, a5) => (_EncodeTimeOnly = Module['_EncodeTimeOnly'] = wasmExports['EncodeTimeOnly'])(a0, a1, a2, a3, a4, a5);
var _pg_xml_init = Module['_pg_xml_init'] = (a0) => (_pg_xml_init = Module['_pg_xml_init'] = wasmExports['pg_xml_init'])(a0);
var _xmlInitParser = Module['_xmlInitParser'] = () => (_xmlInitParser = Module['_xmlInitParser'] = wasmExports['xmlInitParser'])();
var _xml_ereport = Module['_xml_ereport'] = (a0, a1, a2, a3) => (_xml_ereport = Module['_xml_ereport'] = wasmExports['xml_ereport'])(a0, a1, a2, a3);
var _pg_xml_done = Module['_pg_xml_done'] = (a0, a1) => (_pg_xml_done = Module['_pg_xml_done'] = wasmExports['pg_xml_done'])(a0, a1);
var _xmlXPathNewContext = Module['_xmlXPathNewContext'] = (a0) => (_xmlXPathNewContext = Module['_xmlXPathNewContext'] = wasmExports['xmlXPathNewContext'])(a0);
var _xmlXPathFreeContext = Module['_xmlXPathFreeContext'] = (a0) => (_xmlXPathFreeContext = Module['_xmlXPathFreeContext'] = wasmExports['xmlXPathFreeContext'])(a0);
var _xmlFreeDoc = Module['_xmlFreeDoc'] = (a0) => (_xmlFreeDoc = Module['_xmlFreeDoc'] = wasmExports['xmlFreeDoc'])(a0);
var _xmlXPathCompile = Module['_xmlXPathCompile'] = (a0) => (_xmlXPathCompile = Module['_xmlXPathCompile'] = wasmExports['xmlXPathCompile'])(a0);
var _xmlXPathCompiledEval = Module['_xmlXPathCompiledEval'] = (a0, a1) => (_xmlXPathCompiledEval = Module['_xmlXPathCompiledEval'] = wasmExports['xmlXPathCompiledEval'])(a0, a1);
var _xmlXPathFreeCompExpr = Module['_xmlXPathFreeCompExpr'] = (a0) => (_xmlXPathFreeCompExpr = Module['_xmlXPathFreeCompExpr'] = wasmExports['xmlXPathFreeCompExpr'])(a0);
var _xmlStrdup = Module['_xmlStrdup'] = (a0) => (_xmlStrdup = Module['_xmlStrdup'] = wasmExports['xmlStrdup'])(a0);
var _xmlXPathCastNodeToString = Module['_xmlXPathCastNodeToString'] = (a0) => (_xmlXPathCastNodeToString = Module['_xmlXPathCastNodeToString'] = wasmExports['xmlXPathCastNodeToString'])(a0);
var _EncodeSpecialDate = Module['_EncodeSpecialDate'] = (a0, a1) => (_EncodeSpecialDate = Module['_EncodeSpecialDate'] = wasmExports['EncodeSpecialDate'])(a0, a1);
var _IsValidJsonNumber = Module['_IsValidJsonNumber'] = (a0, a1) => (_IsValidJsonNumber = Module['_IsValidJsonNumber'] = wasmExports['IsValidJsonNumber'])(a0, a1);
var _readlink = Module['_readlink'] = (a0, a1, a2) => (_readlink = Module['_readlink'] = wasmExports['readlink'])(a0, a1, a2);
var _path_is_relative_and_below_cwd = Module['_path_is_relative_and_below_cwd'] = (a0) => (_path_is_relative_and_below_cwd = Module['_path_is_relative_and_below_cwd'] = wasmExports['path_is_relative_and_below_cwd'])(a0);
var _fseeko = Module['_fseeko'] = (a0, a1, a2) => (_fseeko = Module['_fseeko'] = wasmExports['fseeko'])(a0, a1, a2);
var ___divti3 = Module['___divti3'] = (a0, a1, a2, a3, a4) => (___divti3 = Module['___divti3'] = wasmExports['__divti3'])(a0, a1, a2, a3, a4);
var _numeric_float8_no_overflow = Module['_numeric_float8_no_overflow'] = (a0) => (_numeric_float8_no_overflow = Module['_numeric_float8_no_overflow'] = wasmExports['numeric_float8_no_overflow'])(a0);
var _generic_restriction_selectivity = Module['_generic_restriction_selectivity'] = (a0, a1, a2, a3, a4, a5) => (_generic_restriction_selectivity = Module['_generic_restriction_selectivity'] = wasmExports['generic_restriction_selectivity'])(a0, a1, a2, a3, a4, a5);
var _genericcostestimate = Module['_genericcostestimate'] = (a0, a1, a2, a3) => (_genericcostestimate = Module['_genericcostestimate'] = wasmExports['genericcostestimate'])(a0, a1, a2, a3);
var _sigaddset = Module['_sigaddset'] = (a0, a1) => (_sigaddset = Module['_sigaddset'] = wasmExports['sigaddset'])(a0, a1);
var _getrlimit = Module['_getrlimit'] = (a0, a1) => (_getrlimit = Module['_getrlimit'] = wasmExports['getrlimit'])(a0, a1);
var _fsync_pgdata = Module['_fsync_pgdata'] = (a0, a1) => (_fsync_pgdata = Module['_fsync_pgdata'] = wasmExports['fsync_pgdata'])(a0, a1);
var _get_restricted_token = Module['_get_restricted_token'] = () => (_get_restricted_token = Module['_get_restricted_token'] = wasmExports['get_restricted_token'])();
var _pg_malloc = Module['_pg_malloc'] = (a0) => (_pg_malloc = Module['_pg_malloc'] = wasmExports['pg_malloc'])(a0);
var _pg_realloc = Module['_pg_realloc'] = (a0, a1) => (_pg_realloc = Module['_pg_realloc'] = wasmExports['pg_realloc'])(a0, a1);
var _pg_strdup = Module['_pg_strdup'] = (a0) => (_pg_strdup = Module['_pg_strdup'] = wasmExports['pg_strdup'])(a0);
var _simple_prompt = Module['_simple_prompt'] = (a0, a1) => (_simple_prompt = Module['_simple_prompt'] = wasmExports['simple_prompt'])(a0, a1);
var _interactive_file = Module['_interactive_file'] = () => (_interactive_file = Module['_interactive_file'] = wasmExports['interactive_file'])();
var _interactive_one = Module['_interactive_one'] = () => (_interactive_one = Module['_interactive_one'] = wasmExports['interactive_one'])();
var _rewind = Module['_rewind'] = (a0) => (_rewind = Module['_rewind'] = wasmExports['rewind'])(a0);
var _pg_repl_raf = Module['_pg_repl_raf'] = () => (_pg_repl_raf = Module['_pg_repl_raf'] = wasmExports['pg_repl_raf'])();
var _pg_shutdown = Module['_pg_shutdown'] = () => (_pg_shutdown = Module['_pg_shutdown'] = wasmExports['pg_shutdown'])();
var _interactive_write = Module['_interactive_write'] = (a0) => (_interactive_write = Module['_interactive_write'] = wasmExports['interactive_write'])(a0);
var _interactive_read = Module['_interactive_read'] = () => (_interactive_read = Module['_interactive_read'] = wasmExports['interactive_read'])();
var _standard_ProcessUtility = Module['_standard_ProcessUtility'] = (a0, a1, a2, a3, a4, a5, a6, a7) => (_standard_ProcessUtility = Module['_standard_ProcessUtility'] = wasmExports['standard_ProcessUtility'])(a0, a1, a2, a3, a4, a5, a6, a7);
var _CleanQuerytext = Module['_CleanQuerytext'] = (a0, a1, a2) => (_CleanQuerytext = Module['_CleanQuerytext'] = wasmExports['CleanQuerytext'])(a0, a1, a2);
var _EnableQueryId = Module['_EnableQueryId'] = () => (_EnableQueryId = Module['_EnableQueryId'] = wasmExports['EnableQueryId'])();
var _list_make4_impl = Module['_list_make4_impl'] = (a0, a1, a2, a3, a4) => (_list_make4_impl = Module['_list_make4_impl'] = wasmExports['list_make4_impl'])(a0, a1, a2, a3, a4);
var _list_make5_impl = Module['_list_make5_impl'] = (a0, a1, a2, a3, a4, a5) => (_list_make5_impl = Module['_list_make5_impl'] = wasmExports['list_make5_impl'])(a0, a1, a2, a3, a4, a5);
var _tbm_add_tuples = Module['_tbm_add_tuples'] = (a0, a1, a2, a3) => (_tbm_add_tuples = Module['_tbm_add_tuples'] = wasmExports['tbm_add_tuples'])(a0, a1, a2, a3);
var _makeTypeName = Module['_makeTypeName'] = (a0) => (_makeTypeName = Module['_makeTypeName'] = wasmExports['makeTypeName'])(a0);
var _bbsink_forward_begin_archive = Module['_bbsink_forward_begin_archive'] = (a0, a1) => (_bbsink_forward_begin_archive = Module['_bbsink_forward_begin_archive'] = wasmExports['bbsink_forward_begin_archive'])(a0, a1);
var _bbsink_forward_archive_contents = Module['_bbsink_forward_archive_contents'] = (a0, a1) => (_bbsink_forward_archive_contents = Module['_bbsink_forward_archive_contents'] = wasmExports['bbsink_forward_archive_contents'])(a0, a1);
var _bbsink_forward_end_archive = Module['_bbsink_forward_end_archive'] = (a0) => (_bbsink_forward_end_archive = Module['_bbsink_forward_end_archive'] = wasmExports['bbsink_forward_end_archive'])(a0);
var _bbsink_forward_begin_manifest = Module['_bbsink_forward_begin_manifest'] = (a0) => (_bbsink_forward_begin_manifest = Module['_bbsink_forward_begin_manifest'] = wasmExports['bbsink_forward_begin_manifest'])(a0);
var _bbsink_forward_manifest_contents = Module['_bbsink_forward_manifest_contents'] = (a0, a1) => (_bbsink_forward_manifest_contents = Module['_bbsink_forward_manifest_contents'] = wasmExports['bbsink_forward_manifest_contents'])(a0, a1);
var _bbsink_forward_end_manifest = Module['_bbsink_forward_end_manifest'] = (a0) => (_bbsink_forward_end_manifest = Module['_bbsink_forward_end_manifest'] = wasmExports['bbsink_forward_end_manifest'])(a0);
var _bbsink_forward_begin_backup = Module['_bbsink_forward_begin_backup'] = (a0) => (_bbsink_forward_begin_backup = Module['_bbsink_forward_begin_backup'] = wasmExports['bbsink_forward_begin_backup'])(a0);
var _bbsink_forward_end_backup = Module['_bbsink_forward_end_backup'] = (a0, a1, a2) => (_bbsink_forward_end_backup = Module['_bbsink_forward_end_backup'] = wasmExports['bbsink_forward_end_backup'])(a0, a1, a2);
var _bbsink_forward_cleanup = Module['_bbsink_forward_cleanup'] = (a0) => (_bbsink_forward_cleanup = Module['_bbsink_forward_cleanup'] = wasmExports['bbsink_forward_cleanup'])(a0);
var _BaseBackupAddTarget = Module['_BaseBackupAddTarget'] = (a0, a1, a2) => (_BaseBackupAddTarget = Module['_BaseBackupAddTarget'] = wasmExports['BaseBackupAddTarget'])(a0, a1, a2);
var _pg_checksum_page = Module['_pg_checksum_page'] = (a0, a1) => (_pg_checksum_page = Module['_pg_checksum_page'] = wasmExports['pg_checksum_page'])(a0, a1);
var _pread = Module['_pread'] = (a0, a1, a2, a3) => (_pread = Module['_pread'] = wasmExports['pread'])(a0, a1, a2, a3);
var _GetUserMapping = Module['_GetUserMapping'] = (a0, a1) => (_GetUserMapping = Module['_GetUserMapping'] = wasmExports['GetUserMapping'])(a0, a1);
var _GetForeignTable = Module['_GetForeignTable'] = (a0) => (_GetForeignTable = Module['_GetForeignTable'] = wasmExports['GetForeignTable'])(a0);
var _GetForeignColumnOptions = Module['_GetForeignColumnOptions'] = (a0, a1) => (_GetForeignColumnOptions = Module['_GetForeignColumnOptions'] = wasmExports['GetForeignColumnOptions'])(a0, a1);
var _GetExistingLocalJoinPath = Module['_GetExistingLocalJoinPath'] = (a0) => (_GetExistingLocalJoinPath = Module['_GetExistingLocalJoinPath'] = wasmExports['GetExistingLocalJoinPath'])(a0);
var _PageGetExactFreeSpace = Module['_PageGetExactFreeSpace'] = (a0) => (_PageGetExactFreeSpace = Module['_PageGetExactFreeSpace'] = wasmExports['PageGetExactFreeSpace'])(a0);
var __bt_form_posting = Module['__bt_form_posting'] = (a0, a1, a2) => (__bt_form_posting = Module['__bt_form_posting'] = wasmExports['_bt_form_posting'])(a0, a1, a2);
var _PageIndexMultiDelete = Module['_PageIndexMultiDelete'] = (a0, a1, a2) => (_PageIndexMultiDelete = Module['_PageIndexMultiDelete'] = wasmExports['PageIndexMultiDelete'])(a0, a1, a2);
var _XLogRecGetBlockTagExtended = Module['_XLogRecGetBlockTagExtended'] = (a0, a1, a2, a3, a4, a5) => (_XLogRecGetBlockTagExtended = Module['_XLogRecGetBlockTagExtended'] = wasmExports['XLogRecGetBlockTagExtended'])(a0, a1, a2, a3, a4, a5);
var _PageIndexTupleOverwrite = Module['_PageIndexTupleOverwrite'] = (a0, a1, a2, a3) => (_PageIndexTupleOverwrite = Module['_PageIndexTupleOverwrite'] = wasmExports['PageIndexTupleOverwrite'])(a0, a1, a2, a3);
var __bt_checkpage = Module['__bt_checkpage'] = (a0, a1) => (__bt_checkpage = Module['__bt_checkpage'] = wasmExports['_bt_checkpage'])(a0, a1);
var _PageGetFreeSpace = Module['_PageGetFreeSpace'] = (a0) => (_PageGetFreeSpace = Module['_PageGetFreeSpace'] = wasmExports['PageGetFreeSpace'])(a0);
var __bt_compare = Module['__bt_compare'] = (a0, a1, a2, a3) => (__bt_compare = Module['__bt_compare'] = wasmExports['_bt_compare'])(a0, a1, a2, a3);
var __bt_relbuf = Module['__bt_relbuf'] = (a0, a1) => (__bt_relbuf = Module['__bt_relbuf'] = wasmExports['_bt_relbuf'])(a0, a1);
var __bt_search = Module['__bt_search'] = (a0, a1, a2, a3, a4, a5) => (__bt_search = Module['__bt_search'] = wasmExports['_bt_search'])(a0, a1, a2, a3, a4, a5);
var __bt_binsrch_insert = Module['__bt_binsrch_insert'] = (a0, a1) => (__bt_binsrch_insert = Module['__bt_binsrch_insert'] = wasmExports['_bt_binsrch_insert'])(a0, a1);
var __bt_freestack = Module['__bt_freestack'] = (a0) => (__bt_freestack = Module['__bt_freestack'] = wasmExports['_bt_freestack'])(a0);
var _WaitForParallelWorkersToAttach = Module['_WaitForParallelWorkersToAttach'] = (a0) => (_WaitForParallelWorkersToAttach = Module['_WaitForParallelWorkersToAttach'] = wasmExports['WaitForParallelWorkersToAttach'])(a0);
var __bt_allequalimage = Module['__bt_allequalimage'] = (a0, a1) => (__bt_allequalimage = Module['__bt_allequalimage'] = wasmExports['_bt_allequalimage'])(a0, a1);
var _ConditionVariableSignal = Module['_ConditionVariableSignal'] = (a0) => (_ConditionVariableSignal = Module['_ConditionVariableSignal'] = wasmExports['ConditionVariableSignal'])(a0);
var __bt_metaversion = Module['__bt_metaversion'] = (a0, a1, a2) => (__bt_metaversion = Module['__bt_metaversion'] = wasmExports['_bt_metaversion'])(a0, a1, a2);
var _index_getprocinfo = Module['_index_getprocinfo'] = (a0, a1, a2) => (_index_getprocinfo = Module['_index_getprocinfo'] = wasmExports['index_getprocinfo'])(a0, a1, a2);
var _build_reloptions = Module['_build_reloptions'] = (a0, a1, a2, a3, a4, a5) => (_build_reloptions = Module['_build_reloptions'] = wasmExports['build_reloptions'])(a0, a1, a2, a3, a4, a5);
var __bt_check_natts = Module['__bt_check_natts'] = (a0, a1, a2, a3) => (__bt_check_natts = Module['__bt_check_natts'] = wasmExports['_bt_check_natts'])(a0, a1, a2, a3);
var _GetFreeIndexPage = Module['_GetFreeIndexPage'] = (a0) => (_GetFreeIndexPage = Module['_GetFreeIndexPage'] = wasmExports['GetFreeIndexPage'])(a0);
var _ConditionalLockBuffer = Module['_ConditionalLockBuffer'] = (a0) => (_ConditionalLockBuffer = Module['_ConditionalLockBuffer'] = wasmExports['ConditionalLockBuffer'])(a0);
var _LockBufferForCleanup = Module['_LockBufferForCleanup'] = (a0) => (_LockBufferForCleanup = Module['_LockBufferForCleanup'] = wasmExports['LockBufferForCleanup'])(a0);
var _RecordFreeIndexPage = Module['_RecordFreeIndexPage'] = (a0, a1) => (_RecordFreeIndexPage = Module['_RecordFreeIndexPage'] = wasmExports['RecordFreeIndexPage'])(a0, a1);
var _ReadBufferExtended = Module['_ReadBufferExtended'] = (a0, a1, a2, a3, a4) => (_ReadBufferExtended = Module['_ReadBufferExtended'] = wasmExports['ReadBufferExtended'])(a0, a1, a2, a3, a4);
var _log_newpage_buffer = Module['_log_newpage_buffer'] = (a0, a1) => (_log_newpage_buffer = Module['_log_newpage_buffer'] = wasmExports['log_newpage_buffer'])(a0, a1);
var _index_form_tuple = Module['_index_form_tuple'] = (a0, a1, a2) => (_index_form_tuple = Module['_index_form_tuple'] = wasmExports['index_form_tuple'])(a0, a1, a2);
var _RelationGetIndexScan = Module['_RelationGetIndexScan'] = (a0, a1, a2) => (_RelationGetIndexScan = Module['_RelationGetIndexScan'] = wasmExports['RelationGetIndexScan'])(a0, a1, a2);
var _LockRelationForExtension = Module['_LockRelationForExtension'] = (a0, a1) => (_LockRelationForExtension = Module['_LockRelationForExtension'] = wasmExports['LockRelationForExtension'])(a0, a1);
var _UnlockRelationForExtension = Module['_UnlockRelationForExtension'] = (a0, a1) => (_UnlockRelationForExtension = Module['_UnlockRelationForExtension'] = wasmExports['UnlockRelationForExtension'])(a0, a1);
var _IndexFreeSpaceMapVacuum = Module['_IndexFreeSpaceMapVacuum'] = (a0) => (_IndexFreeSpaceMapVacuum = Module['_IndexFreeSpaceMapVacuum'] = wasmExports['IndexFreeSpaceMapVacuum'])(a0);
var _TestForOldSnapshot_impl = Module['_TestForOldSnapshot_impl'] = (a0, a1) => (_TestForOldSnapshot_impl = Module['_TestForOldSnapshot_impl'] = wasmExports['TestForOldSnapshot_impl'])(a0, a1);
var _check_amproc_signature = Module['_check_amproc_signature'] = (a0, a1, a2, a3, a4, a5) => (_check_amproc_signature = Module['_check_amproc_signature'] = wasmExports['check_amproc_signature'])(a0, a1, a2, a3, a4, a5);
var _check_amoptsproc_signature = Module['_check_amoptsproc_signature'] = (a0) => (_check_amoptsproc_signature = Module['_check_amoptsproc_signature'] = wasmExports['check_amoptsproc_signature'])(a0);
var _check_amop_signature = Module['_check_amop_signature'] = (a0, a1, a2, a3) => (_check_amop_signature = Module['_check_amop_signature'] = wasmExports['check_amop_signature'])(a0, a1, a2, a3);
var _identify_opfamily_groups = Module['_identify_opfamily_groups'] = (a0, a1) => (_identify_opfamily_groups = Module['_identify_opfamily_groups'] = wasmExports['identify_opfamily_groups'])(a0, a1);
var _ginPostingListDecode = Module['_ginPostingListDecode'] = (a0, a1) => (_ginPostingListDecode = Module['_ginPostingListDecode'] = wasmExports['ginPostingListDecode'])(a0, a1);
var _LockPage = Module['_LockPage'] = (a0, a1, a2) => (_LockPage = Module['_LockPage'] = wasmExports['LockPage'])(a0, a1, a2);
var _UnlockPage = Module['_UnlockPage'] = (a0, a1, a2) => (_UnlockPage = Module['_UnlockPage'] = wasmExports['UnlockPage'])(a0, a1, a2);
var _add_reloption_kind = Module['_add_reloption_kind'] = () => (_add_reloption_kind = Module['_add_reloption_kind'] = wasmExports['add_reloption_kind'])();
var _register_reloptions_validator = Module['_register_reloptions_validator'] = (a0, a1) => (_register_reloptions_validator = Module['_register_reloptions_validator'] = wasmExports['register_reloptions_validator'])(a0, a1);
var _add_int_reloption = Module['_add_int_reloption'] = (a0, a1, a2, a3, a4, a5, a6) => (_add_int_reloption = Module['_add_int_reloption'] = wasmExports['add_int_reloption'])(a0, a1, a2, a3, a4, a5, a6);
var _toast_open_indexes = Module['_toast_open_indexes'] = (a0, a1, a2, a3) => (_toast_open_indexes = Module['_toast_open_indexes'] = wasmExports['toast_open_indexes'])(a0, a1, a2, a3);
var _toast_close_indexes = Module['_toast_close_indexes'] = (a0, a1, a2) => (_toast_close_indexes = Module['_toast_close_indexes'] = wasmExports['toast_close_indexes'])(a0, a1, a2);
var _init_toast_snapshot = Module['_init_toast_snapshot'] = (a0) => (_init_toast_snapshot = Module['_init_toast_snapshot'] = wasmExports['init_toast_snapshot'])(a0);
var _visibilitymap_clear = Module['_visibilitymap_clear'] = (a0, a1, a2, a3) => (_visibilitymap_clear = Module['_visibilitymap_clear'] = wasmExports['visibilitymap_clear'])(a0, a1, a2, a3);
var _visibilitymap_pin = Module['_visibilitymap_pin'] = (a0, a1, a2) => (_visibilitymap_pin = Module['_visibilitymap_pin'] = wasmExports['visibilitymap_pin'])(a0, a1, a2);
var _HeapTupleSatisfiesUpdate = Module['_HeapTupleSatisfiesUpdate'] = (a0, a1, a2) => (_HeapTupleSatisfiesUpdate = Module['_HeapTupleSatisfiesUpdate'] = wasmExports['HeapTupleSatisfiesUpdate'])(a0, a1, a2);
var _HeapTupleGetUpdateXid = Module['_HeapTupleGetUpdateXid'] = (a0) => (_HeapTupleGetUpdateXid = Module['_HeapTupleGetUpdateXid'] = wasmExports['HeapTupleGetUpdateXid'])(a0);
var _HeapTupleSatisfiesVacuum = Module['_HeapTupleSatisfiesVacuum'] = (a0, a1, a2) => (_HeapTupleSatisfiesVacuum = Module['_HeapTupleSatisfiesVacuum'] = wasmExports['HeapTupleSatisfiesVacuum'])(a0, a1, a2);
var _GetMultiXactIdMembers = Module['_GetMultiXactIdMembers'] = (a0, a1, a2, a3) => (_GetMultiXactIdMembers = Module['_GetMultiXactIdMembers'] = wasmExports['GetMultiXactIdMembers'])(a0, a1, a2, a3);
var _PageGetHeapFreeSpace = Module['_PageGetHeapFreeSpace'] = (a0) => (_PageGetHeapFreeSpace = Module['_PageGetHeapFreeSpace'] = wasmExports['PageGetHeapFreeSpace'])(a0);
var _heap_tuple_needs_eventual_freeze = Module['_heap_tuple_needs_eventual_freeze'] = (a0) => (_heap_tuple_needs_eventual_freeze = Module['_heap_tuple_needs_eventual_freeze'] = wasmExports['heap_tuple_needs_eventual_freeze'])(a0);
var _GetRecordedFreeSpace = Module['_GetRecordedFreeSpace'] = (a0, a1) => (_GetRecordedFreeSpace = Module['_GetRecordedFreeSpace'] = wasmExports['GetRecordedFreeSpace'])(a0, a1);
var _ftruncate = Module['_ftruncate'] = (a0, a1) => (_ftruncate = Module['_ftruncate'] = wasmExports['ftruncate'])(a0, a1);
var __hash_ovflblkno_to_bitno = Module['__hash_ovflblkno_to_bitno'] = (a0, a1) => (__hash_ovflblkno_to_bitno = Module['__hash_ovflblkno_to_bitno'] = wasmExports['_hash_ovflblkno_to_bitno'])(a0, a1);
var __hash_relbuf = Module['__hash_relbuf'] = (a0, a1) => (__hash_relbuf = Module['__hash_relbuf'] = wasmExports['_hash_relbuf'])(a0, a1);
var __hash_getbuf = Module['__hash_getbuf'] = (a0, a1, a2, a3) => (__hash_getbuf = Module['__hash_getbuf'] = wasmExports['_hash_getbuf'])(a0, a1, a2, a3);
var __hash_getbuf_with_strategy = Module['__hash_getbuf_with_strategy'] = (a0, a1, a2, a3, a4) => (__hash_getbuf_with_strategy = Module['__hash_getbuf_with_strategy'] = wasmExports['_hash_getbuf_with_strategy'])(a0, a1, a2, a3, a4);
var __hash_get_indextuple_hashkey = Module['__hash_get_indextuple_hashkey'] = (a0) => (__hash_get_indextuple_hashkey = Module['__hash_get_indextuple_hashkey'] = wasmExports['_hash_get_indextuple_hashkey'])(a0);
var _brin_build_desc = Module['_brin_build_desc'] = (a0) => (_brin_build_desc = Module['_brin_build_desc'] = wasmExports['brin_build_desc'])(a0);
var _brin_deform_tuple = Module['_brin_deform_tuple'] = (a0, a1, a2) => (_brin_deform_tuple = Module['_brin_deform_tuple'] = wasmExports['brin_deform_tuple'])(a0, a1, a2);
var _brin_free_desc = Module['_brin_free_desc'] = (a0) => (_brin_free_desc = Module['_brin_free_desc'] = wasmExports['brin_free_desc'])(a0);
var _gistcheckpage = Module['_gistcheckpage'] = (a0, a1) => (_gistcheckpage = Module['_gistcheckpage'] = wasmExports['gistcheckpage'])(a0, a1);
var _XLogRecGetBlockRefInfo = Module['_XLogRecGetBlockRefInfo'] = (a0, a1, a2, a3, a4) => (_XLogRecGetBlockRefInfo = Module['_XLogRecGetBlockRefInfo'] = wasmExports['XLogRecGetBlockRefInfo'])(a0, a1, a2, a3, a4);
var _AtEOSubXact_Files = Module['_AtEOSubXact_Files'] = (a0, a1, a2) => (_AtEOSubXact_Files = Module['_AtEOSubXact_Files'] = wasmExports['AtEOSubXact_Files'])(a0, a1, a2);
var _RegisterXactCallback = Module['_RegisterXactCallback'] = (a0, a1) => (_RegisterXactCallback = Module['_RegisterXactCallback'] = wasmExports['RegisterXactCallback'])(a0, a1);
var _UnregisterXactCallback = Module['_UnregisterXactCallback'] = (a0, a1) => (_UnregisterXactCallback = Module['_UnregisterXactCallback'] = wasmExports['UnregisterXactCallback'])(a0, a1);
var _RegisterSubXactCallback = Module['_RegisterSubXactCallback'] = (a0, a1) => (_RegisterSubXactCallback = Module['_RegisterSubXactCallback'] = wasmExports['RegisterSubXactCallback'])(a0, a1);
var _ReleaseCurrentSubTransaction = Module['_ReleaseCurrentSubTransaction'] = () => (_ReleaseCurrentSubTransaction = Module['_ReleaseCurrentSubTransaction'] = wasmExports['ReleaseCurrentSubTransaction'])();
var _RestoreBlockImage = Module['_RestoreBlockImage'] = (a0, a1, a2) => (_RestoreBlockImage = Module['_RestoreBlockImage'] = wasmExports['RestoreBlockImage'])(a0, a1, a2);
var _GenericXLogStart = Module['_GenericXLogStart'] = (a0) => (_GenericXLogStart = Module['_GenericXLogStart'] = wasmExports['GenericXLogStart'])(a0);
var _GenericXLogRegisterBuffer = Module['_GenericXLogRegisterBuffer'] = (a0, a1, a2) => (_GenericXLogRegisterBuffer = Module['_GenericXLogRegisterBuffer'] = wasmExports['GenericXLogRegisterBuffer'])(a0, a1, a2);
var _GenericXLogFinish = Module['_GenericXLogFinish'] = (a0) => (_GenericXLogFinish = Module['_GenericXLogFinish'] = wasmExports['GenericXLogFinish'])(a0);
var _GenericXLogAbort = Module['_GenericXLogAbort'] = (a0) => (_GenericXLogAbort = Module['_GenericXLogAbort'] = wasmExports['GenericXLogAbort'])(a0);
var _XLogFindNextRecord = Module['_XLogFindNextRecord'] = (a0, a1) => (_XLogFindNextRecord = Module['_XLogFindNextRecord'] = wasmExports['XLogFindNextRecord'])(a0, a1);
var _read_local_xlog_page_no_wait = Module['_read_local_xlog_page_no_wait'] = (a0, a1, a2, a3, a4) => (_read_local_xlog_page_no_wait = Module['_read_local_xlog_page_no_wait'] = wasmExports['read_local_xlog_page_no_wait'])(a0, a1, a2, a3, a4);
var _XLogRecStoreStats = Module['_XLogRecStoreStats'] = (a0, a1) => (_XLogRecStoreStats = Module['_XLogRecStoreStats'] = wasmExports['XLogRecStoreStats'])(a0, a1);
var _ReadMultiXactIdRange = Module['_ReadMultiXactIdRange'] = (a0, a1) => (_ReadMultiXactIdRange = Module['_ReadMultiXactIdRange'] = wasmExports['ReadMultiXactIdRange'])(a0, a1);
var _LWLockRegisterTranche = Module['_LWLockRegisterTranche'] = (a0, a1) => (_LWLockRegisterTranche = Module['_LWLockRegisterTranche'] = wasmExports['LWLockRegisterTranche'])(a0, a1);
var _GetNamedLWLockTranche = Module['_GetNamedLWLockTranche'] = (a0) => (_GetNamedLWLockTranche = Module['_GetNamedLWLockTranche'] = wasmExports['GetNamedLWLockTranche'])(a0);
var _LWLockNewTrancheId = Module['_LWLockNewTrancheId'] = () => (_LWLockNewTrancheId = Module['_LWLockNewTrancheId'] = wasmExports['LWLockNewTrancheId'])();
var _RequestNamedLWLockTranche = Module['_RequestNamedLWLockTranche'] = (a0, a1) => (_RequestNamedLWLockTranche = Module['_RequestNamedLWLockTranche'] = wasmExports['RequestNamedLWLockTranche'])(a0, a1);
var _ShmemInitHash = Module['_ShmemInitHash'] = (a0, a1, a2, a3, a4) => (_ShmemInitHash = Module['_ShmemInitHash'] = wasmExports['ShmemInitHash'])(a0, a1, a2, a3, a4);
var _LockBufHdr = Module['_LockBufHdr'] = (a0) => (_LockBufHdr = Module['_LockBufHdr'] = wasmExports['LockBufHdr'])(a0);
var _have_free_buffer = Module['_have_free_buffer'] = () => (_have_free_buffer = Module['_have_free_buffer'] = wasmExports['have_free_buffer'])();
var _atexit = Module['_atexit'] = (a0) => (_atexit = Module['_atexit'] = wasmExports['atexit'])(a0);
var _poll = Module['_poll'] = (a0, a1, a2) => (_poll = Module['_poll'] = wasmExports['poll'])(a0, a1, a2);
var _BackendXidGetPid = Module['_BackendXidGetPid'] = (a0) => (_BackendXidGetPid = Module['_BackendXidGetPid'] = wasmExports['BackendXidGetPid'])(a0);
var _RequestAddinShmemSpace = Module['_RequestAddinShmemSpace'] = (a0) => (_RequestAddinShmemSpace = Module['_RequestAddinShmemSpace'] = wasmExports['RequestAddinShmemSpace'])(a0);
var _copy_file = Module['_copy_file'] = (a0, a1) => (_copy_file = Module['_copy_file'] = wasmExports['copy_file'])(a0, a1);
var _fiprintf = Module['_fiprintf'] = (a0, a1, a2) => (_fiprintf = Module['_fiprintf'] = wasmExports['fiprintf'])(a0, a1, a2);
var _fdatasync = Module['_fdatasync'] = (a0) => (_fdatasync = Module['_fdatasync'] = wasmExports['fdatasync'])(a0);
var _truncate = Module['_truncate'] = (a0, a1) => (_truncate = Module['_truncate'] = wasmExports['truncate'])(a0, a1);
var _fsync_fname_ext = Module['_fsync_fname_ext'] = (a0, a1, a2, a3) => (_fsync_fname_ext = Module['_fsync_fname_ext'] = wasmExports['fsync_fname_ext'])(a0, a1, a2, a3);
var _dup = Module['_dup'] = (a0) => (_dup = Module['_dup'] = wasmExports['dup'])(a0);
var _AcquireExternalFD = Module['_AcquireExternalFD'] = () => (_AcquireExternalFD = Module['_AcquireExternalFD'] = wasmExports['AcquireExternalFD'])();
var _mkdir = Module['_mkdir'] = (a0, a1) => (_mkdir = Module['_mkdir'] = wasmExports['mkdir'])(a0, a1);
var _posix_fallocate = Module['_posix_fallocate'] = (a0, a1, a2) => (_posix_fallocate = Module['_posix_fallocate'] = wasmExports['posix_fallocate'])(a0, a1, a2);
var _pclose = Module['_pclose'] = (a0) => (_pclose = Module['_pclose'] = wasmExports['pclose'])(a0);
var _closedir = Module['_closedir'] = (a0) => (_closedir = Module['_closedir'] = wasmExports['closedir'])(a0);
var _opendir = Module['_opendir'] = (a0) => (_opendir = Module['_opendir'] = wasmExports['opendir'])(a0);
var _readdir = Module['_readdir'] = (a0) => (_readdir = Module['_readdir'] = wasmExports['readdir'])(a0);
var _scanner_init = Module['_scanner_init'] = (a0, a1, a2, a3) => (_scanner_init = Module['_scanner_init'] = wasmExports['scanner_init'])(a0, a1, a2, a3);
var _scanner_finish = Module['_scanner_finish'] = (a0) => (_scanner_finish = Module['_scanner_finish'] = wasmExports['scanner_finish'])(a0);
var _core_yylex = Module['_core_yylex'] = (a0, a1, a2) => (_core_yylex = Module['_core_yylex'] = wasmExports['core_yylex'])(a0, a1, a2);
var _get_tsearch_config_filename = Module['_get_tsearch_config_filename'] = (a0, a1) => (_get_tsearch_config_filename = Module['_get_tsearch_config_filename'] = wasmExports['get_tsearch_config_filename'])(a0, a1);
var _lowerstr = Module['_lowerstr'] = (a0) => (_lowerstr = Module['_lowerstr'] = wasmExports['lowerstr'])(a0);
var _readstoplist = Module['_readstoplist'] = (a0, a1, a2) => (_readstoplist = Module['_readstoplist'] = wasmExports['readstoplist'])(a0, a1, a2);
var _lowerstr_with_len = Module['_lowerstr_with_len'] = (a0, a1) => (_lowerstr_with_len = Module['_lowerstr_with_len'] = wasmExports['lowerstr_with_len'])(a0, a1);
var _searchstoplist = Module['_searchstoplist'] = (a0, a1) => (_searchstoplist = Module['_searchstoplist'] = wasmExports['searchstoplist'])(a0, a1);
var _tsearch_readline_begin = Module['_tsearch_readline_begin'] = (a0, a1) => (_tsearch_readline_begin = Module['_tsearch_readline_begin'] = wasmExports['tsearch_readline_begin'])(a0, a1);
var _tsearch_readline = Module['_tsearch_readline'] = (a0) => (_tsearch_readline = Module['_tsearch_readline'] = wasmExports['tsearch_readline'])(a0);
var _tsearch_readline_end = Module['_tsearch_readline_end'] = (a0) => (_tsearch_readline_end = Module['_tsearch_readline_end'] = wasmExports['tsearch_readline_end'])(a0);
var _putchar = Module['_putchar'] = (a0) => (_putchar = Module['_putchar'] = wasmExports['putchar'])(a0);
var _pg_initdb = Module['_pg_initdb'] = () => (_pg_initdb = Module['_pg_initdb'] = wasmExports['pg_initdb'])();
var _pg_initdb_main = Module['_pg_initdb_main'] = () => (_pg_initdb_main = Module['_pg_initdb_main'] = wasmExports['pg_initdb_main'])();
var _remove = Module['_remove'] = (a0) => (_remove = Module['_remove'] = wasmExports['remove'])(a0);
var _fdopen = Module['_fdopen'] = (a0, a1) => (_fdopen = Module['_fdopen'] = wasmExports['fdopen'])(a0, a1);
var ___cxa_throw = Module['___cxa_throw'] = (a0, a1, a2) => (___cxa_throw = Module['___cxa_throw'] = wasmExports['__cxa_throw'])(a0, a1, a2);
var _main_repl = Module['_main_repl'] = (a0) => (_main_repl = Module['_main_repl'] = wasmExports['main_repl'])(a0);
var _main = Module['_main'] = (a0, a1) => (_main = Module['_main'] = wasmExports['__main_argc_argv'])(a0, a1);
var _fputs = Module['_fputs'] = (a0, a1) => (_fputs = Module['_fputs'] = wasmExports['fputs'])(a0, a1);
var ___lshrti3 = Module['___lshrti3'] = (a0, a1, a2, a3) => (___lshrti3 = Module['___lshrti3'] = wasmExports['__lshrti3'])(a0, a1, a2, a3);
var _realpath = Module['_realpath'] = (a0, a1) => (_realpath = Module['_realpath'] = wasmExports['realpath'])(a0, a1);
var _popen = Module['_popen'] = (a0, a1) => (_popen = Module['_popen'] = wasmExports['popen'])(a0, a1);
var _float_to_shortest_decimal_bufn = Module['_float_to_shortest_decimal_bufn'] = (a0, a1) => (_float_to_shortest_decimal_bufn = Module['_float_to_shortest_decimal_bufn'] = wasmExports['float_to_shortest_decimal_bufn'])(a0, a1);
var _pg_prng_uint64 = Module['_pg_prng_uint64'] = (a0) => (_pg_prng_uint64 = Module['_pg_prng_uint64'] = wasmExports['pg_prng_uint64'])(a0);
var _scram_ClientKey = Module['_scram_ClientKey'] = (a0, a1, a2, a3, a4) => (_scram_ClientKey = Module['_scram_ClientKey'] = wasmExports['scram_ClientKey'])(a0, a1, a2, a3, a4);
var _pg_encoding_dsplen = Module['_pg_encoding_dsplen'] = (a0, a1) => (_pg_encoding_dsplen = Module['_pg_encoding_dsplen'] = wasmExports['pg_encoding_dsplen'])(a0, a1);
var _getcwd = Module['_getcwd'] = (a0, a1) => (_getcwd = Module['_getcwd'] = wasmExports['getcwd'])(a0, a1);
var _pg_get_user_home_dir = Module['_pg_get_user_home_dir'] = (a0, a1, a2) => (_pg_get_user_home_dir = Module['_pg_get_user_home_dir'] = wasmExports['pg_get_user_home_dir'])(a0, a1, a2);
var _nanosleep = Module['_nanosleep'] = (a0, a1) => (_nanosleep = Module['_nanosleep'] = wasmExports['nanosleep'])(a0, a1);
var _snprintf = Module['_snprintf'] = (a0, a1, a2, a3) => (_snprintf = Module['_snprintf'] = wasmExports['snprintf'])(a0, a1, a2, a3);
var _pg_strerror_r = Module['_pg_strerror_r'] = (a0, a1, a2) => (_pg_strerror_r = Module['_pg_strerror_r'] = wasmExports['pg_strerror_r'])(a0, a1, a2);
var _strerror_r = Module['_strerror_r'] = (a0, a1, a2) => (_strerror_r = Module['_strerror_r'] = wasmExports['strerror_r'])(a0, a1, a2);
var _pthread_mutex_lock = Module['_pthread_mutex_lock'] = (a0) => (_pthread_mutex_lock = Module['_pthread_mutex_lock'] = wasmExports['pthread_mutex_lock'])(a0);
var _pthread_mutex_unlock = Module['_pthread_mutex_unlock'] = (a0) => (_pthread_mutex_unlock = Module['_pthread_mutex_unlock'] = wasmExports['pthread_mutex_unlock'])(a0);
var _strncat = Module['_strncat'] = (a0, a1, a2) => (_strncat = Module['_strncat'] = wasmExports['strncat'])(a0, a1, a2);
var _PQexec = Module['_PQexec'] = (a0, a1) => (_PQexec = Module['_PQexec'] = wasmExports['PQexec'])(a0, a1);
var _PQsetSingleRowMode = Module['_PQsetSingleRowMode'] = (a0) => (_PQsetSingleRowMode = Module['_PQsetSingleRowMode'] = wasmExports['PQsetSingleRowMode'])(a0);
var _PQcmdStatus = Module['_PQcmdStatus'] = (a0) => (_PQcmdStatus = Module['_PQcmdStatus'] = wasmExports['PQcmdStatus'])(a0);
var _pthread_sigmask = Module['_pthread_sigmask'] = (a0, a1, a2) => (_pthread_sigmask = Module['_pthread_sigmask'] = wasmExports['pthread_sigmask'])(a0, a1, a2);
var _sigismember = Module['_sigismember'] = (a0, a1) => (_sigismember = Module['_sigismember'] = wasmExports['sigismember'])(a0, a1);
var _sigpending = Module['_sigpending'] = (a0) => (_sigpending = Module['_sigpending'] = wasmExports['sigpending'])(a0);
var _sigwait = Module['_sigwait'] = (a0, a1) => (_sigwait = Module['_sigwait'] = wasmExports['sigwait'])(a0, a1);
var _isolat1ToUTF8 = Module['_isolat1ToUTF8'] = (a0, a1, a2, a3) => (_isolat1ToUTF8 = Module['_isolat1ToUTF8'] = wasmExports['isolat1ToUTF8'])(a0, a1, a2, a3);
var _UTF8Toisolat1 = Module['_UTF8Toisolat1'] = (a0, a1, a2, a3) => (_UTF8Toisolat1 = Module['_UTF8Toisolat1'] = wasmExports['UTF8Toisolat1'])(a0, a1, a2, a3);
var _vfprintf = Module['_vfprintf'] = (a0, a1, a2) => (_vfprintf = Module['_vfprintf'] = wasmExports['vfprintf'])(a0, a1, a2);
var _vsnprintf = Module['_vsnprintf'] = (a0, a1, a2, a3) => (_vsnprintf = Module['_vsnprintf'] = wasmExports['vsnprintf'])(a0, a1, a2, a3);
var _xmlParserValidityWarning = Module['_xmlParserValidityWarning'] = (a0, a1, a2) => (_xmlParserValidityWarning = Module['_xmlParserValidityWarning'] = wasmExports['xmlParserValidityWarning'])(a0, a1, a2);
var _xmlParserValidityError = Module['_xmlParserValidityError'] = (a0, a1, a2) => (_xmlParserValidityError = Module['_xmlParserValidityError'] = wasmExports['xmlParserValidityError'])(a0, a1, a2);
var _xmlParserError = Module['_xmlParserError'] = (a0, a1, a2) => (_xmlParserError = Module['_xmlParserError'] = wasmExports['xmlParserError'])(a0, a1, a2);
var _xmlParserWarning = Module['_xmlParserWarning'] = (a0, a1, a2) => (_xmlParserWarning = Module['_xmlParserWarning'] = wasmExports['xmlParserWarning'])(a0, a1, a2);
var _fprintf = Module['_fprintf'] = (a0, a1, a2) => (_fprintf = Module['_fprintf'] = wasmExports['fprintf'])(a0, a1, a2);
var ___xmlParserInputBufferCreateFilename = Module['___xmlParserInputBufferCreateFilename'] = (a0, a1) => (___xmlParserInputBufferCreateFilename = Module['___xmlParserInputBufferCreateFilename'] = wasmExports['__xmlParserInputBufferCreateFilename'])(a0, a1);
var ___xmlOutputBufferCreateFilename = Module['___xmlOutputBufferCreateFilename'] = (a0, a1, a2) => (___xmlOutputBufferCreateFilename = Module['___xmlOutputBufferCreateFilename'] = wasmExports['__xmlOutputBufferCreateFilename'])(a0, a1, a2);
var _xmlSAX2InternalSubset = Module['_xmlSAX2InternalSubset'] = (a0, a1, a2, a3) => (_xmlSAX2InternalSubset = Module['_xmlSAX2InternalSubset'] = wasmExports['xmlSAX2InternalSubset'])(a0, a1, a2, a3);
var _xmlSAX2IsStandalone = Module['_xmlSAX2IsStandalone'] = (a0) => (_xmlSAX2IsStandalone = Module['_xmlSAX2IsStandalone'] = wasmExports['xmlSAX2IsStandalone'])(a0);
var _xmlSAX2HasInternalSubset = Module['_xmlSAX2HasInternalSubset'] = (a0) => (_xmlSAX2HasInternalSubset = Module['_xmlSAX2HasInternalSubset'] = wasmExports['xmlSAX2HasInternalSubset'])(a0);
var _xmlSAX2HasExternalSubset = Module['_xmlSAX2HasExternalSubset'] = (a0) => (_xmlSAX2HasExternalSubset = Module['_xmlSAX2HasExternalSubset'] = wasmExports['xmlSAX2HasExternalSubset'])(a0);
var _xmlSAX2ResolveEntity = Module['_xmlSAX2ResolveEntity'] = (a0, a1, a2) => (_xmlSAX2ResolveEntity = Module['_xmlSAX2ResolveEntity'] = wasmExports['xmlSAX2ResolveEntity'])(a0, a1, a2);
var _xmlSAX2GetEntity = Module['_xmlSAX2GetEntity'] = (a0, a1) => (_xmlSAX2GetEntity = Module['_xmlSAX2GetEntity'] = wasmExports['xmlSAX2GetEntity'])(a0, a1);
var _xmlSAX2EntityDecl = Module['_xmlSAX2EntityDecl'] = (a0, a1, a2, a3, a4, a5) => (_xmlSAX2EntityDecl = Module['_xmlSAX2EntityDecl'] = wasmExports['xmlSAX2EntityDecl'])(a0, a1, a2, a3, a4, a5);
var _xmlSAX2NotationDecl = Module['_xmlSAX2NotationDecl'] = (a0, a1, a2, a3) => (_xmlSAX2NotationDecl = Module['_xmlSAX2NotationDecl'] = wasmExports['xmlSAX2NotationDecl'])(a0, a1, a2, a3);
var _xmlSAX2AttributeDecl = Module['_xmlSAX2AttributeDecl'] = (a0, a1, a2, a3, a4, a5, a6) => (_xmlSAX2AttributeDecl = Module['_xmlSAX2AttributeDecl'] = wasmExports['xmlSAX2AttributeDecl'])(a0, a1, a2, a3, a4, a5, a6);
var _xmlSAX2ElementDecl = Module['_xmlSAX2ElementDecl'] = (a0, a1, a2, a3) => (_xmlSAX2ElementDecl = Module['_xmlSAX2ElementDecl'] = wasmExports['xmlSAX2ElementDecl'])(a0, a1, a2, a3);
var _xmlSAX2UnparsedEntityDecl = Module['_xmlSAX2UnparsedEntityDecl'] = (a0, a1, a2, a3, a4) => (_xmlSAX2UnparsedEntityDecl = Module['_xmlSAX2UnparsedEntityDecl'] = wasmExports['xmlSAX2UnparsedEntityDecl'])(a0, a1, a2, a3, a4);
var _xmlSAX2SetDocumentLocator = Module['_xmlSAX2SetDocumentLocator'] = (a0, a1) => (_xmlSAX2SetDocumentLocator = Module['_xmlSAX2SetDocumentLocator'] = wasmExports['xmlSAX2SetDocumentLocator'])(a0, a1);
var _xmlSAX2StartDocument = Module['_xmlSAX2StartDocument'] = (a0) => (_xmlSAX2StartDocument = Module['_xmlSAX2StartDocument'] = wasmExports['xmlSAX2StartDocument'])(a0);
var _xmlSAX2EndDocument = Module['_xmlSAX2EndDocument'] = (a0) => (_xmlSAX2EndDocument = Module['_xmlSAX2EndDocument'] = wasmExports['xmlSAX2EndDocument'])(a0);
var _xmlSAX2StartElement = Module['_xmlSAX2StartElement'] = (a0, a1, a2) => (_xmlSAX2StartElement = Module['_xmlSAX2StartElement'] = wasmExports['xmlSAX2StartElement'])(a0, a1, a2);
var _xmlSAX2EndElement = Module['_xmlSAX2EndElement'] = (a0, a1) => (_xmlSAX2EndElement = Module['_xmlSAX2EndElement'] = wasmExports['xmlSAX2EndElement'])(a0, a1);
var _xmlSAX2Reference = Module['_xmlSAX2Reference'] = (a0, a1) => (_xmlSAX2Reference = Module['_xmlSAX2Reference'] = wasmExports['xmlSAX2Reference'])(a0, a1);
var _xmlSAX2Characters = Module['_xmlSAX2Characters'] = (a0, a1, a2) => (_xmlSAX2Characters = Module['_xmlSAX2Characters'] = wasmExports['xmlSAX2Characters'])(a0, a1, a2);
var _xmlSAX2ProcessingInstruction = Module['_xmlSAX2ProcessingInstruction'] = (a0, a1, a2) => (_xmlSAX2ProcessingInstruction = Module['_xmlSAX2ProcessingInstruction'] = wasmExports['xmlSAX2ProcessingInstruction'])(a0, a1, a2);
var _xmlSAX2Comment = Module['_xmlSAX2Comment'] = (a0, a1) => (_xmlSAX2Comment = Module['_xmlSAX2Comment'] = wasmExports['xmlSAX2Comment'])(a0, a1);
var _xmlSAX2GetParameterEntity = Module['_xmlSAX2GetParameterEntity'] = (a0, a1) => (_xmlSAX2GetParameterEntity = Module['_xmlSAX2GetParameterEntity'] = wasmExports['xmlSAX2GetParameterEntity'])(a0, a1);
var _xmlSAX2CDataBlock = Module['_xmlSAX2CDataBlock'] = (a0, a1, a2) => (_xmlSAX2CDataBlock = Module['_xmlSAX2CDataBlock'] = wasmExports['xmlSAX2CDataBlock'])(a0, a1, a2);
var _xmlSAX2ExternalSubset = Module['_xmlSAX2ExternalSubset'] = (a0, a1, a2, a3) => (_xmlSAX2ExternalSubset = Module['_xmlSAX2ExternalSubset'] = wasmExports['xmlSAX2ExternalSubset'])(a0, a1, a2, a3);
var _xmlSAX2GetPublicId = Module['_xmlSAX2GetPublicId'] = (a0) => (_xmlSAX2GetPublicId = Module['_xmlSAX2GetPublicId'] = wasmExports['xmlSAX2GetPublicId'])(a0);
var _xmlSAX2GetSystemId = Module['_xmlSAX2GetSystemId'] = (a0) => (_xmlSAX2GetSystemId = Module['_xmlSAX2GetSystemId'] = wasmExports['xmlSAX2GetSystemId'])(a0);
var _xmlSAX2GetLineNumber = Module['_xmlSAX2GetLineNumber'] = (a0) => (_xmlSAX2GetLineNumber = Module['_xmlSAX2GetLineNumber'] = wasmExports['xmlSAX2GetLineNumber'])(a0);
var _xmlSAX2GetColumnNumber = Module['_xmlSAX2GetColumnNumber'] = (a0) => (_xmlSAX2GetColumnNumber = Module['_xmlSAX2GetColumnNumber'] = wasmExports['xmlSAX2GetColumnNumber'])(a0);
var _xmlSAX2IgnorableWhitespace = Module['_xmlSAX2IgnorableWhitespace'] = (a0, a1, a2) => (_xmlSAX2IgnorableWhitespace = Module['_xmlSAX2IgnorableWhitespace'] = wasmExports['xmlSAX2IgnorableWhitespace'])(a0, a1, a2);
var _xmlHashDefaultDeallocator = Module['_xmlHashDefaultDeallocator'] = (a0, a1) => (_xmlHashDefaultDeallocator = Module['_xmlHashDefaultDeallocator'] = wasmExports['xmlHashDefaultDeallocator'])(a0, a1);
var _iconv_open = Module['_iconv_open'] = (a0, a1) => (_iconv_open = Module['_iconv_open'] = wasmExports['iconv_open'])(a0, a1);
var _iconv_close = Module['_iconv_close'] = (a0) => (_iconv_close = Module['_iconv_close'] = wasmExports['iconv_close'])(a0);
var _iconv = Module['_iconv'] = (a0, a1, a2, a3, a4) => (_iconv = Module['_iconv'] = wasmExports['iconv'])(a0, a1, a2, a3, a4);
var _UTF8ToHtml = Module['_UTF8ToHtml'] = (a0, a1, a2, a3) => (_UTF8ToHtml = Module['_UTF8ToHtml'] = wasmExports['UTF8ToHtml'])(a0, a1, a2, a3);
var _xmlReadMemory = Module['_xmlReadMemory'] = (a0, a1, a2, a3, a4) => (_xmlReadMemory = Module['_xmlReadMemory'] = wasmExports['xmlReadMemory'])(a0, a1, a2, a3, a4);
var _xmlSAX2StartElementNs = Module['_xmlSAX2StartElementNs'] = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => (_xmlSAX2StartElementNs = Module['_xmlSAX2StartElementNs'] = wasmExports['xmlSAX2StartElementNs'])(a0, a1, a2, a3, a4, a5, a6, a7, a8);
var _xmlSAX2EndElementNs = Module['_xmlSAX2EndElementNs'] = (a0, a1, a2, a3) => (_xmlSAX2EndElementNs = Module['_xmlSAX2EndElementNs'] = wasmExports['xmlSAX2EndElementNs'])(a0, a1, a2, a3);
var ___cxa_atexit = Module['___cxa_atexit'] = (a0, a1, a2) => (___cxa_atexit = Module['___cxa_atexit'] = wasmExports['__cxa_atexit'])(a0, a1, a2);
var _xmlDocGetRootElement = Module['_xmlDocGetRootElement'] = (a0) => (_xmlDocGetRootElement = Module['_xmlDocGetRootElement'] = wasmExports['xmlDocGetRootElement'])(a0);
var _xmlFileMatch = Module['_xmlFileMatch'] = (a0) => (_xmlFileMatch = Module['_xmlFileMatch'] = wasmExports['xmlFileMatch'])(a0);
var _xmlFileOpen = Module['_xmlFileOpen'] = (a0) => (_xmlFileOpen = Module['_xmlFileOpen'] = wasmExports['xmlFileOpen'])(a0);
var _xmlFileRead = Module['_xmlFileRead'] = (a0, a1, a2) => (_xmlFileRead = Module['_xmlFileRead'] = wasmExports['xmlFileRead'])(a0, a1, a2);
var _xmlFileClose = Module['_xmlFileClose'] = (a0) => (_xmlFileClose = Module['_xmlFileClose'] = wasmExports['xmlFileClose'])(a0);
var _gzread = Module['_gzread'] = (a0, a1, a2) => (_gzread = Module['_gzread'] = wasmExports['gzread'])(a0, a1, a2);
var _gzclose = Module['_gzclose'] = (a0) => (_gzclose = Module['_gzclose'] = wasmExports['gzclose'])(a0);
var _gzdirect = Module['_gzdirect'] = (a0) => (_gzdirect = Module['_gzdirect'] = wasmExports['gzdirect'])(a0);
var _gzdopen = Module['_gzdopen'] = (a0, a1) => (_gzdopen = Module['_gzdopen'] = wasmExports['gzdopen'])(a0, a1);
var _gzopen = Module['_gzopen'] = (a0, a1) => (_gzopen = Module['_gzopen'] = wasmExports['gzopen'])(a0, a1);
var _gzwrite = Module['_gzwrite'] = (a0, a1, a2) => (_gzwrite = Module['_gzwrite'] = wasmExports['gzwrite'])(a0, a1, a2);
var _xmlUCSIsCatNd = Module['_xmlUCSIsCatNd'] = (a0) => (_xmlUCSIsCatNd = Module['_xmlUCSIsCatNd'] = wasmExports['xmlUCSIsCatNd'])(a0);
var _xmlUCSIsCatP = Module['_xmlUCSIsCatP'] = (a0) => (_xmlUCSIsCatP = Module['_xmlUCSIsCatP'] = wasmExports['xmlUCSIsCatP'])(a0);
var _xmlUCSIsCatZ = Module['_xmlUCSIsCatZ'] = (a0) => (_xmlUCSIsCatZ = Module['_xmlUCSIsCatZ'] = wasmExports['xmlUCSIsCatZ'])(a0);
var _xmlUCSIsCatC = Module['_xmlUCSIsCatC'] = (a0) => (_xmlUCSIsCatC = Module['_xmlUCSIsCatC'] = wasmExports['xmlUCSIsCatC'])(a0);
var _xmlUCSIsCatL = Module['_xmlUCSIsCatL'] = (a0) => (_xmlUCSIsCatL = Module['_xmlUCSIsCatL'] = wasmExports['xmlUCSIsCatL'])(a0);
var _xmlUCSIsCatLu = Module['_xmlUCSIsCatLu'] = (a0) => (_xmlUCSIsCatLu = Module['_xmlUCSIsCatLu'] = wasmExports['xmlUCSIsCatLu'])(a0);
var _xmlUCSIsCatLl = Module['_xmlUCSIsCatLl'] = (a0) => (_xmlUCSIsCatLl = Module['_xmlUCSIsCatLl'] = wasmExports['xmlUCSIsCatLl'])(a0);
var _xmlUCSIsCatLt = Module['_xmlUCSIsCatLt'] = (a0) => (_xmlUCSIsCatLt = Module['_xmlUCSIsCatLt'] = wasmExports['xmlUCSIsCatLt'])(a0);
var _xmlUCSIsCatLm = Module['_xmlUCSIsCatLm'] = (a0) => (_xmlUCSIsCatLm = Module['_xmlUCSIsCatLm'] = wasmExports['xmlUCSIsCatLm'])(a0);
var _xmlUCSIsCatLo = Module['_xmlUCSIsCatLo'] = (a0) => (_xmlUCSIsCatLo = Module['_xmlUCSIsCatLo'] = wasmExports['xmlUCSIsCatLo'])(a0);
var _xmlUCSIsCatM = Module['_xmlUCSIsCatM'] = (a0) => (_xmlUCSIsCatM = Module['_xmlUCSIsCatM'] = wasmExports['xmlUCSIsCatM'])(a0);
var _xmlUCSIsCatMn = Module['_xmlUCSIsCatMn'] = (a0) => (_xmlUCSIsCatMn = Module['_xmlUCSIsCatMn'] = wasmExports['xmlUCSIsCatMn'])(a0);
var _xmlUCSIsCatMc = Module['_xmlUCSIsCatMc'] = (a0) => (_xmlUCSIsCatMc = Module['_xmlUCSIsCatMc'] = wasmExports['xmlUCSIsCatMc'])(a0);
var _xmlUCSIsCatMe = Module['_xmlUCSIsCatMe'] = (a0) => (_xmlUCSIsCatMe = Module['_xmlUCSIsCatMe'] = wasmExports['xmlUCSIsCatMe'])(a0);
var _xmlUCSIsCatN = Module['_xmlUCSIsCatN'] = (a0) => (_xmlUCSIsCatN = Module['_xmlUCSIsCatN'] = wasmExports['xmlUCSIsCatN'])(a0);
var _xmlUCSIsCatNl = Module['_xmlUCSIsCatNl'] = (a0) => (_xmlUCSIsCatNl = Module['_xmlUCSIsCatNl'] = wasmExports['xmlUCSIsCatNl'])(a0);
var _xmlUCSIsCatNo = Module['_xmlUCSIsCatNo'] = (a0) => (_xmlUCSIsCatNo = Module['_xmlUCSIsCatNo'] = wasmExports['xmlUCSIsCatNo'])(a0);
var _xmlUCSIsCatPc = Module['_xmlUCSIsCatPc'] = (a0) => (_xmlUCSIsCatPc = Module['_xmlUCSIsCatPc'] = wasmExports['xmlUCSIsCatPc'])(a0);
var _xmlUCSIsCatPd = Module['_xmlUCSIsCatPd'] = (a0) => (_xmlUCSIsCatPd = Module['_xmlUCSIsCatPd'] = wasmExports['xmlUCSIsCatPd'])(a0);
var _xmlUCSIsCatPs = Module['_xmlUCSIsCatPs'] = (a0) => (_xmlUCSIsCatPs = Module['_xmlUCSIsCatPs'] = wasmExports['xmlUCSIsCatPs'])(a0);
var _xmlUCSIsCatPe = Module['_xmlUCSIsCatPe'] = (a0) => (_xmlUCSIsCatPe = Module['_xmlUCSIsCatPe'] = wasmExports['xmlUCSIsCatPe'])(a0);
var _xmlUCSIsCatPi = Module['_xmlUCSIsCatPi'] = (a0) => (_xmlUCSIsCatPi = Module['_xmlUCSIsCatPi'] = wasmExports['xmlUCSIsCatPi'])(a0);
var _xmlUCSIsCatPf = Module['_xmlUCSIsCatPf'] = (a0) => (_xmlUCSIsCatPf = Module['_xmlUCSIsCatPf'] = wasmExports['xmlUCSIsCatPf'])(a0);
var _xmlUCSIsCatPo = Module['_xmlUCSIsCatPo'] = (a0) => (_xmlUCSIsCatPo = Module['_xmlUCSIsCatPo'] = wasmExports['xmlUCSIsCatPo'])(a0);
var _xmlUCSIsCatZs = Module['_xmlUCSIsCatZs'] = (a0) => (_xmlUCSIsCatZs = Module['_xmlUCSIsCatZs'] = wasmExports['xmlUCSIsCatZs'])(a0);
var _xmlUCSIsCatZl = Module['_xmlUCSIsCatZl'] = (a0) => (_xmlUCSIsCatZl = Module['_xmlUCSIsCatZl'] = wasmExports['xmlUCSIsCatZl'])(a0);
var _xmlUCSIsCatZp = Module['_xmlUCSIsCatZp'] = (a0) => (_xmlUCSIsCatZp = Module['_xmlUCSIsCatZp'] = wasmExports['xmlUCSIsCatZp'])(a0);
var _xmlUCSIsCatS = Module['_xmlUCSIsCatS'] = (a0) => (_xmlUCSIsCatS = Module['_xmlUCSIsCatS'] = wasmExports['xmlUCSIsCatS'])(a0);
var _xmlUCSIsCatSm = Module['_xmlUCSIsCatSm'] = (a0) => (_xmlUCSIsCatSm = Module['_xmlUCSIsCatSm'] = wasmExports['xmlUCSIsCatSm'])(a0);
var _xmlUCSIsCatSc = Module['_xmlUCSIsCatSc'] = (a0) => (_xmlUCSIsCatSc = Module['_xmlUCSIsCatSc'] = wasmExports['xmlUCSIsCatSc'])(a0);
var _xmlUCSIsCatSk = Module['_xmlUCSIsCatSk'] = (a0) => (_xmlUCSIsCatSk = Module['_xmlUCSIsCatSk'] = wasmExports['xmlUCSIsCatSk'])(a0);
var _xmlUCSIsCatSo = Module['_xmlUCSIsCatSo'] = (a0) => (_xmlUCSIsCatSo = Module['_xmlUCSIsCatSo'] = wasmExports['xmlUCSIsCatSo'])(a0);
var _xmlUCSIsCatCc = Module['_xmlUCSIsCatCc'] = (a0) => (_xmlUCSIsCatCc = Module['_xmlUCSIsCatCc'] = wasmExports['xmlUCSIsCatCc'])(a0);
var _xmlUCSIsCatCf = Module['_xmlUCSIsCatCf'] = (a0) => (_xmlUCSIsCatCf = Module['_xmlUCSIsCatCf'] = wasmExports['xmlUCSIsCatCf'])(a0);
var _xmlUCSIsCatCo = Module['_xmlUCSIsCatCo'] = (a0) => (_xmlUCSIsCatCo = Module['_xmlUCSIsCatCo'] = wasmExports['xmlUCSIsCatCo'])(a0);
var _xmlUCSIsAegeanNumbers = Module['_xmlUCSIsAegeanNumbers'] = (a0) => (_xmlUCSIsAegeanNumbers = Module['_xmlUCSIsAegeanNumbers'] = wasmExports['xmlUCSIsAegeanNumbers'])(a0);
var _xmlUCSIsAlphabeticPresentationForms = Module['_xmlUCSIsAlphabeticPresentationForms'] = (a0) => (_xmlUCSIsAlphabeticPresentationForms = Module['_xmlUCSIsAlphabeticPresentationForms'] = wasmExports['xmlUCSIsAlphabeticPresentationForms'])(a0);
var _xmlUCSIsArabic = Module['_xmlUCSIsArabic'] = (a0) => (_xmlUCSIsArabic = Module['_xmlUCSIsArabic'] = wasmExports['xmlUCSIsArabic'])(a0);
var _xmlUCSIsArabicPresentationFormsA = Module['_xmlUCSIsArabicPresentationFormsA'] = (a0) => (_xmlUCSIsArabicPresentationFormsA = Module['_xmlUCSIsArabicPresentationFormsA'] = wasmExports['xmlUCSIsArabicPresentationFormsA'])(a0);
var _xmlUCSIsArabicPresentationFormsB = Module['_xmlUCSIsArabicPresentationFormsB'] = (a0) => (_xmlUCSIsArabicPresentationFormsB = Module['_xmlUCSIsArabicPresentationFormsB'] = wasmExports['xmlUCSIsArabicPresentationFormsB'])(a0);
var _xmlUCSIsArmenian = Module['_xmlUCSIsArmenian'] = (a0) => (_xmlUCSIsArmenian = Module['_xmlUCSIsArmenian'] = wasmExports['xmlUCSIsArmenian'])(a0);
var _xmlUCSIsArrows = Module['_xmlUCSIsArrows'] = (a0) => (_xmlUCSIsArrows = Module['_xmlUCSIsArrows'] = wasmExports['xmlUCSIsArrows'])(a0);
var _xmlUCSIsBasicLatin = Module['_xmlUCSIsBasicLatin'] = (a0) => (_xmlUCSIsBasicLatin = Module['_xmlUCSIsBasicLatin'] = wasmExports['xmlUCSIsBasicLatin'])(a0);
var _xmlUCSIsBengali = Module['_xmlUCSIsBengali'] = (a0) => (_xmlUCSIsBengali = Module['_xmlUCSIsBengali'] = wasmExports['xmlUCSIsBengali'])(a0);
var _xmlUCSIsBlockElements = Module['_xmlUCSIsBlockElements'] = (a0) => (_xmlUCSIsBlockElements = Module['_xmlUCSIsBlockElements'] = wasmExports['xmlUCSIsBlockElements'])(a0);
var _xmlUCSIsBopomofo = Module['_xmlUCSIsBopomofo'] = (a0) => (_xmlUCSIsBopomofo = Module['_xmlUCSIsBopomofo'] = wasmExports['xmlUCSIsBopomofo'])(a0);
var _xmlUCSIsBopomofoExtended = Module['_xmlUCSIsBopomofoExtended'] = (a0) => (_xmlUCSIsBopomofoExtended = Module['_xmlUCSIsBopomofoExtended'] = wasmExports['xmlUCSIsBopomofoExtended'])(a0);
var _xmlUCSIsBoxDrawing = Module['_xmlUCSIsBoxDrawing'] = (a0) => (_xmlUCSIsBoxDrawing = Module['_xmlUCSIsBoxDrawing'] = wasmExports['xmlUCSIsBoxDrawing'])(a0);
var _xmlUCSIsBraillePatterns = Module['_xmlUCSIsBraillePatterns'] = (a0) => (_xmlUCSIsBraillePatterns = Module['_xmlUCSIsBraillePatterns'] = wasmExports['xmlUCSIsBraillePatterns'])(a0);
var _xmlUCSIsBuhid = Module['_xmlUCSIsBuhid'] = (a0) => (_xmlUCSIsBuhid = Module['_xmlUCSIsBuhid'] = wasmExports['xmlUCSIsBuhid'])(a0);
var _xmlUCSIsByzantineMusicalSymbols = Module['_xmlUCSIsByzantineMusicalSymbols'] = (a0) => (_xmlUCSIsByzantineMusicalSymbols = Module['_xmlUCSIsByzantineMusicalSymbols'] = wasmExports['xmlUCSIsByzantineMusicalSymbols'])(a0);
var _xmlUCSIsCJKCompatibility = Module['_xmlUCSIsCJKCompatibility'] = (a0) => (_xmlUCSIsCJKCompatibility = Module['_xmlUCSIsCJKCompatibility'] = wasmExports['xmlUCSIsCJKCompatibility'])(a0);
var _xmlUCSIsCJKCompatibilityForms = Module['_xmlUCSIsCJKCompatibilityForms'] = (a0) => (_xmlUCSIsCJKCompatibilityForms = Module['_xmlUCSIsCJKCompatibilityForms'] = wasmExports['xmlUCSIsCJKCompatibilityForms'])(a0);
var _xmlUCSIsCJKCompatibilityIdeographs = Module['_xmlUCSIsCJKCompatibilityIdeographs'] = (a0) => (_xmlUCSIsCJKCompatibilityIdeographs = Module['_xmlUCSIsCJKCompatibilityIdeographs'] = wasmExports['xmlUCSIsCJKCompatibilityIdeographs'])(a0);
var _xmlUCSIsCJKCompatibilityIdeographsSupplement = Module['_xmlUCSIsCJKCompatibilityIdeographsSupplement'] = (a0) => (_xmlUCSIsCJKCompatibilityIdeographsSupplement = Module['_xmlUCSIsCJKCompatibilityIdeographsSupplement'] = wasmExports['xmlUCSIsCJKCompatibilityIdeographsSupplement'])(a0);
var _xmlUCSIsCJKRadicalsSupplement = Module['_xmlUCSIsCJKRadicalsSupplement'] = (a0) => (_xmlUCSIsCJKRadicalsSupplement = Module['_xmlUCSIsCJKRadicalsSupplement'] = wasmExports['xmlUCSIsCJKRadicalsSupplement'])(a0);
var _xmlUCSIsCJKSymbolsandPunctuation = Module['_xmlUCSIsCJKSymbolsandPunctuation'] = (a0) => (_xmlUCSIsCJKSymbolsandPunctuation = Module['_xmlUCSIsCJKSymbolsandPunctuation'] = wasmExports['xmlUCSIsCJKSymbolsandPunctuation'])(a0);
var _xmlUCSIsCJKUnifiedIdeographs = Module['_xmlUCSIsCJKUnifiedIdeographs'] = (a0) => (_xmlUCSIsCJKUnifiedIdeographs = Module['_xmlUCSIsCJKUnifiedIdeographs'] = wasmExports['xmlUCSIsCJKUnifiedIdeographs'])(a0);
var _xmlUCSIsCJKUnifiedIdeographsExtensionA = Module['_xmlUCSIsCJKUnifiedIdeographsExtensionA'] = (a0) => (_xmlUCSIsCJKUnifiedIdeographsExtensionA = Module['_xmlUCSIsCJKUnifiedIdeographsExtensionA'] = wasmExports['xmlUCSIsCJKUnifiedIdeographsExtensionA'])(a0);
var _xmlUCSIsCJKUnifiedIdeographsExtensionB = Module['_xmlUCSIsCJKUnifiedIdeographsExtensionB'] = (a0) => (_xmlUCSIsCJKUnifiedIdeographsExtensionB = Module['_xmlUCSIsCJKUnifiedIdeographsExtensionB'] = wasmExports['xmlUCSIsCJKUnifiedIdeographsExtensionB'])(a0);
var _xmlUCSIsCherokee = Module['_xmlUCSIsCherokee'] = (a0) => (_xmlUCSIsCherokee = Module['_xmlUCSIsCherokee'] = wasmExports['xmlUCSIsCherokee'])(a0);
var _xmlUCSIsCombiningDiacriticalMarks = Module['_xmlUCSIsCombiningDiacriticalMarks'] = (a0) => (_xmlUCSIsCombiningDiacriticalMarks = Module['_xmlUCSIsCombiningDiacriticalMarks'] = wasmExports['xmlUCSIsCombiningDiacriticalMarks'])(a0);
var _xmlUCSIsCombiningDiacriticalMarksforSymbols = Module['_xmlUCSIsCombiningDiacriticalMarksforSymbols'] = (a0) => (_xmlUCSIsCombiningDiacriticalMarksforSymbols = Module['_xmlUCSIsCombiningDiacriticalMarksforSymbols'] = wasmExports['xmlUCSIsCombiningDiacriticalMarksforSymbols'])(a0);
var _xmlUCSIsCombiningHalfMarks = Module['_xmlUCSIsCombiningHalfMarks'] = (a0) => (_xmlUCSIsCombiningHalfMarks = Module['_xmlUCSIsCombiningHalfMarks'] = wasmExports['xmlUCSIsCombiningHalfMarks'])(a0);
var _xmlUCSIsCombiningMarksforSymbols = Module['_xmlUCSIsCombiningMarksforSymbols'] = (a0) => (_xmlUCSIsCombiningMarksforSymbols = Module['_xmlUCSIsCombiningMarksforSymbols'] = wasmExports['xmlUCSIsCombiningMarksforSymbols'])(a0);
var _xmlUCSIsControlPictures = Module['_xmlUCSIsControlPictures'] = (a0) => (_xmlUCSIsControlPictures = Module['_xmlUCSIsControlPictures'] = wasmExports['xmlUCSIsControlPictures'])(a0);
var _xmlUCSIsCurrencySymbols = Module['_xmlUCSIsCurrencySymbols'] = (a0) => (_xmlUCSIsCurrencySymbols = Module['_xmlUCSIsCurrencySymbols'] = wasmExports['xmlUCSIsCurrencySymbols'])(a0);
var _xmlUCSIsCypriotSyllabary = Module['_xmlUCSIsCypriotSyllabary'] = (a0) => (_xmlUCSIsCypriotSyllabary = Module['_xmlUCSIsCypriotSyllabary'] = wasmExports['xmlUCSIsCypriotSyllabary'])(a0);
var _xmlUCSIsCyrillic = Module['_xmlUCSIsCyrillic'] = (a0) => (_xmlUCSIsCyrillic = Module['_xmlUCSIsCyrillic'] = wasmExports['xmlUCSIsCyrillic'])(a0);
var _xmlUCSIsCyrillicSupplement = Module['_xmlUCSIsCyrillicSupplement'] = (a0) => (_xmlUCSIsCyrillicSupplement = Module['_xmlUCSIsCyrillicSupplement'] = wasmExports['xmlUCSIsCyrillicSupplement'])(a0);
var _xmlUCSIsDeseret = Module['_xmlUCSIsDeseret'] = (a0) => (_xmlUCSIsDeseret = Module['_xmlUCSIsDeseret'] = wasmExports['xmlUCSIsDeseret'])(a0);
var _xmlUCSIsDevanagari = Module['_xmlUCSIsDevanagari'] = (a0) => (_xmlUCSIsDevanagari = Module['_xmlUCSIsDevanagari'] = wasmExports['xmlUCSIsDevanagari'])(a0);
var _xmlUCSIsDingbats = Module['_xmlUCSIsDingbats'] = (a0) => (_xmlUCSIsDingbats = Module['_xmlUCSIsDingbats'] = wasmExports['xmlUCSIsDingbats'])(a0);
var _xmlUCSIsEnclosedAlphanumerics = Module['_xmlUCSIsEnclosedAlphanumerics'] = (a0) => (_xmlUCSIsEnclosedAlphanumerics = Module['_xmlUCSIsEnclosedAlphanumerics'] = wasmExports['xmlUCSIsEnclosedAlphanumerics'])(a0);
var _xmlUCSIsEnclosedCJKLettersandMonths = Module['_xmlUCSIsEnclosedCJKLettersandMonths'] = (a0) => (_xmlUCSIsEnclosedCJKLettersandMonths = Module['_xmlUCSIsEnclosedCJKLettersandMonths'] = wasmExports['xmlUCSIsEnclosedCJKLettersandMonths'])(a0);
var _xmlUCSIsEthiopic = Module['_xmlUCSIsEthiopic'] = (a0) => (_xmlUCSIsEthiopic = Module['_xmlUCSIsEthiopic'] = wasmExports['xmlUCSIsEthiopic'])(a0);
var _xmlUCSIsGeneralPunctuation = Module['_xmlUCSIsGeneralPunctuation'] = (a0) => (_xmlUCSIsGeneralPunctuation = Module['_xmlUCSIsGeneralPunctuation'] = wasmExports['xmlUCSIsGeneralPunctuation'])(a0);
var _xmlUCSIsGeometricShapes = Module['_xmlUCSIsGeometricShapes'] = (a0) => (_xmlUCSIsGeometricShapes = Module['_xmlUCSIsGeometricShapes'] = wasmExports['xmlUCSIsGeometricShapes'])(a0);
var _xmlUCSIsGeorgian = Module['_xmlUCSIsGeorgian'] = (a0) => (_xmlUCSIsGeorgian = Module['_xmlUCSIsGeorgian'] = wasmExports['xmlUCSIsGeorgian'])(a0);
var _xmlUCSIsGothic = Module['_xmlUCSIsGothic'] = (a0) => (_xmlUCSIsGothic = Module['_xmlUCSIsGothic'] = wasmExports['xmlUCSIsGothic'])(a0);
var _xmlUCSIsGreek = Module['_xmlUCSIsGreek'] = (a0) => (_xmlUCSIsGreek = Module['_xmlUCSIsGreek'] = wasmExports['xmlUCSIsGreek'])(a0);
var _xmlUCSIsGreekExtended = Module['_xmlUCSIsGreekExtended'] = (a0) => (_xmlUCSIsGreekExtended = Module['_xmlUCSIsGreekExtended'] = wasmExports['xmlUCSIsGreekExtended'])(a0);
var _xmlUCSIsGreekandCoptic = Module['_xmlUCSIsGreekandCoptic'] = (a0) => (_xmlUCSIsGreekandCoptic = Module['_xmlUCSIsGreekandCoptic'] = wasmExports['xmlUCSIsGreekandCoptic'])(a0);
var _xmlUCSIsGujarati = Module['_xmlUCSIsGujarati'] = (a0) => (_xmlUCSIsGujarati = Module['_xmlUCSIsGujarati'] = wasmExports['xmlUCSIsGujarati'])(a0);
var _xmlUCSIsGurmukhi = Module['_xmlUCSIsGurmukhi'] = (a0) => (_xmlUCSIsGurmukhi = Module['_xmlUCSIsGurmukhi'] = wasmExports['xmlUCSIsGurmukhi'])(a0);
var _xmlUCSIsHalfwidthandFullwidthForms = Module['_xmlUCSIsHalfwidthandFullwidthForms'] = (a0) => (_xmlUCSIsHalfwidthandFullwidthForms = Module['_xmlUCSIsHalfwidthandFullwidthForms'] = wasmExports['xmlUCSIsHalfwidthandFullwidthForms'])(a0);
var _xmlUCSIsHangulCompatibilityJamo = Module['_xmlUCSIsHangulCompatibilityJamo'] = (a0) => (_xmlUCSIsHangulCompatibilityJamo = Module['_xmlUCSIsHangulCompatibilityJamo'] = wasmExports['xmlUCSIsHangulCompatibilityJamo'])(a0);
var _xmlUCSIsHangulJamo = Module['_xmlUCSIsHangulJamo'] = (a0) => (_xmlUCSIsHangulJamo = Module['_xmlUCSIsHangulJamo'] = wasmExports['xmlUCSIsHangulJamo'])(a0);
var _xmlUCSIsHangulSyllables = Module['_xmlUCSIsHangulSyllables'] = (a0) => (_xmlUCSIsHangulSyllables = Module['_xmlUCSIsHangulSyllables'] = wasmExports['xmlUCSIsHangulSyllables'])(a0);
var _xmlUCSIsHanunoo = Module['_xmlUCSIsHanunoo'] = (a0) => (_xmlUCSIsHanunoo = Module['_xmlUCSIsHanunoo'] = wasmExports['xmlUCSIsHanunoo'])(a0);
var _xmlUCSIsHebrew = Module['_xmlUCSIsHebrew'] = (a0) => (_xmlUCSIsHebrew = Module['_xmlUCSIsHebrew'] = wasmExports['xmlUCSIsHebrew'])(a0);
var _xmlUCSIsHighPrivateUseSurrogates = Module['_xmlUCSIsHighPrivateUseSurrogates'] = (a0) => (_xmlUCSIsHighPrivateUseSurrogates = Module['_xmlUCSIsHighPrivateUseSurrogates'] = wasmExports['xmlUCSIsHighPrivateUseSurrogates'])(a0);
var _xmlUCSIsHighSurrogates = Module['_xmlUCSIsHighSurrogates'] = (a0) => (_xmlUCSIsHighSurrogates = Module['_xmlUCSIsHighSurrogates'] = wasmExports['xmlUCSIsHighSurrogates'])(a0);
var _xmlUCSIsHiragana = Module['_xmlUCSIsHiragana'] = (a0) => (_xmlUCSIsHiragana = Module['_xmlUCSIsHiragana'] = wasmExports['xmlUCSIsHiragana'])(a0);
var _xmlUCSIsIPAExtensions = Module['_xmlUCSIsIPAExtensions'] = (a0) => (_xmlUCSIsIPAExtensions = Module['_xmlUCSIsIPAExtensions'] = wasmExports['xmlUCSIsIPAExtensions'])(a0);
var _xmlUCSIsIdeographicDescriptionCharacters = Module['_xmlUCSIsIdeographicDescriptionCharacters'] = (a0) => (_xmlUCSIsIdeographicDescriptionCharacters = Module['_xmlUCSIsIdeographicDescriptionCharacters'] = wasmExports['xmlUCSIsIdeographicDescriptionCharacters'])(a0);
var _xmlUCSIsKanbun = Module['_xmlUCSIsKanbun'] = (a0) => (_xmlUCSIsKanbun = Module['_xmlUCSIsKanbun'] = wasmExports['xmlUCSIsKanbun'])(a0);
var _xmlUCSIsKangxiRadicals = Module['_xmlUCSIsKangxiRadicals'] = (a0) => (_xmlUCSIsKangxiRadicals = Module['_xmlUCSIsKangxiRadicals'] = wasmExports['xmlUCSIsKangxiRadicals'])(a0);
var _xmlUCSIsKannada = Module['_xmlUCSIsKannada'] = (a0) => (_xmlUCSIsKannada = Module['_xmlUCSIsKannada'] = wasmExports['xmlUCSIsKannada'])(a0);
var _xmlUCSIsKatakana = Module['_xmlUCSIsKatakana'] = (a0) => (_xmlUCSIsKatakana = Module['_xmlUCSIsKatakana'] = wasmExports['xmlUCSIsKatakana'])(a0);
var _xmlUCSIsKatakanaPhoneticExtensions = Module['_xmlUCSIsKatakanaPhoneticExtensions'] = (a0) => (_xmlUCSIsKatakanaPhoneticExtensions = Module['_xmlUCSIsKatakanaPhoneticExtensions'] = wasmExports['xmlUCSIsKatakanaPhoneticExtensions'])(a0);
var _xmlUCSIsKhmer = Module['_xmlUCSIsKhmer'] = (a0) => (_xmlUCSIsKhmer = Module['_xmlUCSIsKhmer'] = wasmExports['xmlUCSIsKhmer'])(a0);
var _xmlUCSIsKhmerSymbols = Module['_xmlUCSIsKhmerSymbols'] = (a0) => (_xmlUCSIsKhmerSymbols = Module['_xmlUCSIsKhmerSymbols'] = wasmExports['xmlUCSIsKhmerSymbols'])(a0);
var _xmlUCSIsLao = Module['_xmlUCSIsLao'] = (a0) => (_xmlUCSIsLao = Module['_xmlUCSIsLao'] = wasmExports['xmlUCSIsLao'])(a0);
var _xmlUCSIsLatin1Supplement = Module['_xmlUCSIsLatin1Supplement'] = (a0) => (_xmlUCSIsLatin1Supplement = Module['_xmlUCSIsLatin1Supplement'] = wasmExports['xmlUCSIsLatin1Supplement'])(a0);
var _xmlUCSIsLatinExtendedA = Module['_xmlUCSIsLatinExtendedA'] = (a0) => (_xmlUCSIsLatinExtendedA = Module['_xmlUCSIsLatinExtendedA'] = wasmExports['xmlUCSIsLatinExtendedA'])(a0);
var _xmlUCSIsLatinExtendedB = Module['_xmlUCSIsLatinExtendedB'] = (a0) => (_xmlUCSIsLatinExtendedB = Module['_xmlUCSIsLatinExtendedB'] = wasmExports['xmlUCSIsLatinExtendedB'])(a0);
var _xmlUCSIsLatinExtendedAdditional = Module['_xmlUCSIsLatinExtendedAdditional'] = (a0) => (_xmlUCSIsLatinExtendedAdditional = Module['_xmlUCSIsLatinExtendedAdditional'] = wasmExports['xmlUCSIsLatinExtendedAdditional'])(a0);
var _xmlUCSIsLetterlikeSymbols = Module['_xmlUCSIsLetterlikeSymbols'] = (a0) => (_xmlUCSIsLetterlikeSymbols = Module['_xmlUCSIsLetterlikeSymbols'] = wasmExports['xmlUCSIsLetterlikeSymbols'])(a0);
var _xmlUCSIsLimbu = Module['_xmlUCSIsLimbu'] = (a0) => (_xmlUCSIsLimbu = Module['_xmlUCSIsLimbu'] = wasmExports['xmlUCSIsLimbu'])(a0);
var _xmlUCSIsLinearBIdeograms = Module['_xmlUCSIsLinearBIdeograms'] = (a0) => (_xmlUCSIsLinearBIdeograms = Module['_xmlUCSIsLinearBIdeograms'] = wasmExports['xmlUCSIsLinearBIdeograms'])(a0);
var _xmlUCSIsLinearBSyllabary = Module['_xmlUCSIsLinearBSyllabary'] = (a0) => (_xmlUCSIsLinearBSyllabary = Module['_xmlUCSIsLinearBSyllabary'] = wasmExports['xmlUCSIsLinearBSyllabary'])(a0);
var _xmlUCSIsLowSurrogates = Module['_xmlUCSIsLowSurrogates'] = (a0) => (_xmlUCSIsLowSurrogates = Module['_xmlUCSIsLowSurrogates'] = wasmExports['xmlUCSIsLowSurrogates'])(a0);
var _xmlUCSIsMalayalam = Module['_xmlUCSIsMalayalam'] = (a0) => (_xmlUCSIsMalayalam = Module['_xmlUCSIsMalayalam'] = wasmExports['xmlUCSIsMalayalam'])(a0);
var _xmlUCSIsMathematicalAlphanumericSymbols = Module['_xmlUCSIsMathematicalAlphanumericSymbols'] = (a0) => (_xmlUCSIsMathematicalAlphanumericSymbols = Module['_xmlUCSIsMathematicalAlphanumericSymbols'] = wasmExports['xmlUCSIsMathematicalAlphanumericSymbols'])(a0);
var _xmlUCSIsMathematicalOperators = Module['_xmlUCSIsMathematicalOperators'] = (a0) => (_xmlUCSIsMathematicalOperators = Module['_xmlUCSIsMathematicalOperators'] = wasmExports['xmlUCSIsMathematicalOperators'])(a0);
var _xmlUCSIsMiscellaneousMathematicalSymbolsA = Module['_xmlUCSIsMiscellaneousMathematicalSymbolsA'] = (a0) => (_xmlUCSIsMiscellaneousMathematicalSymbolsA = Module['_xmlUCSIsMiscellaneousMathematicalSymbolsA'] = wasmExports['xmlUCSIsMiscellaneousMathematicalSymbolsA'])(a0);
var _xmlUCSIsMiscellaneousMathematicalSymbolsB = Module['_xmlUCSIsMiscellaneousMathematicalSymbolsB'] = (a0) => (_xmlUCSIsMiscellaneousMathematicalSymbolsB = Module['_xmlUCSIsMiscellaneousMathematicalSymbolsB'] = wasmExports['xmlUCSIsMiscellaneousMathematicalSymbolsB'])(a0);
var _xmlUCSIsMiscellaneousSymbols = Module['_xmlUCSIsMiscellaneousSymbols'] = (a0) => (_xmlUCSIsMiscellaneousSymbols = Module['_xmlUCSIsMiscellaneousSymbols'] = wasmExports['xmlUCSIsMiscellaneousSymbols'])(a0);
var _xmlUCSIsMiscellaneousSymbolsandArrows = Module['_xmlUCSIsMiscellaneousSymbolsandArrows'] = (a0) => (_xmlUCSIsMiscellaneousSymbolsandArrows = Module['_xmlUCSIsMiscellaneousSymbolsandArrows'] = wasmExports['xmlUCSIsMiscellaneousSymbolsandArrows'])(a0);
var _xmlUCSIsMiscellaneousTechnical = Module['_xmlUCSIsMiscellaneousTechnical'] = (a0) => (_xmlUCSIsMiscellaneousTechnical = Module['_xmlUCSIsMiscellaneousTechnical'] = wasmExports['xmlUCSIsMiscellaneousTechnical'])(a0);
var _xmlUCSIsMongolian = Module['_xmlUCSIsMongolian'] = (a0) => (_xmlUCSIsMongolian = Module['_xmlUCSIsMongolian'] = wasmExports['xmlUCSIsMongolian'])(a0);
var _xmlUCSIsMusicalSymbols = Module['_xmlUCSIsMusicalSymbols'] = (a0) => (_xmlUCSIsMusicalSymbols = Module['_xmlUCSIsMusicalSymbols'] = wasmExports['xmlUCSIsMusicalSymbols'])(a0);
var _xmlUCSIsMyanmar = Module['_xmlUCSIsMyanmar'] = (a0) => (_xmlUCSIsMyanmar = Module['_xmlUCSIsMyanmar'] = wasmExports['xmlUCSIsMyanmar'])(a0);
var _xmlUCSIsNumberForms = Module['_xmlUCSIsNumberForms'] = (a0) => (_xmlUCSIsNumberForms = Module['_xmlUCSIsNumberForms'] = wasmExports['xmlUCSIsNumberForms'])(a0);
var _xmlUCSIsOgham = Module['_xmlUCSIsOgham'] = (a0) => (_xmlUCSIsOgham = Module['_xmlUCSIsOgham'] = wasmExports['xmlUCSIsOgham'])(a0);
var _xmlUCSIsOldItalic = Module['_xmlUCSIsOldItalic'] = (a0) => (_xmlUCSIsOldItalic = Module['_xmlUCSIsOldItalic'] = wasmExports['xmlUCSIsOldItalic'])(a0);
var _xmlUCSIsOpticalCharacterRecognition = Module['_xmlUCSIsOpticalCharacterRecognition'] = (a0) => (_xmlUCSIsOpticalCharacterRecognition = Module['_xmlUCSIsOpticalCharacterRecognition'] = wasmExports['xmlUCSIsOpticalCharacterRecognition'])(a0);
var _xmlUCSIsOriya = Module['_xmlUCSIsOriya'] = (a0) => (_xmlUCSIsOriya = Module['_xmlUCSIsOriya'] = wasmExports['xmlUCSIsOriya'])(a0);
var _xmlUCSIsOsmanya = Module['_xmlUCSIsOsmanya'] = (a0) => (_xmlUCSIsOsmanya = Module['_xmlUCSIsOsmanya'] = wasmExports['xmlUCSIsOsmanya'])(a0);
var _xmlUCSIsPhoneticExtensions = Module['_xmlUCSIsPhoneticExtensions'] = (a0) => (_xmlUCSIsPhoneticExtensions = Module['_xmlUCSIsPhoneticExtensions'] = wasmExports['xmlUCSIsPhoneticExtensions'])(a0);
var _xmlUCSIsPrivateUse = Module['_xmlUCSIsPrivateUse'] = (a0) => (_xmlUCSIsPrivateUse = Module['_xmlUCSIsPrivateUse'] = wasmExports['xmlUCSIsPrivateUse'])(a0);
var _xmlUCSIsPrivateUseArea = Module['_xmlUCSIsPrivateUseArea'] = (a0) => (_xmlUCSIsPrivateUseArea = Module['_xmlUCSIsPrivateUseArea'] = wasmExports['xmlUCSIsPrivateUseArea'])(a0);
var _xmlUCSIsRunic = Module['_xmlUCSIsRunic'] = (a0) => (_xmlUCSIsRunic = Module['_xmlUCSIsRunic'] = wasmExports['xmlUCSIsRunic'])(a0);
var _xmlUCSIsShavian = Module['_xmlUCSIsShavian'] = (a0) => (_xmlUCSIsShavian = Module['_xmlUCSIsShavian'] = wasmExports['xmlUCSIsShavian'])(a0);
var _xmlUCSIsSinhala = Module['_xmlUCSIsSinhala'] = (a0) => (_xmlUCSIsSinhala = Module['_xmlUCSIsSinhala'] = wasmExports['xmlUCSIsSinhala'])(a0);
var _xmlUCSIsSmallFormVariants = Module['_xmlUCSIsSmallFormVariants'] = (a0) => (_xmlUCSIsSmallFormVariants = Module['_xmlUCSIsSmallFormVariants'] = wasmExports['xmlUCSIsSmallFormVariants'])(a0);
var _xmlUCSIsSpacingModifierLetters = Module['_xmlUCSIsSpacingModifierLetters'] = (a0) => (_xmlUCSIsSpacingModifierLetters = Module['_xmlUCSIsSpacingModifierLetters'] = wasmExports['xmlUCSIsSpacingModifierLetters'])(a0);
var _xmlUCSIsSpecials = Module['_xmlUCSIsSpecials'] = (a0) => (_xmlUCSIsSpecials = Module['_xmlUCSIsSpecials'] = wasmExports['xmlUCSIsSpecials'])(a0);
var _xmlUCSIsSuperscriptsandSubscripts = Module['_xmlUCSIsSuperscriptsandSubscripts'] = (a0) => (_xmlUCSIsSuperscriptsandSubscripts = Module['_xmlUCSIsSuperscriptsandSubscripts'] = wasmExports['xmlUCSIsSuperscriptsandSubscripts'])(a0);
var _xmlUCSIsSupplementalArrowsA = Module['_xmlUCSIsSupplementalArrowsA'] = (a0) => (_xmlUCSIsSupplementalArrowsA = Module['_xmlUCSIsSupplementalArrowsA'] = wasmExports['xmlUCSIsSupplementalArrowsA'])(a0);
var _xmlUCSIsSupplementalArrowsB = Module['_xmlUCSIsSupplementalArrowsB'] = (a0) => (_xmlUCSIsSupplementalArrowsB = Module['_xmlUCSIsSupplementalArrowsB'] = wasmExports['xmlUCSIsSupplementalArrowsB'])(a0);
var _xmlUCSIsSupplementalMathematicalOperators = Module['_xmlUCSIsSupplementalMathematicalOperators'] = (a0) => (_xmlUCSIsSupplementalMathematicalOperators = Module['_xmlUCSIsSupplementalMathematicalOperators'] = wasmExports['xmlUCSIsSupplementalMathematicalOperators'])(a0);
var _xmlUCSIsSupplementaryPrivateUseAreaA = Module['_xmlUCSIsSupplementaryPrivateUseAreaA'] = (a0) => (_xmlUCSIsSupplementaryPrivateUseAreaA = Module['_xmlUCSIsSupplementaryPrivateUseAreaA'] = wasmExports['xmlUCSIsSupplementaryPrivateUseAreaA'])(a0);
var _xmlUCSIsSupplementaryPrivateUseAreaB = Module['_xmlUCSIsSupplementaryPrivateUseAreaB'] = (a0) => (_xmlUCSIsSupplementaryPrivateUseAreaB = Module['_xmlUCSIsSupplementaryPrivateUseAreaB'] = wasmExports['xmlUCSIsSupplementaryPrivateUseAreaB'])(a0);
var _xmlUCSIsSyriac = Module['_xmlUCSIsSyriac'] = (a0) => (_xmlUCSIsSyriac = Module['_xmlUCSIsSyriac'] = wasmExports['xmlUCSIsSyriac'])(a0);
var _xmlUCSIsTagalog = Module['_xmlUCSIsTagalog'] = (a0) => (_xmlUCSIsTagalog = Module['_xmlUCSIsTagalog'] = wasmExports['xmlUCSIsTagalog'])(a0);
var _xmlUCSIsTagbanwa = Module['_xmlUCSIsTagbanwa'] = (a0) => (_xmlUCSIsTagbanwa = Module['_xmlUCSIsTagbanwa'] = wasmExports['xmlUCSIsTagbanwa'])(a0);
var _xmlUCSIsTags = Module['_xmlUCSIsTags'] = (a0) => (_xmlUCSIsTags = Module['_xmlUCSIsTags'] = wasmExports['xmlUCSIsTags'])(a0);
var _xmlUCSIsTaiLe = Module['_xmlUCSIsTaiLe'] = (a0) => (_xmlUCSIsTaiLe = Module['_xmlUCSIsTaiLe'] = wasmExports['xmlUCSIsTaiLe'])(a0);
var _xmlUCSIsTaiXuanJingSymbols = Module['_xmlUCSIsTaiXuanJingSymbols'] = (a0) => (_xmlUCSIsTaiXuanJingSymbols = Module['_xmlUCSIsTaiXuanJingSymbols'] = wasmExports['xmlUCSIsTaiXuanJingSymbols'])(a0);
var _xmlUCSIsTamil = Module['_xmlUCSIsTamil'] = (a0) => (_xmlUCSIsTamil = Module['_xmlUCSIsTamil'] = wasmExports['xmlUCSIsTamil'])(a0);
var _xmlUCSIsTelugu = Module['_xmlUCSIsTelugu'] = (a0) => (_xmlUCSIsTelugu = Module['_xmlUCSIsTelugu'] = wasmExports['xmlUCSIsTelugu'])(a0);
var _xmlUCSIsThaana = Module['_xmlUCSIsThaana'] = (a0) => (_xmlUCSIsThaana = Module['_xmlUCSIsThaana'] = wasmExports['xmlUCSIsThaana'])(a0);
var _xmlUCSIsThai = Module['_xmlUCSIsThai'] = (a0) => (_xmlUCSIsThai = Module['_xmlUCSIsThai'] = wasmExports['xmlUCSIsThai'])(a0);
var _xmlUCSIsTibetan = Module['_xmlUCSIsTibetan'] = (a0) => (_xmlUCSIsTibetan = Module['_xmlUCSIsTibetan'] = wasmExports['xmlUCSIsTibetan'])(a0);
var _xmlUCSIsUgaritic = Module['_xmlUCSIsUgaritic'] = (a0) => (_xmlUCSIsUgaritic = Module['_xmlUCSIsUgaritic'] = wasmExports['xmlUCSIsUgaritic'])(a0);
var _xmlUCSIsUnifiedCanadianAboriginalSyllabics = Module['_xmlUCSIsUnifiedCanadianAboriginalSyllabics'] = (a0) => (_xmlUCSIsUnifiedCanadianAboriginalSyllabics = Module['_xmlUCSIsUnifiedCanadianAboriginalSyllabics'] = wasmExports['xmlUCSIsUnifiedCanadianAboriginalSyllabics'])(a0);
var _xmlUCSIsVariationSelectors = Module['_xmlUCSIsVariationSelectors'] = (a0) => (_xmlUCSIsVariationSelectors = Module['_xmlUCSIsVariationSelectors'] = wasmExports['xmlUCSIsVariationSelectors'])(a0);
var _xmlUCSIsVariationSelectorsSupplement = Module['_xmlUCSIsVariationSelectorsSupplement'] = (a0) => (_xmlUCSIsVariationSelectorsSupplement = Module['_xmlUCSIsVariationSelectorsSupplement'] = wasmExports['xmlUCSIsVariationSelectorsSupplement'])(a0);
var _xmlUCSIsYiRadicals = Module['_xmlUCSIsYiRadicals'] = (a0) => (_xmlUCSIsYiRadicals = Module['_xmlUCSIsYiRadicals'] = wasmExports['xmlUCSIsYiRadicals'])(a0);
var _xmlUCSIsYiSyllables = Module['_xmlUCSIsYiSyllables'] = (a0) => (_xmlUCSIsYiSyllables = Module['_xmlUCSIsYiSyllables'] = wasmExports['xmlUCSIsYiSyllables'])(a0);
var _xmlUCSIsYijingHexagramSymbols = Module['_xmlUCSIsYijingHexagramSymbols'] = (a0) => (_xmlUCSIsYijingHexagramSymbols = Module['_xmlUCSIsYijingHexagramSymbols'] = wasmExports['xmlUCSIsYijingHexagramSymbols'])(a0);
var _xmlUCSIsCatCs = Module['_xmlUCSIsCatCs'] = (a0) => (_xmlUCSIsCatCs = Module['_xmlUCSIsCatCs'] = wasmExports['xmlUCSIsCatCs'])(a0);
var ___small_fprintf = Module['___small_fprintf'] = (a0, a1, a2) => (___small_fprintf = Module['___small_fprintf'] = wasmExports['__small_fprintf'])(a0, a1, a2);
var _xmlXPathBooleanFunction = Module['_xmlXPathBooleanFunction'] = (a0, a1) => (_xmlXPathBooleanFunction = Module['_xmlXPathBooleanFunction'] = wasmExports['xmlXPathBooleanFunction'])(a0, a1);
var _xmlXPathCeilingFunction = Module['_xmlXPathCeilingFunction'] = (a0, a1) => (_xmlXPathCeilingFunction = Module['_xmlXPathCeilingFunction'] = wasmExports['xmlXPathCeilingFunction'])(a0, a1);
var _xmlXPathCountFunction = Module['_xmlXPathCountFunction'] = (a0, a1) => (_xmlXPathCountFunction = Module['_xmlXPathCountFunction'] = wasmExports['xmlXPathCountFunction'])(a0, a1);
var _xmlXPathConcatFunction = Module['_xmlXPathConcatFunction'] = (a0, a1) => (_xmlXPathConcatFunction = Module['_xmlXPathConcatFunction'] = wasmExports['xmlXPathConcatFunction'])(a0, a1);
var _xmlXPathContainsFunction = Module['_xmlXPathContainsFunction'] = (a0, a1) => (_xmlXPathContainsFunction = Module['_xmlXPathContainsFunction'] = wasmExports['xmlXPathContainsFunction'])(a0, a1);
var _xmlXPathIdFunction = Module['_xmlXPathIdFunction'] = (a0, a1) => (_xmlXPathIdFunction = Module['_xmlXPathIdFunction'] = wasmExports['xmlXPathIdFunction'])(a0, a1);
var _xmlXPathFalseFunction = Module['_xmlXPathFalseFunction'] = (a0, a1) => (_xmlXPathFalseFunction = Module['_xmlXPathFalseFunction'] = wasmExports['xmlXPathFalseFunction'])(a0, a1);
var _xmlXPathFloorFunction = Module['_xmlXPathFloorFunction'] = (a0, a1) => (_xmlXPathFloorFunction = Module['_xmlXPathFloorFunction'] = wasmExports['xmlXPathFloorFunction'])(a0, a1);
var _xmlXPathLastFunction = Module['_xmlXPathLastFunction'] = (a0, a1) => (_xmlXPathLastFunction = Module['_xmlXPathLastFunction'] = wasmExports['xmlXPathLastFunction'])(a0, a1);
var _xmlXPathLangFunction = Module['_xmlXPathLangFunction'] = (a0, a1) => (_xmlXPathLangFunction = Module['_xmlXPathLangFunction'] = wasmExports['xmlXPathLangFunction'])(a0, a1);
var _xmlXPathLocalNameFunction = Module['_xmlXPathLocalNameFunction'] = (a0, a1) => (_xmlXPathLocalNameFunction = Module['_xmlXPathLocalNameFunction'] = wasmExports['xmlXPathLocalNameFunction'])(a0, a1);
var _xmlXPathNotFunction = Module['_xmlXPathNotFunction'] = (a0, a1) => (_xmlXPathNotFunction = Module['_xmlXPathNotFunction'] = wasmExports['xmlXPathNotFunction'])(a0, a1);
var _xmlXPathNamespaceURIFunction = Module['_xmlXPathNamespaceURIFunction'] = (a0, a1) => (_xmlXPathNamespaceURIFunction = Module['_xmlXPathNamespaceURIFunction'] = wasmExports['xmlXPathNamespaceURIFunction'])(a0, a1);
var _xmlXPathNormalizeFunction = Module['_xmlXPathNormalizeFunction'] = (a0, a1) => (_xmlXPathNormalizeFunction = Module['_xmlXPathNormalizeFunction'] = wasmExports['xmlXPathNormalizeFunction'])(a0, a1);
var _xmlXPathNumberFunction = Module['_xmlXPathNumberFunction'] = (a0, a1) => (_xmlXPathNumberFunction = Module['_xmlXPathNumberFunction'] = wasmExports['xmlXPathNumberFunction'])(a0, a1);
var _xmlXPathPositionFunction = Module['_xmlXPathPositionFunction'] = (a0, a1) => (_xmlXPathPositionFunction = Module['_xmlXPathPositionFunction'] = wasmExports['xmlXPathPositionFunction'])(a0, a1);
var _xmlXPathRoundFunction = Module['_xmlXPathRoundFunction'] = (a0, a1) => (_xmlXPathRoundFunction = Module['_xmlXPathRoundFunction'] = wasmExports['xmlXPathRoundFunction'])(a0, a1);
var _xmlXPathStringFunction = Module['_xmlXPathStringFunction'] = (a0, a1) => (_xmlXPathStringFunction = Module['_xmlXPathStringFunction'] = wasmExports['xmlXPathStringFunction'])(a0, a1);
var _xmlXPathStringLengthFunction = Module['_xmlXPathStringLengthFunction'] = (a0, a1) => (_xmlXPathStringLengthFunction = Module['_xmlXPathStringLengthFunction'] = wasmExports['xmlXPathStringLengthFunction'])(a0, a1);
var _xmlXPathStartsWithFunction = Module['_xmlXPathStartsWithFunction'] = (a0, a1) => (_xmlXPathStartsWithFunction = Module['_xmlXPathStartsWithFunction'] = wasmExports['xmlXPathStartsWithFunction'])(a0, a1);
var _xmlXPathSubstringFunction = Module['_xmlXPathSubstringFunction'] = (a0, a1) => (_xmlXPathSubstringFunction = Module['_xmlXPathSubstringFunction'] = wasmExports['xmlXPathSubstringFunction'])(a0, a1);
var _xmlXPathSubstringBeforeFunction = Module['_xmlXPathSubstringBeforeFunction'] = (a0, a1) => (_xmlXPathSubstringBeforeFunction = Module['_xmlXPathSubstringBeforeFunction'] = wasmExports['xmlXPathSubstringBeforeFunction'])(a0, a1);
var _xmlXPathSubstringAfterFunction = Module['_xmlXPathSubstringAfterFunction'] = (a0, a1) => (_xmlXPathSubstringAfterFunction = Module['_xmlXPathSubstringAfterFunction'] = wasmExports['xmlXPathSubstringAfterFunction'])(a0, a1);
var _xmlXPathSumFunction = Module['_xmlXPathSumFunction'] = (a0, a1) => (_xmlXPathSumFunction = Module['_xmlXPathSumFunction'] = wasmExports['xmlXPathSumFunction'])(a0, a1);
var _xmlXPathTrueFunction = Module['_xmlXPathTrueFunction'] = (a0, a1) => (_xmlXPathTrueFunction = Module['_xmlXPathTrueFunction'] = wasmExports['xmlXPathTrueFunction'])(a0, a1);
var _xmlXPathTranslateFunction = Module['_xmlXPathTranslateFunction'] = (a0, a1) => (_xmlXPathTranslateFunction = Module['_xmlXPathTranslateFunction'] = wasmExports['xmlXPathTranslateFunction'])(a0, a1);
var _xmlXPathNextSelf = Module['_xmlXPathNextSelf'] = (a0, a1) => (_xmlXPathNextSelf = Module['_xmlXPathNextSelf'] = wasmExports['xmlXPathNextSelf'])(a0, a1);
var _xmlXPathNextChild = Module['_xmlXPathNextChild'] = (a0, a1) => (_xmlXPathNextChild = Module['_xmlXPathNextChild'] = wasmExports['xmlXPathNextChild'])(a0, a1);
var _xmlXPathNextDescendant = Module['_xmlXPathNextDescendant'] = (a0, a1) => (_xmlXPathNextDescendant = Module['_xmlXPathNextDescendant'] = wasmExports['xmlXPathNextDescendant'])(a0, a1);
var _xmlXPathNextDescendantOrSelf = Module['_xmlXPathNextDescendantOrSelf'] = (a0, a1) => (_xmlXPathNextDescendantOrSelf = Module['_xmlXPathNextDescendantOrSelf'] = wasmExports['xmlXPathNextDescendantOrSelf'])(a0, a1);
var _xmlXPathNextParent = Module['_xmlXPathNextParent'] = (a0, a1) => (_xmlXPathNextParent = Module['_xmlXPathNextParent'] = wasmExports['xmlXPathNextParent'])(a0, a1);
var _xmlXPathNextAncestor = Module['_xmlXPathNextAncestor'] = (a0, a1) => (_xmlXPathNextAncestor = Module['_xmlXPathNextAncestor'] = wasmExports['xmlXPathNextAncestor'])(a0, a1);
var _xmlXPathNextAncestorOrSelf = Module['_xmlXPathNextAncestorOrSelf'] = (a0, a1) => (_xmlXPathNextAncestorOrSelf = Module['_xmlXPathNextAncestorOrSelf'] = wasmExports['xmlXPathNextAncestorOrSelf'])(a0, a1);
var _xmlXPathNextFollowingSibling = Module['_xmlXPathNextFollowingSibling'] = (a0, a1) => (_xmlXPathNextFollowingSibling = Module['_xmlXPathNextFollowingSibling'] = wasmExports['xmlXPathNextFollowingSibling'])(a0, a1);
var _xmlXPathNextPrecedingSibling = Module['_xmlXPathNextPrecedingSibling'] = (a0, a1) => (_xmlXPathNextPrecedingSibling = Module['_xmlXPathNextPrecedingSibling'] = wasmExports['xmlXPathNextPrecedingSibling'])(a0, a1);
var _xmlXPathNextFollowing = Module['_xmlXPathNextFollowing'] = (a0, a1) => (_xmlXPathNextFollowing = Module['_xmlXPathNextFollowing'] = wasmExports['xmlXPathNextFollowing'])(a0, a1);
var _xmlXPathNextNamespace = Module['_xmlXPathNextNamespace'] = (a0, a1) => (_xmlXPathNextNamespace = Module['_xmlXPathNextNamespace'] = wasmExports['xmlXPathNextNamespace'])(a0, a1);
var _xmlXPathNextAttribute = Module['_xmlXPathNextAttribute'] = (a0, a1) => (_xmlXPathNextAttribute = Module['_xmlXPathNextAttribute'] = wasmExports['xmlXPathNextAttribute'])(a0, a1);
var _zcalloc = Module['_zcalloc'] = (a0, a1, a2) => (_zcalloc = Module['_zcalloc'] = wasmExports['zcalloc'])(a0, a1, a2);
var _zcfree = Module['_zcfree'] = (a0, a1) => (_zcfree = Module['_zcfree'] = wasmExports['zcfree'])(a0, a1);
var _strerror = Module['_strerror'] = (a0) => (_strerror = Module['_strerror'] = wasmExports['strerror'])(a0);
var _vfork = Module['_vfork'] = () => (_vfork = Module['_vfork'] = wasmExports['vfork'])();
var _sysconf = Module['_sysconf'] = (a0) => (_sysconf = Module['_sysconf'] = wasmExports['sysconf'])(a0);
var ___ctype_get_mb_cur_max = Module['___ctype_get_mb_cur_max'] = () => (___ctype_get_mb_cur_max = Module['___ctype_get_mb_cur_max'] = wasmExports['__ctype_get_mb_cur_max'])();
var ___ctype_tolower_loc = Module['___ctype_tolower_loc'] = () => (___ctype_tolower_loc = Module['___ctype_tolower_loc'] = wasmExports['__ctype_tolower_loc'])();
var ___ctype_toupper_loc = Module['___ctype_toupper_loc'] = () => (___ctype_toupper_loc = Module['___ctype_toupper_loc'] = wasmExports['__ctype_toupper_loc'])();
var _sqrt = Module['_sqrt'] = (a0) => (_sqrt = Module['_sqrt'] = wasmExports['sqrt'])(a0);
var _acosl = Module['_acosl'] = (a0, a1, a2) => (_acosl = Module['_acosl'] = wasmExports['acosl'])(a0, a1, a2);
var _aligned_alloc = Module['_aligned_alloc'] = (a0, a1) => (_aligned_alloc = Module['_aligned_alloc'] = wasmExports['aligned_alloc'])(a0, a1);
var _atan2l = Module['_atan2l'] = (a0, a1, a2, a3, a4) => (_atan2l = Module['_atan2l'] = wasmExports['atan2l'])(a0, a1, a2, a3, a4);
var _atoll = Module['_atoll'] = (a0) => (_atoll = Module['_atoll'] = wasmExports['atoll'])(a0);
var _btowc = Module['_btowc'] = (a0) => (_btowc = Module['_btowc'] = wasmExports['btowc'])(a0);
var _scalbn = Module['_scalbn'] = (a0, a1) => (_scalbn = Module['_scalbn'] = wasmExports['scalbn'])(a0, a1);
var _cosl = Module['_cosl'] = (a0, a1, a2) => (_cosl = Module['_cosl'] = wasmExports['cosl'])(a0, a1, a2);
var _ctime_r = Module['_ctime_r'] = (a0, a1) => (_ctime_r = Module['_ctime_r'] = wasmExports['ctime_r'])(a0, a1);
var _dladdr = Module['_dladdr'] = (a0, a1) => (_dladdr = Module['_dladdr'] = wasmExports['dladdr'])(a0, a1);
var ___dl_seterr = (a0, a1) => (___dl_seterr = wasmExports['__dl_seterr'])(a0, a1);
var _duplocale = Module['_duplocale'] = (a0) => (_duplocale = Module['_duplocale'] = wasmExports['duplocale'])(a0);
var _clock = Module['_clock'] = () => (_clock = Module['_clock'] = wasmExports['clock'])();
var _execvp = Module['_execvp'] = (a0, a1) => (_execvp = Module['_execvp'] = wasmExports['execvp'])(a0, a1);
var _fchmod = Module['_fchmod'] = (a0, a1) => (_fchmod = Module['_fchmod'] = wasmExports['fchmod'])(a0, a1);
var _fchmodat = Module['_fchmodat'] = (a0, a1, a2, a3) => (_fchmodat = Module['_fchmodat'] = wasmExports['fchmodat'])(a0, a1, a2, a3);
var _fchown = Module['_fchown'] = (a0, a1, a2) => (_fchown = Module['_fchown'] = wasmExports['fchown'])(a0, a1, a2);
var _fdopendir = Module['_fdopendir'] = (a0) => (_fdopendir = Module['_fdopendir'] = wasmExports['fdopendir'])(a0);
var _fmax = Module['_fmax'] = (a0, a1) => (_fmax = Module['_fmax'] = wasmExports['fmax'])(a0, a1);
var _fmin = Module['_fmin'] = (a0, a1) => (_fmin = Module['_fmin'] = wasmExports['fmin'])(a0, a1);
var _fputwc = Module['_fputwc'] = (a0, a1) => (_fputwc = Module['_fputwc'] = wasmExports['fputwc'])(a0, a1);
var _freelocale = Module['_freelocale'] = (a0) => (_freelocale = Module['_freelocale'] = wasmExports['freelocale'])(a0);
var _frexp = Module['_frexp'] = (a0, a1) => (_frexp = Module['_frexp'] = wasmExports['frexp'])(a0, a1);
var _ftello = Module['_ftello'] = (a0) => (_ftello = Module['_ftello'] = wasmExports['ftello'])(a0);
var _gethostname = Module['_gethostname'] = (a0, a1) => (_gethostname = Module['_gethostname'] = wasmExports['gethostname'])(a0, a1);
var _putc = Module['_putc'] = (a0, a1) => (_putc = Module['_putc'] = wasmExports['putc'])(a0, a1);
var _mbtowc = Module['_mbtowc'] = (a0, a1, a2) => (_mbtowc = Module['_mbtowc'] = wasmExports['mbtowc'])(a0, a1, a2);
var _getwc = Module['_getwc'] = (a0) => (_getwc = Module['_getwc'] = wasmExports['getwc'])(a0);
var _gmtime = Module['_gmtime'] = (a0) => (_gmtime = Module['_gmtime'] = wasmExports['gmtime'])(a0);
var _htonl = (a0) => (_htonl = wasmExports['htonl'])(a0);
var _htons = (a0) => (_htons = wasmExports['htons'])(a0);
var _hypot = Module['_hypot'] = (a0, a1) => (_hypot = Module['_hypot'] = wasmExports['hypot'])(a0, a1);
var _hypotf = Module['_hypotf'] = (a0, a1) => (_hypotf = Module['_hypotf'] = wasmExports['hypotf'])(a0, a1);
var _mbrtowc = Module['_mbrtowc'] = (a0, a1, a2, a3) => (_mbrtowc = Module['_mbrtowc'] = wasmExports['mbrtowc'])(a0, a1, a2, a3);
var _ioctl = Module['_ioctl'] = (a0, a1, a2) => (_ioctl = Module['_ioctl'] = wasmExports['ioctl'])(a0, a1, a2);
var _isalpha = Module['_isalpha'] = (a0) => (_isalpha = Module['_isalpha'] = wasmExports['isalpha'])(a0);
var _isgraph = Module['_isgraph'] = (a0) => (_isgraph = Module['_isgraph'] = wasmExports['isgraph'])(a0);
var _islower = Module['_islower'] = (a0) => (_islower = Module['_islower'] = wasmExports['islower'])(a0);
var _isspace = Module['_isspace'] = (a0) => (_isspace = Module['_isspace'] = wasmExports['isspace'])(a0);
var _iswblank_l = Module['_iswblank_l'] = (a0, a1) => (_iswblank_l = Module['_iswblank_l'] = wasmExports['iswblank_l'])(a0, a1);
var _iswcntrl_l = Module['_iswcntrl_l'] = (a0, a1) => (_iswcntrl_l = Module['_iswcntrl_l'] = wasmExports['iswcntrl_l'])(a0, a1);
var _iswxdigit_l = Module['_iswxdigit_l'] = (a0, a1) => (_iswxdigit_l = Module['_iswxdigit_l'] = wasmExports['iswxdigit_l'])(a0, a1);
var _isxdigit_l = Module['_isxdigit_l'] = (a0, a1) => (_isxdigit_l = Module['_isxdigit_l'] = wasmExports['isxdigit_l'])(a0, a1);
var _pthread_mutex_init = Module['_pthread_mutex_init'] = (a0, a1) => (_pthread_mutex_init = Module['_pthread_mutex_init'] = wasmExports['pthread_mutex_init'])(a0, a1);
var _pthread_mutex_destroy = Module['_pthread_mutex_destroy'] = (a0) => (_pthread_mutex_destroy = Module['_pthread_mutex_destroy'] = wasmExports['pthread_mutex_destroy'])(a0);
var _pthread_getspecific = Module['_pthread_getspecific'] = (a0) => (_pthread_getspecific = Module['_pthread_getspecific'] = wasmExports['pthread_getspecific'])(a0);
var _pthread_setspecific = Module['_pthread_setspecific'] = (a0, a1) => (_pthread_setspecific = Module['_pthread_setspecific'] = wasmExports['pthread_setspecific'])(a0, a1);
var _pthread_cond_wait = Module['_pthread_cond_wait'] = (a0, a1) => (_pthread_cond_wait = Module['_pthread_cond_wait'] = wasmExports['pthread_cond_wait'])(a0, a1);
var _pthread_cond_signal = Module['_pthread_cond_signal'] = (a0) => (_pthread_cond_signal = Module['_pthread_cond_signal'] = wasmExports['pthread_cond_signal'])(a0);
var _pthread_cond_broadcast = Module['_pthread_cond_broadcast'] = (a0) => (_pthread_cond_broadcast = Module['_pthread_cond_broadcast'] = wasmExports['pthread_cond_broadcast'])(a0);
var _pthread_cond_init = Module['_pthread_cond_init'] = (a0, a1) => (_pthread_cond_init = Module['_pthread_cond_init'] = wasmExports['pthread_cond_init'])(a0, a1);
var _pthread_cond_destroy = Module['_pthread_cond_destroy'] = (a0) => (_pthread_cond_destroy = Module['_pthread_cond_destroy'] = wasmExports['pthread_cond_destroy'])(a0);
var _pthread_atfork = Module['_pthread_atfork'] = (a0, a1, a2) => (_pthread_atfork = Module['_pthread_atfork'] = wasmExports['pthread_atfork'])(a0, a1, a2);
var _pthread_mutexattr_init = Module['_pthread_mutexattr_init'] = (a0) => (_pthread_mutexattr_init = Module['_pthread_mutexattr_init'] = wasmExports['pthread_mutexattr_init'])(a0);
var _pthread_mutexattr_settype = Module['_pthread_mutexattr_settype'] = (a0, a1) => (_pthread_mutexattr_settype = Module['_pthread_mutexattr_settype'] = wasmExports['pthread_mutexattr_settype'])(a0, a1);
var _pthread_mutexattr_destroy = Module['_pthread_mutexattr_destroy'] = (a0) => (_pthread_mutexattr_destroy = Module['_pthread_mutexattr_destroy'] = wasmExports['pthread_mutexattr_destroy'])(a0);
var _pthread_spin_init = Module['_pthread_spin_init'] = (a0, a1) => (_pthread_spin_init = Module['_pthread_spin_init'] = wasmExports['pthread_spin_init'])(a0, a1);
var _pthread_spin_destroy = Module['_pthread_spin_destroy'] = (a0) => (_pthread_spin_destroy = Module['_pthread_spin_destroy'] = wasmExports['pthread_spin_destroy'])(a0);
var _pthread_spin_lock = Module['_pthread_spin_lock'] = (a0) => (_pthread_spin_lock = Module['_pthread_spin_lock'] = wasmExports['pthread_spin_lock'])(a0);
var _pthread_spin_unlock = Module['_pthread_spin_unlock'] = (a0) => (_pthread_spin_unlock = Module['_pthread_spin_unlock'] = wasmExports['pthread_spin_unlock'])(a0);
var _pthread_mutex_trylock = Module['_pthread_mutex_trylock'] = (a0) => (_pthread_mutex_trylock = Module['_pthread_mutex_trylock'] = wasmExports['pthread_mutex_trylock'])(a0);
var _pthread_create = Module['_pthread_create'] = (a0, a1, a2, a3) => (_pthread_create = Module['_pthread_create'] = wasmExports['pthread_create'])(a0, a1, a2, a3);
var _pthread_join = Module['_pthread_join'] = (a0, a1) => (_pthread_join = Module['_pthread_join'] = wasmExports['pthread_join'])(a0, a1);
var _pthread_key_delete = Module['_pthread_key_delete'] = (a0) => (_pthread_key_delete = Module['_pthread_key_delete'] = wasmExports['pthread_key_delete'])(a0);
var _pthread_key_create = Module['_pthread_key_create'] = (a0, a1) => (_pthread_key_create = Module['_pthread_key_create'] = wasmExports['pthread_key_create'])(a0, a1);
var _pthread_once = Module['_pthread_once'] = (a0, a1) => (_pthread_once = Module['_pthread_once'] = wasmExports['pthread_once'])(a0, a1);
var _pthread_cond_timedwait = Module['_pthread_cond_timedwait'] = (a0, a1, a2) => (_pthread_cond_timedwait = Module['_pthread_cond_timedwait'] = wasmExports['pthread_cond_timedwait'])(a0, a1, a2);
var _pthread_detach = Module['_pthread_detach'] = (a0) => (_pthread_detach = Module['_pthread_detach'] = wasmExports['pthread_detach'])(a0);
var _link = Module['_link'] = (a0, a1) => (_link = Module['_link'] = wasmExports['link'])(a0, a1);
var _llround = Module['_llround'] = (a0) => (_llround = Module['_llround'] = wasmExports['llround'])(a0);
var _log2 = Module['_log2'] = (a0) => (_log2 = Module['_log2'] = wasmExports['log2'])(a0);
var _logb = Module['_logb'] = (a0) => (_logb = Module['_logb'] = wasmExports['logb'])(a0);
var _logf = Module['_logf'] = (a0) => (_logf = Module['_logf'] = wasmExports['logf'])(a0);
var _lround = Module['_lround'] = (a0) => (_lround = Module['_lround'] = wasmExports['lround'])(a0);
var _mbrlen = Module['_mbrlen'] = (a0, a1, a2) => (_mbrlen = Module['_mbrlen'] = wasmExports['mbrlen'])(a0, a1, a2);
var _mbsnrtowcs = Module['_mbsnrtowcs'] = (a0, a1, a2, a3, a4) => (_mbsnrtowcs = Module['_mbsnrtowcs'] = wasmExports['mbsnrtowcs'])(a0, a1, a2, a3, a4);
var _mbsrtowcs = Module['_mbsrtowcs'] = (a0, a1, a2, a3) => (_mbsrtowcs = Module['_mbsrtowcs'] = wasmExports['mbsrtowcs'])(a0, a1, a2, a3);
var _mktime = Module['_mktime'] = (a0) => (_mktime = Module['_mktime'] = wasmExports['mktime'])(a0);
var _gmtime_r = Module['_gmtime_r'] = (a0, a1) => (_gmtime_r = Module['_gmtime_r'] = wasmExports['gmtime_r'])(a0, a1);
var _localtime_r = Module['_localtime_r'] = (a0, a1) => (_localtime_r = Module['_localtime_r'] = wasmExports['localtime_r'])(a0, a1);
var _emscripten_builtin_memalign = (a0, a1) => (_emscripten_builtin_memalign = wasmExports['emscripten_builtin_memalign'])(a0, a1);
var _modf = Module['_modf'] = (a0, a1) => (_modf = Module['_modf'] = wasmExports['modf'])(a0, a1);
var _nextafter = Module['_nextafter'] = (a0, a1) => (_nextafter = Module['_nextafter'] = wasmExports['nextafter'])(a0, a1);
var _nextafterf = Module['_nextafterf'] = (a0, a1) => (_nextafterf = Module['_nextafterf'] = wasmExports['nextafterf'])(a0, a1);
var _ntohs = (a0) => (_ntohs = wasmExports['ntohs'])(a0);
var _openat = Module['_openat'] = (a0, a1, a2, a3) => (_openat = Module['_openat'] = wasmExports['openat'])(a0, a1, a2, a3);
var _pathconf = Module['_pathconf'] = (a0, a1) => (_pathconf = Module['_pathconf'] = wasmExports['pathconf'])(a0, a1);
var ___small_printf = Module['___small_printf'] = (a0, a1) => (___small_printf = Module['___small_printf'] = wasmExports['__small_printf'])(a0, a1);
var _pthread_attr_init = Module['_pthread_attr_init'] = (a0) => (_pthread_attr_init = Module['_pthread_attr_init'] = wasmExports['pthread_attr_init'])(a0);
var _pthread_attr_setdetachstate = Module['_pthread_attr_setdetachstate'] = (a0, a1) => (_pthread_attr_setdetachstate = Module['_pthread_attr_setdetachstate'] = wasmExports['pthread_attr_setdetachstate'])(a0, a1);
var _pthread_self = Module['_pthread_self'] = () => (_pthread_self = Module['_pthread_self'] = wasmExports['pthread_self'])();
var _qsort = Module['_qsort'] = (a0, a1, a2, a3) => (_qsort = Module['_qsort'] = wasmExports['qsort'])(a0, a1, a2, a3);
var _srand = Module['_srand'] = (a0) => (_srand = Module['_srand'] = wasmExports['srand'])(a0);
var _rand = Module['_rand'] = () => (_rand = Module['_rand'] = wasmExports['rand'])();
var _remainder = Module['_remainder'] = (a0, a1) => (_remainder = Module['_remainder'] = wasmExports['remainder'])(a0, a1);
var _remquo = Module['_remquo'] = (a0, a1, a2) => (_remquo = Module['_remquo'] = wasmExports['remquo'])(a0, a1, a2);
var _round = Module['_round'] = (a0) => (_round = Module['_round'] = wasmExports['round'])(a0);
var _roundf = Module['_roundf'] = (a0) => (_roundf = Module['_roundf'] = wasmExports['roundf'])(a0);
var __emscripten_timeout = (a0, a1) => (__emscripten_timeout = wasmExports['_emscripten_timeout'])(a0, a1);
var _signal = Module['_signal'] = (a0, a1) => (_signal = Module['_signal'] = wasmExports['signal'])(a0, a1);
var _sinl = Module['_sinl'] = (a0, a1, a2) => (_sinl = Module['_sinl'] = wasmExports['sinl'])(a0, a1, a2);
var _sleep = Module['_sleep'] = (a0) => (_sleep = Module['_sleep'] = wasmExports['sleep'])(a0);
var _siprintf = Module['_siprintf'] = (a0, a1, a2) => (_siprintf = Module['_siprintf'] = wasmExports['siprintf'])(a0, a1, a2);
var ___small_sprintf = Module['___small_sprintf'] = (a0, a1, a2) => (___small_sprintf = Module['___small_sprintf'] = wasmExports['__small_sprintf'])(a0, a1, a2);
var _sqrtl = Module['_sqrtl'] = (a0, a1, a2) => (_sqrtl = Module['_sqrtl'] = wasmExports['sqrtl'])(a0, a1, a2);
var _vsscanf = Module['_vsscanf'] = (a0, a1, a2) => (_vsscanf = Module['_vsscanf'] = wasmExports['vsscanf'])(a0, a1, a2);
var _statvfs = Module['_statvfs'] = (a0, a1) => (_statvfs = Module['_statvfs'] = wasmExports['statvfs'])(a0, a1);
var _strcasecmp = Module['_strcasecmp'] = (a0, a1) => (_strcasecmp = Module['_strcasecmp'] = wasmExports['strcasecmp'])(a0, a1);
var _strftime_l = Module['_strftime_l'] = (a0, a1, a2, a3, a4) => (_strftime_l = Module['_strftime_l'] = wasmExports['strftime_l'])(a0, a1, a2, a3, a4);
var _strncasecmp = Module['_strncasecmp'] = (a0, a1, a2) => (_strncasecmp = Module['_strncasecmp'] = wasmExports['strncasecmp'])(a0, a1, a2);
var ___floatsitf = Module['___floatsitf'] = (a0, a1) => (___floatsitf = Module['___floatsitf'] = wasmExports['__floatsitf'])(a0, a1);
var ___multf3 = Module['___multf3'] = (a0, a1, a2, a3, a4) => (___multf3 = Module['___multf3'] = wasmExports['__multf3'])(a0, a1, a2, a3, a4);
var ___addtf3 = Module['___addtf3'] = (a0, a1, a2, a3, a4) => (___addtf3 = Module['___addtf3'] = wasmExports['__addtf3'])(a0, a1, a2, a3, a4);
var ___extenddftf2 = Module['___extenddftf2'] = (a0, a1) => (___extenddftf2 = Module['___extenddftf2'] = wasmExports['__extenddftf2'])(a0, a1);
var ___getf2 = Module['___getf2'] = (a0, a1, a2, a3) => (___getf2 = Module['___getf2'] = wasmExports['__getf2'])(a0, a1, a2, a3);
var ___subtf3 = Module['___subtf3'] = (a0, a1, a2, a3, a4) => (___subtf3 = Module['___subtf3'] = wasmExports['__subtf3'])(a0, a1, a2, a3, a4);
var ___divtf3 = Module['___divtf3'] = (a0, a1, a2, a3, a4) => (___divtf3 = Module['___divtf3'] = wasmExports['__divtf3'])(a0, a1, a2, a3, a4);
var ___letf2 = Module['___letf2'] = (a0, a1, a2, a3) => (___letf2 = Module['___letf2'] = wasmExports['__letf2'])(a0, a1, a2, a3);
var ___trunctfdf2 = Module['___trunctfdf2'] = (a0, a1) => (___trunctfdf2 = Module['___trunctfdf2'] = wasmExports['__trunctfdf2'])(a0, a1);
var _strtold = Module['_strtold'] = (a0, a1, a2) => (_strtold = Module['_strtold'] = wasmExports['strtold'])(a0, a1, a2);
var _strtof_l = Module['_strtof_l'] = (a0, a1, a2) => (_strtof_l = Module['_strtof_l'] = wasmExports['strtof_l'])(a0, a1, a2);
var _strtod_l = Module['_strtod_l'] = (a0, a1, a2) => (_strtod_l = Module['_strtod_l'] = wasmExports['strtod_l'])(a0, a1, a2);
var _strtold_l = Module['_strtold_l'] = (a0, a1, a2, a3) => (_strtold_l = Module['_strtold_l'] = wasmExports['strtold_l'])(a0, a1, a2, a3);
var _strtoull_l = Module['_strtoull_l'] = (a0, a1, a2, a3) => (_strtoull_l = Module['_strtoull_l'] = wasmExports['strtoull_l'])(a0, a1, a2, a3);
var _strtoll_l = Module['_strtoll_l'] = (a0, a1, a2, a3) => (_strtoll_l = Module['_strtoll_l'] = wasmExports['strtoll_l'])(a0, a1, a2, a3);
var _strxfrm_l = Module['_strxfrm_l'] = (a0, a1, a2, a3) => (_strxfrm_l = Module['_strxfrm_l'] = wasmExports['strxfrm_l'])(a0, a1, a2, a3);
var _swprintf = Module['_swprintf'] = (a0, a1, a2, a3) => (_swprintf = Module['_swprintf'] = wasmExports['swprintf'])(a0, a1, a2, a3);
var _trunc = Module['_trunc'] = (a0) => (_trunc = Module['_trunc'] = wasmExports['trunc'])(a0);
var _ungetc = Module['_ungetc'] = (a0, a1) => (_ungetc = Module['_ungetc'] = wasmExports['ungetc'])(a0, a1);
var _ungetwc = Module['_ungetwc'] = (a0, a1) => (_ungetwc = Module['_ungetwc'] = wasmExports['ungetwc'])(a0, a1);
var _unlinkat = Module['_unlinkat'] = (a0, a1, a2) => (_unlinkat = Module['_unlinkat'] = wasmExports['unlinkat'])(a0, a1, a2);
var _usleep = Module['_usleep'] = (a0) => (_usleep = Module['_usleep'] = wasmExports['usleep'])(a0);
var _utimensat = Module['_utimensat'] = (a0, a1, a2, a3) => (_utimensat = Module['_utimensat'] = wasmExports['utimensat'])(a0, a1, a2, a3);
var _utimes = Module['_utimes'] = (a0, a1) => (_utimes = Module['_utimes'] = wasmExports['utimes'])(a0, a1);
var _vasprintf = Module['_vasprintf'] = (a0, a1, a2) => (_vasprintf = Module['_vasprintf'] = wasmExports['vasprintf'])(a0, a1, a2);
var _vprintf = Module['_vprintf'] = (a0, a1) => (_vprintf = Module['_vprintf'] = wasmExports['vprintf'])(a0, a1);
var _wcrtomb = Module['_wcrtomb'] = (a0, a1, a2) => (_wcrtomb = Module['_wcrtomb'] = wasmExports['wcrtomb'])(a0, a1, a2);
var _wcslen = Module['_wcslen'] = (a0) => (_wcslen = Module['_wcslen'] = wasmExports['wcslen'])(a0);
var _wcscoll_l = Module['_wcscoll_l'] = (a0, a1, a2) => (_wcscoll_l = Module['_wcscoll_l'] = wasmExports['wcscoll_l'])(a0, a1, a2);
var _wcsnrtombs = Module['_wcsnrtombs'] = (a0, a1, a2, a3, a4) => (_wcsnrtombs = Module['_wcsnrtombs'] = wasmExports['wcsnrtombs'])(a0, a1, a2, a3, a4);
var _wcstof = Module['_wcstof'] = (a0, a1) => (_wcstof = Module['_wcstof'] = wasmExports['wcstof'])(a0, a1);
var _wcstod = Module['_wcstod'] = (a0, a1) => (_wcstod = Module['_wcstod'] = wasmExports['wcstod'])(a0, a1);
var _wcstold = Module['_wcstold'] = (a0, a1, a2) => (_wcstold = Module['_wcstold'] = wasmExports['wcstold'])(a0, a1, a2);
var _wcstoull = Module['_wcstoull'] = (a0, a1, a2) => (_wcstoull = Module['_wcstoull'] = wasmExports['wcstoull'])(a0, a1, a2);
var _wcstoll = Module['_wcstoll'] = (a0, a1, a2) => (_wcstoll = Module['_wcstoll'] = wasmExports['wcstoll'])(a0, a1, a2);
var _wcstoul = Module['_wcstoul'] = (a0, a1, a2) => (_wcstoul = Module['_wcstoul'] = wasmExports['wcstoul'])(a0, a1, a2);
var _wcstol = Module['_wcstol'] = (a0, a1, a2) => (_wcstol = Module['_wcstol'] = wasmExports['wcstol'])(a0, a1, a2);
var _wcsxfrm_l = Module['_wcsxfrm_l'] = (a0, a1, a2, a3) => (_wcsxfrm_l = Module['_wcsxfrm_l'] = wasmExports['wcsxfrm_l'])(a0, a1, a2, a3);
var _wctob = Module['_wctob'] = (a0) => (_wctob = Module['_wctob'] = wasmExports['wctob'])(a0);
var _wmemchr = Module['_wmemchr'] = (a0, a1, a2) => (_wmemchr = Module['_wmemchr'] = wasmExports['wmemchr'])(a0, a1, a2);
var _wmemcmp = Module['_wmemcmp'] = (a0, a1, a2) => (_wmemcmp = Module['_wmemcmp'] = wasmExports['wmemcmp'])(a0, a1, a2);
var _posix_memalign = Module['_posix_memalign'] = (a0, a1, a2) => (_posix_memalign = Module['_posix_memalign'] = wasmExports['posix_memalign'])(a0, a1, a2);
var ___lttf2 = Module['___lttf2'] = (a0, a1, a2, a3) => (___lttf2 = Module['___lttf2'] = wasmExports['__lttf2'])(a0, a1, a2, a3);
var ___gttf2 = Module['___gttf2'] = (a0, a1, a2, a3) => (___gttf2 = Module['___gttf2'] = wasmExports['__gttf2'])(a0, a1, a2, a3);
var _setThrew = (a0, a1) => (_setThrew = wasmExports['setThrew'])(a0, a1);
var __emscripten_tempret_set = (a0) => (__emscripten_tempret_set = wasmExports['_emscripten_tempret_set'])(a0);
var __emscripten_tempret_get = () => (__emscripten_tempret_get = wasmExports['_emscripten_tempret_get'])();
var ___fixtfsi = Module['___fixtfsi'] = (a0, a1) => (___fixtfsi = Module['___fixtfsi'] = wasmExports['__fixtfsi'])(a0, a1);
var ___floatditf = Module['___floatditf'] = (a0, a1) => (___floatditf = Module['___floatditf'] = wasmExports['__floatditf'])(a0, a1);
var ___floatuntidf = Module['___floatuntidf'] = (a0, a1) => (___floatuntidf = Module['___floatuntidf'] = wasmExports['__floatuntidf'])(a0, a1);
var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports['_emscripten_stack_restore'])(a0);
var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'])(a0);
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();
var __ZNSt3__26chronoeqB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_EEbRKNS0_8durationIT_T0_EERKNS4_IT1_T2_EE = Module['__ZNSt3__26chronoeqB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_EEbRKNS0_8durationIT_T0_EERKNS4_IT1_T2_EE'] = (a0, a1) => (__ZNSt3__26chronoeqB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_EEbRKNS0_8durationIT_T0_EERKNS4_IT1_T2_EE = Module['__ZNSt3__26chronoeqB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_EEbRKNS0_8durationIT_T0_EERKNS4_IT1_T2_EE'] = wasmExports['_ZNSt3__26chronoeqB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_EEbRKNS0_8durationIT_T0_EERKNS4_IT1_T2_EE'])(a0, a1);
var __ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_Q20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS5_T0_EERKNS9_IS6_T2_EE = Module['__ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_Q20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS5_T0_EERKNS9_IS6_T2_EE'] = (a0, a1) => (__ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_Q20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS5_T0_EERKNS9_IS6_T2_EE = Module['__ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_Q20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS5_T0_EERKNS9_IS6_T2_EE'] = wasmExports['_ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExS3_Q20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS5_T0_EERKNS9_IS6_T2_EE'])(a0, a1);
var __ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE = Module['__ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE'] = (a0, a1) => (__ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE = Module['__ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE'] = wasmExports['_ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE'])(a0, a1);
var __ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE = Module['__ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE'] = (a0, a1) => (__ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE = Module['__ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE'] = wasmExports['_ZNSt3__26chronossB8nn180100IxNS_5ratioILx1ELx1000000000EEExNS2_ILx1ELx1000000EEEQ20three_way_comparableINS_11common_typeIJT_T1_EE4typeEEEEDaRKNS0_8durationIS6_T0_EERKNSA_IS7_T2_EE'])(a0, a1);
var __ZNSt3__210unique_ptrIA_NS_24__barrier_algorithm_base9__state_tENS_14default_deleteIS3_EEEaSB8nn180100EOS6_ = Module['__ZNSt3__210unique_ptrIA_NS_24__barrier_algorithm_base9__state_tENS_14default_deleteIS3_EEEaSB8nn180100EOS6_'] = (a0, a1) => (__ZNSt3__210unique_ptrIA_NS_24__barrier_algorithm_base9__state_tENS_14default_deleteIS3_EEEaSB8nn180100EOS6_ = Module['__ZNSt3__210unique_ptrIA_NS_24__barrier_algorithm_base9__state_tENS_14default_deleteIS3_EEEaSB8nn180100EOS6_'] = wasmExports['_ZNSt3__210unique_ptrIA_NS_24__barrier_algorithm_base9__state_tENS_14default_deleteIS3_EEEaSB8nn180100EOS6_'])(a0, a1);
var __ZNSt3__210shared_ptrINS_4__fs10filesystem12__dir_streamEEaSB8nn180100EOS4_ = Module['__ZNSt3__210shared_ptrINS_4__fs10filesystem12__dir_streamEEaSB8nn180100EOS4_'] = (a0, a1) => (__ZNSt3__210shared_ptrINS_4__fs10filesystem12__dir_streamEEaSB8nn180100EOS4_ = Module['__ZNSt3__210shared_ptrINS_4__fs10filesystem12__dir_streamEEaSB8nn180100EOS4_'] = wasmExports['_ZNSt3__210shared_ptrINS_4__fs10filesystem12__dir_streamEEaSB8nn180100EOS4_'])(a0, a1);
var __ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbNS_17basic_string_viewIT_T0_EENS_13type_identityIS6_E4typeE = Module['__ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbNS_17basic_string_viewIT_T0_EENS_13type_identityIS6_E4typeE'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbNS_17basic_string_viewIT_T0_EENS_13type_identityIS6_E4typeE = Module['__ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbNS_17basic_string_viewIT_T0_EENS_13type_identityIS6_E4typeE'] = wasmExports['_ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbNS_17basic_string_viewIT_T0_EENS_13type_identityIS6_E4typeE'])(a0, a1);
var __ZNSt3__210shared_ptrINS_4__fs10filesystem28recursive_directory_iterator12__shared_impEEaSB8nn180100EOS5_ = Module['__ZNSt3__210shared_ptrINS_4__fs10filesystem28recursive_directory_iterator12__shared_impEEaSB8nn180100EOS5_'] = (a0, a1) => (__ZNSt3__210shared_ptrINS_4__fs10filesystem28recursive_directory_iterator12__shared_impEEaSB8nn180100EOS5_ = Module['__ZNSt3__210shared_ptrINS_4__fs10filesystem28recursive_directory_iterator12__shared_impEEaSB8nn180100EOS5_'] = wasmExports['_ZNSt3__210shared_ptrINS_4__fs10filesystem28recursive_directory_iterator12__shared_impEEaSB8nn180100EOS5_'])(a0, a1);
var __ZNSt3__24__fs10filesystem4pathaSB8nn180100EOS2_ = Module['__ZNSt3__24__fs10filesystem4pathaSB8nn180100EOS2_'] = (a0, a1) => (__ZNSt3__24__fs10filesystem4pathaSB8nn180100EOS2_ = Module['__ZNSt3__24__fs10filesystem4pathaSB8nn180100EOS2_'] = wasmExports['_ZNSt3__24__fs10filesystem4pathaSB8nn180100EOS2_'])(a0, a1);
var __ZNSt3__24__fs10filesystem4pathdVB8nn180100ERKS2_ = Module['__ZNSt3__24__fs10filesystem4pathdVB8nn180100ERKS2_'] = (a0, a1) => (__ZNSt3__24__fs10filesystem4pathdVB8nn180100ERKS2_ = Module['__ZNSt3__24__fs10filesystem4pathdVB8nn180100ERKS2_'] = wasmExports['_ZNSt3__24__fs10filesystem4pathdVB8nn180100ERKS2_'])(a0, a1);
var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EOS5_ = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EOS5_'] = (a0, a1) => (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EOS5_ = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EOS5_'] = wasmExports['_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EOS5_'])(a0, a1);
var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSERKS5_ = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSERKS5_'] = (a0, a1) => (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSERKS5_ = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSERKS5_'] = wasmExports['_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSERKS5_'])(a0, a1);
var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100Ec = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100Ec'] = (a0, a1) => (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100Ec = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100Ec'] = wasmExports['_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100Ec'])(a0, a1);
var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100ERKS5_ = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100ERKS5_'] = (a0, a1) => (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100ERKS5_ = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100ERKS5_'] = wasmExports['_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100ERKS5_'])(a0, a1);
var __ZNSt3__2neB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_ = Module['__ZNSt3__2neB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_'] = (a0, a1) => (__ZNSt3__2neB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_ = Module['__ZNSt3__2neB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_'] = wasmExports['_ZNSt3__2neB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_'])(a0, a1);
var __ZNSt3__2eqB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_ = Module['__ZNSt3__2eqB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_ = Module['__ZNSt3__2eqB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_'] = wasmExports['_ZNSt3__2eqB8nn180100ERKNS_16__deque_iteratorINS_4__fs10filesystem12__dir_streamEPS3_RS3_PS4_lLl0EEES9_'])(a0, a1);
var __ZNSt3__2eqB8nn180100ERKNS_15error_conditionES2_ = Module['__ZNSt3__2eqB8nn180100ERKNS_15error_conditionES2_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100ERKNS_15error_conditionES2_ = Module['__ZNSt3__2eqB8nn180100ERKNS_15error_conditionES2_'] = wasmExports['_ZNSt3__2eqB8nn180100ERKNS_15error_conditionES2_'])(a0, a1);
var __ZNKSt3__214error_categoryeqB8nn180100ERKS0_ = Module['__ZNKSt3__214error_categoryeqB8nn180100ERKS0_'] = (a0, a1) => (__ZNKSt3__214error_categoryeqB8nn180100ERKS0_ = Module['__ZNKSt3__214error_categoryeqB8nn180100ERKS0_'] = wasmExports['_ZNKSt3__214error_categoryeqB8nn180100ERKS0_'])(a0, a1);
var __ZSteqB8nn180100RKSt13exception_ptrS1_ = Module['__ZSteqB8nn180100RKSt13exception_ptrS1_'] = (a0, a1) => (__ZSteqB8nn180100RKSt13exception_ptrS1_ = Module['__ZSteqB8nn180100RKSt13exception_ptrS1_'] = wasmExports['_ZSteqB8nn180100RKSt13exception_ptrS1_'])(a0, a1);
var __ZStneB8nn180100RKSt13exception_ptrS1_ = Module['__ZStneB8nn180100RKSt13exception_ptrS1_'] = (a0, a1) => (__ZStneB8nn180100RKSt13exception_ptrS1_ = Module['__ZStneB8nn180100RKSt13exception_ptrS1_'] = wasmExports['_ZStneB8nn180100RKSt13exception_ptrS1_'])(a0, a1);
var __ZNSt3__220__check_for_overflowB8nn180100ILm4EEENS_9enable_ifIXeqT_Li4EEvE4typeEm = Module['__ZNSt3__220__check_for_overflowB8nn180100ILm4EEENS_9enable_ifIXeqT_Li4EEvE4typeEm'] = (a0) => (__ZNSt3__220__check_for_overflowB8nn180100ILm4EEENS_9enable_ifIXeqT_Li4EEvE4typeEm = Module['__ZNSt3__220__check_for_overflowB8nn180100ILm4EEENS_9enable_ifIXeqT_Li4EEvE4typeEm'] = wasmExports['_ZNSt3__220__check_for_overflowB8nn180100ILm4EEENS_9enable_ifIXeqT_Li4EEvE4typeEm'])(a0);
var __ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_ = Module['__ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_ = Module['__ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_'] = wasmExports['_ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_'])(a0, a1);
var __ZNSt3__2eqB8nn180100I11__mbstate_tEEbRKNS_4fposIT_EES6_ = Module['__ZNSt3__2eqB8nn180100I11__mbstate_tEEbRKNS_4fposIT_EES6_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100I11__mbstate_tEEbRKNS_4fposIT_EES6_ = Module['__ZNSt3__2eqB8nn180100I11__mbstate_tEEbRKNS_4fposIT_EES6_'] = wasmExports['_ZNSt3__2eqB8nn180100I11__mbstate_tEEbRKNS_4fposIT_EES6_'])(a0, a1);
var __ZNSt3__219ostreambuf_iteratorIcNS_11char_traitsIcEEEaSB8nn180100Ec = Module['__ZNSt3__219ostreambuf_iteratorIcNS_11char_traitsIcEEEaSB8nn180100Ec'] = (a0, a1) => (__ZNSt3__219ostreambuf_iteratorIcNS_11char_traitsIcEEEaSB8nn180100Ec = Module['__ZNSt3__219ostreambuf_iteratorIcNS_11char_traitsIcEEEaSB8nn180100Ec'] = wasmExports['_ZNSt3__219ostreambuf_iteratorIcNS_11char_traitsIcEEEaSB8nn180100Ec'])(a0, a1);
var __ZNSt3__2eqB8nn180100IwNS_11char_traitsIwEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_ = Module['__ZNSt3__2eqB8nn180100IwNS_11char_traitsIwEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IwNS_11char_traitsIwEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_ = Module['__ZNSt3__2eqB8nn180100IwNS_11char_traitsIwEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_'] = wasmExports['_ZNSt3__2eqB8nn180100IwNS_11char_traitsIwEEEEbRKNS_19istreambuf_iteratorIT_T0_EES8_'])(a0, a1);
var __ZNSt3__219ostreambuf_iteratorIwNS_11char_traitsIwEEEaSB8nn180100Ew = Module['__ZNSt3__219ostreambuf_iteratorIwNS_11char_traitsIwEEEaSB8nn180100Ew'] = (a0, a1) => (__ZNSt3__219ostreambuf_iteratorIwNS_11char_traitsIwEEEaSB8nn180100Ew = Module['__ZNSt3__219ostreambuf_iteratorIwNS_11char_traitsIwEEEaSB8nn180100Ew'] = wasmExports['_ZNSt3__219ostreambuf_iteratorIwNS_11char_traitsIwEEEaSB8nn180100Ew'])(a0, a1);
var __ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEOS5_ = Module['__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEOS5_'] = (a0, a1) => (__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEOS5_ = Module['__ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEOS5_'] = wasmExports['_ZNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEOS5_'])(a0, a1);
var __ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEEaSEOS3_ = Module['__ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEEaSEOS3_'] = (a0, a1) => (__ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEEaSEOS3_ = Module['__ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEEaSEOS3_'] = wasmExports['_ZNSt3__214basic_iostreamIcNS_11char_traitsIcEEEaSEOS3_'])(a0, a1);
var __ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEEaSEOS3_ = Module['__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEEaSEOS3_'] = (a0, a1) => (__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEEaSEOS3_ = Module['__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEEaSEOS3_'] = wasmExports['_ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEEaSEOS3_'])(a0, a1);
var __ZNSt3__213basic_istreamIcNS_11char_traitsIcEEEaSEOS3_ = Module['__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEEaSEOS3_'] = (a0, a1) => (__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEEaSEOS3_ = Module['__ZNSt3__213basic_istreamIcNS_11char_traitsIcEEEaSEOS3_'] = wasmExports['_ZNSt3__213basic_istreamIcNS_11char_traitsIcEEEaSEOS3_'])(a0, a1);
var __ZNSt3__2neB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_ = Module['__ZNSt3__2neB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_'] = (a0, a1) => (__ZNSt3__2neB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_ = Module['__ZNSt3__2neB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_'] = wasmExports['_ZNSt3__2neB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_'])(a0, a1);
var __ZNSt3__2eqB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_ = Module['__ZNSt3__2eqB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_ = Module['__ZNSt3__2eqB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_'] = wasmExports['_ZNSt3__2eqB8nn180100IPcEEbRKNS_11__wrap_iterIT_EES6_'])(a0, a1);
var __ZNSt3__2neB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_ = Module['__ZNSt3__2neB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_'] = (a0, a1) => (__ZNSt3__2neB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_ = Module['__ZNSt3__2neB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_'] = wasmExports['_ZNSt3__2neB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_'])(a0, a1);
var __ZNSt3__2eqB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_ = Module['__ZNSt3__2eqB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_ = Module['__ZNSt3__2eqB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_'] = wasmExports['_ZNSt3__2eqB8nn180100IPwEEbRKNS_11__wrap_iterIT_EES6_'])(a0, a1);
var __ZNSt3__2neB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE = Module['__ZNSt3__2neB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'] = (a0, a1) => (__ZNSt3__2neB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE = Module['__ZNSt3__2neB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'] = wasmExports['_ZNSt3__2neB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'])(a0, a1);
var __ZNSt3__2eqB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE = Module['__ZNSt3__2eqB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE = Module['__ZNSt3__2eqB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'] = wasmExports['_ZNSt3__2eqB8nn180100IPKcPcEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'])(a0, a1);
var __ZNSt3__210unique_ptrIcPFvPvEEaSB8nn180100EOS4_ = Module['__ZNSt3__210unique_ptrIcPFvPvEEaSB8nn180100EOS4_'] = (a0, a1) => (__ZNSt3__210unique_ptrIcPFvPvEEaSB8nn180100EOS4_ = Module['__ZNSt3__210unique_ptrIcPFvPvEEaSB8nn180100EOS4_'] = wasmExports['_ZNSt3__210unique_ptrIcPFvPvEEaSB8nn180100EOS4_'])(a0, a1);
var __ZNSt3__210unique_ptrIjPFvPvEEaSB8nn180100EOS4_ = Module['__ZNSt3__210unique_ptrIjPFvPvEEaSB8nn180100EOS4_'] = (a0, a1) => (__ZNSt3__210unique_ptrIjPFvPvEEaSB8nn180100EOS4_ = Module['__ZNSt3__210unique_ptrIjPFvPvEEaSB8nn180100EOS4_'] = wasmExports['_ZNSt3__210unique_ptrIjPFvPvEEaSB8nn180100EOS4_'])(a0, a1);
var __ZNSt3__2neB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE = Module['__ZNSt3__2neB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'] = (a0, a1) => (__ZNSt3__2neB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE = Module['__ZNSt3__2neB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'] = wasmExports['_ZNSt3__2neB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'])(a0, a1);
var __ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EOS5_ = Module['__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EOS5_'] = (a0, a1) => (__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EOS5_ = Module['__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EOS5_'] = wasmExports['_ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EOS5_'])(a0, a1);
var __ZNSt3__2eqB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE = Module['__ZNSt3__2eqB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE = Module['__ZNSt3__2eqB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'] = wasmExports['_ZNSt3__2eqB8nn180100IPKwPwEEbRKNS_11__wrap_iterIT_EERKNS4_IT0_EE'])(a0, a1);
var __ZNSt3__210unique_ptrIwPFvPvEEaSB8nn180100EOS4_ = Module['__ZNSt3__210unique_ptrIwPFvPvEEaSB8nn180100EOS4_'] = (a0, a1) => (__ZNSt3__210unique_ptrIwPFvPvEEaSB8nn180100EOS4_ = Module['__ZNSt3__210unique_ptrIwPFvPvEEaSB8nn180100EOS4_'] = wasmExports['_ZNSt3__210unique_ptrIwPFvPvEEaSB8nn180100EOS4_'])(a0, a1);
var __ZNSt3__2eqB8nn180100IcPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn = Module['__ZNSt3__2eqB8nn180100IcPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IcPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn = Module['__ZNSt3__2eqB8nn180100IcPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn'] = wasmExports['_ZNSt3__2eqB8nn180100IcPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn'])(a0, a1);
var __ZNSt3__2eqB8nn180100IwPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn = Module['__ZNSt3__2eqB8nn180100IwPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IwPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn = Module['__ZNSt3__2eqB8nn180100IwPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn'] = wasmExports['_ZNSt3__2eqB8nn180100IwPFvPvEEEbRKNS_10unique_ptrIT_T0_EEDn'])(a0, a1);
var __ZNSt3__211__wrap_iterIPKcEpLB8nn180100El = Module['__ZNSt3__211__wrap_iterIPKcEpLB8nn180100El'] = (a0, a1) => (__ZNSt3__211__wrap_iterIPKcEpLB8nn180100El = Module['__ZNSt3__211__wrap_iterIPKcEpLB8nn180100El'] = wasmExports['_ZNSt3__211__wrap_iterIPKcEpLB8nn180100El'])(a0, a1);
var __ZNSt3__211__wrap_iterIPKwEpLB8nn180100El = Module['__ZNSt3__211__wrap_iterIPKwEpLB8nn180100El'] = (a0, a1) => (__ZNSt3__211__wrap_iterIPKwEpLB8nn180100El = Module['__ZNSt3__211__wrap_iterIPKwEpLB8nn180100El'] = wasmExports['_ZNSt3__211__wrap_iterIPKwEpLB8nn180100El'])(a0, a1);
var __ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEENS_9allocatorIcEEEEbRKNS_12basic_stringIT_T0_T1_EEPKS6_ = Module['__ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEENS_9allocatorIcEEEEbRKNS_12basic_stringIT_T0_T1_EEPKS6_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEENS_9allocatorIcEEEEbRKNS_12basic_stringIT_T0_T1_EEPKS6_ = Module['__ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEENS_9allocatorIcEEEEbRKNS_12basic_stringIT_T0_T1_EEPKS6_'] = wasmExports['_ZNSt3__2eqB8nn180100IcNS_11char_traitsIcEENS_9allocatorIcEEEEbRKNS_12basic_stringIT_T0_T1_EEPKS6_'])(a0, a1);
var __ZNSt3__2eqB8nn180100INS_9allocatorIcEEEEbRKNS_12basic_stringIcNS_11char_traitsIcEET_EES9_ = Module['__ZNSt3__2eqB8nn180100INS_9allocatorIcEEEEbRKNS_12basic_stringIcNS_11char_traitsIcEET_EES9_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100INS_9allocatorIcEEEEbRKNS_12basic_stringIcNS_11char_traitsIcEET_EES9_ = Module['__ZNSt3__2eqB8nn180100INS_9allocatorIcEEEEbRKNS_12basic_stringIcNS_11char_traitsIcEET_EES9_'] = wasmExports['_ZNSt3__2eqB8nn180100INS_9allocatorIcEEEEbRKNS_12basic_stringIcNS_11char_traitsIcEET_EES9_'])(a0, a1);
var __ZNSt3__26vectorIPNS_6locale5facetENS_15__sso_allocatorIS3_Lm30EEEEaSB8nn180100ERKS6_ = Module['__ZNSt3__26vectorIPNS_6locale5facetENS_15__sso_allocatorIS3_Lm30EEEEaSB8nn180100ERKS6_'] = (a0, a1) => (__ZNSt3__26vectorIPNS_6locale5facetENS_15__sso_allocatorIS3_Lm30EEEEaSB8nn180100ERKS6_ = Module['__ZNSt3__26vectorIPNS_6locale5facetENS_15__sso_allocatorIS3_Lm30EEEEaSB8nn180100ERKS6_'] = wasmExports['_ZNSt3__26vectorIPNS_6locale5facetENS_15__sso_allocatorIS3_Lm30EEEEaSB8nn180100ERKS6_'])(a0, a1);
var __ZNSt3__26localeaSERKS0_ = Module['__ZNSt3__26localeaSERKS0_'] = (a0, a1) => (__ZNSt3__26localeaSERKS0_ = Module['__ZNSt3__26localeaSERKS0_'] = wasmExports['_ZNSt3__26localeaSERKS0_'])(a0, a1);
var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EPKc = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EPKc'] = (a0, a1) => (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EPKc = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EPKc'] = wasmExports['_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSB8nn180100EPKc'])(a0, a1);
var __ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EPKw = Module['__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EPKw'] = (a0, a1) => (__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EPKw = Module['__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EPKw'] = wasmExports['_ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEaSB8nn180100EPKw'])(a0, a1);
var __ZNSt3__211__wrap_iterIPcEpLB8nn180100El = Module['__ZNSt3__211__wrap_iterIPcEpLB8nn180100El'] = (a0, a1) => (__ZNSt3__211__wrap_iterIPcEpLB8nn180100El = Module['__ZNSt3__211__wrap_iterIPcEpLB8nn180100El'] = wasmExports['_ZNSt3__211__wrap_iterIPcEpLB8nn180100El'])(a0, a1);
var __ZNSt3__211__wrap_iterIPwEpLB8nn180100El = Module['__ZNSt3__211__wrap_iterIPwEpLB8nn180100El'] = (a0, a1) => (__ZNSt3__211__wrap_iterIPwEpLB8nn180100El = Module['__ZNSt3__211__wrap_iterIPwEpLB8nn180100El'] = wasmExports['_ZNSt3__211__wrap_iterIPwEpLB8nn180100El'])(a0, a1);
var __ZNSt3__2eqB8nn180100ENS_11__thread_idES0_ = Module['__ZNSt3__2eqB8nn180100ENS_11__thread_idES0_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100ENS_11__thread_idES0_ = Module['__ZNSt3__2eqB8nn180100ENS_11__thread_idES0_'] = wasmExports['_ZNSt3__2eqB8nn180100ENS_11__thread_idES0_'])(a0, a1);
var __Z22__throw_bad_alloc_shimv = Module['__Z22__throw_bad_alloc_shimv'] = () => (__Z22__throw_bad_alloc_shimv = Module['__Z22__throw_bad_alloc_shimv'] = wasmExports['_Z22__throw_bad_alloc_shimv'])();
var __ZNSt3__24__fs10filesystemneB8nn180100ERKNS1_18directory_iteratorES4_ = Module['__ZNSt3__24__fs10filesystemneB8nn180100ERKNS1_18directory_iteratorES4_'] = (a0, a1) => (__ZNSt3__24__fs10filesystemneB8nn180100ERKNS1_18directory_iteratorES4_ = Module['__ZNSt3__24__fs10filesystemneB8nn180100ERKNS1_18directory_iteratorES4_'] = wasmExports['_ZNSt3__24__fs10filesystemneB8nn180100ERKNS1_18directory_iteratorES4_'])(a0, a1);
var __ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_18directory_iteratorES4_ = Module['__ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_18directory_iteratorES4_'] = (a0, a1) => (__ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_18directory_iteratorES4_ = Module['__ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_18directory_iteratorES4_'] = wasmExports['_ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_18directory_iteratorES4_'])(a0, a1);
var __ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_4pathES4_ = Module['__ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_4pathES4_'] = (a0, a1) => (__ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_4pathES4_ = Module['__ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_4pathES4_'] = wasmExports['_ZNSt3__24__fs10filesystemeqB8nn180100ERKNS1_4pathES4_'])(a0, a1);
var __ZNSt3__2eqB8nn180100INS_4__fs10filesystem12__dir_streamES3_EEbRKNS_10shared_ptrIT_EERKNS4_IT0_EE = Module['__ZNSt3__2eqB8nn180100INS_4__fs10filesystem12__dir_streamES3_EEbRKNS_10shared_ptrIT_EERKNS4_IT0_EE'] = (a0, a1) => (__ZNSt3__2eqB8nn180100INS_4__fs10filesystem12__dir_streamES3_EEbRKNS_10shared_ptrIT_EERKNS4_IT0_EE = Module['__ZNSt3__2eqB8nn180100INS_4__fs10filesystem12__dir_streamES3_EEbRKNS_10shared_ptrIT_EERKNS4_IT0_EE'] = wasmExports['_ZNSt3__2eqB8nn180100INS_4__fs10filesystem12__dir_streamES3_EEbRKNS_10shared_ptrIT_EERKNS4_IT0_EE'])(a0, a1);
var __ZNSt3__24__fs10filesystemaNB8nn180100ERNS1_5permsES2_ = Module['__ZNSt3__24__fs10filesystemaNB8nn180100ERNS1_5permsES2_'] = (a0, a1) => (__ZNSt3__24__fs10filesystemaNB8nn180100ERNS1_5permsES2_ = Module['__ZNSt3__24__fs10filesystemaNB8nn180100ERNS1_5permsES2_'] = wasmExports['_ZNSt3__24__fs10filesystemaNB8nn180100ERNS1_5permsES2_'])(a0, a1);
var __ZNSt3__24__fs10filesystemoRB8nn180100ERNS1_5permsES2_ = Module['__ZNSt3__24__fs10filesystemoRB8nn180100ERNS1_5permsES2_'] = (a0, a1) => (__ZNSt3__24__fs10filesystemoRB8nn180100ERNS1_5permsES2_ = Module['__ZNSt3__24__fs10filesystemoRB8nn180100ERNS1_5permsES2_'] = wasmExports['_ZNSt3__24__fs10filesystemoRB8nn180100ERNS1_5permsES2_'])(a0, a1);
var __ZNSt3__2eqB8nn180100ERKNS_10error_codeERKNS_15error_conditionE = Module['__ZNSt3__2eqB8nn180100ERKNS_10error_codeERKNS_15error_conditionE'] = (a0, a1) => (__ZNSt3__2eqB8nn180100ERKNS_10error_codeERKNS_15error_conditionE = Module['__ZNSt3__2eqB8nn180100ERKNS_10error_codeERKNS_15error_conditionE'] = wasmExports['_ZNSt3__2eqB8nn180100ERKNS_10error_codeERKNS_15error_conditionE'])(a0, a1);
var __ZNSt3__24__fs10filesystem4pathdVB8nn180100INS_17basic_string_viewIcNS_11char_traitsIcEEEEEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS9_ = Module['__ZNSt3__24__fs10filesystem4pathdVB8nn180100INS_17basic_string_viewIcNS_11char_traitsIcEEEEEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS9_'] = (a0, a1) => (__ZNSt3__24__fs10filesystem4pathdVB8nn180100INS_17basic_string_viewIcNS_11char_traitsIcEEEEEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS9_ = Module['__ZNSt3__24__fs10filesystem4pathdVB8nn180100INS_17basic_string_viewIcNS_11char_traitsIcEEEEEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS9_'] = wasmExports['_ZNSt3__24__fs10filesystem4pathdVB8nn180100INS_17basic_string_viewIcNS_11char_traitsIcEEEEEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS9_'])(a0, a1);
var __ZNSt3__2neB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_ = Module['__ZNSt3__2neB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_'] = (a0, a1) => (__ZNSt3__2neB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_ = Module['__ZNSt3__2neB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_'] = wasmExports['_ZNSt3__2neB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_'])(a0, a1);
var __ZNSt3__2eqB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_ = Module['__ZNSt3__2eqB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_ = Module['__ZNSt3__2eqB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_'] = wasmExports['_ZNSt3__2eqB8nn180100IPNS_17basic_string_viewIcNS_11char_traitsIcEEEEEEbRKNS_11__wrap_iterIT_EESA_'])(a0, a1);
var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100EPKc = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100EPKc'] = (a0, a1) => (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100EPKc = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100EPKc'] = wasmExports['_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEpLB8nn180100EPKc'])(a0, a1);
var __ZNSt3__2neB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_ = Module['__ZNSt3__2neB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_'] = (a0, a1) => (__ZNSt3__2neB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_ = Module['__ZNSt3__2neB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_'] = wasmExports['_ZNSt3__2neB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_'])(a0, a1);
var __ZNSt3__24__fs10filesystem4pathdVB8nn180100IA1_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_ = Module['__ZNSt3__24__fs10filesystem4pathdVB8nn180100IA1_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_'] = (a0, a1) => (__ZNSt3__24__fs10filesystem4pathdVB8nn180100IA1_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_ = Module['__ZNSt3__24__fs10filesystem4pathdVB8nn180100IA1_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_'] = wasmExports['_ZNSt3__24__fs10filesystem4pathdVB8nn180100IA1_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_'])(a0, a1);
var __ZNSt3__2eqB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_ = Module['__ZNSt3__2eqB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_ = Module['__ZNSt3__2eqB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_'] = wasmExports['_ZNSt3__2eqB8nn180100IPNS_4pairINS_17basic_string_viewIcNS_11char_traitsIcEEEENS_4__fs10filesystem12PathPartKindEEEEEbRKNS_11__wrap_iterIT_EESF_'])(a0, a1);
var __ZNSt3__24__fs10filesystem4pathdVB8nn180100IA3_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_ = Module['__ZNSt3__24__fs10filesystem4pathdVB8nn180100IA3_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_'] = (a0, a1) => (__ZNSt3__24__fs10filesystem4pathdVB8nn180100IA3_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_ = Module['__ZNSt3__24__fs10filesystem4pathdVB8nn180100IA3_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_'] = wasmExports['_ZNSt3__24__fs10filesystem4pathdVB8nn180100IA3_cEENS_9enable_ifIXsr13__is_pathableIT_EE5valueERS2_E4typeERKS6_'])(a0, a1);
var __ZNSt3__218__libcpp_refstringaSERKS0_ = Module['__ZNSt3__218__libcpp_refstringaSERKS0_'] = (a0, a1) => (__ZNSt3__218__libcpp_refstringaSERKS0_ = Module['__ZNSt3__218__libcpp_refstringaSERKS0_'] = wasmExports['_ZNSt3__218__libcpp_refstringaSERKS0_'])(a0, a1);
var __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEc = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEc'] = (a0, a1) => (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEc = Module['__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEc'] = wasmExports['_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEaSEc'])(a0, a1);
var __ZNSt3__2neB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_ = Module['__ZNSt3__2neB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_'] = (a0, a1) => (__ZNSt3__2neB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_ = Module['__ZNSt3__2neB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_'] = wasmExports['_ZNSt3__2neB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_'])(a0, a1);
var __ZNSt3__2neB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_ = Module['__ZNSt3__2neB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_'] = (a0, a1) => (__ZNSt3__2neB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_ = Module['__ZNSt3__2neB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_'] = wasmExports['_ZNSt3__2neB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_'])(a0, a1);
var __ZNSt3__2eqB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_ = Module['__ZNSt3__2eqB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_ = Module['__ZNSt3__2eqB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_'] = wasmExports['_ZNSt3__2eqB8nn180100IPNS_4pairIPNS_18condition_variableEPNS_5mutexEEEEEbRKNS_11__wrap_iterIT_EESC_'])(a0, a1);
var __ZNSt3__2eqB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_ = Module['__ZNSt3__2eqB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_'] = (a0, a1) => (__ZNSt3__2eqB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_ = Module['__ZNSt3__2eqB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_'] = wasmExports['_ZNSt3__2eqB8nn180100IPPNS_17__assoc_sub_stateEEEbRKNS_11__wrap_iterIT_EES8_'])(a0, a1);
var ___cxa_bad_typeid = Module['___cxa_bad_typeid'] = () => (___cxa_bad_typeid = Module['___cxa_bad_typeid'] = wasmExports['__cxa_bad_typeid'])();
var ___cxa_increment_exception_refcount = Module['___cxa_increment_exception_refcount'] = (a0) => (___cxa_increment_exception_refcount = Module['___cxa_increment_exception_refcount'] = wasmExports['__cxa_increment_exception_refcount'])(a0);
var ___cxa_decrement_exception_refcount = Module['___cxa_decrement_exception_refcount'] = (a0) => (___cxa_decrement_exception_refcount = Module['___cxa_decrement_exception_refcount'] = wasmExports['__cxa_decrement_exception_refcount'])(a0);
var ___cxa_allocate_exception = Module['___cxa_allocate_exception'] = (a0) => (___cxa_allocate_exception = Module['___cxa_allocate_exception'] = wasmExports['__cxa_allocate_exception'])(a0);
var ___cxa_thread_atexit = Module['___cxa_thread_atexit'] = (a0, a1, a2) => (___cxa_thread_atexit = Module['___cxa_thread_atexit'] = wasmExports['__cxa_thread_atexit'])(a0, a1, a2);
var ___cxa_pure_virtual = Module['___cxa_pure_virtual'] = () => (___cxa_pure_virtual = Module['___cxa_pure_virtual'] = wasmExports['__cxa_pure_virtual'])();
var ___dynamic_cast = Module['___dynamic_cast'] = (a0, a1, a2, a3) => (___dynamic_cast = Module['___dynamic_cast'] = wasmExports['__dynamic_cast'])(a0, a1, a2, a3);
var ___cxa_is_pointer_type = (a0) => (___cxa_is_pointer_type = wasmExports['__cxa_is_pointer_type'])(a0);
var _ScanKeywords = Module['_ScanKeywords'] = 69246628;
var _stderr = Module['_stderr'] = 69269056;
var _stdout = Module['_stdout'] = 69269360;
var _InterruptPending = Module['_InterruptPending'] = 69292808;
var _CurrentMemoryContext = Module['_CurrentMemoryContext'] = 69291832;
var _TTSOpsHeapTuple = Module['_TTSOpsHeapTuple'] = 69108604;
var ___THREW__ = Module['___THREW__'] = 69436404;
var ___threwValue = Module['___threwValue'] = 69436408;
var _TopMemoryContext = Module['_TopMemoryContext'] = 69291836;
var _error_context_stack = Module['_error_context_stack'] = 69290948;
var _InterruptHoldoffCount = Module['_InterruptHoldoffCount'] = 69292848;
var _PG_exception_stack = Module['_PG_exception_stack'] = 69290952;
var _MyProc = Module['_MyProc'] = 69329720;
var _MyLatch = Module['_MyLatch'] = 69292980;
var _ConfigReloadPending = Module['_ConfigReloadPending'] = 69279872;
var _ShutdownRequestPending = Module['_ShutdownRequestPending'] = 69279876;
var _MyProcPid = Module['_MyProcPid'] = 69292948;
var _MainLWLockArray = Module['_MainLWLockArray'] = 69327792;
var _CritSectionCount = Module['_CritSectionCount'] = 69292856;
var _wal_segment_size = Module['_wal_segment_size'] = 69225140;
var _NBuffers = Module['_NBuffers'] = 69157096;
var _IsUnderPostmaster = Module['_IsUnderPostmaster'] = 69292881;
var _Log_directory = Module['_Log_directory'] = 69279552;
var _Log_filename = Module['_Log_filename'] = 69279556;
var _MyStartTime = Module['_MyStartTime'] = 69292952;
var _process_shared_preload_libraries_in_progress = Module['_process_shared_preload_libraries_in_progress'] = 69292796;
var _wal_level = Module['_wal_level'] = 69225120;
var _progname = Module['_progname'] = 69325292;
var _DataDir = Module['_DataDir'] = 69292860;
var _pg_global_prng_state = Module['_pg_global_prng_state'] = 69422000;
var _MyProcPort = Module['_MyProcPort'] = 69292968;
var _MyDatabaseId = Module['_MyDatabaseId'] = 69292864;
var _TopTransactionContext = Module['_TopTransactionContext'] = 69291856;
var _SnapshotAnyData = Module['_SnapshotAnyData'] = 69158712;
var _ParallelWorkerNumber = Module['_ParallelWorkerNumber'] = 69225456;
var _GUC_check_errdetail_string = Module['_GUC_check_errdetail_string'] = 69320408;
var _check_function_bodies = Module['_check_function_bodies'] = 69158822;
var _old_snapshot_threshold = Module['_old_snapshot_threshold'] = 69319204;
var _maintenance_work_mem = Module['_maintenance_work_mem'] = 69157088;
var _DateStyle = Module['_DateStyle'] = 69157064;
var _XactIsoLevel = Module['_XactIsoLevel'] = 69224984;
var _CacheMemoryContext = Module['_CacheMemoryContext'] = 69291848;
var _CurrentResourceOwner = Module['_CurrentResourceOwner'] = 69290896;
var _work_mem = Module['_work_mem'] = 69157076;
var _TTSOpsMinimalTuple = Module['_TTSOpsMinimalTuple'] = 69108652;
var _TTSOpsVirtual = Module['_TTSOpsVirtual'] = 69108556;
var _check_password_hook = Module['_check_password_hook'] = 69280116;
var _post_parse_analyze_hook = Module['_post_parse_analyze_hook'] = 69336536;
var _pgBufferUsage = Module['_pgBufferUsage'] = 69290760;
var _TopTransactionResourceOwner = Module['_TopTransactionResourceOwner'] = 69290904;
var _LocalBufferBlockPointers = Module['_LocalBufferBlockPointers'] = 69335032;
var _BufferBlocks = Module['_BufferBlocks'] = 69329884;
var _stdin = Module['_stdin'] = 69269208;
var _WalReceiverFunctions = Module['_WalReceiverFunctions'] = 69289476;
var _max_parallel_maintenance_workers = Module['_max_parallel_maintenance_workers'] = 69157092;
var _debug_query_string = Module['_debug_query_string'] = 69325500;
var _SPI_processed = Module['_SPI_processed'] = 69290640;
var _SPI_tuptable = Module['_SPI_tuptable'] = 69290648;
var _cma_rsize = Module['_cma_rsize'] = 69325508;
var _SOCKET_DATA = Module['_SOCKET_DATA'] = 69340008;
var _SOCKET_FILE = Module['_SOCKET_FILE'] = 69340004;
var _ClientAuthentication_hook = Module['_ClientAuthentication_hook'] = 69289132;
var _RmgrTable = Module['_RmgrTable'] = 69225568;
var _cluster_name = Module['_cluster_name'] = 69158876;
var _application_name = Module['_application_name'] = 69319812;
var _cpu_operator_cost = Module['_cpu_operator_cost'] = 69108296;
var _planner_hook = Module['_planner_hook'] = 69289808;
var _cpu_tuple_cost = Module['_cpu_tuple_cost'] = 69108280;
var _seq_page_cost = Module['_seq_page_cost'] = 69108264;
var _SPI_result = Module['_SPI_result'] = 69290652;
var _ExecutorStart_hook = Module['_ExecutorStart_hook'] = 69290736;
var _ExecutorRun_hook = Module['_ExecutorRun_hook'] = 69290740;
var _ExecutorFinish_hook = Module['_ExecutorFinish_hook'] = 69290744;
var _ExecutorEnd_hook = Module['_ExecutorEnd_hook'] = 69290748;
var _pgWalUsage = Module['_pgWalUsage'] = 69290872;
var _pg_crc32_table = Module['_pg_crc32_table'] = 67847728;
var _shmem_request_hook = Module['_shmem_request_hook'] = 69292800;
var _IntervalStyle = Module['_IntervalStyle'] = 69292888;
var _oldSnapshotControl = Module['_oldSnapshotControl'] = 69319208;
var _quote_all_identifiers = Module['_quote_all_identifiers'] = 69325297;
var _extra_float_digits = Module['_extra_float_digits'] = 69209000;
var _pg_number_of_ones = Module['_pg_number_of_ones'] = 68773200;
var _ShmemVariableCache = Module['_ShmemVariableCache'] = 69326968;
var _xmlStructuredError = Module['_xmlStructuredError'] = 69422364;
var _xmlStructuredErrorContext = Module['_xmlStructuredErrorContext'] = 69422372;
var _xmlGenericErrorContext = Module['_xmlGenericErrorContext'] = 69422368;
var _xmlGenericError = Module['_xmlGenericError'] = 69250932;
var _xmlIsBaseCharGroup = Module['_xmlIsBaseCharGroup'] = 69250696;
var _xmlIsDigitGroup = Module['_xmlIsDigitGroup'] = 69250728;
var _xmlIsCombiningGroup = Module['_xmlIsCombiningGroup'] = 69250712;
var _xmlIsExtenderGroup = Module['_xmlIsExtenderGroup'] = 69250744;
var _xmlFree = Module['_xmlFree'] = 69250896;
var _single_mode_feed = Module['_single_mode_feed'] = 69325308;
var _cma_wsize = Module['_cma_wsize'] = 69325512;
var _ProcessUtility_hook = Module['_ProcessUtility_hook'] = 69325708;
var _BufferDescriptors = Module['_BufferDescriptors'] = 69329880;
var _shmem_startup_hook = Module['_shmem_startup_hook'] = 69336444;
var _ScanKeywordTokens = Module['_ScanKeywordTokens'] = 68465712;
var _IDB_STAGE = Module['_IDB_STAGE'] = 69340016;
var _IDB_PIPE_FP = Module['_IDB_PIPE_FP'] = 69340012;
var _pg_scram_mech = Module['_pg_scram_mech'] = 69250640;
var _pg_g_threadlock = Module['_pg_g_threadlock'] = 69248744;
var _pgresStatus = Module['_pgresStatus'] = 69250432;
var _xmlIsPubidChar_tab = Module['_xmlIsPubidChar_tab'] = 68773488;
var _xmlGetWarningsDefaultValue = Module['_xmlGetWarningsDefaultValue'] = 69250924;
var _xmlMalloc = Module['_xmlMalloc'] = 69250900;
var _xmlRealloc = Module['_xmlRealloc'] = 69250908;
var _xmlLastError = Module['_xmlLastError'] = 69422384;
var _xmlMallocAtomic = Module['_xmlMallocAtomic'] = 69250904;
var _xmlMemStrdup = Module['_xmlMemStrdup'] = 69250912;
var _xmlBufferAllocScheme = Module['_xmlBufferAllocScheme'] = 69250916;
var _xmlDefaultBufferSize = Module['_xmlDefaultBufferSize'] = 69250920;
var _xmlParserDebugEntities = Module['_xmlParserDebugEntities'] = 69422324;
var _xmlDoValidityCheckingDefaultValue = Module['_xmlDoValidityCheckingDefaultValue'] = 69422328;
var _xmlLoadExtDtdDefaultValue = Module['_xmlLoadExtDtdDefaultValue'] = 69422332;
var _xmlPedanticParserDefaultValue = Module['_xmlPedanticParserDefaultValue'] = 69422336;
var _xmlLineNumbersDefaultValue = Module['_xmlLineNumbersDefaultValue'] = 69422340;
var _xmlKeepBlanksDefaultValue = Module['_xmlKeepBlanksDefaultValue'] = 69250928;
var _xmlSubstituteEntitiesDefaultValue = Module['_xmlSubstituteEntitiesDefaultValue'] = 69422344;
var _xmlRegisterNodeDefaultValue = Module['_xmlRegisterNodeDefaultValue'] = 69422348;
var _xmlDeregisterNodeDefaultValue = Module['_xmlDeregisterNodeDefaultValue'] = 69422352;
var _xmlParserInputBufferCreateFilenameValue = Module['_xmlParserInputBufferCreateFilenameValue'] = 69422356;
var _xmlOutputBufferCreateFilenameValue = Module['_xmlOutputBufferCreateFilenameValue'] = 69422360;
var _xmlIndentTreeOutput = Module['_xmlIndentTreeOutput'] = 69250936;
var _xmlTreeIndentString = Module['_xmlTreeIndentString'] = 69250940;
var _xmlSaveNoEmptyTags = Module['_xmlSaveNoEmptyTags'] = 69422376;
var _xmlDefaultSAXHandler = Module['_xmlDefaultSAXHandler'] = 69250944;
var _xmlDefaultSAXLocator = Module['_xmlDefaultSAXLocator'] = 69251056;
var _xmlParserMaxDepth = Module['_xmlParserMaxDepth'] = 69251716;
var _xmlStringText = Module['_xmlStringText'] = 68775296;
var _xmlStringComment = Module['_xmlStringComment'] = 68775311;
var _xmlStringTextNoenc = Module['_xmlStringTextNoenc'] = 68775301;
var _xmlXPathNAN = Module['_xmlXPathNAN'] = 69423048;
var _xmlXPathNINF = Module['_xmlXPathNINF'] = 69423064;
var _xmlXPathPINF = Module['_xmlXPathPINF'] = 69423056;
var _z_errmsg = Module['_z_errmsg'] = 69268272;
var __length_code = Module['__length_code'] = 68794960;
var __dist_code = Module['__dist_code'] = 68794448;
var __ZTVSt12bad_any_cast = Module['__ZTVSt12bad_any_cast'] = 69277996;
var __ZTISt12bad_any_cast = Module['__ZTISt12bad_any_cast'] = 69278016;
var __ZTSSt12bad_any_cast = Module['__ZTSSt12bad_any_cast'] = 69100839;
var __ZTINSt12experimental15fundamentals_v112bad_any_castE = Module['__ZTINSt12experimental15fundamentals_v112bad_any_castE'] = 69278028;
var __ZTSNSt12experimental15fundamentals_v112bad_any_castE = Module['__ZTSNSt12experimental15fundamentals_v112bad_any_castE'] = 69100856;
var __ZNSt3__26__itoa16_Charconv_digitsE = Module['__ZNSt3__26__itoa16_Charconv_digitsE'] = 69095824;
var __ZNSt3__26__itoa10__pow10_32E = Module['__ZNSt3__26__itoa10__pow10_32E'] = 68968992;
var __ZNSt3__26__itoa16__digits_base_10E = Module['__ZNSt3__26__itoa16__digits_base_10E'] = 68969040;
var __ZNSt3__225_General_precision_tablesIfE16_Special_X_tableE = Module['__ZNSt3__225_General_precision_tablesIfE16_Special_X_tableE'] = 69095872;
var __ZNSt3__225_General_precision_tablesIfE6_Max_PE = Module['__ZNSt3__225_General_precision_tablesIfE6_Max_PE'] = 69096304;
var __ZNSt3__225_General_precision_tablesIfE17_Ordinary_X_tableE = Module['__ZNSt3__225_General_precision_tablesIfE17_Ordinary_X_tableE'] = 69096128;
var __ZNSt3__225_General_precision_tablesIdE16_Special_X_tableE = Module['__ZNSt3__225_General_precision_tablesIdE16_Special_X_tableE'] = 69096320;
var __ZNSt3__225_General_precision_tablesIdE6_Max_PE = Module['__ZNSt3__225_General_precision_tablesIdE6_Max_PE'] = 69100400;
var __ZNSt3__225_General_precision_tablesIdE17_Ordinary_X_tableE = Module['__ZNSt3__225_General_precision_tablesIdE17_Ordinary_X_tableE'] = 69097888;
var __ZNSt3__214__POW10_OFFSETE = Module['__ZNSt3__214__POW10_OFFSETE'] = 69009136;
var __ZNSt3__213__POW10_SPLITE = Module['__ZNSt3__213__POW10_SPLITE'] = 68979760;
var __ZNSt3__213__MIN_BLOCK_2E = Module['__ZNSt3__213__MIN_BLOCK_2E'] = 69009264;
var __ZNSt3__216__POW10_OFFSET_2E = Module['__ZNSt3__216__POW10_OFFSET_2E'] = 69009344;
var __ZNSt3__215__POW10_SPLIT_2E = Module['__ZNSt3__215__POW10_SPLIT_2E'] = 69009488;
var __ZNSt3__223__DOUBLE_POW5_INV_SPLITE = Module['__ZNSt3__223__DOUBLE_POW5_INV_SPLITE'] = 69085424;
var __ZNSt3__219__DOUBLE_POW5_SPLITE = Module['__ZNSt3__219__DOUBLE_POW5_SPLITE'] = 69090096;
var __ZZNSt3__210__to_charsB8nn180100EPcS0_NS_21__floating_decimal_64ENS_12chars_formatEdE11_Adjustment = Module['__ZZNSt3__210__to_charsB8nn180100EPcS0_NS_21__floating_decimal_64ENS_12chars_formatEdE11_Adjustment'] = 69095312;
var __ZZNSt3__210__to_charsB8nn180100EPcS0_NS_21__floating_decimal_64ENS_12chars_formatEdE21_Max_shifted_mantissa = Module['__ZZNSt3__210__to_charsB8nn180100EPcS0_NS_21__floating_decimal_64ENS_12chars_formatEdE21_Max_shifted_mantissa'] = 69095632;
var __ZTVNSt3__220__shared_ptr_emplaceINS_4__fs10filesystem12__dir_streamENS_9allocatorIS3_EEEE = Module['__ZTVNSt3__220__shared_ptr_emplaceINS_4__fs10filesystem12__dir_streamENS_9allocatorIS3_EEEE'] = 69277916;
var __ZTVNSt3__220__shared_ptr_emplaceINS_4__fs10filesystem28recursive_directory_iterator12__shared_impENS_9allocatorIS4_EEEE = Module['__ZTVNSt3__220__shared_ptr_emplaceINS_4__fs10filesystem28recursive_directory_iterator12__shared_impENS_9allocatorIS4_EEEE'] = 69277956;
var __ZNSt3__26ranges5__cpo9iter_moveE = Module['__ZNSt3__26ranges5__cpo9iter_moveE'] = 69100838;
var __ZTINSt3__220__shared_ptr_emplaceINS_4__fs10filesystem12__dir_streamENS_9allocatorIS3_EEEE = Module['__ZTINSt3__220__shared_ptr_emplaceINS_4__fs10filesystem12__dir_streamENS_9allocatorIS3_EEEE'] = 69277944;
var __ZTSNSt3__220__shared_ptr_emplaceINS_4__fs10filesystem12__dir_streamENS_9allocatorIS3_EEEE = Module['__ZTSNSt3__220__shared_ptr_emplaceINS_4__fs10filesystem12__dir_streamENS_9allocatorIS3_EEEE'] = 69100634;
var __ZTINSt3__220__shared_ptr_emplaceINS_4__fs10filesystem28recursive_directory_iterator12__shared_impENS_9allocatorIS4_EEEE = Module['__ZTINSt3__220__shared_ptr_emplaceINS_4__fs10filesystem28recursive_directory_iterator12__shared_impENS_9allocatorIS4_EEEE'] = 69277984;
var __ZTSNSt3__220__shared_ptr_emplaceINS_4__fs10filesystem28recursive_directory_iterator12__shared_impENS_9allocatorIS4_EEEE = Module['__ZTSNSt3__220__shared_ptr_emplaceINS_4__fs10filesystem28recursive_directory_iterator12__shared_impENS_9allocatorIS4_EEEE'] = 69100721;
var __ZTINSt3__214error_categoryE = Module['__ZTINSt3__214error_categoryE'] = 69270320;
var __ZTSNSt3__214error_categoryE = Module['__ZTSNSt3__214error_categoryE'] = 68969408;
var __ZTVSt16nested_exception = Module['__ZTVSt16nested_exception'] = 69270476;
var __ZTISt16nested_exception = Module['__ZTISt16nested_exception'] = 69270492;
var __ZTSSt16nested_exception = Module['__ZTSSt16nested_exception'] = 68969548;
var __ZZNSt3__210__to_charsB8nn180100EPcS0_NS_21__floating_decimal_32ENS_12chars_formatEjjE11_Adjustment = Module['__ZZNSt3__210__to_charsB8nn180100EPcS0_NS_21__floating_decimal_32ENS_12chars_formatEjjE11_Adjustment'] = 69085328;
var __ZZNSt3__210__to_charsB8nn180100EPcS0_NS_21__floating_decimal_32ENS_12chars_formatEjjE21_Max_shifted_mantissa = Module['__ZZNSt3__210__to_charsB8nn180100EPcS0_NS_21__floating_decimal_32ENS_12chars_formatEjjE21_Max_shifted_mantissa'] = 69085376;
var __ZNSt3__222__FLOAT_POW5_INV_SPLITE = Module['__ZNSt3__222__FLOAT_POW5_INV_SPLITE'] = 69084688;
var __ZNSt3__218__FLOAT_POW5_SPLITE = Module['__ZNSt3__218__FLOAT_POW5_SPLITE'] = 69084944;
var __ZTVNSt3__24__fs10filesystem16filesystem_errorE = Module['__ZTVNSt3__24__fs10filesystem16filesystem_errorE'] = 69278188;
var __ZTINSt3__24__fs10filesystem16filesystem_errorE = Module['__ZTINSt3__24__fs10filesystem16filesystem_errorE'] = 69278208;
var __ZTSNSt3__24__fs10filesystem16filesystem_errorE = Module['__ZTSNSt3__24__fs10filesystem16filesystem_errorE'] = 69101043;
var __ZTVNSt3__217bad_function_callE = Module['__ZTVNSt3__217bad_function_callE'] = 69278156;
var __ZTINSt3__217bad_function_callE = Module['__ZTINSt3__217bad_function_callE'] = 69278176;
var __ZTSNSt3__217bad_function_callE = Module['__ZTSNSt3__217bad_function_callE'] = 69101015;
var __ZTVNSt3__212future_errorE = Module['__ZTVNSt3__212future_errorE'] = 69270648;
var __ZTVNSt3__217__assoc_sub_stateE = Module['__ZTVNSt3__217__assoc_sub_stateE'] = 69270680;
var __ZTVNSt3__223__future_error_categoryE = Module['__ZTVNSt3__223__future_error_categoryE'] = 69270612;
var __ZTINSt3__223__future_error_categoryE = Module['__ZTINSt3__223__future_error_categoryE'] = 69270716;
var __ZTINSt3__212future_errorE = Module['__ZTINSt3__212future_errorE'] = 69270668;
var __ZTSNSt3__212future_errorE = Module['__ZTSNSt3__212future_errorE'] = 68969647;
var __ZTINSt3__217__assoc_sub_stateE = Module['__ZTINSt3__217__assoc_sub_stateE'] = 69270704;
var __ZTSNSt3__217__assoc_sub_stateE = Module['__ZTSNSt3__217__assoc_sub_stateE'] = 68969670;
var __ZTSNSt3__223__future_error_categoryE = Module['__ZTSNSt3__223__future_error_categoryE'] = 68969698;
var __ZTVNSt3__215basic_streambufIcNS_11char_traitsIcEEEE = Module['__ZTVNSt3__215basic_streambufIcNS_11char_traitsIcEEEE'] = 69275544;
var __ZTTNSt3__213basic_istreamIcNS_11char_traitsIcEEEE = Module['__ZTTNSt3__213basic_istreamIcNS_11char_traitsIcEEEE'] = 69275648;
var __ZTTNSt3__213basic_ostreamIcNS_11char_traitsIcEEEE = Module['__ZTTNSt3__213basic_ostreamIcNS_11char_traitsIcEEEE'] = 69275696;
var __ZTTNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE = Module['__ZTTNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE'] = 69275764;
var __ZTVNSt3__215basic_streambufIwNS_11char_traitsIwEEEE = Module['__ZTVNSt3__215basic_streambufIwNS_11char_traitsIwEEEE'] = 69275792;
var __ZTTNSt3__213basic_istreamIwNS_11char_traitsIwEEEE = Module['__ZTTNSt3__213basic_istreamIwNS_11char_traitsIwEEEE'] = 69275896;
var __ZTTNSt3__213basic_ostreamIwNS_11char_traitsIwEEEE = Module['__ZTTNSt3__213basic_ostreamIwNS_11char_traitsIwEEEE'] = 69275944;
var __ZTVNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTVNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69275952;
var __ZTVNSt3__213basic_filebufIcNS_11char_traitsIcEEEE = Module['__ZTVNSt3__213basic_filebufIcNS_11char_traitsIcEEEE'] = 69276016;
var __ZTTNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTTNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276432;
var __ZTTNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTTNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276664;
var __ZTTNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTTNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276772;
var __ZTTNSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE = Module['__ZTTNSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE'] = 69276880;
var __ZTTNSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE = Module['__ZTTNSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE'] = 69276988;
var __ZTINSt3__215basic_streambufIcNS_11char_traitsIcEEEE = Module['__ZTINSt3__215basic_streambufIcNS_11char_traitsIcEEEE'] = 69276108;
var __ZTVNSt3__213basic_istreamIcNS_11char_traitsIcEEEE = Module['__ZTVNSt3__213basic_istreamIcNS_11char_traitsIcEEEE'] = 69275608;
var __ZTINSt3__213basic_istreamIcNS_11char_traitsIcEEEE = Module['__ZTINSt3__213basic_istreamIcNS_11char_traitsIcEEEE'] = 69276116;
var __ZTVNSt3__213basic_ostreamIcNS_11char_traitsIcEEEE = Module['__ZTVNSt3__213basic_ostreamIcNS_11char_traitsIcEEEE'] = 69275656;
var __ZTINSt3__213basic_ostreamIcNS_11char_traitsIcEEEE = Module['__ZTINSt3__213basic_ostreamIcNS_11char_traitsIcEEEE'] = 69276140;
var __ZTVNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE = Module['__ZTVNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE'] = 69275704;
var __ZTINSt3__214basic_iostreamIcNS_11char_traitsIcEEEE = Module['__ZTINSt3__214basic_iostreamIcNS_11char_traitsIcEEEE'] = 69276244;
var __ZTCNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE0_NS_13basic_istreamIcS2_EE = Module['__ZTCNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE0_NS_13basic_istreamIcS2_EE'] = 69276164;
var __ZTCNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE8_NS_13basic_ostreamIcS2_EE = Module['__ZTCNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE8_NS_13basic_ostreamIcS2_EE'] = 69276204;
var __ZTINSt3__215basic_streambufIwNS_11char_traitsIwEEEE = Module['__ZTINSt3__215basic_streambufIwNS_11char_traitsIwEEEE'] = 69276304;
var __ZTVNSt3__213basic_istreamIwNS_11char_traitsIwEEEE = Module['__ZTVNSt3__213basic_istreamIwNS_11char_traitsIwEEEE'] = 69275856;
var __ZTINSt3__213basic_istreamIwNS_11char_traitsIwEEEE = Module['__ZTINSt3__213basic_istreamIwNS_11char_traitsIwEEEE'] = 69276312;
var __ZTVNSt3__213basic_ostreamIwNS_11char_traitsIwEEEE = Module['__ZTVNSt3__213basic_ostreamIwNS_11char_traitsIwEEEE'] = 69275904;
var __ZTINSt3__213basic_ostreamIwNS_11char_traitsIwEEEE = Module['__ZTINSt3__213basic_ostreamIwNS_11char_traitsIwEEEE'] = 69276336;
var __ZTINSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTINSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276360;
var __ZTINSt3__213basic_filebufIcNS_11char_traitsIcEEEE = Module['__ZTINSt3__213basic_filebufIcNS_11char_traitsIcEEEE'] = 69277056;
var __ZTVNSt3__29basic_iosIcNS_11char_traitsIcEEEE = Module['__ZTVNSt3__29basic_iosIcNS_11char_traitsIcEEEE'] = 69276080;
var __ZTINSt3__29basic_iosIcNS_11char_traitsIcEEEE = Module['__ZTINSt3__29basic_iosIcNS_11char_traitsIcEEEE'] = 69276096;
var __ZTSNSt3__29basic_iosIcNS_11char_traitsIcEEEE = Module['__ZTSNSt3__29basic_iosIcNS_11char_traitsIcEEEE'] = 68978920;
var __ZTSNSt3__215basic_streambufIcNS_11char_traitsIcEEEE = Module['__ZTSNSt3__215basic_streambufIcNS_11char_traitsIcEEEE'] = 68978962;
var __ZTSNSt3__213basic_istreamIcNS_11char_traitsIcEEEE = Module['__ZTSNSt3__213basic_istreamIcNS_11char_traitsIcEEEE'] = 68979011;
var __ZTSNSt3__213basic_ostreamIcNS_11char_traitsIcEEEE = Module['__ZTSNSt3__213basic_ostreamIcNS_11char_traitsIcEEEE'] = 68979058;
var __ZTSNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE = Module['__ZTSNSt3__214basic_iostreamIcNS_11char_traitsIcEEEE'] = 68979105;
var __ZTVNSt3__29basic_iosIwNS_11char_traitsIwEEEE = Module['__ZTVNSt3__29basic_iosIwNS_11char_traitsIwEEEE'] = 69276276;
var __ZTINSt3__29basic_iosIwNS_11char_traitsIwEEEE = Module['__ZTINSt3__29basic_iosIwNS_11char_traitsIwEEEE'] = 69276292;
var __ZTSNSt3__29basic_iosIwNS_11char_traitsIwEEEE = Module['__ZTSNSt3__29basic_iosIwNS_11char_traitsIwEEEE'] = 68979153;
var __ZTSNSt3__215basic_streambufIwNS_11char_traitsIwEEEE = Module['__ZTSNSt3__215basic_streambufIwNS_11char_traitsIwEEEE'] = 68979195;
var __ZTSNSt3__213basic_istreamIwNS_11char_traitsIwEEEE = Module['__ZTSNSt3__213basic_istreamIwNS_11char_traitsIwEEEE'] = 68979244;
var __ZTSNSt3__213basic_ostreamIwNS_11char_traitsIwEEEE = Module['__ZTSNSt3__213basic_ostreamIwNS_11char_traitsIwEEEE'] = 68979291;
var __ZTSNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTSNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 68979338;
var __ZTVNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTVNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276372;
var __ZTINSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTINSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276612;
var __ZTCNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE0_NS_14basic_iostreamIcS2_EE = Module['__ZTCNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE0_NS_14basic_iostreamIcS2_EE'] = 69276472;
var __ZTCNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE0_NS_13basic_istreamIcS2_EE = Module['__ZTCNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE0_NS_13basic_istreamIcS2_EE'] = 69276532;
var __ZTCNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE8_NS_13basic_ostreamIcS2_EE = Module['__ZTCNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE8_NS_13basic_ostreamIcS2_EE'] = 69276572;
var __ZTSNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTSNSt3__218basic_stringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 68979404;
var __ZTVNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTVNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276624;
var __ZTINSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTINSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276720;
var __ZTCNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE0_NS_13basic_ostreamIcS2_EE = Module['__ZTCNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE0_NS_13basic_ostreamIcS2_EE'] = 69276680;
var __ZTSNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTSNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 68979473;
var __ZTVNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTVNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276732;
var __ZTINSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTINSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 69276828;
var __ZTCNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE0_NS_13basic_istreamIcS2_EE = Module['__ZTCNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE0_NS_13basic_istreamIcS2_EE'] = 69276788;
var __ZTSNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = Module['__ZTSNSt3__219basic_istringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE'] = 68979543;
var __ZTVNSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE = Module['__ZTVNSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE'] = 69276840;
var __ZTINSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE = Module['__ZTINSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE'] = 69276936;
var __ZTCNSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE0_NS_13basic_istreamIcS2_EE = Module['__ZTCNSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE0_NS_13basic_istreamIcS2_EE'] = 69276896;
var __ZTSNSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE = Module['__ZTSNSt3__214basic_ifstreamIcNS_11char_traitsIcEEEE'] = 68979613;
var __ZTVNSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE = Module['__ZTVNSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE'] = 69276948;
var __ZTINSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE = Module['__ZTINSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE'] = 69277044;
var __ZTCNSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE0_NS_13basic_ostreamIcS2_EE = Module['__ZTCNSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE0_NS_13basic_ostreamIcS2_EE'] = 69277004;
var __ZTSNSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE = Module['__ZTSNSt3__214basic_ofstreamIcNS_11char_traitsIcEEEE'] = 68979661;
var __ZTSNSt3__213basic_filebufIcNS_11char_traitsIcEEEE = Module['__ZTSNSt3__213basic_filebufIcNS_11char_traitsIcEEEE'] = 68979709;
var __ZTVNSt3__28ios_base7failureE = Module['__ZTVNSt3__28ios_base7failureE'] = 69275476;
var __ZNSt3__28ios_base9__xindex_E = Module['__ZNSt3__28ios_base9__xindex_E'] = 69438396;
var __ZTVNSt3__28ios_baseE = Module['__ZTVNSt3__28ios_baseE'] = 69275496;
var __ZTVNSt3__219__iostream_categoryE = Module['__ZTVNSt3__219__iostream_categoryE'] = 69275440;
var __ZTINSt3__219__iostream_categoryE = Module['__ZTINSt3__219__iostream_categoryE'] = 69275520;
var __ZTINSt3__28ios_base7failureE = Module['__ZTINSt3__28ios_base7failureE'] = 69275532;
var __ZTINSt3__28ios_baseE = Module['__ZTINSt3__28ios_baseE'] = 69275512;
var __ZTSNSt3__28ios_baseE = Module['__ZTSNSt3__28ios_baseE'] = 68978846;
var __ZTSNSt3__219__iostream_categoryE = Module['__ZTSNSt3__219__iostream_categoryE'] = 68978864;
var __ZTSNSt3__28ios_base7failureE = Module['__ZTSNSt3__28ios_base7failureE'] = 68978894;
var __ZNSt3__219__start_std_streamsE = Module['__ZNSt3__219__start_std_streamsE'] = 69439080;
var __ZNSt3__23cinE = Module['__ZNSt3__23cinE'] = 69438400;
var __ZNSt3__24coutE = Module['__ZNSt3__24coutE'] = 69438576;
var __ZNSt3__24cerrE = Module['__ZNSt3__24cerrE'] = 69438744;
var __ZNSt3__24clogE = Module['__ZNSt3__24clogE'] = 69438912;
var __ZNSt3__24wcinE = Module['__ZNSt3__24wcinE'] = 69438488;
var __ZNSt3__25wcoutE = Module['__ZNSt3__25wcoutE'] = 69438660;
var __ZNSt3__25wcerrE = Module['__ZNSt3__25wcerrE'] = 69438828;
var __ZNSt3__25wclogE = Module['__ZNSt3__25wclogE'] = 69438996;
var __ZTVNSt3__210__stdinbufIcEE = Module['__ZTVNSt3__210__stdinbufIcEE'] = 69277612;
var __ZTVNSt3__211__stdoutbufIcEE = Module['__ZTVNSt3__211__stdoutbufIcEE'] = 69277688;
var __ZTVNSt3__210__stdinbufIwEE = Module['__ZTVNSt3__210__stdinbufIwEE'] = 69277764;
var __ZTVNSt3__211__stdoutbufIwEE = Module['__ZTVNSt3__211__stdoutbufIwEE'] = 69277840;
var __ZTINSt3__210__stdinbufIcEE = Module['__ZTINSt3__210__stdinbufIcEE'] = 69277676;
var __ZTSNSt3__210__stdinbufIcEE = Module['__ZTSNSt3__210__stdinbufIcEE'] = 69100488;
var __ZTINSt3__211__stdoutbufIcEE = Module['__ZTINSt3__211__stdoutbufIcEE'] = 69277752;
var __ZTSNSt3__211__stdoutbufIcEE = Module['__ZTSNSt3__211__stdoutbufIcEE'] = 69100512;
var __ZTINSt3__210__stdinbufIwEE = Module['__ZTINSt3__210__stdinbufIwEE'] = 69277828;
var __ZTSNSt3__210__stdinbufIwEE = Module['__ZTSNSt3__210__stdinbufIwEE'] = 69100537;
var __ZTINSt3__211__stdoutbufIwEE = Module['__ZTINSt3__211__stdoutbufIwEE'] = 69277904;
var __ZTSNSt3__211__stdoutbufIwEE = Module['__ZTSNSt3__211__stdoutbufIwEE'] = 69100561;
var __ZNSt3__25ctypeIcE2idE = Module['__ZNSt3__25ctypeIcE2idE'] = 69436848;
var __ZNSt3__28numpunctIcE2idE = Module['__ZNSt3__28numpunctIcE2idE'] = 69436904;
var __ZNSt3__214__num_get_base5__srcE = Module['__ZNSt3__214__num_get_base5__srcE'] = 68973056;
var __ZNSt3__25ctypeIwE2idE = Module['__ZNSt3__25ctypeIwE2idE'] = 69436840;
var __ZNSt3__28numpunctIwE2idE = Module['__ZNSt3__28numpunctIwE2idE'] = 69436912;
var __ZNSt3__210moneypunctIcLb1EE2idE = Module['__ZNSt3__210moneypunctIcLb1EE2idE'] = 69436584;
var __ZNSt3__210moneypunctIcLb0EE2idE = Module['__ZNSt3__210moneypunctIcLb0EE2idE'] = 69436576;
var __ZNSt3__210moneypunctIwLb1EE2idE = Module['__ZNSt3__210moneypunctIwLb1EE2idE'] = 69436600;
var __ZNSt3__210moneypunctIwLb0EE2idE = Module['__ZNSt3__210moneypunctIwLb0EE2idE'] = 69436592;
var __ZTVNSt3__26locale5__impE = Module['__ZTVNSt3__26locale5__impE'] = 69270992;
var __ZTVNSt3__26locale5facetE = Module['__ZTVNSt3__26locale5facetE'] = 69271480;
var __ZNSt3__27collateIcE2idE = Module['__ZNSt3__27collateIcE2idE'] = 69436496;
var __ZNSt3__27collateIwE2idE = Module['__ZNSt3__27collateIwE2idE'] = 69436504;
var __ZNSt3__27codecvtIcc11__mbstate_tE2idE = Module['__ZNSt3__27codecvtIcc11__mbstate_tE2idE'] = 69436856;
var __ZNSt3__27codecvtIwc11__mbstate_tE2idE = Module['__ZNSt3__27codecvtIwc11__mbstate_tE2idE'] = 69436864;
var __ZNSt3__27codecvtIDsc11__mbstate_tE2idE = Module['__ZNSt3__27codecvtIDsc11__mbstate_tE2idE'] = 69436872;
var __ZNSt3__27codecvtIDic11__mbstate_tE2idE = Module['__ZNSt3__27codecvtIDic11__mbstate_tE2idE'] = 69436888;
var __ZNSt3__27codecvtIDsDu11__mbstate_tE2idE = Module['__ZNSt3__27codecvtIDsDu11__mbstate_tE2idE'] = 69436880;
var __ZNSt3__27codecvtIDiDu11__mbstate_tE2idE = Module['__ZNSt3__27codecvtIDiDu11__mbstate_tE2idE'] = 69436896;
var __ZNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE = Module['__ZNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE'] = 69436512;
var __ZNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE = Module['__ZNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE'] = 69436520;
var __ZNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE = Module['__ZNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE'] = 69436528;
var __ZNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE = Module['__ZNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE'] = 69436536;
var __ZNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE = Module['__ZNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE'] = 69436608;
var __ZNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE = Module['__ZNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE'] = 69436616;
var __ZNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE = Module['__ZNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE'] = 69436624;
var __ZNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE = Module['__ZNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE'] = 69436632;
var __ZNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE = Module['__ZNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE'] = 69436544;
var __ZNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE = Module['__ZNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE'] = 69436552;
var __ZNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE = Module['__ZNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEE2idE'] = 69436560;
var __ZNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE = Module['__ZNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEE2idE'] = 69436568;
var __ZNSt3__28messagesIcE2idE = Module['__ZNSt3__28messagesIcE2idE'] = 69436640;
var __ZNSt3__28messagesIwE2idE = Module['__ZNSt3__28messagesIwE2idE'] = 69436648;
var __ZTVNSt3__214codecvt_bynameIcc11__mbstate_tEE = Module['__ZTVNSt3__214codecvt_bynameIcc11__mbstate_tEE'] = 69274864;
var __ZTVNSt3__214codecvt_bynameIwc11__mbstate_tEE = Module['__ZTVNSt3__214codecvt_bynameIwc11__mbstate_tEE'] = 69274924;
var __ZTVNSt3__214codecvt_bynameIDsc11__mbstate_tEE = Module['__ZTVNSt3__214codecvt_bynameIDsc11__mbstate_tEE'] = 69274984;
var __ZTVNSt3__214codecvt_bynameIDic11__mbstate_tEE = Module['__ZTVNSt3__214codecvt_bynameIDic11__mbstate_tEE'] = 69275044;
var __ZTVNSt3__214codecvt_bynameIDsDu11__mbstate_tEE = Module['__ZTVNSt3__214codecvt_bynameIDsDu11__mbstate_tEE'] = 69275104;
var __ZTVNSt3__214codecvt_bynameIDiDu11__mbstate_tEE = Module['__ZTVNSt3__214codecvt_bynameIDiDu11__mbstate_tEE'] = 69275164;
var __ZTVNSt3__217moneypunct_bynameIcLb0EEE = Module['__ZTVNSt3__217moneypunct_bynameIcLb0EEE'] = 69274096;
var __ZTVNSt3__217moneypunct_bynameIcLb1EEE = Module['__ZTVNSt3__217moneypunct_bynameIcLb1EEE'] = 69274164;
var __ZTVNSt3__217moneypunct_bynameIwLb0EEE = Module['__ZTVNSt3__217moneypunct_bynameIwLb0EEE'] = 69274232;
var __ZTVNSt3__217moneypunct_bynameIwLb1EEE = Module['__ZTVNSt3__217moneypunct_bynameIwLb1EEE'] = 69274300;
var __ZTVNSt3__215time_get_bynameIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTVNSt3__215time_get_bynameIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69273224;
var __ZTVNSt3__215time_get_bynameIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTVNSt3__215time_get_bynameIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69273388;
var __ZTVNSt3__215time_put_bynameIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTVNSt3__215time_put_bynameIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69273664;
var __ZTVNSt3__215time_put_bynameIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTVNSt3__215time_put_bynameIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69273700;
var __ZTVNSt3__215messages_bynameIcEE = Module['__ZTVNSt3__215messages_bynameIcEE'] = 69274776;
var __ZTVNSt3__215messages_bynameIwEE = Module['__ZTVNSt3__215messages_bynameIwEE'] = 69274820;
var __ZNSt3__26locale5__imp19classic_locale_imp_E = Module['__ZNSt3__26locale5__imp19classic_locale_imp_E'] = 69436664;
var __ZTVNSt3__214collate_bynameIcEE = Module['__ZTVNSt3__214collate_bynameIcEE'] = 69271012;
var __ZTVNSt3__214collate_bynameIwEE = Module['__ZTVNSt3__214collate_bynameIwEE'] = 69271044;
var __ZTVNSt3__25ctypeIcEE = Module['__ZTVNSt3__25ctypeIcEE'] = 69271076;
var __ZTVNSt3__212ctype_bynameIcEE = Module['__ZTVNSt3__212ctype_bynameIcEE'] = 69271128;
var __ZTVNSt3__212ctype_bynameIwEE = Module['__ZTVNSt3__212ctype_bynameIwEE'] = 69271180;
var __ZTVNSt3__27codecvtIwc11__mbstate_tEE = Module['__ZTVNSt3__27codecvtIwc11__mbstate_tEE'] = 69271248;
var __ZTVNSt3__28numpunctIcEE = Module['__ZTVNSt3__28numpunctIcEE'] = 69271296;
var __ZTVNSt3__28numpunctIwEE = Module['__ZTVNSt3__28numpunctIwEE'] = 69271336;
var __ZTVNSt3__215numpunct_bynameIcEE = Module['__ZTVNSt3__215numpunct_bynameIcEE'] = 69271376;
var __ZTVNSt3__215numpunct_bynameIwEE = Module['__ZTVNSt3__215numpunct_bynameIwEE'] = 69271416;
var __ZTVNSt3__215__time_get_tempIcEE = Module['__ZTVNSt3__215__time_get_tempIcEE'] = 69275296;
var __ZTVNSt3__215__time_get_tempIwEE = Module['__ZTVNSt3__215__time_get_tempIwEE'] = 69275360;
var __ZTVNSt3__27collateIcEE = Module['__ZTVNSt3__27collateIcEE'] = 69272416;
var __ZTVNSt3__27collateIwEE = Module['__ZTVNSt3__27collateIwEE'] = 69272448;
var __ZTVNSt3__25ctypeIwEE = Module['__ZTVNSt3__25ctypeIwEE'] = 69271512;
var __ZTVNSt3__27codecvtIcc11__mbstate_tEE = Module['__ZTVNSt3__27codecvtIcc11__mbstate_tEE'] = 69271620;
var __ZTVNSt3__27codecvtIDsc11__mbstate_tEE = Module['__ZTVNSt3__27codecvtIDsc11__mbstate_tEE'] = 69271708;
var __ZTVNSt3__27codecvtIDic11__mbstate_tEE = Module['__ZTVNSt3__27codecvtIDic11__mbstate_tEE'] = 69271868;
var __ZTVNSt3__27codecvtIDsDu11__mbstate_tEE = Module['__ZTVNSt3__27codecvtIDsDu11__mbstate_tEE'] = 69271788;
var __ZTVNSt3__27codecvtIDiDu11__mbstate_tEE = Module['__ZTVNSt3__27codecvtIDiDu11__mbstate_tEE'] = 69271948;
var __ZTVNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTVNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69272480;
var __ZTVNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTVNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69272608;
var __ZTVNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTVNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69272728;
var __ZTVNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTVNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69272844;
var __ZTVNSt3__210moneypunctIcLb0EEE = Module['__ZTVNSt3__210moneypunctIcLb0EEE'] = 69273736;
var __ZTVNSt3__210moneypunctIcLb1EEE = Module['__ZTVNSt3__210moneypunctIcLb1EEE'] = 69273832;
var __ZTVNSt3__210moneypunctIwLb0EEE = Module['__ZTVNSt3__210moneypunctIwLb0EEE'] = 69273920;
var __ZTVNSt3__210moneypunctIwLb1EEE = Module['__ZTVNSt3__210moneypunctIwLb1EEE'] = 69274008;
var __ZTVNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTVNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69274368;
var __ZTVNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTVNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69274436;
var __ZTVNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTVNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69274504;
var __ZTVNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTVNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69274572;
var __ZTVNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTVNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69272952;
var __ZTVNSt3__220__time_get_c_storageIcEE = Module['__ZTVNSt3__220__time_get_c_storageIcEE'] = 69275224;
var __ZTVNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTVNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69273092;
var __ZTVNSt3__220__time_get_c_storageIwEE = Module['__ZTVNSt3__220__time_get_c_storageIwEE'] = 69275260;
var __ZTVNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTVNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69273544;
var __ZTVNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTVNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69273608;
var __ZTVNSt3__28messagesIcEE = Module['__ZTVNSt3__28messagesIcEE'] = 69274640;
var __ZTVNSt3__28messagesIwEE = Module['__ZTVNSt3__28messagesIwEE'] = 69274712;
var __ZNSt3__26locale2id9__next_idE = Module['__ZNSt3__26locale2id9__next_idE'] = 69436836;
var __ZTINSt3__26locale5__impE = Module['__ZTINSt3__26locale5__impE'] = 69272252;
var __ZTINSt3__214collate_bynameIcEE = Module['__ZTINSt3__214collate_bynameIcEE'] = 69272276;
var __ZTINSt3__214collate_bynameIwEE = Module['__ZTINSt3__214collate_bynameIwEE'] = 69272300;
var __ZTINSt3__25ctypeIcEE = Module['__ZTINSt3__25ctypeIcEE'] = 69272312;
var __ZTINSt3__212ctype_bynameIcEE = Module['__ZTINSt3__212ctype_bynameIcEE'] = 69272344;
var __ZTINSt3__212ctype_bynameIwEE = Module['__ZTINSt3__212ctype_bynameIwEE'] = 69272356;
var __ZTINSt3__27codecvtIwc11__mbstate_tEE = Module['__ZTINSt3__27codecvtIwc11__mbstate_tEE'] = 69272076;
var __ZTINSt3__28numpunctIcEE = Module['__ZTINSt3__28numpunctIcEE'] = 69272368;
var __ZTINSt3__28numpunctIwEE = Module['__ZTINSt3__28numpunctIwEE'] = 69272380;
var __ZTINSt3__215numpunct_bynameIcEE = Module['__ZTINSt3__215numpunct_bynameIcEE'] = 69272392;
var __ZTINSt3__215numpunct_bynameIwEE = Module['__ZTINSt3__215numpunct_bynameIwEE'] = 69272404;
var __ZTINSt3__26locale5facetE = Module['__ZTINSt3__26locale5facetE'] = 69271500;
var __ZTSNSt3__26locale5facetE = Module['__ZTSNSt3__26locale5facetE'] = 68974568;
var __ZTINSt3__25ctypeIwEE = Module['__ZTINSt3__25ctypeIwEE'] = 69271588;
var __ZTSNSt3__25ctypeIwEE = Module['__ZTSNSt3__25ctypeIwEE'] = 68974590;
var __ZTSNSt3__210ctype_baseE = Module['__ZTSNSt3__210ctype_baseE'] = 68974608;
var __ZTINSt3__210ctype_baseE = Module['__ZTINSt3__210ctype_baseE'] = 69271580;
var __ZTINSt3__27codecvtIcc11__mbstate_tEE = Module['__ZTINSt3__27codecvtIcc11__mbstate_tEE'] = 69271676;
var __ZTSNSt3__27codecvtIcc11__mbstate_tEE = Module['__ZTSNSt3__27codecvtIcc11__mbstate_tEE'] = 68974629;
var __ZTSNSt3__212codecvt_baseE = Module['__ZTSNSt3__212codecvt_baseE'] = 68974663;
var __ZTINSt3__212codecvt_baseE = Module['__ZTINSt3__212codecvt_baseE'] = 69271668;
var __ZTINSt3__27codecvtIDsc11__mbstate_tEE = Module['__ZTINSt3__27codecvtIDsc11__mbstate_tEE'] = 69271756;
var __ZTSNSt3__27codecvtIDsc11__mbstate_tEE = Module['__ZTSNSt3__27codecvtIDsc11__mbstate_tEE'] = 68974686;
var __ZTINSt3__27codecvtIDsDu11__mbstate_tEE = Module['__ZTINSt3__27codecvtIDsDu11__mbstate_tEE'] = 69271836;
var __ZTSNSt3__27codecvtIDsDu11__mbstate_tEE = Module['__ZTSNSt3__27codecvtIDsDu11__mbstate_tEE'] = 68974721;
var __ZTINSt3__27codecvtIDic11__mbstate_tEE = Module['__ZTINSt3__27codecvtIDic11__mbstate_tEE'] = 69271916;
var __ZTSNSt3__27codecvtIDic11__mbstate_tEE = Module['__ZTSNSt3__27codecvtIDic11__mbstate_tEE'] = 68974757;
var __ZTINSt3__27codecvtIDiDu11__mbstate_tEE = Module['__ZTINSt3__27codecvtIDiDu11__mbstate_tEE'] = 69271996;
var __ZTSNSt3__27codecvtIDiDu11__mbstate_tEE = Module['__ZTSNSt3__27codecvtIDiDu11__mbstate_tEE'] = 68974792;
var __ZTINSt3__216__narrow_to_utf8ILm16EEE = Module['__ZTINSt3__216__narrow_to_utf8ILm16EEE'] = 69272028;
var __ZTSNSt3__216__narrow_to_utf8ILm16EEE = Module['__ZTSNSt3__216__narrow_to_utf8ILm16EEE'] = 68974828;
var __ZTINSt3__216__narrow_to_utf8ILm32EEE = Module['__ZTINSt3__216__narrow_to_utf8ILm32EEE'] = 69272040;
var __ZTSNSt3__216__narrow_to_utf8ILm32EEE = Module['__ZTSNSt3__216__narrow_to_utf8ILm32EEE'] = 68974862;
var __ZTINSt3__217__widen_from_utf8ILm16EEE = Module['__ZTINSt3__217__widen_from_utf8ILm16EEE'] = 69272052;
var __ZTSNSt3__217__widen_from_utf8ILm16EEE = Module['__ZTSNSt3__217__widen_from_utf8ILm16EEE'] = 68974896;
var __ZTINSt3__217__widen_from_utf8ILm32EEE = Module['__ZTINSt3__217__widen_from_utf8ILm32EEE'] = 69272064;
var __ZTSNSt3__217__widen_from_utf8ILm32EEE = Module['__ZTSNSt3__217__widen_from_utf8ILm32EEE'] = 68974931;
var __ZTINSt3__214__codecvt_utf8IwEE = Module['__ZTINSt3__214__codecvt_utf8IwEE'] = 69272108;
var __ZTSNSt3__214__codecvt_utf8IwEE = Module['__ZTSNSt3__214__codecvt_utf8IwEE'] = 68974966;
var __ZTSNSt3__27codecvtIwc11__mbstate_tEE = Module['__ZTSNSt3__27codecvtIwc11__mbstate_tEE'] = 68974994;
var __ZTINSt3__214__codecvt_utf8IDsEE = Module['__ZTINSt3__214__codecvt_utf8IDsEE'] = 69272120;
var __ZTSNSt3__214__codecvt_utf8IDsEE = Module['__ZTSNSt3__214__codecvt_utf8IDsEE'] = 68975028;
var __ZTINSt3__214__codecvt_utf8IDiEE = Module['__ZTINSt3__214__codecvt_utf8IDiEE'] = 69272132;
var __ZTSNSt3__214__codecvt_utf8IDiEE = Module['__ZTSNSt3__214__codecvt_utf8IDiEE'] = 68975057;
var __ZTINSt3__215__codecvt_utf16IwLb0EEE = Module['__ZTINSt3__215__codecvt_utf16IwLb0EEE'] = 69272144;
var __ZTSNSt3__215__codecvt_utf16IwLb0EEE = Module['__ZTSNSt3__215__codecvt_utf16IwLb0EEE'] = 68975086;
var __ZTINSt3__215__codecvt_utf16IwLb1EEE = Module['__ZTINSt3__215__codecvt_utf16IwLb1EEE'] = 69272156;
var __ZTSNSt3__215__codecvt_utf16IwLb1EEE = Module['__ZTSNSt3__215__codecvt_utf16IwLb1EEE'] = 68975119;
var __ZTINSt3__215__codecvt_utf16IDsLb0EEE = Module['__ZTINSt3__215__codecvt_utf16IDsLb0EEE'] = 69272168;
var __ZTSNSt3__215__codecvt_utf16IDsLb0EEE = Module['__ZTSNSt3__215__codecvt_utf16IDsLb0EEE'] = 68975152;
var __ZTINSt3__215__codecvt_utf16IDsLb1EEE = Module['__ZTINSt3__215__codecvt_utf16IDsLb1EEE'] = 69272180;
var __ZTSNSt3__215__codecvt_utf16IDsLb1EEE = Module['__ZTSNSt3__215__codecvt_utf16IDsLb1EEE'] = 68975186;
var __ZTINSt3__215__codecvt_utf16IDiLb0EEE = Module['__ZTINSt3__215__codecvt_utf16IDiLb0EEE'] = 69272192;
var __ZTSNSt3__215__codecvt_utf16IDiLb0EEE = Module['__ZTSNSt3__215__codecvt_utf16IDiLb0EEE'] = 68975220;
var __ZTINSt3__215__codecvt_utf16IDiLb1EEE = Module['__ZTINSt3__215__codecvt_utf16IDiLb1EEE'] = 69272204;
var __ZTSNSt3__215__codecvt_utf16IDiLb1EEE = Module['__ZTSNSt3__215__codecvt_utf16IDiLb1EEE'] = 68975254;
var __ZTINSt3__220__codecvt_utf8_utf16IwEE = Module['__ZTINSt3__220__codecvt_utf8_utf16IwEE'] = 69272216;
var __ZTSNSt3__220__codecvt_utf8_utf16IwEE = Module['__ZTSNSt3__220__codecvt_utf8_utf16IwEE'] = 68975288;
var __ZTINSt3__220__codecvt_utf8_utf16IDiEE = Module['__ZTINSt3__220__codecvt_utf8_utf16IDiEE'] = 69272228;
var __ZTSNSt3__220__codecvt_utf8_utf16IDiEE = Module['__ZTSNSt3__220__codecvt_utf8_utf16IDiEE'] = 68975322;
var __ZTINSt3__220__codecvt_utf8_utf16IDsEE = Module['__ZTINSt3__220__codecvt_utf8_utf16IDsEE'] = 69272240;
var __ZTSNSt3__220__codecvt_utf8_utf16IDsEE = Module['__ZTSNSt3__220__codecvt_utf8_utf16IDsEE'] = 68975357;
var __ZTSNSt3__26locale5__impE = Module['__ZTSNSt3__26locale5__impE'] = 68975392;
var __ZTSNSt3__214collate_bynameIcEE = Module['__ZTSNSt3__214collate_bynameIcEE'] = 68975414;
var __ZTSNSt3__27collateIcEE = Module['__ZTSNSt3__27collateIcEE'] = 68975442;
var __ZTINSt3__27collateIcEE = Module['__ZTINSt3__27collateIcEE'] = 69272264;
var __ZTSNSt3__214collate_bynameIwEE = Module['__ZTSNSt3__214collate_bynameIwEE'] = 68975462;
var __ZTSNSt3__27collateIwEE = Module['__ZTSNSt3__27collateIwEE'] = 68975490;
var __ZTINSt3__27collateIwEE = Module['__ZTINSt3__27collateIwEE'] = 69272288;
var __ZTSNSt3__25ctypeIcEE = Module['__ZTSNSt3__25ctypeIcEE'] = 68975510;
var __ZTSNSt3__212ctype_bynameIcEE = Module['__ZTSNSt3__212ctype_bynameIcEE'] = 68975528;
var __ZTSNSt3__212ctype_bynameIwEE = Module['__ZTSNSt3__212ctype_bynameIwEE'] = 68975554;
var __ZTSNSt3__28numpunctIcEE = Module['__ZTSNSt3__28numpunctIcEE'] = 68975580;
var __ZTSNSt3__28numpunctIwEE = Module['__ZTSNSt3__28numpunctIwEE'] = 68975601;
var __ZTSNSt3__215numpunct_bynameIcEE = Module['__ZTSNSt3__215numpunct_bynameIcEE'] = 68975622;
var __ZTSNSt3__215numpunct_bynameIwEE = Module['__ZTSNSt3__215numpunct_bynameIwEE'] = 68975651;
var __ZTINSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTINSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69272576;
var __ZTSNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTSNSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 68975680;
var __ZTSNSt3__29__num_getIcEE = Module['__ZTSNSt3__29__num_getIcEE'] = 68975748;
var __ZTSNSt3__214__num_get_baseE = Module['__ZTSNSt3__214__num_get_baseE'] = 68975770;
var __ZTINSt3__214__num_get_baseE = Module['__ZTINSt3__214__num_get_baseE'] = 69272544;
var __ZTINSt3__29__num_getIcEE = Module['__ZTINSt3__29__num_getIcEE'] = 69272552;
var __ZTINSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTINSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69272696;
var __ZTSNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTSNSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 68975795;
var __ZTSNSt3__29__num_getIwEE = Module['__ZTSNSt3__29__num_getIwEE'] = 68975863;
var __ZTINSt3__29__num_getIwEE = Module['__ZTINSt3__29__num_getIwEE'] = 69272672;
var __ZTINSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTINSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69272812;
var __ZTSNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTSNSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 68975885;
var __ZTSNSt3__29__num_putIcEE = Module['__ZTSNSt3__29__num_putIcEE'] = 68975953;
var __ZTSNSt3__214__num_put_baseE = Module['__ZTSNSt3__214__num_put_baseE'] = 68975975;
var __ZTINSt3__214__num_put_baseE = Module['__ZTINSt3__214__num_put_baseE'] = 69272780;
var __ZTINSt3__29__num_putIcEE = Module['__ZTINSt3__29__num_putIcEE'] = 69272788;
var __ZTINSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTINSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69272920;
var __ZTSNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTSNSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 68976000;
var __ZTSNSt3__29__num_putIwEE = Module['__ZTSNSt3__29__num_putIwEE'] = 68976068;
var __ZTINSt3__29__num_putIwEE = Module['__ZTINSt3__29__num_putIwEE'] = 69272896;
var __ZTINSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTINSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69273052;
var __ZTSNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTSNSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 68976090;
var __ZTSNSt3__29time_baseE = Module['__ZTSNSt3__29time_baseE'] = 68976159;
var __ZTINSt3__29time_baseE = Module['__ZTINSt3__29time_baseE'] = 69273036;
var __ZTSNSt3__220__time_get_c_storageIcEE = Module['__ZTSNSt3__220__time_get_c_storageIcEE'] = 68976178;
var __ZTINSt3__220__time_get_c_storageIcEE = Module['__ZTINSt3__220__time_get_c_storageIcEE'] = 69273044;
var __ZTINSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTINSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69273184;
var __ZTSNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTSNSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 68976212;
var __ZTSNSt3__220__time_get_c_storageIwEE = Module['__ZTSNSt3__220__time_get_c_storageIwEE'] = 68976281;
var __ZTINSt3__220__time_get_c_storageIwEE = Module['__ZTINSt3__220__time_get_c_storageIwEE'] = 69273176;
var __ZTINSt3__215time_get_bynameIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTINSt3__215time_get_bynameIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69273356;
var __ZTSNSt3__215time_get_bynameIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTSNSt3__215time_get_bynameIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 68976315;
var __ZTSNSt3__218__time_get_storageIcEE = Module['__ZTSNSt3__218__time_get_storageIcEE'] = 68976392;
var __ZTSNSt3__210__time_getE = Module['__ZTSNSt3__210__time_getE'] = 68976424;
var __ZTINSt3__210__time_getE = Module['__ZTINSt3__210__time_getE'] = 69273336;
var __ZTINSt3__218__time_get_storageIcEE = Module['__ZTINSt3__218__time_get_storageIcEE'] = 69273344;
var __ZTINSt3__215time_get_bynameIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTINSt3__215time_get_bynameIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69273512;
var __ZTSNSt3__215time_get_bynameIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTSNSt3__215time_get_bynameIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 68976445;
var __ZTSNSt3__218__time_get_storageIwEE = Module['__ZTSNSt3__218__time_get_storageIwEE'] = 68976522;
var __ZTINSt3__218__time_get_storageIwEE = Module['__ZTINSt3__218__time_get_storageIwEE'] = 69273500;
var __ZTINSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTINSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69273576;
var __ZTSNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTSNSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 68976554;
var __ZTSNSt3__210__time_putE = Module['__ZTSNSt3__210__time_putE'] = 68976623;
var __ZTINSt3__210__time_putE = Module['__ZTINSt3__210__time_putE'] = 69273568;
var __ZTINSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTINSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69273632;
var __ZTSNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTSNSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 68976644;
var __ZTINSt3__215time_put_bynameIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTINSt3__215time_put_bynameIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69273688;
var __ZTSNSt3__215time_put_bynameIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTSNSt3__215time_put_bynameIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 68976713;
var __ZTINSt3__215time_put_bynameIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTINSt3__215time_put_bynameIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69273724;
var __ZTSNSt3__215time_put_bynameIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTSNSt3__215time_put_bynameIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 68976790;
var __ZTINSt3__210moneypunctIcLb0EEE = Module['__ZTINSt3__210moneypunctIcLb0EEE'] = 69273800;
var __ZTSNSt3__210moneypunctIcLb0EEE = Module['__ZTSNSt3__210moneypunctIcLb0EEE'] = 68976867;
var __ZTSNSt3__210money_baseE = Module['__ZTSNSt3__210money_baseE'] = 68976895;
var __ZTINSt3__210money_baseE = Module['__ZTINSt3__210money_baseE'] = 69273792;
var __ZTINSt3__210moneypunctIcLb1EEE = Module['__ZTINSt3__210moneypunctIcLb1EEE'] = 69273888;
var __ZTSNSt3__210moneypunctIcLb1EEE = Module['__ZTSNSt3__210moneypunctIcLb1EEE'] = 68976916;
var __ZTINSt3__210moneypunctIwLb0EEE = Module['__ZTINSt3__210moneypunctIwLb0EEE'] = 69273976;
var __ZTSNSt3__210moneypunctIwLb0EEE = Module['__ZTSNSt3__210moneypunctIwLb0EEE'] = 68976944;
var __ZTINSt3__210moneypunctIwLb1EEE = Module['__ZTINSt3__210moneypunctIwLb1EEE'] = 69274064;
var __ZTSNSt3__210moneypunctIwLb1EEE = Module['__ZTSNSt3__210moneypunctIwLb1EEE'] = 68976972;
var __ZTINSt3__217moneypunct_bynameIcLb0EEE = Module['__ZTINSt3__217moneypunct_bynameIcLb0EEE'] = 69274152;
var __ZTSNSt3__217moneypunct_bynameIcLb0EEE = Module['__ZTSNSt3__217moneypunct_bynameIcLb0EEE'] = 68977000;
var __ZTINSt3__217moneypunct_bynameIcLb1EEE = Module['__ZTINSt3__217moneypunct_bynameIcLb1EEE'] = 69274220;
var __ZTSNSt3__217moneypunct_bynameIcLb1EEE = Module['__ZTSNSt3__217moneypunct_bynameIcLb1EEE'] = 68977035;
var __ZTINSt3__217moneypunct_bynameIwLb0EEE = Module['__ZTINSt3__217moneypunct_bynameIwLb0EEE'] = 69274288;
var __ZTSNSt3__217moneypunct_bynameIwLb0EEE = Module['__ZTSNSt3__217moneypunct_bynameIwLb0EEE'] = 68977070;
var __ZTINSt3__217moneypunct_bynameIwLb1EEE = Module['__ZTINSt3__217moneypunct_bynameIwLb1EEE'] = 69274356;
var __ZTSNSt3__217moneypunct_bynameIwLb1EEE = Module['__ZTSNSt3__217moneypunct_bynameIwLb1EEE'] = 68977105;
var __ZTINSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTINSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69274404;
var __ZTSNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTSNSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 68977140;
var __ZTSNSt3__211__money_getIcEE = Module['__ZTSNSt3__211__money_getIcEE'] = 68977210;
var __ZTINSt3__211__money_getIcEE = Module['__ZTINSt3__211__money_getIcEE'] = 69274396;
var __ZTINSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTINSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69274472;
var __ZTSNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTSNSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 68977235;
var __ZTSNSt3__211__money_getIwEE = Module['__ZTSNSt3__211__money_getIwEE'] = 68977305;
var __ZTINSt3__211__money_getIwEE = Module['__ZTINSt3__211__money_getIwEE'] = 69274464;
var __ZTINSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTINSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 69274540;
var __ZTSNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE = Module['__ZTSNSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE'] = 68977330;
var __ZTSNSt3__211__money_putIcEE = Module['__ZTSNSt3__211__money_putIcEE'] = 68977400;
var __ZTINSt3__211__money_putIcEE = Module['__ZTINSt3__211__money_putIcEE'] = 69274532;
var __ZTINSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTINSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 69274608;
var __ZTSNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE = Module['__ZTSNSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE'] = 68977425;
var __ZTSNSt3__211__money_putIwEE = Module['__ZTSNSt3__211__money_putIwEE'] = 68977495;
var __ZTINSt3__211__money_putIwEE = Module['__ZTINSt3__211__money_putIwEE'] = 69274600;
var __ZTINSt3__28messagesIcEE = Module['__ZTINSt3__28messagesIcEE'] = 69274680;
var __ZTSNSt3__28messagesIcEE = Module['__ZTSNSt3__28messagesIcEE'] = 68977520;
var __ZTSNSt3__213messages_baseE = Module['__ZTSNSt3__213messages_baseE'] = 68977541;
var __ZTINSt3__213messages_baseE = Module['__ZTINSt3__213messages_baseE'] = 69274672;
var __ZTINSt3__28messagesIwEE = Module['__ZTINSt3__28messagesIwEE'] = 69274744;
var __ZTSNSt3__28messagesIwEE = Module['__ZTSNSt3__28messagesIwEE'] = 68977565;
var __ZTINSt3__215messages_bynameIcEE = Module['__ZTINSt3__215messages_bynameIcEE'] = 69274808;
var __ZTSNSt3__215messages_bynameIcEE = Module['__ZTSNSt3__215messages_bynameIcEE'] = 68977586;
var __ZTINSt3__215messages_bynameIwEE = Module['__ZTINSt3__215messages_bynameIwEE'] = 69274852;
var __ZTSNSt3__215messages_bynameIwEE = Module['__ZTSNSt3__215messages_bynameIwEE'] = 68977615;
var __ZTINSt3__214codecvt_bynameIcc11__mbstate_tEE = Module['__ZTINSt3__214codecvt_bynameIcc11__mbstate_tEE'] = 69274912;
var __ZTSNSt3__214codecvt_bynameIcc11__mbstate_tEE = Module['__ZTSNSt3__214codecvt_bynameIcc11__mbstate_tEE'] = 68977644;
var __ZTINSt3__214codecvt_bynameIwc11__mbstate_tEE = Module['__ZTINSt3__214codecvt_bynameIwc11__mbstate_tEE'] = 69274972;
var __ZTSNSt3__214codecvt_bynameIwc11__mbstate_tEE = Module['__ZTSNSt3__214codecvt_bynameIwc11__mbstate_tEE'] = 68977686;
var __ZTINSt3__214codecvt_bynameIDsc11__mbstate_tEE = Module['__ZTINSt3__214codecvt_bynameIDsc11__mbstate_tEE'] = 69275032;
var __ZTSNSt3__214codecvt_bynameIDsc11__mbstate_tEE = Module['__ZTSNSt3__214codecvt_bynameIDsc11__mbstate_tEE'] = 68977728;
var __ZTINSt3__214codecvt_bynameIDic11__mbstate_tEE = Module['__ZTINSt3__214codecvt_bynameIDic11__mbstate_tEE'] = 69275092;
var __ZTSNSt3__214codecvt_bynameIDic11__mbstate_tEE = Module['__ZTSNSt3__214codecvt_bynameIDic11__mbstate_tEE'] = 68977771;
var __ZTINSt3__214codecvt_bynameIDsDu11__mbstate_tEE = Module['__ZTINSt3__214codecvt_bynameIDsDu11__mbstate_tEE'] = 69275152;
var __ZTSNSt3__214codecvt_bynameIDsDu11__mbstate_tEE = Module['__ZTSNSt3__214codecvt_bynameIDsDu11__mbstate_tEE'] = 68977814;
var __ZTINSt3__214codecvt_bynameIDiDu11__mbstate_tEE = Module['__ZTINSt3__214codecvt_bynameIDiDu11__mbstate_tEE'] = 69275212;
var __ZTSNSt3__214codecvt_bynameIDiDu11__mbstate_tEE = Module['__ZTSNSt3__214codecvt_bynameIDiDu11__mbstate_tEE'] = 68977858;
var __ZTINSt3__215__time_get_tempIcEE = Module['__ZTINSt3__215__time_get_tempIcEE'] = 69275348;
var __ZTSNSt3__215__time_get_tempIcEE = Module['__ZTSNSt3__215__time_get_tempIcEE'] = 68978788;
var __ZTINSt3__215__time_get_tempIwEE = Module['__ZTINSt3__215__time_get_tempIwEE'] = 69275428;
var __ZTSNSt3__215__time_get_tempIwEE = Module['__ZTSNSt3__215__time_get_tempIwEE'] = 68978817;
var __ZTVNSt3__214__shared_countE = Module['__ZTVNSt3__214__shared_countE'] = 69270500;
var __ZTINSt3__214__shared_countE = Module['__ZTINSt3__214__shared_countE'] = 69270520;
var __ZTSNSt3__214__shared_countE = Module['__ZTSNSt3__214__shared_countE'] = 68969569;
var __ZTVNSt3__219__shared_weak_countE = Module['__ZTVNSt3__219__shared_weak_countE'] = 69270528;
var __ZTINSt3__219__shared_weak_countE = Module['__ZTINSt3__219__shared_weak_countE'] = 69270556;
var __ZTSNSt3__219__shared_weak_countE = Module['__ZTSNSt3__219__shared_weak_countE'] = 68969594;
var __ZTVNSt3__212bad_weak_ptrE = Module['__ZTVNSt3__212bad_weak_ptrE'] = 69270580;
var __ZTINSt3__212bad_weak_ptrE = Module['__ZTINSt3__212bad_weak_ptrE'] = 69270600;
var __ZTSNSt3__212bad_weak_ptrE = Module['__ZTSNSt3__212bad_weak_ptrE'] = 68969624;
var __ZTVNSt3__23pmr28unsynchronized_pool_resourceE = Module['__ZTVNSt3__23pmr28unsynchronized_pool_resourceE'] = 69270804;
var __ZTVNSt3__23pmr15memory_resourceE = Module['__ZTVNSt3__23pmr15memory_resourceE'] = 69270880;
var __ZTVNSt3__23pmr25monotonic_buffer_resourceE = Module['__ZTVNSt3__23pmr25monotonic_buffer_resourceE'] = 69270832;
var __ZTVNSt3__23pmr26synchronized_pool_resourceE = Module['__ZTVNSt3__23pmr26synchronized_pool_resourceE'] = 69270920;
var __ZTVNSt3__23pmr32__new_delete_memory_resource_impE = Module['__ZTVNSt3__23pmr32__new_delete_memory_resource_impE'] = 69270748;
var __ZTINSt3__23pmr32__new_delete_memory_resource_impE = Module['__ZTINSt3__23pmr32__new_delete_memory_resource_impE'] = 69270960;
var __ZTVNSt3__23pmr26__null_memory_resource_impE = Module['__ZTVNSt3__23pmr26__null_memory_resource_impE'] = 69270776;
var __ZTINSt3__23pmr26__null_memory_resource_impE = Module['__ZTINSt3__23pmr26__null_memory_resource_impE'] = 69270972;
var __ZTINSt3__23pmr28unsynchronized_pool_resourceE = Module['__ZTINSt3__23pmr28unsynchronized_pool_resourceE'] = 69270908;
var __ZTINSt3__23pmr25monotonic_buffer_resourceE = Module['__ZTINSt3__23pmr25monotonic_buffer_resourceE'] = 69270868;
var __ZTSNSt3__23pmr25monotonic_buffer_resourceE = Module['__ZTSNSt3__23pmr25monotonic_buffer_resourceE'] = 68969732;
var __ZTSNSt3__23pmr15memory_resourceE = Module['__ZTSNSt3__23pmr15memory_resourceE'] = 68969772;
var __ZTINSt3__23pmr15memory_resourceE = Module['__ZTINSt3__23pmr15memory_resourceE'] = 69270860;
var __ZTSNSt3__23pmr28unsynchronized_pool_resourceE = Module['__ZTSNSt3__23pmr28unsynchronized_pool_resourceE'] = 68969802;
var __ZTINSt3__23pmr26synchronized_pool_resourceE = Module['__ZTINSt3__23pmr26synchronized_pool_resourceE'] = 69270948;
var __ZTSNSt3__23pmr26synchronized_pool_resourceE = Module['__ZTSNSt3__23pmr26synchronized_pool_resourceE'] = 68969845;
var __ZTSNSt3__23pmr32__new_delete_memory_resource_impE = Module['__ZTSNSt3__23pmr32__new_delete_memory_resource_impE'] = 68969886;
var __ZTSNSt3__23pmr26__null_memory_resource_impE = Module['__ZTSNSt3__23pmr26__null_memory_resource_impE'] = 68969933;
var __ZSt7nothrow = Module['__ZSt7nothrow'] = 68967868;
var __ZTVSt19bad_optional_access = Module['__ZTVSt19bad_optional_access'] = 69278112;
var __ZTISt19bad_optional_access = Module['__ZTISt19bad_optional_access'] = 69278132;
var __ZTSSt19bad_optional_access = Module['__ZTSSt19bad_optional_access'] = 69100951;
var __ZTINSt12experimental19bad_optional_accessE = Module['__ZTINSt12experimental19bad_optional_accessE'] = 69278144;
var __ZTSNSt12experimental19bad_optional_accessE = Module['__ZTSNSt12experimental19bad_optional_accessE'] = 69100975;
var __ZNSt3__212__rs_default4__c_E = Module['__ZNSt3__212__rs_default4__c_E'] = 69439448;
var __ZTVNSt3__211regex_errorE = Module['__ZTVNSt3__211regex_errorE'] = 69278080;
var __ZTINSt3__211regex_errorE = Module['__ZTINSt3__211regex_errorE'] = 69278100;
var __ZTSNSt3__211regex_errorE = Module['__ZTSNSt3__211regex_errorE'] = 69100929;
var __ZNSt3__26__itoa10__pow10_64E = Module['__ZNSt3__26__itoa10__pow10_64E'] = 68969248;
var __ZTVNSt3__212strstreambufE = Module['__ZTVNSt3__212strstreambufE'] = 69277068;
var __ZTTNSt3__210istrstreamE = Module['__ZTTNSt3__210istrstreamE'] = 69277172;
var __ZTTNSt3__210ostrstreamE = Module['__ZTTNSt3__210ostrstreamE'] = 69277228;
var __ZTTNSt3__29strstreamE = Module['__ZTTNSt3__29strstreamE'] = 69277304;
var __ZTINSt3__212strstreambufE = Module['__ZTINSt3__212strstreambufE'] = 69277344;
var __ZTVNSt3__210istrstreamE = Module['__ZTVNSt3__210istrstreamE'] = 69277132;
var __ZTINSt3__210istrstreamE = Module['__ZTINSt3__210istrstreamE'] = 69277396;
var __ZTCNSt3__210istrstreamE0_NS_13basic_istreamIcNS_11char_traitsIcEEEE = Module['__ZTCNSt3__210istrstreamE0_NS_13basic_istreamIcNS_11char_traitsIcEEEE'] = 69277356;
var __ZTVNSt3__210ostrstreamE = Module['__ZTVNSt3__210ostrstreamE'] = 69277188;
var __ZTINSt3__210ostrstreamE = Module['__ZTINSt3__210ostrstreamE'] = 69277448;
var __ZTCNSt3__210ostrstreamE0_NS_13basic_ostreamIcNS_11char_traitsIcEEEE = Module['__ZTCNSt3__210ostrstreamE0_NS_13basic_ostreamIcNS_11char_traitsIcEEEE'] = 69277408;
var __ZTVNSt3__29strstreamE = Module['__ZTVNSt3__29strstreamE'] = 69277244;
var __ZTINSt3__29strstreamE = Module['__ZTINSt3__29strstreamE'] = 69277600;
var __ZTCNSt3__29strstreamE0_NS_14basic_iostreamIcNS_11char_traitsIcEEEE = Module['__ZTCNSt3__29strstreamE0_NS_14basic_iostreamIcNS_11char_traitsIcEEEE'] = 69277460;
var __ZTCNSt3__29strstreamE0_NS_13basic_istreamIcNS_11char_traitsIcEEEE = Module['__ZTCNSt3__29strstreamE0_NS_13basic_istreamIcNS_11char_traitsIcEEEE'] = 69277520;
var __ZTCNSt3__29strstreamE8_NS_13basic_ostreamIcNS_11char_traitsIcEEEE = Module['__ZTCNSt3__29strstreamE8_NS_13basic_ostreamIcNS_11char_traitsIcEEEE'] = 69277560;
var __ZTSNSt3__212strstreambufE = Module['__ZTSNSt3__212strstreambufE'] = 69100404;
var __ZTSNSt3__210istrstreamE = Module['__ZTSNSt3__210istrstreamE'] = 69100427;
var __ZTSNSt3__210ostrstreamE = Module['__ZTSNSt3__210ostrstreamE'] = 69100448;
var __ZTSNSt3__29strstreamE = Module['__ZTSNSt3__29strstreamE'] = 69100469;
var __ZTVNSt3__212system_errorE = Module['__ZTVNSt3__212system_errorE'] = 69270408;
var __ZTVNSt3__224__generic_error_categoryE = Module['__ZTVNSt3__224__generic_error_categoryE'] = 69270332;
var __ZTINSt3__224__generic_error_categoryE = Module['__ZTINSt3__224__generic_error_categoryE'] = 69270440;
var __ZTVNSt3__223__system_error_categoryE = Module['__ZTVNSt3__223__system_error_categoryE'] = 69270372;
var __ZTINSt3__223__system_error_categoryE = Module['__ZTINSt3__223__system_error_categoryE'] = 69270452;
var __ZTINSt3__212system_errorE = Module['__ZTINSt3__212system_errorE'] = 69270464;
var __ZTINSt3__212__do_messageE = Module['__ZTINSt3__212__do_messageE'] = 69270428;
var __ZTSNSt3__212__do_messageE = Module['__ZTSNSt3__212__do_messageE'] = 68969433;
var __ZTSNSt3__224__generic_error_categoryE = Module['__ZTSNSt3__224__generic_error_categoryE'] = 68969456;
var __ZTSNSt3__223__system_error_categoryE = Module['__ZTSNSt3__223__system_error_categoryE'] = 68969491;
var __ZTSNSt3__212system_errorE = Module['__ZTSNSt3__212system_errorE'] = 68969525;
var __ZTVSt18bad_variant_access = Module['__ZTVSt18bad_variant_access'] = 69278040;
var __ZTISt18bad_variant_access = Module['__ZTISt18bad_variant_access'] = 69278060;
var __ZTSSt18bad_variant_access = Module['__ZTSSt18bad_variant_access'] = 69100906;
var __ZTVN10__cxxabiv120__si_class_type_infoE = Module['__ZTVN10__cxxabiv120__si_class_type_infoE'] = 69269912;
var __ZTVN10__cxxabiv119__pointer_type_infoE = Module['__ZTVN10__cxxabiv119__pointer_type_infoE'] = 69270016;
var __ZTIb = Module['__ZTIb'] = 69269684;
var __ZTIPKc = Module['__ZTIPKc'] = 69269700;
var __ZTIh = Module['__ZTIh'] = 69269716;
var __ZTIa = Module['__ZTIa'] = 69269724;
var __ZTIs = Module['__ZTIs'] = 69269732;
var __ZTIt = Module['__ZTIt'] = 69269740;
var __ZTIi = Module['__ZTIi'] = 69269748;
var __ZTIj = Module['__ZTIj'] = 69269756;
var __ZTIl = Module['__ZTIl'] = 69269764;
var __ZTIm = Module['__ZTIm'] = 69269772;
var __ZTIx = Module['__ZTIx'] = 69269780;
var __ZTIf = Module['__ZTIf'] = 69269788;
var __ZTId = Module['__ZTId'] = 69269796;
var __ZTVN10__cxxabiv120__function_type_infoE = Module['__ZTVN10__cxxabiv120__function_type_infoE'] = 69269804;
var __ZTVN10__cxxabiv116__enum_type_infoE = Module['__ZTVN10__cxxabiv116__enum_type_infoE'] = 69269832;
var __ZTVN10__cxxabiv117__class_type_infoE = Module['__ZTVN10__cxxabiv117__class_type_infoE'] = 69269872;
var __ZTVN10__cxxabiv121__vmi_class_type_infoE = Module['__ZTVN10__cxxabiv121__vmi_class_type_infoE'] = 69269964;
var __ZTVSt9exception = Module['__ZTVSt9exception'] = 69270044;
var __ZTISt9bad_alloc = Module['__ZTISt9bad_alloc'] = 69270072;
var __ZTISt20bad_array_new_length = Module['__ZTISt20bad_array_new_length'] = 69270084;
var __ZTISt9exception = Module['__ZTISt9exception'] = 69270064;
var __ZTVSt11logic_error = Module['__ZTVSt11logic_error'] = 69270096;
var __ZTVSt13runtime_error = Module['__ZTVSt13runtime_error'] = 69270116;
var __ZTISt11logic_error = Module['__ZTISt11logic_error'] = 69270136;
var __ZTISt13runtime_error = Module['__ZTISt13runtime_error'] = 69270264;
var __ZTVSt16invalid_argument = Module['__ZTVSt16invalid_argument'] = 69270148;
var __ZTISt16invalid_argument = Module['__ZTISt16invalid_argument'] = 69270168;
var __ZTVSt12length_error = Module['__ZTVSt12length_error'] = 69270180;
var __ZTISt12length_error = Module['__ZTISt12length_error'] = 69270200;
var __ZTVSt12out_of_range = Module['__ZTVSt12out_of_range'] = 69270212;
var __ZTISt12out_of_range = Module['__ZTISt12out_of_range'] = 69270232;
var __ZTVSt11range_error = Module['__ZTVSt11range_error'] = 69270244;
var __ZTISt11range_error = Module['__ZTISt11range_error'] = 69270276;
var __ZTVSt14overflow_error = Module['__ZTVSt14overflow_error'] = 69270288;
var __ZTISt14overflow_error = Module['__ZTISt14overflow_error'] = 69270308;
var __ZTISt8bad_cast = Module['__ZTISt8bad_cast'] = 69269544;
function invoke_iii(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_v(index) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_i(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index,a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ji(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_vii(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ii(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_j(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ij(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiij(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jii(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_vid(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiij(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiji(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiji(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiij(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vj(index,a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vij(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viijii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiji(index,a1,a2,a3,a4,a5,a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viijiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viij(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ijiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_di(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_id(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ijiiiii(index,a1,a2,a3,a4,a5,a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jiiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_viiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_jiiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_vji(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiijii(index,a1,a2,a3,a4,a5,a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vijiji(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viji(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

Module['addRunDependency'] = addRunDependency;
Module['removeRunDependency'] = removeRunDependency;
Module['callMain'] = callMain;
Module['ccall'] = ccall;
Module['cwrap'] = cwrap;
Module['setValue'] = setValue;
Module['getValue'] = getValue;
Module['UTF8ToString'] = UTF8ToString;
Module['stringToNewUTF8'] = stringToNewUTF8;
Module['stringToUTF8OnStack'] = stringToUTF8OnStack;
Module['FS_createPreloadedFile'] = FS_createPreloadedFile;
Module['FS_unlink'] = FS_unlink;
Module['FS_createPath'] = FS_createPath;
Module['FS_createDevice'] = FS_createDevice;
Module['FS'] = FS;
Module['FS_createDataFile'] = FS_createDataFile;
Module['FS_createLazyFile'] = FS_createLazyFile;


var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args = []) {

  var entryFunction = resolveGlobalSymbol('main').sym;;

  // Main modules can't tell if they have main() at compile time, since it may
  // arrive from a dynamic library.
  if (!entryFunction) return;

  args.unshift(thisProgram);

  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  args.forEach((arg) => {
    HEAPU32[((argv_ptr)>>2)] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  });
  HEAPU32[((argv_ptr)>>2)] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  }
}

function run(args = arguments_) {

  if (runDependencies > 0) {
    return;
  }

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    readyPromiseResolve(Module);
    Module['onRuntimeInitialized']?.();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();

// end include: postamble.js

// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
//
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.

moduleRtn = readyPromise;

// end include: postamble_modularize.js



  return moduleRtn;
}
);
})();
export default Module;
