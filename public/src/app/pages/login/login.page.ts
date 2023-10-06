import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor (private userService: UserService, private notification: NotificationService, private overlayService: OverlayService, private router: Router) {
    this.notification.checkPlatform();
    this.loginForm = userService.loginForm;
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.userService.login();
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
}
