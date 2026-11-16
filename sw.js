// TripFlow service worker: makes the app open offline and keeps
// map tiles you've already seen available without signal.
const VERSION = "tripflow-v3";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
const LIBS = [
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js",
];
const TILES = "tripflow-tiles-osm";
const MAX_TILES = 2500;

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    await Promise.all(LIBS.map(u => c.add(new Request(u, { mode: "cors" })).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION && k !== TILES) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // App files: network first so updates arrive, cache when offline.
  if (url.origin === location.origin) {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok) (await caches.open(VERSION)).put(req, res.clone());
        return res;
      } catch {
        return (await caches.match(req)) || (await caches.match("./index.html"));
      }
    })());
    return;
  }

  // Libraries: cache first.
  if (url.hostname === "unpkg.com" || url.hostname === "cdn.jsdelivr.net") {
    e.respondWith((async () => (await caches.match(req)) || fetch(req))());
    return;
  }

  // Map tiles: cache first, saved as you browse (handy abroad without data).
  if (url.hostname === "tile.openstreetmap.org") {
    e.respondWith((async () => {
      const cache = await caches.open(TILES);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) {
        cache.put(req, res.clone());
        cache.keys().then(keys => { if (keys.length > MAX_TILES) keys.slice(0, keys.length - MAX_TILES).forEach(k => cache.delete(k)); });
      }
      return res;
    })());
  }
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    if (all.length) return all[0].focus();
    return self.clients.openWindow("./");
  })());
});
