const CACHE_NAME = 'navron-calc-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './interest-calculator.html',
  './emi-calculator.html',
  './gst-calculator.html',
  './percentage-calculator.html',
  './profit-loss-calculator.html',
  './sip-calculator.html',
  './fd-calculator.html',
  './rd-calculator.html',
  './discount-calculator.html',
  './age-calculator.html',
  './currency-calculator.html',
  './unit-converter.html',
  './loan-calculator.html',
  './tax-calculator.html',
  './404.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event (Cache First, Network Fallback)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        // Cache new request dynamically if it's in our assets list
        if (networkResponse && networkResponse.status === 200) {
          const urlObj = new URL(e.request.url);
          const localPath = urlObj.pathname;
          
          if (ASSETS_TO_CACHE.some(asset => localPath.endsWith(asset.replace('./', '')))) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseToCache);
            });
          }
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for document pages when offline
        if (e.request.mode === 'navigate') {
          return caches.match('./404.html');
        }
      });
    })
  );
});
