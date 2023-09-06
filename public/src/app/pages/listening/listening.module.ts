import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ListeningPageRoutingModule } from './listening-routing.module'

import { ListeningPage } from './listening.page'
import { RouterModule } from '@angular/router'
import { TimerPipe } from 'src/app/pipes/timer.pipe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeningPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListeningPage
      }
    ])
  ],
  exports: [TimerPipe],
  declarations: [ListeningPage, TimerPipe]
})
export class ListeningPageModule { }
