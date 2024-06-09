import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageComponent } from './manage.component';
import { MoviesComponent } from '../movies/movies.component';

export const manageChildRoutes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'user', loadChildren: () => import('../+users/user.module').then(m => m.UserModule) }
];

export const manageRoutes: Routes = [
  { path: '', component: ManageComponent, children: manageChildRoutes }
];

@NgModule({
  imports: [
    RouterModule.forChild(manageRoutes)
  ],
  exports: [RouterModule]
})

export class ManageRoutingModule {

}
