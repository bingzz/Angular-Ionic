import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(timer: number): string {
    const min = Math.floor(timer / 60)
    const sec = ('00' + (timer % 60)).slice(-2)

    return `${min}:${sec}`
  }

}
