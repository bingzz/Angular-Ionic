import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  constructor () { }

  listen = (eventName: string, ...args: any) => {
    console.log(eventName, args)
  }
}
