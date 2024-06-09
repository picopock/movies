import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-3',
  templateUrl: './card.component.html',
  styleUrls: ['../card.component.css', './card3.component.css']
})
export class Card3Component {
  @Input() data!: any;
  @Input('edit') edit_movie!: Function;
  @Input('del') del_movie!: Function;
  @Input('detail') show_detail!: Function;
}
