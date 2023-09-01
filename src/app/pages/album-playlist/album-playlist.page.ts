import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

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

  constructor (private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.albumName = params['name']
      this.albumImg = params['img']
    })
  }

  generatePlaylist() {
    this.basePlaylist = []

    const randomNumber = Math.floor(Math.random() * 46) + 5

    for (let i = 1; i <= randomNumber; i++ ) {
      this.basePlaylist.push(`Song ` + i)
    }

    this.playlist = this.basePlaylist
  }

  filterSongs(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase().trim() ?? ''

    this.playlist = this.basePlaylist.filter(song => song.toLowerCase().indexOf(value) > -1)
  }

  ngOnInit() {

    this.generatePlaylist()
  }

}
