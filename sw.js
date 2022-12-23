const cacheName = 'booklist-cache';

self.addEventListener('install', event => {
    console.log('Service worker installing...');
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                "./lists/*"
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
