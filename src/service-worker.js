/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// App Shell
workbox.routing.registerNavigationRoute('/index.html')

// La API usa Stale While Revalidate para mayor velocidad
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/, workbox.strategies.staleWhileRevalidate(),
 'GET')

// Last fuentes van con Cache First y vencen al mes
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/, 
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  }),
  'GET')

  workbox.routing.registerNavigationRoute('/index.html')

  /* staleWhileRevalidate -> Va a la chaché y a la red al mismo tiempo, es obvio que caché será más rápido, por eso trae primero el recurso desde el caché pero al regresar de la red con una actualización de dicho recurso lo guarda en caché y actualiza la UI. */

  workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/,
    workbox.strategies.staleWhileRevalidate(), 'GET')

// Todo lo demás usa Network First
// Estrategia seleccionada por defecto
/* La estrategia por defecto debe ir al último ya que el orden de las estrategias tienen un orden específico - Se matchean según el orden, y la que este primero será la que responda primero */
workbox.routing.registerRoute(/^https?.*/,
  workbox.strategies.networkFirst(), 'GET')