// ============================================================
// JOELHOOD AMC — SERVICE WORKER
// Caches the player shell for offline access
// Lesson JSON files fetched fresh when connected
// ============================================================

const CACHE_NAME    = "joelhood-amc-v3";
const SHELL_FILES   = [
  "/acting-masterclass/",
  "/acting-masterclass/index.html",
  "/acting-masterclass/manifest.json",
];

// Install — cache the shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(SHELL_FILES);
    }).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// Shell files → cache first
// Lesson JSON → network first, cache fallback
// API calls → network only (never cache)
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Never cache API calls
  if (url.hostname.includes("workers.dev") ||
      url.hostname.includes("googleapis.com") ||
      url.hostname.includes("fonts.g")) {
    return; // let browser handle normally
  }

  // Lesson JSON — network first
  if (url.pathname.includes("/lessons/") && url.pathname.endsWith(".json")) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Shell files — cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
