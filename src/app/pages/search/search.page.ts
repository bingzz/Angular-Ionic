import { Component, OnInit, ViewChild } from '@angular/core'
import { AlertController, InfiniteScrollCustomEvent, IonModal, ItemReorderEventDetail, LoadingController, RefresherCustomEvent, ToastController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core'
import { AsyncService } from 'src/app/services/async.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  baseSongs: string[] = [];
  songs: string[] = [];
  notFound: boolean = false;

  @ViewChild(IonModal) modal!: IonModal
  name: string = ''

  actionSheetHeader = 'Do you want to remove all from the list?'
  actionSheetButtons = [
    {
      text: 'Remove All',
      role: 'destructive',
      handler: async () => {
        const loading = await this.loadingController.create({
          spinner: 'circles',
          message: 'Removing all items',
          translucent: true,
          backdropDismiss: false,
        })
        const alert = await this.alertController.create({
          header: 'Cleared',
          message: 'Cleared all lists',
          buttons: [
            {
              text: 'OK',
              role: 'cancel'
            }
          ]
        })

        loading.present()

        setTimeout(() => {
          this.songs = []
          this.baseSongs = []
          loading.dismiss()
          alert.present()
        }, 2000)
      }
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
  ]

  constructor (private toastController: ToastController, private loadingController: LoadingController, private alertController: AlertController, private asyncService: AsyncService) { }

  generateList() {
    this.asyncService.generateList(this.baseSongs, this.songs, 'Song')
  }

  refreshList(event: Event) {
    this.asyncService.refreshList(this.baseSongs, this.songs, 'Song', event)
  }

  reorderList(ev: CustomEvent<ItemReorderEventDetail>) {
    const fromIndex = ev.detail.from
    const toIndex = ev.detail.to

    const value = this.songs.splice(fromIndex, 1)[0]
    this.songs.splice(toIndex, 0, value)

    console.log('Dragged', value, 'from index', fromIndex, 'to', toIndex)

    ev.detail.complete()
  }

  onIonInfinite(event: Event) {
    const ev = event as InfiniteScrollCustomEvent

    setTimeout(() => {
      console.log('Generate List')

      this.generateList()
      ev.target.complete()
    }, 500)
  }

  searchList(ev: Event) {
    const search = (ev.target as HTMLInputElement).value.toLowerCase().trim() ?? ''

    this.asyncService.filterList(this.baseSongs, this.songs, search, this.notFound)
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

  async onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Adding to the list...',
      translucent: true,
      backdropDismiss: false,
    })
    const toast = await this.toastController.create(({
      message: 'Added!',
      duration: 2000,
      position: 'bottom'
    }))

    if (ev.detail.role === 'confirm' && !!ev.detail.data) {
      await loading.present()

      // setTimeout(async () => {
      //   await toast.present()
      //   loading.dismiss()
      //   this.results.unshift(ev.detail.data as string)
      // }, 2000)
    }
  }

  deleteSwipe(item: string, index: number) {
    console.log('Removed', item, 'at index', index)
    // this.results.splice(index, 1)
  }

  ngOnInit() {
    this.generateList()
  }

}
