package com.jobjingjo.notification.app

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.facebook.react.modules.core.DeviceEventManagerModule

class FirebaseService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        // Handle FCM messages here
        remoteMessage.notification?.let { notification ->
            // You can customize notification handling here
            // The React Native code will handle the notification through onMessage
        }
    }

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        // Handle new FCM token
    }
}