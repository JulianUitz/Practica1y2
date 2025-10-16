const CACHE_NAME = 'pwa-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Archivos cacheados con éxito');
        return cache.addAll(urlsToCache);
      })
  );
  // Activar inmediatamente sin esperar a que la pestaña se cierre
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activado');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('[ServiceWorker] Eliminando cache antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tomar el control inmediato de los clientes
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Estrategia: cache-first, fallback a network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Opcional: almacenar en cache dinámico — solo para requests HTTP(S) GET con response.ok
        return caches.open(CACHE_NAME).then((cache) => {
          try {
            const reqUrl = new URL(event.request.url);
            const isHttp = reqUrl.protocol === 'http:' || reqUrl.protocol === 'https:';
            const isGet = event.request.method === 'GET';
            // Solo cachear si es una petición HTTP(S) GET y la respuesta es ok
            if (isHttp && isGet && networkResponse && networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
          } catch (e) {
            // Si no se puede parsear la URL o falla, no cacheamos
          }
          return networkResponse;
        });
      }).catch(() => {
        // Fallback simple: si falla, devolvemos la página index (útil para navegaciones)
        return caches.match('/index.html');
      });
    })
  );
});