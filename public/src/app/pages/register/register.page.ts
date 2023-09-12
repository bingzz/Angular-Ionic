import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service'

const emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'
const mobileRegex = '^[0-9]+$'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup
  defaultHref = '/'

  constructor (private userService: UserService, private formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      username: ['userName', [Validators.required, Validators.minLength(3)]],
      email: ['test@email.com', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['password', [Validators.required, Validators.minLength(8)]],
    })
  }

  get errorControl() {
    return this.registerForm.controls
  }

  register() {
    if (!this.registerForm.valid) {
      console.log('Incorrect values')
      return
    }

    this.userService.submitRegistration(this.registerForm)
  }

}
