import { Component } from '@angular/core';
interface SiteLink {
  id: number;
  url: string;
  name: string;
}
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  siteLinks: Array<SiteLink> = [
    { id: 0, url: 'http://www.piaohua.com/', name: '飘花电影网' },
    { id: 1, url: 'http://www.dytt8.net/', name: '电影天堂' },
    { id: 2, url: 'http://www.6vhao.net/', name: '6V电影网' },
    { id: 3, url: 'http://blu-raydisc.tv/', name: '蓝光电影网' },
    { id: 4, url: 'http://movie.douban.com/', name: '豆瓣电影' },
    { id: 5, url: 'http://www.01fys.com/', name: '第一放映室' },
    { id: 6, url: 'http://www.dygang.com', name: '电影港' },
    { id: 7, url: 'http://www.2dy.cc/', name: '影音先锋' },
    { id: 8, url: 'http://www.1905.com/', name: '1905电影网' },
    { id: 9, url: 'http://dianying.2345.com/', name: '2345影视' }
  ];
  trackBySiteLinks(link: SiteLink) {
    return link.id;
  }
}
