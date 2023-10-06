import { Injectable } from '@angular/core';
import { AlertButton, AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor (private loading: LoadingController, private alert: AlertController, private toast: ToastController) { }

  overlayDuration = 2000;

  async createLoading(message?: string) {
    return await this.loading.create({
      spinner: 'circles',
      message: message,
      translucent: true,
      backdropDismiss: false
    });
  }

  async createAlert(headerMsg?: string, message?: string, options?: (string | AlertButton)[]) {
    return await this.alert.create({
      header: headerMsg,
      message: message,
      buttons: options
    });
  }

  async createToast(message?: string) {
    return await this.toast.create({
      message: message,
      duration: this.overlayDuration,
      position: 'bottom'
    });
  }
}
