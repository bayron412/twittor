// Imports
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const IMMUTABLE_CACHE = 'immutable-v1';

const APP_SHELL = [
  // '/',
  'index.html',
  'css/style.css',
  'img/favicon.ico',
  'img/avatars/hulk.jpg',
  'img/avatars/ironman.jpg',
  'img/avatars/spiderman.jpg',
  'img/avatars/thor.jpg',
  'img/avatars/wolverine.jpg',
  'js/app.js',
  'js/sw-utils.js'
];

const APP_SHELL_IMMUTABLE = [
  'https://fonts.googleapis.com/css?family=Quicksand:300,400',
  'https://fonts.googleapis.com/css?family=Lato:400,300',
  'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
  'css/animate.css',
  'js/libs/jquery.js'
];

self.addEventListener('install', evt => {

  const cacheStatic = caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL));

  const cacheImmutable = caches.open(IMMUTABLE_CACHE).then(cache => cache.addAll(APP_SHELL_IMMUTABLE));

  evt.waitUntil(Promise.all([cacheStatic, cacheImmutable]));

});

self.addEventListener('activate', evt => {

  const resp = caches.keys()
    .then(keys => {

      // for (let key of keys) {

      keys.forEach(hey => {

        if (key !== STATIC_CACHE && key.includes('static')) {
          return caches.delete(key);
        }

        if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
          return caches.delete(key);
        }

      });



      // }

    });

  evt.waitUntil(resp);

});

self.addEventListener('fetch', evt => {

  const resp = caches.match(evt.request).then(res => {

    if (res) {
      return res;
    }
    else {

      return fetch(evt.request).then(newResp => {
        return updateChache(DYNAMIC_CACHE, evt.request, newResp);
      });

    }

  });

  evt.respondWith(resp);

});
