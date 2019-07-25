import {NgModule} from '@angular/core';

import {ClassifyComponent} from './classify.component';
import {BreadcrumbComponent} from '../../components/breadcrumb/breadcrumb.component';

import {ClassifyRoutingModule} from './classify-routing.module';
import {SharedModule} from '../../components/shared/shared.module';
import {CardListModule} from '../../components/cardList/cardList.module';
import {PaginationModule} from '../../components/pagination/pagination.module';

import {ClassifyService} from './classify.service';

@NgModule({
    declarations: [
        ClassifyComponent,
        BreadcrumbComponent
    ],
    imports: [
        SharedModule,
        CardListModule,
        PaginationModule,
        ClassifyRoutingModule
    ],
    providers: [ClassifyService]
})

export class ClassifyModule {

}