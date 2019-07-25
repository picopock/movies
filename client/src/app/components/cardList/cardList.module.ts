import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CardListComponent} from './cardList.component';
@NgModule({
    declarations: [CardListComponent],
    imports: [CommonModule, RouterModule],
    exports: [CardListComponent]
})

export class CardListModule {

}