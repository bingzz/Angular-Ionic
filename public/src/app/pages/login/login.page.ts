import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData, User } from 'src/app/models/models';
import { ListenerService } from 'src/app/services/listener.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor (private userService: UserService, private notification: NotificationService, private overlayService: OverlayService, private router: Router, private socket: SocketService, private formBuilder: FormBuilder, private listener: ListenerService) {
    this.socket.socketIO().onAny(this.listener.listen);

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  async login() {
    const loading = await this.overlayService.createLoading('Logging in...');
    loading.present();

    try {
      this.socket.socketIO()
        .emit('login', this.loginForm.value)
        .on('login', async (results: ResponseData) => {
          try {
            if (results.code !== 200) throw new Error(results.message);

            localStorage.setItem('user', JSON.stringify(results.data));
            this.userService.user$.next(results.data as User);

            await this.router.navigate(['/home']);
          } catch (error) {
            const errMsg = (error as Error).message;
            const options = ['OK'];
            const alert = await this.overlayService.createAlert('Login Failed', errMsg, options);

            alert.present();
            console.error(error);
          } finally {
            this.socket.socketIO().off('login');
            loading.dismiss();
          }
        });
    } catch (error) {
      const errMsg = (error as Error).message;
      const options = ['OK'];
      const alert = await this.overlayService.createAlert('Login Failed', errMsg, options);

      alert.present();
      console.error(error);
    }
  }

  async clear() {
    const toast = await this.overlayService.createToast('Login Cleared');
    toast.present();
    this.loginForm.reset();
  }

  async register() {
    try {
      const loading = await this.overlayService.createLoading();
      loading.present();

      setTimeout(() => {
        this.router.navigate(['/register']).then(() => loading.dismiss());
      }, this.overlayService.overlayDuration);
    } catch (error) {
      console.error(error);
    }
  }

  testPushNotification() {
    console.log('Push notification');
    this.notification.pushNotificationTest()
  }
}
