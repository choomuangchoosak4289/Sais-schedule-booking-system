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
