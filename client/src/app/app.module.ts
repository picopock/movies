import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

// custom components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule],
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
export class AppModule {}
