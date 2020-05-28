let cacheName = '28/5/20_Cache2';

let filesToCache = [
  '/',
  'index.html',
  'about-me.html',
  'contact-me.html',
  'projects.html',
  'css/arrow.css',
  'css/debug.css',
  'css/style.css',
  'images/icons/icon-128px.png',
  'images/icons/icon-144px.png',
  'images/icons/icon-152px.png',
  'images/icons/icon-192px.png',
  'images/icons/icon-256px.png',
  'images/icons/icon-512px.png',
  'images/avatar-256by256.png',
  'images/avatar-512by512.svg',
  'images/Blackjack_640by320.png',
  'images/Calculator_640by320.jpg',
  'images/Portfolio_640by320.png',
  'js/script.js',
  'public/manifest.json'
]

/* 
start the service worker, when the user access
the website online. This will add the all the files 
listed in filesToCache to the browser cache.
*/
self.addEventListener('install', function(e){
  console.log("on install");
  console.log(cacheName);
  e.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log("Adding files to cache");
      return cache.addAll(filesToCache);
    })
  )

  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
})


/*
If offline or if the file exists in the cache, then it will fetch the files from cache
*/
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request,{
        cacheName: cacheName
    }).then(function(response){
        console.log(response);
        console.log("Fetching "+e.request.url);
      return response || fetch (e.request)
    })
  )
})

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});