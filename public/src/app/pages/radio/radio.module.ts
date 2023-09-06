import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RadioPageRoutingModule } from './radio-routing.module';

import { RadioPage } from './radio.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RadioPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: RadioPage
      }
    ])
  ],
  declarations: [RadioPage]
})
export class RadioPageModule { }
