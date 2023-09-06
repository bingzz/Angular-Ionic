import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumPlaylistPage } from './album-playlist.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumPlaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumPlaylistPageRoutingModule {}
