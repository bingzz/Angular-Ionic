import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumPlaylistPageRoutingModule } from './album-playlist-routing.module';

import { AlbumPlaylistPage } from './album-playlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumPlaylistPageRoutingModule
  ],
  declarations: [AlbumPlaylistPage]
})
export class AlbumPlaylistPageModule {}
