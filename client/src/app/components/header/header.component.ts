import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { removeSessionStorage } from '../../../utils/cache';
import { User } from '../../pages/index/index.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLogin!: boolean;
  @Input() user!: User | null;
  name: string = '';
  login: boolean = false;
  router: any;
  constructor(router: Router) {
    this.router = router;
    if (!!this.user) {
      this.name = this.user.nickname || this.user.username || '';
    }
  }

  ngOnInit() {
    this.login = this.isLogin;
    if (!!this.user) {
      this.name = this.user.nickname || this.user.username || '';
    }
  }

  logOut(): void {
    this.login = false;
    this.user = null;
    removeSessionStorage('token');
    removeSessionStorage('user');
    this.router.navigate(['/home']);
  }
}
