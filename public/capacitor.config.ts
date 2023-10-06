import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'push.notif.android',
  appName: 'myApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
