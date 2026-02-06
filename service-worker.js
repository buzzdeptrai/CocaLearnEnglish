// Service Worker for English Fun PWA
const CACHE_VERSION = 'english-fun-v1';

// Static assets to pre-cache on install
const STATIC_ASSETS = [
    './',
    './index.html',
    './app.js',
    './data.js',
    './styles.css',
    './word-chain.js',
    './true-false-rush.js',
    './flashcard-interactive.js',
    './spaced-repetition.js',
    './listening-game.js',
    './sentence-builder.js',
    './achievements.js',
    './manifest.json'
];

// Install: pre-cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((key) => key !== CACHE_VERSION)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

// Fetch: strategy depends on request type
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Navigation requests: Network First
    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
        return;
    }

    // Dictionary API audio: Cache First (cache pronunciation audio)
    if (url.hostname === 'api.dictionaryapi.dev') {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Static assets (.js, .css, .html): Cache First
    if (/\.(js|css|html|json|png|ico)$/.test(url.pathname)) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Everything else (external APIs, YouTube, etc.): Network Only
    event.respondWith(fetch(request));
});

// Network First: try network, fall back to cache
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_VERSION);
        cache.put(request, response.clone());
        return response;
    } catch {
        const cached = await caches.match(request);
        return cached || new Response('Offline', { status: 503 });
    }
}

// Cache First: try cache, fall back to network (and cache the result)
async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_VERSION);
        cache.put(request, response.clone());
        return response;
    } catch {
        return new Response('Offline', { status: 503 });
    }
}
