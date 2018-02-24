console.log('serviceWorkerOption.assets', serviceWorkerOption.assets)

const CACHE_NAME = 'offline-v2';

function shouldIgnoreRequest(request) {
  return ['chrome-extension', 'sockjs-node']
    .map((urlPart) => request.url.includes(urlPart))
    .indexOf(true) > -1;
}


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/',
        ...serviceWorkerOption.assets
      ])
    })
  )
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    })
  )
});


self.addEventListener('fetch', event => {
  if (shouldIgnoreRequest(event.request)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(request => {
        return request || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        }).catch(e => {
          if (
            event.request.mode === 'navigate' || (
              event.request.method === 'GET' &&
              event.request.headers.get('accept').includes('text/html')
            )
          ) {
            return cache.match('/');
          }
        })
      })
    })
  )
});
