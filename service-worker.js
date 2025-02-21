const CACHE_NAME = "pomodoro-cache-v1";
const urlsToCache = [
    "index.html",
    "manifest.json",
    "icon-192.png",
    "icon-512.png"
];

// Instalación del Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// Interceptar peticiones y responder con cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});
