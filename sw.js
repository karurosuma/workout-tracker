const CACHE = "workout-tracker-web-app-v137";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./muscles.json",
  "./bodies/male-front.jpg",
  "./bodies/male-back.jpg",
  "./bodies/female-front.jpg",
  "./bodies/female-back.jpg",
  "./favicon.ico",
  "./favicon-16.png",
  "./favicon-32.png",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./splash/splash-1170x2532.png",
  "./splash/splash-1179x2556.png",
  "./splash/splash-1290x2796.png",
  "./splash/splash-1125x2436.png",
  "./splash/splash-828x1792.png",
  "./splash/splash-750x1334.png",
  "./splash/splash-1242x2208.png",
  "./splash/splash-1080x1920.png",
  "./vendor/bootstrap.min.css",
  "./vendor/bootstrap.bundle.min.js",
  "./vendor/bootstrap-icons.min.css",
  "./vendor/apexcharts.min.js",
  "./vendor/sql-wasm.js",
  "./vendor/sql-wasm.wasm",
  "./vendor/noto-sans-tc.css",
  "./vendor/fonts/bootstrap-icons.woff2",
  "./vendor/fonts/bootstrap-icons.woff",
  "./vendor/fonts/noto-sans-tc-400.woff2",
  "./vendor/fonts/noto-sans-tc-500.woff2",
  "./vendor/fonts/noto-sans-tc-600.woff2",
  "./vendor/fonts/noto-sans-tc-700.woff2",
  "./vendor/fonts/noto-sans-tc-800.woff2"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return Promise.all(PRECACHE.map(function (url) {
        return cache.add(url).catch(function () {});
      }));
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  if (req.url.indexOf("muscles.json") !== -1) return;
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        var copy = res.clone();
        if (res.ok && new URL(req.url).origin === self.location.origin) {
          caches.open(CACHE).then(function (cache) {
            cache.put(req, copy);
          });
        }
        return res;
      }).catch(function () {
        if (req.mode === "navigate") return caches.match("./index.html");
        return caches.match(req);
      });
    })
  );
});
