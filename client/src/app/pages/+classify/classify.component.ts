import { Component } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { navList, Nav } from '../../components/nav/nav.component';

import { Card } from '../../components/cardList/cardList.interface';

import { ClassifyService } from './classify.service';
interface List {
  id: number;
  name: string;
  date: Date;
}

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent {
  constructor(private route: ActivatedRoute, private classifyService: ClassifyService) {
    this.route.params.subscribe((params: Params) => {
      this.classify = params['classify'];
      this.initClassifyData();
    });

    this.getCurPageData = this.getCurPageData.bind(this);
  }

  classify: string;
  total: number = 0;
  limit: number = 20;
  curPage: number = 1;
  title: string = '热门排行榜';
  navList: Array<Nav> = navList;
  hotLists: List[] = [] /*[
        {id: 0, name: '临时雇员/临时工', date: new Date('2016/04/18')},
        {id: 1, name: '同城邂逅HD1280', date: new Date('2016/04/17')},
        {id: 2, name: '不速之客HD1280', date: new Date('2016/04/16')},
        {id: 3, name: '无声夜/安静', date: new Date('2016/04/15')},
        {id: 4, name: '喜乐长安HD1280', date: new Date('2016/04/14')},
        {id: 5, name: '左州自救兄弟', date: new Date('2016/04/13')},
        {id: 6, name: '普朗克斯/坎卜斯', date: new Date('2016/04/12')},
        {id: 7, name: '女巫HD1280', date: new Date('2016/04/11')},
        {id: 8, name: '灵偶契约HD1280', date: new Date('2016/04/10')},
        {id: 9, name: '真命天子BD1280', date: new Date('2016/04/9')},
        {id: 10, name: '临时雇员/临时工', date: new Date('2016/04/18')},
        {id: 11, name: '同城邂逅HD1280', date: new Date('2016/04/17')},
        {id: 12, name: '不速之客HD1280', date: new Date('2016/04/16')},
        {id: 13, name: '无声夜/安静', date: new Date('2016/04/15')},
        {id: 14, name: '喜乐长安HD1280', date: new Date('2016/04/14')},
        {id: 15, name: '左州自救兄弟', date: new Date('2016/04/13')},
        {id: 16, name: '普朗克斯/坎卜斯', date: new Date('2016/04/12')},
        {id: 17, name: '女巫HD1280', date: new Date('2016/04/11')},
        {id: 18, name: '灵偶契约HD1280', date: new Date('2016/04/10')},
        {id: 19, name: '真命天子BD1280', date: new Date('2016/04/9')},
    ]*/;

  cardList: Array<
    Card
  > = [] /*[
        {id: 0,  name: '临时雇员/临时工',  imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041P10KEY1.jpg', date: new Date('2016/04/18')},
        {id: 1,  name: '同城邂逅HD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041P021321562.jpg', date: new Date('2016/04/17')},
        {id: 2,  name: '不速之客HD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041H2552b3E.jpg', date: new Date('2016/04/16')},
        {id: 3,  name: '无声夜/安静',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041G60T56330.jpg', date: new Date('2016/04/15')},
        {id: 4,  name: '喜乐长安HD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04141GH262U.jpg', date: new Date('2016/04/14')},
        {id: 5,  name: '左州自救兄弟',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04151R445Ga.jpg', date: new Date('2016/04/13')},
        {id: 6,  name: '普朗克斯/坎卜斯',  imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_0416010435H25.jpg', date: new Date('2016/04/12')},
        {id: 7,  name: '女巫HD1280',  imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041611533AV8.jpg', date: new Date('2016/04/11')},
        {id: 8,  name: '灵偶契约HD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04161640211U8.jpg', date: new Date('2016/04/10')},
        {id: 9,  name: '真命天子BD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041G152245Z8.jpg', date: new Date('2016/04/9')},
        {id: 10, name: '临时雇员/临时工',  imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041P10KEY1.jpg', date: new Date('2016/04/18')},
        {id: 11, name: '同城邂逅HD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041P021321562.jpg', date: new Date('2016/04/17')},
        {id: 12, name: '不速之客HD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041H2552b3E.jpg', date: new Date('2016/04/16')},
        {id: 13, name: '无声夜/安静',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041G60T56330.jpg', date: new Date('2016/04/15')},
        {id: 14, name: '喜乐长安HD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04141GH262U.jpg', date: new Date('2016/04/14')},
        {id: 15, name: '左州自救兄弟',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04151R445Ga.jpg', date: new Date('2016/04/13')},
        {id: 16, name: '普朗克斯/坎卜斯',  imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_0416010435H25.jpg', date: new Date('2016/04/12')},
        {id: 17, name: '女巫HD1280',  imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041611533AV8.jpg', date: new Date('2016/04/11')},
        {id: 18, name: '灵偶契约HD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04161640211U8.jpg', date: new Date('2016/04/10')},
        {id: 19, name: '真命天子BD1280',    imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041G152245Z8.jpg', date: new Date('2016/04/9')},
    ]*/;
  trackByCardList(index: number, card: Card): number {
    return card.id;
  }

  getClassifyTitle(): string {
    const curNav = this.navList.find(nav => nav.classify === this.classify);
    return curNav ? curNav.title : '';
  }

  initClassifyData(): void {
    this.getHotMovies();
    this.getClassifyMovies();
  }

  getHotMovies(): void {
    this.classifyService
      .getHotMovies(20)
      .then(movies => {
        this.hotLists = movies.map((movie: any) => {
          movie.date = new Date(movie.publishDate);
          delete movie.publishDate;
          return movie;
        });
      })
      .catch(err => console.log(err));
  }

  getClassifyMovies(): void {
    this.classifyService
      .getClassifyMovies(this.classify, this.limit, (this.curPage - 1) * this.limit)
      .then(res => {
        this.total = res.count || 0;
        this.cardList = (res.movies || []).map((movie: any) => {
          movie.date = new Date(movie.publishDate);
          delete movie.publishDate;
          return movie;
        });
      })
      .catch(err => console.log(err));
  }

  public getCurPageData(_curPage: number): void {
    this.curPage = _curPage;
    this.classifyService
      .getClassifyMovies(this.classify, this.limit, (this.curPage - 1) * this.limit)
      .then(res => {
        this.total = res.count || 0;
        this.cardList = (res.movies || []).map((movie: any) => {
          movie.date = new Date(movie.publishDate);
          delete movie.publishDate;
          return movie;
        });
      })
      .catch(err => console.log(err));
  }
}
