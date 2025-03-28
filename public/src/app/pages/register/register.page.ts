import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailRegex } from 'src/app/constants/constants';
import { ResponseData } from 'src/app/models/models';
import { ListenerService } from 'src/app/services/listener.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  defaultHref = '/';

  constructor (private userService: UserService, private formBuilder: FormBuilder, private overlayService: OverlayService, private socket: SocketService, private router: Router, private listener: ListenerService) {
    this.socket.socketIO().onAny(this.listener.listen);

    this.registerForm = this.formBuilder.group({
      username: ['bingz', [Validators.required, Validators.minLength(3)]],
      email: ['bingz@email.com', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['password', [Validators.required, Validators.minLength(8)]],
    });
  }

  get errorControl() {
    return this.registerForm.controls;
  }

  async register() {
    if (!this.registerForm.valid) {
      const toast = await this.overlayService.createToast('Incorrect values');
      toast.present();
      return;
    }

    const loading = await this.overlayService.createLoading();
    loading.present();

    try {
      this.socket.socketIO()
        .emit('register', this.registerForm.value)
        .on('register', async (results: ResponseData) => {
          try {
            if (results.code !== 201) throw new Error(results.message);

            if (!!results.created) this.router.navigate(['']);

            const toast = await this.overlayService.createToast(results.message);
            toast.present();
          } catch (error) {
            const errMsg = (error as Error).message;
            const toast = await this.overlayService.createToast(errMsg);

            toast.present();
            console.error(errMsg);
          } finally {
            this.socket.socketIO().off('register');
            loading.dismiss();
          }
        });
    } catch (error) {
      const errMsg = (error as Error).message;
      const options = ['OK'];
      const alert = await this.overlayService.createAlert('Register Error', errMsg, options);

      alert.present();
      console.error(error);
    }
  }

}
