import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';

// custom components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: AuthGuardService,
      useClass: AuthGuardService,
      deps: [Router, AuthService]
    },
    AuthService
  ]
})
export class AppModule { }
