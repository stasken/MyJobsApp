const IDB_VERSION = IDBDatabase.version

self.addEventListener('fetch', function (event) {
  let request_url = event.request.clone().url;
  if (event.request.clone().method === 'GET') {
    // if request is event list
    if (request_url === 'https://deliver.kontent.ai/09bb74fc-89d2-00b4-4f43-955d791b9bca/items?system.type=event') {
      event.respondWith(
        // Go to network and update cache as we go
        fetch(event.request).catch(function () {
          return caches.match(event.request);
        })
      )
    } else {
      event.respondWith(
        // check all the caches in the browser and find
        // out whether our request is in any of them
        caches.match(event.request.clone())
        .then(function (response) {
          if (response) {
            // if we are here, that means there's a match
            // return the response stored in browser
            return response;
          }
          // no match in cache, use the network instead
          return fetch(event.request.clone());
        })
      );
    }
  } else if (event.request.clone().method === 'POST') {
    /*
    console.log('event request', event.request)
    console.log('event_data', event_data)
    */
    // attempt to send request normally
    event.respondWith(fetch(event.request.clone()).catch(function (error) {
      // only save post requests in browser, if an error occurs
      savePostRequests(event.request.clone().url, event_data)
    }))
  } else if (event.request.clone().method === 'PUT') {
    // attempt to send request normally
    event.respondWith(fetch(event.request.clone()).catch(function (error) {
      // only save put requests in browser, if an error occurs
      savePutRequests(event.request.clone().url, event_data)
    }))
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('notification clicked!', event);

  const urlToOpen = new URL(event.notification.data, self.location.origin).href;

  event.notification.close();

  event.waitUntil(clients.openWindow(urlToOpen));

});

self.addEventListener('message', (event) => {
  if (event.data.hasOwnProperty('event_data')) {
    console.log('msg SW', event)
    // receives form data from script.js upon submission
    event_data = event.data.event_data
  }
});

self.addEventListener("push", function (event) {
  if (event.data) {
    var data = event.data.json();
    var title = data.Title;
    var options = {
      body: data.Body,
      icon: 'assets/icons/icon-72x72.png',
      badge: 'assets/icons/icon-72x72.png',
      data: data.Data
    };
    event.waitUntil(self.registration.showNotification(title, options));
  }
});
