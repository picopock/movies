


import { Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

export const routes: Routes = [
  { path: 'manage', loadChildren: () => import('./pages/+manage/manage.module').then(m => m.ManageModule), canActivate: [AuthGuardService] },
  { path: 'register', loadChildren: () => import('./pages/+register/register.module').then(m => m.RegisterModule) },
  { path: 'login', loadChildren: () => import('./pages/+login/login.module').then(m => m.LoginModule) },
  { path: '', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule) },
  // {path: '**', component: PageNotFoundComponent},
  { path: '**', loadChildren: () => import('./pages/+pageNotFound/page-not-found.module').then(m => m.PageNotFoundModule) }
];
