import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/calendar', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'inicio',
    loadChildren: () => import('./views/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./views/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./views/components/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'asignar',
    loadChildren: () => import('./views/asignar/asignar.module').then( m => m.AsignarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
