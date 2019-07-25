import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {IndexComponent} from './index.component';
import {HeaderComponent} from '../../components/header/header.component';
import {NavComponent} from '../../components/nav/nav.component';
import {FooterComponent} from '../../components/footer/footer.component';

import {IndexRoutingModule} from './index-routing.module';

import {IndexService} from './index.service';

@NgModule({
    declarations: [
        IndexComponent,
        HeaderComponent,
        NavComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        IndexRoutingModule
    ],
    providers: [IndexService]
})

export class IndexModule {

}