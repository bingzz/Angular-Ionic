import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';

/** Initialize Platform Config (for various devices) */

const getConfig = () => {
  let config = {
    animated: false,
    backButtonText: '',
    // tabButtonLayout: ''
  }

  if (isPlatform('iphone')) {
    config = {
      ...config,
      backButtonText: 'Go Back'
    }
  }

  // if (isPlatform('hybrid')) {
  //   config = {
  //     ...config,
  //     tabButtonLayout: 'label-hide'
  //   }
  // } else {
  //   config = {
  //     ...config,
  //     tabButtonLayout: 'icon-top'
  //   }
  // }

  return config
}

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, IonicModule.forRoot(getConfig()), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
