# POC sending notification from ANH

1. create notification hubs on azure and attach to firebase
https://learn.microsoft.com/en-us/azure/notification-hubs/create-notification-hub-portal


2. create mobile app for user to subscribe notification
https://learn.microsoft.com/en-us/azure/notification-hubs/android-sdk


3. create backend app for send notification
https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples-dev/sendDirectNotification.fcmV1.ts

# To receive notification
need to copy google-services.json
    - Firebase console > Project settings > General > Your apps > Download google-services.json
    - place it under android/app
    - run the mobile app on emulator or device
    - check log for device id
    - you can use this device id to send notification from backend app

## file location
```
.
├── AwesomeProject
│   ├── android
│   │   ├── app
│   │   │   ├── google-services.json
├── MessageHub
│   └── serviceAccountKey.json
├── README.md
```


# To test sending
## FCM
you need to copy file serviceAccountKey.json
 - Project settings > Service Accounts > Generate new Private Key > copy the file
 - rename to serviceAccountKey.json
 - place it under MessageHub
 - update device id from emulator log and put it on device token
 - In terminal run `node app.mjs`

## ANH
you need to set up environment variable copy from notification hub
 - Notification hubs > Access Policies > DefaultFullSharedAccessSignature
 - In terminal, run

```
export NOTIFICATIONHUBS_CONNECTION_STRING="Endpoint=sb://poc-notification-hubs.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=0G******"
export NOTIFICATION_HUB_NAME="poc-notification-hubs"
```
 - update device id from emulator log and put it on device token
 - In terminal run `node anh.mjs`