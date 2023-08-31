import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { LibraryPageRoutingModule } from './library-routing.module'

import { LibraryPage } from './library.page'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LibraryPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: LibraryPage
      },
      {
        path: ':album',
        loadChildren: () => import('../album-playlist/album-playlist.module').then(m => m.AlbumPlaylistPageModule)
      },
    ])
  ],
  declarations: [LibraryPage]
})
export class LibraryPageModule { }
