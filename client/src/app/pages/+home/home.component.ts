import { Component, OnInit } from '@angular/core';
import { Card } from '../../components/cardList/cardList.interface';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = 'Home Page';
  total: number = 0;
  curPage: number = 1;
  limit: number = 20;
  movies: Card[] = [] /*[
        {id: 0, name: '临时雇员/临时工', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041P10KEY1.jpg', date: new Date('2016/04/18')},
        {id: 1, name: '同城邂逅HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041P021321562.jpg', date: new Date('2016/04/17')},
        {id: 2, name: '不速之客HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041H2552b3E.jpg', date: new Date('2016/04/16')},
        {id: 3, name: '无声夜/安静', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041G60T56330.jpg', date: new Date('2016/04/15')},
        {id: 4, name: '喜乐长安HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04141GH262U.jpg', date: new Date('2016/04/14')},
        {id: 5, name: '左州自救兄弟', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04151R445Ga.jpg', date: new Date('2016/04/13')},
        {id: 6, name: '普朗克斯/坎卜斯', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_0416010435H25.jpg', date: new Date('2016/04/12')},
        {id: 7, name: '女巫HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041611533AV8.jpg', date: new Date('2016/04/11')},
        {id: 8, name: '灵偶契约HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04161640211U8.jpg', date: new Date('2016/04/10')},
        {id: 9, name: '真命天子BD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041G152245Z8.jpg', date: new Date('2016/04/9')},
        {id: 10, name: '临时雇员/临时工', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041P10KEY1.jpg', date: new Date('2016/04/18')},
        {id: 11, name: '同城邂逅HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041P021321562.jpg', date: new Date('2016/04/17')},
        {id: 12, name: '不速之客HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041H2552b3E.jpg', date: new Date('2016/04/16')},
        {id: 13, name: '无声夜/安静', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041G60T56330.jpg', date: new Date('2016/04/15')},
        {id: 14, name: '喜乐长安HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04141GH262U.jpg', date: new Date('2016/04/14')},
        {id: 15, name: '左州自救兄弟', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04151R445Ga.jpg', date: new Date('2016/04/13')},
        {id: 16, name: '普朗克斯/坎卜斯', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_0416010435H25.jpg', date: new Date('2016/04/12')},
        {id: 17, name: '女巫HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041611533AV8.jpg', date: new Date('2016/04/11')},
        {id: 18, name: '灵偶契约HD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_04161640211U8.jpg', date: new Date('2016/04/10')},
        {id: 19, name: '真命天子BD1280', imgUrl: 'http://img.piaowu99.com/0701pic/allimg/16/4_041G152245Z8.jpg', date: new Date('2016/04/9')},
    ]*/;
  trackByMovies(index: number, movie: Card): number {
    return movie.id;
  }

  hotTitle: string = '近期更新';
  hotLists: any[] = [] /*[
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
    ]*/;

  latestTitle: string = '热门排行TOP10';
  latestLists: any[] = [] /*[
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
    ]*/;

  constructor(private homeService: HomeService) {
    this.initHomeData();

    this.getCurPageData = this.getCurPageData.bind(this);
  }

  ngOnInit() {
    this.initHomeData();
  }

  initHomeData() {
    this.getLatest();
    this.getHot();
    this.getCurPage();
  }

  getLatest() {
    this.homeService
      .getLatestMovies(10)
      .then(movies => {
        this.latestLists = movies.map((movie: any) => {
          movie.date = new Date(movie.publishDate);
          delete movie.publishDate;
          return movie;
        });
      })
      .catch(err => console.log(err));
  }

  getHot() {
    this.homeService
      .getHotMovies(10)
      .then(movies => {
        this.hotLists = movies.map((movie: any) => {
          movie.date = new Date(movie.publishDate);
          delete movie.publishDate;
          return movie;
        });
      })
      .catch(err => console.log(err));
  }

  getCurPage() {
    this.homeService
      .getPageMovies(this.curPage, this.limit)
      .then(res => {
        this.total = res.count || 0;
        this.movies = (res.movies || []).map((movie: any) => {
          movie.date = new Date(movie.publishDate);
          delete movie.publishDate;
          return movie;
        });
      })
      .catch(err => console.log(err));
  }

  public getCurPageData(_curPage: number): void {
    this.curPage = _curPage;
    this.homeService
      .getPageMovies(this.curPage, this.limit)
      .then(res => {
        this.total = res.count || 0;
        this.movies = (res.movies || []).map((movie: any) => {
          movie.date = new Date(movie.publishDate);
          delete movie.publishDate;
          return movie;
        });
      })
      .catch(err => console.log(err));
  }
}
