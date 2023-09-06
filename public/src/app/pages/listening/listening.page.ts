import { Component, OnInit } from '@angular/core'
import { RangeCustomEvent } from '@ionic/angular'

let intervalId: any

const generateRandomRange = (min: number, max: number) => {
  return Math.floor((Math.random() * max) + min)
}

// const incrementTimer = (start: number, end: number, callback: () => void) => {
//   start++

//   if (start >= end) callback()
// }

@Component({
  selector: 'app-listening',
  templateUrl: './listening.page.html',
  styleUrls: ['./listening.page.scss'],
})
export class ListeningPage implements OnInit {

  paused: boolean = false
  onRepeat: boolean = false
  onShuffle: boolean = false
  endTime: number = 0
  startTime: number = 0
  songTitle: string = ''
  imgSrc: string = ''

  constructor () { }

  seekSong(event: Event) {
    const ev = (event as RangeCustomEvent).detail.value as number

    this.startTime = ev
  }

  playPause() {
    const incrementTimer = () => {
      this.startTime++

      if (this.startTime >= this.endTime) this.nextSong()
    }

    if (!this.paused) {
      intervalId = setInterval(incrementTimer, 1000)
    } else {
      clearInterval(intervalId)
    }

    this.paused = !this.paused
  }

  nextSong() {
    this.changeSong()
  }

  prevSong() {
    if (this.startTime > 0 && this.startTime < 3) this.startTime = 0
    else this.changeSong()
  }

  shuffle() {
    this.onShuffle = !this.onShuffle
  }

  repeat() {
    this.onRepeat = !this.onRepeat
  }

  moveSliderStart() {
    if (this.paused) {
      clearInterval(intervalId)
    }
  }

  moveSliderEnd() {
    if (this.paused) {
      const incrementTimer = () => {
        this.startTime++

        if (this.startTime >= this.endTime) this.nextSong()
      }

      intervalId = setInterval(incrementTimer, 1000)
    }
  }

  private changeSong() {
    this.songTitle = `Song: ${generateRandomRange(1, 25)}`
    this.startTime = 0
    this.endTime = generateRandomRange(10, 300)
    this.imgSrc = 'https://picsum.photos/300/300?random='
  }

  ngOnInit(): void {
    this.changeSong()
  }
}
