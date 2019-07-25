import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

export const appRoutes: Routes = [
  { path: 'manage', loadChildren: './pages/+manage/manage.module#ManageModule', canActivate: [AuthGuardService] },
  { path: 'register', loadChildren: './pages/+register/register.module#RegisterModule' },
  { path: 'login', loadChildren: './pages/+login/login.module#LoginModule' },
  { path: '', loadChildren: './pages/index/index.module#IndexModule' },
  // {path: '**', component: PageNotFoundComponent},
  { path: '**', loadChildren: './pages/+pageNotFound/page-not-found.module#PageNotFoundModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
