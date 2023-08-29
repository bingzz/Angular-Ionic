import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'home',
    component: NavbarComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listening'
      },
      {
        path: 'listening',
        loadChildren: () => import('./pages/listening/listening.module').then(m => m.ListeningPageModule)
      },
      {
        path: 'radio',
        loadChildren: () => import('./pages/radio/radio.module').then(m => m.RadioPageModule)
      },
      {
        path: 'library',
        loadChildren: () => import('./pages/library/library.module').then(m => m.LibraryPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
