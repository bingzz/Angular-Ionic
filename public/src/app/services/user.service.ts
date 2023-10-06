import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, NavController, ToastController } from '@ionic/angular';
import io, { Socket } from 'socket.io-client';
import { apiURL } from '../constants/constants';
import { ResponseData, User } from '../models/models';
import { ListenerService } from './listener.service';
import { OverlayService } from './overlay.service';
import { BehaviorSubject, Subject } from 'rxjs';

function clearCredentials() {
  localStorage.clear();
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginForm: FormGroup;
  user$: BehaviorSubject<string> = new BehaviorSubject('');
  private socket: Socket;

  constructor (private formBuilder: FormBuilder, private router: Router, private listener: ListenerService, private overlayService: OverlayService) {
    this.socket = io(apiURL);
    this.socket.onAny(this.listener.listen);

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async submitRegistration(registerForm: FormGroup) {
    try {
      const loading = await this.overlayService.createLoading();
      loading.present();

      this.socket
        .emit('register', registerForm.value)
        .on('register', async (results: ResponseData) => {
          try {
            loading.dismiss();
            this.socket.off('register');

            if (!!results.created) {
              this.router.navigate(['']);
              return;
            }

            const toast = await this.overlayService.createToast(results.message);
            toast.present();

          } catch (error) {
            console.error(error);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  async login() {
    try {
      const loading = await this.overlayService.createLoading('Logging in...');
      loading.present();

      this.socket
        .emit('login', this.loginForm.value)
        .on('login', async (results: ResponseData) => {
          try {
            if (results.code !== 200) throw new Error(results.message);

            localStorage.setItem('user', JSON.stringify(results.data));
            this.user$.next(results.data);

            await this.router.navigate(['/home']);
          } catch (error) {
            const options = ['OK'];
            const alert = await this.overlayService.createAlert('Login Failed', (error as Error).toString(), options);
            alert.present();
            console.error(error);
          } finally {
            this.socket.off('login');
            loading.dismiss();
          }
        });
      } catch (error) {
      console.error(error);

      const options = ['OK'];
      const alert = await this.overlayService.createAlert('Login Failed', (error as Error).toString(), options);
      alert.present();
    }
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
          // clear data and cache then navigate to login
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
    const user = localStorage.getItem('user');
    if (!user) return this.noUserFound();

    this.user$.next(JSON.parse(user));
  }

  async noUserFound() {
    // clear data and cache then navigate to login
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

    const alert = await this.overlayService.createAlert('No user', 'User does not exist. Redirecting back to login...', buttons);
    alert.present();
  }
}
