import {NgModule} from '@angular/core';

import {DetailComponent} from './detail.component'; 

import {DetailRoutingModule} from './detail-routing.module';
import {SharedModule} from '../../components/shared/shared.module';

import {DetailService} from './detail.service';

@NgModule({
    declarations: [
        DetailComponent
    ],
    imports: [
        SharedModule,
        DetailRoutingModule
    ],
    providers: [DetailService]
})

export class DetailModule {

}