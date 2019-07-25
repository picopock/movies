import {Component, Input} from '@angular/core';

interface List {
    id: number;
    name: string;
    date: Date;
}
@Component({
    selector: 'app-ol',
    styleUrls: ['./ol.component.css'],
    templateUrl: './ol.component.html'
})

export class OlComponent {
    @Input() list: Array<List>;
    @Input() _title: string;

    trackByList(item: List) {
        return item.id;
    }
}