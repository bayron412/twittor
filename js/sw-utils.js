
function updateChache (cacheName, req, res) {

  if (res.ok) {

    return caches.open(cacheName).then(cache => {

      // if (!req.request.url.includes('chrome-extension')) {
        cache.put(req, res.clone());
      // }
      return res.clone();

    });

  }
  else {
    return res.clone();
  }

}

