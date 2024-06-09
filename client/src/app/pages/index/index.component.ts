import { Component } from '@angular/core';
import { IndexService } from './index.service';
import { User } from './index.interface';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  isLogin: boolean = false;
  user: User | null = null;
  constructor(private indexService: IndexService) {
    this.getUser();
  }

  getUser() {
    this.isLogin = this.indexService.isLogin();
    this.user = this.indexService.getCurUser();
  }

  // ngAfterViewChecked() {
  //   console.log('change getUser');
  //   this.getUser();
  //   console.log('isLogin: ', this.isLogin);
  //   console.log('user: ', this.user);
  // }
}
