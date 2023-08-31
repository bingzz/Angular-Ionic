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
  albums: Albums[] = []
  notFound: boolean = false

  constructor (private asyncService: AsyncService, private router: Router) { }

  generateAlbums() {
    this.albums = []
    const count = this.albums.length + 1

    for (let i = 0; i < 20; i++) {
      this.albums.push({
        id: count + i,
        name: 'Album ' + (count + i),
        img: 'https://picsum.photos/80/80?random=' + i
      })
    }
  }

  refreshAlbums(event: Event) {
    const ev = event as RefresherCustomEvent

    setTimeout(() => {
      this.generateAlbums()
      ev.target.complete()

      console.log('Albums refreshed')
    }, 1500)
  }

  filterAlbums() {

  }

  selectAlbum(albumId: number) {
    // redirect to this url /home/library/<album_name>
    if (!albumId) return

    this.router.navigate(['/home/library/', albumId])
  }

  deleteAlbum(album: string) {

  }

  updateAlbum(album: string) {

  }

  ngOnInit(): void {
    this.generateAlbums()
  }
}

interface Albums {
  id: number,
  name: string,
  img: string
}
