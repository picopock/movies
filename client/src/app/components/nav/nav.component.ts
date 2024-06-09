import { Component } from '@angular/core';
import { Router } from '@angular/router';
export interface Nav {
  id: number;
  url: string;
  classify: string;
  title: string;
}

export const navList: Array<Nav> = [
  { id: 1, url: 'classify', classify: 'comedy', title: '喜剧' },
  { id: 2, url: 'classify', classify: 'action', title: '动作' },
  { id: 3, url: 'classify', classify: 'love', title: '爱情' },
  { id: 4, url: 'classify', classify: 'terror', title: '恐怖' },
  { id: 5, url: 'classify', classify: 'fiction', title: '科幻' },
  { id: 6, url: 'classify', classify: 'war', title: '战争' },
  { id: 7, url: 'classify', classify: 'documentary', title: '记录片' },
  { id: 8, url: 'classify', classify: 'story', title: '故事' },
  { id: 9, url: 'classify', classify: 'animation', title: '动画' },
  { id: 10, url: 'classify', classify: 'family', title: '家庭' },
  { id: 11, url: 'classify', classify: 'crime', title: '犯罪' },
  { id: 12, url: 'classify', classify: 'history', title: '历史' },
  { id: 13, url: 'classify', classify: 'costume', title: '古装' },
  { id: 14, url: 'classify', classify: 'ethics', title: '伦理' },
  { id: 15, url: 'classify', classify: 'suspense', title: '悬疑' },
  { id: 16, url: 'classify', classify: 'adventure', title: '冒险' },
  { id: 17, url: 'classify', classify: 'biography', title: '传记' }
];

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  // private selectedId: number = 0;
  navList: Array<Nav> = navList;

  trackByNavList(index: number, nav: Nav): number {
    return nav.id;
  }

  constructor(private router: Router) { }
}
