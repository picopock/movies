import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { LoginService } from './login.service';
import { AuthService } from '../../auth/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [FormsModule, ReactiveFormsModule, LoginRoutingModule],
  providers: [
    {
      provide: LoginService,
      useClass: LoginService,
      deps: [AuthService, HttpClient]
    }
  ]
})
export class LoginModule {}
