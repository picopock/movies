import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DetailService } from './detail.service';

import { Nav, navList } from '../../components/nav/nav.component';

export interface Movie {
  name: string;
  aliasName: string;
  classify: string;
  publishDate: Date;
  country: string;
  language: string;
  fileFormat: string;
  clarity: string;
  resolution: string;
  duration: number;
  fileSize: number;
  description: string;
  imgUrl: string;
  links: any[];
}

export interface ShortMovie {
  id: number;
  name: string;
  date: Date;
}

@Component({
  selector: 'detail',
  styleUrls: ['./detail.component.css'],
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  curId: number;
  movie: Movie = null /*{
        name: '临时雇员/临时工',
        aliasName: 'Sex: A Relationship and Not Marriage',
        classify: '剧情',
        publishDate: new Date('2016-04-19'),
        country: '韩国',
        language: '韩语',
        fileFormat: 'MP4',
        clarity: '720',
        resolution: '1280*720',
        duration: 109,
        fileSize: 2.80,
        description: `Getting married is crazy! I only want to be in relationships!" The life story of a woman who doesn't want to settle for one man. Her mom nags at her to get married, her superior grills her to bring results and her boyfriend turns out to be married. Soo-kyeong comforts herself with some spicy food. One lonely birthday, she ends up having sex with the chef of the spicy food restaurant. They fit well mentally and physically so they get closer but Soo-kyeong rejects the chef's marriage proposal. The chef gets married with someone else and asks her, "I got married with someone else like you said. Now will you have a relationship with me?`,
        imgUrl: '/assets/images/the-surprise.jpg',
        links: [
            {id: 0, title: 'ftp://www:piaohua.com@dy126.piaohua.com:36952/临时工BD1280高清中英双字.rmvb', url: 'thunder://QUFmdHA6Ly93d3c6cGlhb2h1YS5jb21AZHkxMjYucGlhb2h1YS5jb206MzY5NTIvJUU5JUEzJTk4JUU4JThBJUIxJUU3JTk0JUI1JUU1JUJEJUIxcGlhb2h1YS5jb20lRTQlQjglQjQlRTYlOTclQjYlRTUlQjclQTVCRDEyODAlRTklQUIlOTglRTYlQjglODUlRTQlQjglQUQlRTglOEIlQjElRTUlOEYlOEMlRTUlQUQlOTcucm12Ylpa'},
            {id: 1, title: 'ftp://www:piaohua.com@dy126.piaohua.com:36952/临时工BD1280高清中英双字.rmvb', url: 'thunder://QUFmdHA6Ly93d3c6cGlhb2h1YS5jb21AZHkxMjYucGlhb2h1YS5jb206MzY5NTIvJUU5JUEzJTk4JUU4JThBJUIxJUU3JTk0JUI1JUU1JUJEJUIxcGlhb2h1YS5jb20lRTQlQjglQjQlRTYlOTclQjYlRTUlQjclQTVCRDEyODAlRTklQUIlOTglRTYlQjglODUlRTQlQjglQUQlRTglOEIlQjElRTUlOEYlOEMlRTUlQUQlOTcucm12Ylpa'},
        ]
    }*/;

  trackByLinks(index: number, link: { id: number; title: string; url: string }) {
    return link.id;
  }

  hotTop20: ShortMovie[] = [] /*[
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
        {id: 19, name: '真命天子BD1280', date: new Date('2016/04/9')}
    ]*/;

  hotTopTitle: string = '热门排行TOP20';

  classifyList: Nav[] = navList;

  constructor(private route: ActivatedRoute, private detailService: DetailService) {
    this.route.params.subscribe((params: Params) => {
      this.curId = params['id'];
      this.getCurMovie();
    });

    this.initDetailData();
  }

  initDetailData() {
    this.getCurMovie();
    this.getHotMovies();
  }

  getClassifyTitle(): string {
    if (!this.movie.classify) return '';
    const curClassify = this.classifyList.find(classify => classify.classify === this.movie.classify);
    return curClassify ? curClassify.title : '';
  }

  getCurMovie() {
    this.detailService
      .getCurMovie(this.curId)
      .then((movie: any) => {
        movie.resolution = movie.resolutionW + '*' + movie.resolutionH;
        movie.publishDate = new Date(movie.publishDate);
        movie.links = movie.links.map((link: any) => {
          link.title = link.link;
          return link;
        });
        this.movie = movie;
      })
      .catch(err => console.log(err));
  }

  getHotMovies() {
    this.detailService
      .getHotMovies(20)
      .then(movies => {
        this.hotTop20 = movies.map((movie: any) => {
          movie.date = new Date(movie.publishDate);
          delete movie.publishDate;
          return movie;
        });
      })
      .catch(err => console.log(err));
  }
}
