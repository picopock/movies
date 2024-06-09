import { Component, Input } from '@angular/core';

interface List {
  id: number;
  name: string;
  date: Date;
}
@Component({
  selector: 'app-ul',
  styleUrls: ['./ul.component.css'],
  templateUrl: './ul.component.html'
})
export class UlComponent {
  @Input() list!: Array<List>;
  @Input() _title!: string;

  trackByLists(index: number, item: List) {
    return item.id;
  }
}
