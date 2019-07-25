import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {OlComponent} from '../ol/ol.component';
import {UlComponent} from '../ul/ul.component';
@NgModule({
    declarations: [
        OlComponent,
        UlComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        OlComponent,
        UlComponent,
        RouterModule
    ]
})

export class SharedModule {

}