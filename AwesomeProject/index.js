/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(
  async (remoteMessage) => {
    console.log('📩 Message handled in the background:', remoteMessage);
  }
);

import * as Clarity from '@microsoft/react-native-clarity';

Clarity.initialize('u3ssrdmkrx', {
  logLevel: Clarity.LogLevel.None, // Note: Use "LogLevel.Verbose" value while testing to debug initialization issues.
});

AppRegistry.registerComponent(appName, () => App);
