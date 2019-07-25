import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { removeSessionStorage } from '../../../utils/cache';

export interface Link {
  id: number;
  title: string;
  icon: string;
  href: string;
}

@Component({
  selector: 'nav-v',
  styleUrls: ['./nav.component.css'],
  templateUrl: './nav.component.html'
})
export class NavVComponent {
  router: any;
  constructor(router: Router) {
    this.router = router;
  }

  links = [
    { id: 0, title: 'Home', icon: 'home', href: '/home' },
    { id: 1, title: 'Movies', icon: 'film', href: '/manage/movies' },
    { id: 2, title: 'User', icon: 'user', href: '/manage/user' },
    { id: 3, title: 'Message', icon: 'cog', href: '/home' }
  ];
  trackByLinks(index: number, link: Link): number {
    return link.id;
  }

  logOut(): void {
    removeSessionStorage('token');
    removeSessionStorage('user');
    this.router.navigate(['/home']);
  }
}
