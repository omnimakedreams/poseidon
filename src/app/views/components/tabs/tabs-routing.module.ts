import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children : [
      {
        path: 'calendar',
        loadChildren : '../../inicio/inicio.module#InicioPageModule'
      },{
        path: 'cash',
        loadChildren : '../../inicio/inicio.module#InicioPageModule'
      },
      {
        path: 'person',
        loadChildren : '../../inicio/inicio.module#InicioPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
