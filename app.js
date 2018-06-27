const applicationServerPublicKey = '<PUBLIC_KEY>';

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js').then((registration) => {
    console.log('Service Worker is registered', registration);
  }).catch((error) => {
    console.error('Service Worker error', error);
  });

  navigator.serviceWorker.ready.then((registration) => {
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
    }).then((subscription) => {
      console.log('The Subscription is successful', JSON.stringify(subscription));
      // @Todo Store subscription to the app server
    }).catch((error) => {
      console.error('Subscription error', error);
    });
  });
} else {
  console.warn('Service Worker and Push is not supported');
}
