import {NgModule} from '@angular/core';

import {HomeComponent} from './home.component';
import {RotationComponent} from '../../components/rotation/rotation.component';

import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../../components/shared/shared.module';
import {CardListModule} from '../../components/cardList/cardList.module';
import {PaginationModule} from '../../components/pagination/pagination.module';

import {HomeService} from './home.service';

@NgModule({
    declarations: [
        HomeComponent,
        RotationComponent
    ],
    imports: [
        SharedModule,
        CardListModule,
        PaginationModule,
        HomeRoutingModule,
    ],
    providers: [HomeService]
})

export class HomeModule {

}