// sw.js
const CACHE_NAME = 'sais-enterprise-cache-v2'; // เปลี่ยนเวอร์ชันเพื่อล้างแคชเก่าที่พัง
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './config.js',
  './utils.js',
  './App.js',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // ข้ามการทำ Cache สำหรับ API Call ของ Google Apps Script
  if (event.request.url.includes('script.google.com') || event.request.url.includes('googleusercontent.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
