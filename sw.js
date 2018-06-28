// {
//     "title": "Push Notification",
//     "body": "Hey Dude!",
//     "icon": "icon.png",
//     "actions": [
//         { "action": "ok", "title": "Ok", "url": "https://www.appzcoder.com/" }
//     ]
// }

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    data: {}
  };

  if (data.icon) {
    options.icon = data.icon;
  }
  if (data.launchUrl) {
    options.data.launchUrl = data.launchUrl;
  }
  if (data.actions) {
    options.actions = options.data.actions = data.actions;
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  const data = event.notification.data;
  event.notification.close();

  if (!clients.openWindow) {
    return;
  }

  if (data.launchUrl) {
    event.waitUntil(clients.openWindow(data.launchUrl));
  } else if (event.action) {
    event.waitUntil(clients.openWindow(data.actions[0].url));
  }
});
