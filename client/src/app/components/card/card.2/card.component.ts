import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-2',
  templateUrl: './card.component.html',
  styleUrls: ['../card.component.css', './card2.component.css']
})

export class Card2Component {
  @Input() userInfo!: any;
  @Input('edit') edit_user!: Function;
  @Input('del') del_user!: Function;
}
