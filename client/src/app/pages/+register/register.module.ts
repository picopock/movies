import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

import { RegisterRoutingModule } from './register-routing.module';

import { RegistryService } from './register.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    ReactiveFormsModule,
    RegisterRoutingModule
  ],
  providers: [RegistryService]
})

export class RegisterModule {

}
