//referent from https://www.youtube.com/watch?v=BfL3pprhnms
const cacheName = 'restaurant-reviews-v1';
const cacheUrl = [
  '/index.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/restaurant.html?id=1',
  '/restaurant.html?id=2',
  '/restaurant.html?id=3',
  '/restaurant.html?id=4',
  '/restaurant.html?id=5',
  '/restaurant.html?id=6',
  '/restaurant.html?id=7',
  '/restaurant.html?id=8',
  '/restaurant.html?id=9',
  '/restaurant.html?id=10',
];

self.addEventListener('install', (event) => {
  console.log('[serviceWorker]::installed::');
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(cacheUrl);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        console.log('[serviceWorker]::fetching::', event.request.url);
        return caches.open(cacheName).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
     //  if(response){
     //    return response;
     //  }
     //
     //  console.log('[serviceWorker]::fetching::', event.request.url);
     //  fetch(event.request).then(fetchResponse => {
     //   return caches.open(cacheName).then((cache) => {
     //     cache.put(event.request, fetchResponse.clone());
     //     return fetchResponse;
     //   });
     // });
    })
  );
});

self.addEventListener('activate', function(event) {
    console.log('[serviceWorker]::activated::');
    event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				if (thisCacheName !== cacheName) {
					console.log('[serviceWorker]::removing cache::', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	);
});
