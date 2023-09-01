import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RefresherCustomEvent } from '@ionic/angular'
import { AsyncService } from 'src/app/services/async.service'

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  baseAlbums: Album[] = []
  albums: Album[] = []
  notFound: boolean = false

  constructor (private asyncService: AsyncService, private router: Router) { }

  generateAlbums() {
    this.baseAlbums = []
    const count = this.baseAlbums.length + 1

    for (let i = 0; i < 20; i++) {
      this.baseAlbums.push({
        id: `${count + i}`,
        name: 'Album ' + (count + i),
        img: 'https://picsum.photos/150/150?random=' + i
      })
    }

    this.albums = this.baseAlbums
  }

  refreshAlbums(event: Event) {
    const ev = event as RefresherCustomEvent

    setTimeout(() => {
      this.generateAlbums()
      ev.target.complete()

      console.log('Albums refreshed')
    }, 1500)
  }

  filterAlbums(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase().trim() ?? ''

    this.albums = this.baseAlbums.filter(album => album.name.toLowerCase().indexOf(value) > -1)
  }

  selectAlbum(album: Album) {
    // redirect to this url /home/library/<album_name>
    if (!Object.keys(album).length) return

    this.router.navigate(['/home/library/', `${album.id}/`], {
      queryParams: album
    })
  }

  deleteAlbum(album: string) {

  }

  updateAlbum(album: string) {

  }

  ngOnInit(): void {
    this.generateAlbums()
  }
}

interface Album {
  id: string,
  name: string,
  img: string
}
