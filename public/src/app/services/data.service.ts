import { Injectable } from '@angular/core';
import { Album, ResponseData, User } from '../models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListenerService } from './listener.service';
import { OverlayService } from './overlay.service';
import { UserService } from './user.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  albums$: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);

  constructor (private listenerService: ListenerService, private overlayService: OverlayService, private userService: UserService, private socket: SocketService) {
    this.socket.socketIO().onAny(this.listenerService.listen);
  }

  getUserAlbums(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.socket.socketIO()
          .emit('getAlbums', this.userService.user$.getValue())
          .on('getAlbums', async (results: ResponseData) => {
            try {
              if (results.code === 401) return this.userService.noUserFound();
              if (results.code !== 200) throw new Error(results.message);

              this.albums$.next(results.data);
              resolve(true);
            } catch (error) {
              const errMsg = (error as Error).message;
              const options = ['OK'];
              const alert = await this.overlayService.createAlert('Error', errMsg, options);

              alert.present();
              resolve(false);
              console.error(error);
            } finally {
              this.socket.socketIO().off('getAlbums');
            }
          });
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  }

  addUserAlbum(album: Album): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.socket.socketIO()
          .emit('addAlbum', album, this.userService.user$.getValue())
          .on('addAlbum', async (results: ResponseData) => {
            try {
              if (results.code === 401) return this.userService.noUserFound();
              if (results.code !== 201) throw new Error(results.message);

              const toast = await this.overlayService.createToast(results.message);
              toast.present();

              this.getUserAlbums();
              resolve(true);
            } catch (error) {
              const options = ['OK'];
              const alert = await this.overlayService.createAlert('Failed to add Album', (error as Error).toString(), options);
              alert.present();

              console.error(error);
              resolve(false);
            } finally {
              this.socket.socketIO().off('addAlbum');
            }
          });
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  }

  async deleteUserAlbum(album: Album): Promise<boolean> {
    return await false;
  }
}
