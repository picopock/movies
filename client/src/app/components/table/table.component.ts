import {Component, Input} from '@angular/core';

export interface Column {
    id: number;
    field: string;
    title: string;
    [PropName: string]: string | number;
}
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent {
    @Input() columns: Column[];
    @Input() data: any[];

    trackByTable(index: number, item: any): number {
        return item.id;
    }
    
}