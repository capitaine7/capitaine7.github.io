// À l'installation - mise en cache du shell de l'application
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-cache').then(function(cache) {
      // mettre en cache tous les fichiers statiques qui composent le shell de l'application
      return cache.add('index.html');
    })
  );
});

// Sur demande du réseau
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Essayez le cache
    caches.match(event.request).then(function(response) {
      //Si la réponse est trouvée, retournez-la, sinon récupérez-la
      return response || fetch(event.request);
    })
  );
});