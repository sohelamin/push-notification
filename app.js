const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const webpush = require('web-push');
const cors = require('cors');

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: 'BIRGhYwBRTK7fhV-lOGFUUVNlIo4cMzZ2YjuYR12r5iHbbCVE3WbmWY8Ret5-6d_yhZMeNkfvqFpcwfTFRH-uYM',
  privateKey: 'XcL9ZY1-feCk-jzbbftS97HrnCfFIM3Sq92CxWNVpM4'
};

// webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
  'mailto:sohelamincse@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({origin: '*'}));

let subscriptions = [];

router.get('/', async (req, res) => {
  res.send('Hello World!');
});
router.post('/subscribe', async (req, res) => {
  const subscription = req.body.subscription;
  // @Todo check and store the subscription
  subscriptions.push(subscription);

  res.send('Subscribed!');
});
router.post('/send', async (req, res) => {
  const notification = req.body.notification;

  for (subscription of subscriptions) {
    await webpush.sendNotification(subscription, JSON.stringify(notification));
  }
  res.send('Sent!');
});

app.use(router);

app.listen(3000, () => console.log('Listening on port 3000!'))
