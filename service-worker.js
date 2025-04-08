const CACHE_NAME = 'pwa-cache-v1.5';
const urlsToCache = [
    '/swkz/',
    '/swkz/index.html',
    '/swkz/snapshot.css',
    '/swkz/main.js',
    '/swkz/log.js',
    '/swkz/clearColor.js',
    '/swkz/33-144_144.png',
    '/swkz/33_512*512.png',
    '/swkz/manifest.json',
    '/swkz/service-worker.js'
];

// 安装 Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
