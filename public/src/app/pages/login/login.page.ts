import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup

  constructor (private userService: UserService) {
    this.loginForm = userService.loginForm
  }

  get errorControl() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.userService.login()
  }

  clear() {
    this.userService.resetForm()
  }

  register() {
    this.userService.register()
  }
}
