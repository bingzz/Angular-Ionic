import { Injectable } from '@angular/core'
import { AlertController, InfiniteScrollCustomEvent, ItemReorderEventDetail, LoadingController, RefresherCustomEvent, ToastController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core'

@Injectable({
  providedIn: 'root'
})
export class AsyncService {

  constructor (private toastController: ToastController, private loadingController: LoadingController, private alertController: AlertController) { }

  refreshList(event: Event) {
    const ev = event as RefresherCustomEvent

    setTimeout(() => {
      console.log('List Refreshed');

      ev.target.complete()
    }, 2000);
  }

  deleteItem() {

  }

  reorderItem(event: CustomEvent<ItemReorderEventDetail>) {

  }

  infiniteScroll(event: CustomEvent<InfiniteScrollCustomEvent>) {

  }

  async addItem(event: CustomEvent<OverlayEventDetail<string>>) {

  }

  private async createAlertMessage(header: string, message: string, buttons: AlertButtons[]): Promise<HTMLIonAlertElement> {
    return await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons
    })
  }

  private async createToastMessage(message: string, duration: number, position: "top" | "bottom" | "middle" | undefined): Promise<HTMLIonToastElement> {
    return await this.toastController.create(({
      message: message,
      duration: duration,
      position: position
    }))
  }

  private async createLoading(message: string): Promise<HTMLIonLoadingElement> {
    return await this.loadingController.create(({
      message: message,
      spinner: 'circles',
      translucent: true,
      backdropDismiss: false
    }))
  }
}

interface AlertButtons {
  text: string,
  role: string
}
