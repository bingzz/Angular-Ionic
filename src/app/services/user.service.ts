import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginForm: FormGroup

  loadingDuration = 2000

  constructor (private formBuilder: FormBuilder, private navController: NavController, private alertController: AlertController, private loadingController: LoadingController, private toastController: ToastController) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async register() {
    this.navController.navigateForward('/register')
  }

  async resetForm() {
    const toast = await this.toastController.create({
      message: 'Login Cleared',
      duration: this.loadingDuration,
      position: 'bottom',
    })

    this.loginForm.reset()
    toast.present()
  }

  async login() {
    if (!this.loginForm.value) return
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Logging in...',
      translucent: true,
      backdropDismiss: false,
    })

    await loading.present()

    setTimeout(async () => {
      loading.dismiss()

      /** If Login has Failed, use this
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Failed to Log In',
        buttons: ['OK']
      })

      alert.present() **/

      this.navController.navigateForward('/home')
      // this.router.navigate(['/home'])
    }, this.loadingDuration)
  }

  async logoutAlert() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Logout',
          handler: async () => {
            // clear data and cache then navigate to login

            const loading = await this.loadingController.create({
              spinner: 'circles',
              message: 'Logging out...',
              translucent: true,
              backdropDismiss: false,
            })

            await loading.present()

            setTimeout(() => {
              loading.dismiss()

              this.navController.navigateBack('/')
              // this.router.navigate(['/'])
            }, this.loadingDuration)
          }
        }
      ]
    })

    await alert.present()
  }

}
