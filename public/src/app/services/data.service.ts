import { Injectable } from '@angular/core';
import { Album, ResponseData } from '../models/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { ListenerService } from './listener.service';
import { OverlayService } from './overlay.service';
import { Socket, io } from 'socket.io-client';
import { apiURL } from '../constants/constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket: Socket;
  albums$: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
  user$: string;

  constructor (private listenerService: ListenerService, private overlayService: OverlayService, private userService: UserService) {
    this.userService.checkUser();
    this.socket = io(apiURL);
    this.socket.onAny(this.listenerService.listen);
    this.user$ = this.userService.user$.getValue();
  }

  async getUserAlbums() {
    const loading = await this.overlayService.createLoading('Getting albums...');
    loading.present();

    try {
      this.socket
        .emit('getAlbums', this.user$)
        .on('getAlbums', async (results: ResponseData) => {
          try {
            if (results.code === 401) return this.userService.noUserFound();
            if (results.code !== 200) throw new Error(results.message);

            this.albums$.next(results.data);
          } catch (error) {
            console.error(error);

            const options = ['OK'];
            const alert = await this.overlayService.createAlert('Error', (error as Error).toString(), options);
            alert.present();
          } finally {
            this.socket.off('getAlbums');
            loading.dismiss();
          }
        });

    } catch (error) {
      console.error(error);
    }
  }

  async addUserAlbum() {

  }
}
