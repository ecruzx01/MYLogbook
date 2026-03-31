const CACHE_NAME = 'aquila46-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar y forzar la nueva versión inmediatamente
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Borrar cualquier memoria vieja (la versión rota)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Estrategia: "Internet primero, si falla, usa la memoria"
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
