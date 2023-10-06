import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor (private platform: Platform) { }

  async checkPlatform() {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

    if (isPushNotificationsAvailable) this.initialize();
    // if (this.platform.is('ios') || this.platform.is('android')) {
    //   this.initialize();
    // }
  }

  initialize() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('cannot request permissions');
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Push action performed' + JSON.stringify(notification));
    });
  }
}
