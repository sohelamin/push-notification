# Push Notification
> Push Notification Implementation Using Service Worker & Web Push Protocol

## Pre-requisites
- [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/) (Client)
- [Web Push](https://github.com/web-push-libs/web-push) (Server)

## Installation
```
npm install
```

## Usage
1. Run the Web Push server
    ```
    node app.js
    ```

2. Serve the client app with any http server
    ```
    cd client
    python -m SimpleHTTPServer 8888
    ```
3. Visit the client app and allow notification
    ![Push Notification](https://user-images.githubusercontent.com/1708683/42136238-64a2e2bc-7d79-11e8-95c4-80afdd9fa66b.png)

4. Send notification to the subscribed users
    Simple notification
    ```bash
    curl -XPOST -H 'Content-Type: application/json' http://localhost:3000/send -d '
    {
        "notification": {
            "title": "Push Notification",
            "body": "Hey Dude!",
            "icon": "icon.png",
            "url": "https://www.appzcoder.com/"
        }
    }
    '
    ```
    You will get the notification like this
    ![Push Notification](https://user-images.githubusercontent.com/1708683/42136289-50e94008-7d7a-11e8-9e60-7fe9484ae3ba.png)

    Notification with action buttons
    ```bash
    curl -XPOST -H 'Content-Type: application/json' http://localhost:3000/send -d '
    {
        "notification": {
            "title": "Push Notification",
            "body": "Hey Dude!",
            "icon": "icon.png",
            "actions": [
                { "action": "ok", "title": "Ok", "url": "https://www.appzcoder.com/" },
                { "action": "cancel", "title": "Cancel", "url": "https://google.com/" }
            ]
        }
    }
    '
    ```
