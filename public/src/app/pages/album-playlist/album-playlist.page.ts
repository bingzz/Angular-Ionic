import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AsyncService } from 'src/app/services/async.service'

@Component({
  selector: 'app-album-playlist',
  templateUrl: './album-playlist.page.html',
  styleUrls: ['./album-playlist.page.scss'],
})
export class AlbumPlaylistPage implements OnInit {

  // Action Sheet
  actionHeader = 'Sort Playlist by'
  actionButtons = [
    {
      text: 'Title',
      handler: () => {
        this.playlist = this.playlist.reverse()
      }
    }
  ]

  // Go back
  defaultHref: string = '/home/library'

  // Playlist variables
  albumName: string = ''
  albumImg: string = ''
  basePlaylist: string[] = []
  playlist: string[] = []
  notFound: boolean = false

  constructor (private activatedRoute: ActivatedRoute, private asyncService: AsyncService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.albumName = params['name']
      this.albumImg = params['img']
    })
  }

  generatePlaylist() {
    this.asyncService.generateList(this.basePlaylist, this.playlist, 'song')
  }

  filterSongs(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase().trim() ?? ''

    this.asyncService.filterList(this.basePlaylist, this.playlist, value, this.notFound)
  }

  ngOnInit() {
    this.generatePlaylist()
  }

}
