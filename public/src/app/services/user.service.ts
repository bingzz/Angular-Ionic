import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController, AlertOptions, LoadingController, NavController, ToastController } from '@ionic/angular'
import io from 'socket.io-client'
import { apiURL } from '../constants/constants'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginForm: FormGroup
  loadingDuration = 2000
  private socket

  constructor (private formBuilder: FormBuilder, private navController: NavController, private alertController: AlertController, private loadingController: LoadingController, private toastController: ToastController, private router: Router) {

    this.socket = io(apiURL)
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  register() {
    this.loadingController.create({
      spinner: 'circles',
    })
      .then((loading) => {
        loading.present()

        setTimeout(() => {
          this.router.navigate(['/register']).then(() => loading.dismiss())
        }, this.loadingDuration)
      })
  }

  submitRegistration() {
    this.loadingController.create({
      spinner: 'circles',
    })
      .then((loading) => {
        loading.present()

        this.toastController.create({
          message: 'Successfully Registered',
          duration: this.loadingDuration,
          position: 'bottom',
        })
          .then((toast) => {
            setTimeout(() => {
              toast.present()
              this.router.navigate(['']).then(() => loading.dismiss())
            }, this.loadingDuration)
          })
      })

  }

  resetForm() {
    this.toastController.create({
      message: 'Login Cleared',
      duration: this.loadingDuration,
      position: 'bottom',
    })
      .then((toast) => {
        toast.present()
        this.loginForm.reset()
      })
  }

  login() {
    if (!this.loginForm.value) return

    this.socket.emit('login', this.loginForm.value)
    this.socket.on('login', (data) => {
      console.log(data);
    })
    // this.loadingController.create({
    //   spinner: 'circles',
    //   message: 'Logging in...',
    //   translucent: true,
    //   backdropDismiss: false,
    // }).then(loading => {
    //   loading.present()

    //   setTimeout(() => {
    //     this.router.navigate(['/home']).then(() => loading.dismiss())
    //   }, this.loadingDuration)
    // }).catch((err) => {
    //   this.alertController.create({
    //     header: 'Login Failed',
    //     message: 'Failed to Log In',
    //     buttons: ['OK']
    //   }).then(alert => {
    //     alert.present()
    //     console.error(err)
    //   })
    // })
  }

  logoutAlert() {

    const buttons: AlertOptions['buttons'] = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Logout',
        handler: () => {
          // clear data and cache then navigate to login

          this.loadingController.create({
            spinner: 'circles',
            message: 'Logging out...',
            translucent: true,
            backdropDismiss: false,
          })
            .then(loading => {
              loading.present()

              setTimeout(() => {
                loading.dismiss()

                this.router.navigate(['/'])
              }, this.loadingDuration)
            })
        }
      }
    ]

    this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: buttons
    }).then(alert => {
      alert.present()
    })
  }

}
