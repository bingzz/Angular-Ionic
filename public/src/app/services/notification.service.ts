import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { LocalNotificationSchema, LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';

async function sendNotification() {
  const notifs = await LocalNotifications.schedule({
    notifications: [
      {
        id: 1,
        title: 'New Notification',
        body: 'Local Notification',
        schedule: { at: new Date(Date.now() + 1000 * 5) }
      }
    ]
  });

  console.log('Scheduled local notification:', notifs);
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  isPushNotificationsAvailable: boolean;

  constructor (private platform: Platform) {
    this.isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

    if (this.isPushNotificationsAvailable) this.initialize();
    // if (this.platform.is('ios') || this.platform.is('android')) {
    //   this.initialize();
    // }
  }

  initialize() {
    // Request permission to use push Notifications
    // iOS will prompt the user and return if they granted permission or not
    // Android will grand without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('cannot request permissions');
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
      console.log(token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
      console.error(error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
      console.log(notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Push action performed' + JSON.stringify(notification));
      console.log(notification);
    });
  }

  pushNotificationTest() {
    if (!this.isPushNotificationsAvailable) return;

    // attempt to send a push notification
    sendNotification();

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      alert('Push Notification Received: ' + JSON.stringify(notification));
    });
  }
}
