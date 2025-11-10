import React, { useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

async function requestUserPermission(): Promise<void> {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permissions enabled:', authStatus);
  } else {
    Alert.alert('Notifications are disabled');
  }
}

async function getFcmToken(): Promise<string | null> {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.warn('No FCM token received');
      return null;
    }
  } catch (error) {
    console.error('Error fetching FCM token:', error);
    return null;
  }
}

const App: React.FC = () => {
  useEffect(() => {
    // Request permission and get token
    const initializeFCM = async () => {
      try {
        await requestUserPermission();
        const token = await getFcmToken();
        console.log('🔥 FCM Setup completed. Token:', token);
      } catch (error) {
        console.error('❌ Failed to initialize FCM:', error);
        Alert.alert('Error', 'Failed to initialize push notifications');
      }
    };
    initializeFCM();

    // Foreground message handler
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('📩 Foreground message received:', remoteMessage);
        Alert.alert(
          remoteMessage.notification?.title ?? 'New Message',
          remoteMessage.notification?.body ?? 'You have a new notification.'
        );
      }
    );

    // When app is opened from a background state
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Opened from background state:', remoteMessage.notification);
      }
    );

    // When app starts:
    messaging().subscribeToTopic('all');

    // When app is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
        if (remoteMessage) {
          console.log('Opened from quit state:', remoteMessage.notification);
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🔥 React Native Firebase Messaging (TypeScript)</Text>
    </View>
  );
};

export default App;
