import { Component, OnInit, ViewChild } from '@angular/core'
import { InfiniteScrollCustomEvent, IonModal, ItemReorderEventDetail, RefresherCustomEvent, ToastController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  items: string[] = [];
  results: string[] = [];
  notFound: boolean = false;

  @ViewChild(IonModal) modal!: IonModal
  name: string = ''

  constructor (private toastController: ToastController) { }

  private generateItems() {
    const count = this.items.length + 1
    for (let i = 0; i < 50; i++) {
      const randomNumber = (Math.random() * i + count).toFixed(0)
      this.items.push(`Song ${randomNumber}`)
    }

    this.results = [...this.items]
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const fromIndex = ev.detail.from
    const toIndex = ev.detail.to

    const value = this.results.splice(fromIndex, 1)[0]
    this.results.splice(toIndex, 0, value)

    console.log('Dragged', value, 'from index', fromIndex, 'to', toIndex)

    ev.detail.complete()
  }

  handleRefresh(event: Event) {
    const ev = event as RefresherCustomEvent

    setTimeout(() => {
      console.log('List refreshed')

      this.items = []
      this.generateItems()
      ev.target.complete()
    }, 1500)
  }

  onIonInfinite(event: Event) {
    const ev = event as InfiniteScrollCustomEvent

    setTimeout(() => {
      console.log('Generate List')

      this.generateItems()
      ev.target.complete()
    }, 500)
  }

  handleInput(ev: Event) {
    const query = (ev.target as HTMLInputElement).value.toLowerCase().trim() ?? ''

    this.results = this.items.filter((item) => item.toLowerCase().indexOf(query) > -1)

    this.notFound = this.results.length === 0
  }

  cancelModal() {
    this.modal.dismiss(null, 'cancel')
  }

  async confirmModal() {
    if (!this.name) {
      const toast = await this.toastController.create(({
        message: 'Empty value',
        duration: 2000,
        position: 'bottom'
      }))

      toast.present()
      return
    }

    this.modal.dismiss(this.name, 'confirm')
    this.name = ''
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>

    if (ev.detail.role === 'confirm' && !!ev.detail.data) {
      // this.name = ev.detail.data
      // console.log('added', ev.detail.data)
      this.results.unshift(ev.detail.data)
    }
  }

  ngOnInit() {
    this.generateItems()
  }

}
