import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-card-1',
    templateUrl: './card.component.html',
    styleUrls: ['../card.component.css', './card1.component.css']
})

export class Card1Component {
    @Input() data: any;
    @Input() edit: Function;
    @Input('del') del_movie: Function;
    @Input('showDetail') show_detail: Function;

    edit_movie(id: number) {
        this.edit(id);
    }
} 