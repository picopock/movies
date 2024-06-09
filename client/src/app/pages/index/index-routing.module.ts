import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index.component';

export const childRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../+home/home.module').then(m => m.HomeModule) },
  { path: 'classify/:classify', loadChildren: () => import('../+classify/classify.module').then(m => m.ClassifyModule) },
  { path: 'detail/:id', loadChildren: () => import('../+detail/detail.module').then(m => m.DetailModule) },
];

export const routes: Routes = [
  { path: '', component: IndexComponent, children: childRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IndexRoutingModule { }
