const CACHE_NAME = "nihongobd-v1";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Install — static asset cache করো
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate — পুরানো cache মুছে ফেলো
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — Network first, cache fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API routes কখনো cache করো না
  if (url.pathname.startsWith("/api/")) return;

  // শুধু GET request
  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // সফল হলে cache এ copy রাখো
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, clone);
        });
        return response;
      })
      .catch(() => caches.match(request))
  );
});