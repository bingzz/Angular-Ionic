import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailRegex } from 'src/app/constants/constants';
import { NotificationService } from 'src/app/services/notification.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  defaultHref = '/';

  constructor (private userService: UserService, private formBuilder: FormBuilder, private overlayService: OverlayService, private notification: NotificationService) {
    this.notification.checkPlatform();
    this.registerForm = this.formBuilder.group({
      username: ['bingz', [Validators.required, Validators.minLength(3)]],
      email: ['bingz@email.com', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['password', [Validators.required, Validators.minLength(8)]],
    });
  }

  async register() {
    if (!this.registerForm.valid) {
      const toast = await this.overlayService.createToast('Incorrect values');
      toast.present();
      return;
    }

    this.userService.submitRegistration(this.registerForm);
  }

  get errorControl() {
    return this.registerForm.controls;
  }

}
