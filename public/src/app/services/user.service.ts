import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertOptions } from '@ionic/angular';
import { OverlayService } from './overlay.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/models';

function clearCredentials() { // clear data and cache
  localStorage.clear();
  sessionStorage.clear();
  const cookies = document.cookie.split(';');

  if (!cookies.length) return;

  // clear cookies
  for (let cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null!);

  constructor (private router: Router, private overlayService: OverlayService) {
    this.checkUser();
  }

  async logout() {
    const buttons: AlertOptions['buttons'] = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Logout',
        handler: async () => {
          clearCredentials();

          const loading = await this.overlayService.createLoading('Logging out...');
          loading.present();

          setTimeout(() => {
            loading.dismiss();
            this.router.navigate(['/']);
          }, this.overlayService.overlayDuration);
        }
      }
    ];

    const alert = await this.overlayService.createAlert('Logout', 'Do you want to log out?', buttons);
    alert.present();
  }

  async checkUser() {
    if (this.router.url.split('/').pop() === '') return;

    const user = localStorage.getItem('user');
    if (!user) return this.noUserFound();

    this.user$.next(JSON.parse(user) as User);
  }

  async noUserFound() {
    clearCredentials();

    const buttons: AlertOptions['buttons'] = [
      {
        text: 'OK',
        handler: async () => {
          const loading = await this.overlayService.createLoading('Exiting...');
          loading.present();

          setTimeout(() => {
            loading.dismiss();
            this.router.navigate(['/']);
          }, this.overlayService.overlayDuration);
        }
      }
    ];

    const alert = await this.overlayService.createAlert('No user', 'User is no longer in session. Redirecting back to login...', buttons);
    alert.present();
  }
}
