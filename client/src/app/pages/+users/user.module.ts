import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {UserRoutingModule} from './user-routing.module';
import {CardModule} from '../../components/card/card.module';
import {UserComponent} from './user.component';

import {UserService} from './user.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        UserRoutingModule
    ],
    declarations: [UserComponent],
    providers: [UserService]
})

export class UserModule {

}