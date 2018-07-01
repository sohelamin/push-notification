self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    data: {}
  };

  if (data.icon) {
    options.icon = data.icon;
  }
  if (data.url) {
    options.data.url = data.url;
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

  if (data.url) {
    event.waitUntil(clients.openWindow(data.url));
  } else if (event.action) {
    const targetAction = data.actions.find(action => action.action === event.action);
    event.waitUntil(clients.openWindow(targetAction.url));
  }
});
