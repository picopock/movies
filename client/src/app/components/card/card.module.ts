import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Card1Component} from './card.1/card.component';
import {Card2Component} from './card.2/card.component';
import {Card3Component} from './card.3/card.component';
@NgModule({
    imports: [CommonModule],
    declarations: [
        Card1Component,
        Card2Component,
        Card3Component
    ],
    exports: [
        Card1Component,
        Card2Component,
        Card3Component
    ]
})

export class CardModule {
    
}