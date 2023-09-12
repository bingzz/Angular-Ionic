import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController, AlertOptions, LoadingController, NavController, ToastController } from '@ionic/angular'
import io, { Socket } from 'socket.io-client'
import { apiURL } from '../constants/constants'
import { ResponseData } from '../models/models'
import { ListenerService } from '../listener.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginForm: FormGroup
  loadingDuration = 2000
  private socket: Socket

  constructor (private formBuilder: FormBuilder, private navController: NavController, private alertController: AlertController, private loadingController: LoadingController, private toastController: ToastController, private router: Router, private listener: ListenerService) {

    this.socket = io(apiURL)
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.socket.onAny(listener.listen)
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

  async submitRegistration(registerForm: FormGroup) {

    const loading = await this.loadingController.create({
      spinner: 'circles'
    })

    try {
      await loading.present()

      this.socket
        .emit('register', registerForm.value)
        .on('register', async (results: ResponseData) => {
          try {
            await loading.dismiss()
            this.socket.off('register')

            const toast = await this.toastController.create({
              message: results.message,
              duration: this.loadingDuration,
              position: 'bottom',
            })

            await toast.present()
            if (results.created) {
              this.router.navigate([''])
            }

          } catch (error) {
            console.error(error)
          }
        })
    } catch (error) {
      console.error(error)
    } finally {
      await loading.dismiss()
    }
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

  async login() {
    if (!this.loginForm.value) return

    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Logging in...',
      translucent: true,
      backdropDismiss: false,
    })

    try {
      await loading.present()
      this.socket
        .emit('login', this.loginForm.value)
        .on('login', async (results: ResponseData) => {
          try {
            this.socket.off('login')
            if (results.code !== 200) throw new Error(results.message)

            await this.router.navigate(['/home'])
          } catch (error) {
            const alert = await this.alertController.create({
              header: 'Login Failed',
              message: (error as Error).toString(),
              buttons: ['OK']
            })

            await alert.present()
            console.error(error)
          }
        })
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: (error as Error).toString(),
        buttons: ['OK']
      })

      await alert.present()
      console.error(error)
    } finally {
      await loading.dismiss()
    }
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
