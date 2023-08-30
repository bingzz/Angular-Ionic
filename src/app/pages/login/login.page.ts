import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup

  constructor(private userService: UserService) {
    this.loginForm = userService.loginForm
  }

  onSubmit() {
    this.userService.login()
  }

  async clear() {
    this.userService.resetForm()
  }

  ngOnInit() {
  }

}
