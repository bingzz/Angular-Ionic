import { Injectable } from '@angular/core'
import { AlertController, InfiniteScrollCustomEvent, ItemReorderEventDetail, LoadingController, RefresherCustomEvent, ToastController } from '@ionic/angular'

interface AlertButtons {
  text: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AsyncService {

  constructor (private toastController: ToastController, private loadingController: LoadingController, private alertController: AlertController) { }

  generateList(mainList: string[], list: string[], type: string) {
    const randomNumber = Math.floor(Math.random() * 46) + 5

    mainList.length = 0

    for (let i = 1; i <= randomNumber; i++) {
      mainList.push(`${type.toUpperCase()} ${i}`)
    }

    list.push(...mainList)
  }

  filterList(mainList: string[], list: string[], searchString: string, existing: boolean) {
    list.length = 0

    list.push(...mainList.filter(item => item.toLowerCase().indexOf(searchString) > -1))

    existing = list.length === 0
  }

  refreshList(mainList: string[], list: string[], name: string, event: Event) {
    const ev = event as RefresherCustomEvent

    setTimeout(() => {
      list.length = 0
      this.generateList(mainList, list, name)

      ev.target.complete()
    }, 2000)
  }

  deleteItem() {

  }

  reorderItem(event: CustomEvent<ItemReorderEventDetail>) {

  }

  infiniteScroll(event: CustomEvent<InfiniteScrollCustomEvent>) {

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
