import { Component, OnInit } from '@angular/core';
import { Column } from '../../components/table/table.component';
import { MovieService } from './movies.service';

import { Nav, navList } from '../../components/nav/nav.component';

@Component({
  selector: 'managa-movies',
  styleUrls: ['./movies.component.css'],
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  constructor(private movieService: MovieService) {
    this.addMovie = this.addMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.delMovie = this.delMovie.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.submitMovie = this.submitMovie.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  operateMode: string = '';

  ngOnInit(): void {
    this.movieService.getMovies().then(({ rows, count }) => {
      this.data = rows;
    });
  }

  isReadonly: Boolean = false;
  isShowDetail: Boolean = false;
  obj: any = {
    name: '',
    aliasName: '',
    classify: '',
    publishDate: new Date(),
    country: '',
    language: '',
    fileFormat: '',
    clarity: '',
    resolution: { w: 0, h: 0 },
    duration: 0,
    fileSize: 0,
    description: '',
    imgUrl: ''
  };
  curData = this.obj;
  columns: Column[] = [
    { id: 0, field: 'name', title: 'Name' },
    { id: 1, field: 'aliasName', title: 'Alias Name' },
    { id: 2, field: 'classify', title: 'classify' },
    { id: 3, field: 'publishDate', title: 'publishDate' },
    { id: 4, field: 'country', title: 'country' },
    { id: 5, field: 'language', title: 'language' },
    { id: 6, field: 'fileFormat', title: 'fileFormat' },
    { id: 7, field: 'clarity', title: 'clarity' },
    { id: 8, field: 'resolution', title: 'resolution' },
    { id: 9, field: 'duration', title: 'duration' },
    { id: 10, field: 'fileSize', title: 'fileSize' },
    { id: 11, field: 'description', title: 'Description' },
    { id: 11, field: 'imgUrl', title: 'imgUrl' }
    // {id: 0, field: 'links', title: 'links'},
  ];
  // private movies(num: number): Array<any> {
  //     let data: Array<any> = [];
  //     for(let i=0; i<num; i++) {
  //         let obj = {
  //             id: i,
  //             name: '临时雇员/临时工',
  //             aliasName: 'Sex: A Relationship and Not Marriage',
  //             classify: '剧情',
  //             publishDate: new Date('2016-04-19'),
  //             country: '韩国',
  //             language: '韩语',
  //             fileFormat: 'MP4',
  //             clarity: '720',
  //             resolution: {w: 1280, h: 720},
  //             duration: 109,
  //             fileSize: 2.80,
  //             description: `Getting married is crazy! I only want to be in relationships!" The life story of a woman who doesn't want to settle for one man. Her mom nags at her to get married, her superior grills her to bring results and her boyfriend turns out to be married. Soo-kyeong comforts herself with some spicy food. One lonely birthday, she ends up having sex with the chef of the spicy food restaurant. They fit well mentally and physically so they get closer but Soo-kyeong rejects the chef's marriage proposal. The chef gets married with someone else and asks her, "I got married with someone else like you said. Now will you have a relationship with me?`,
  //             imgUrl: 'src/images/the-surprise.jpg',
  //             links: [
  //                 {id: 0, title: 'ftp://www:piaohua.com@dy126.piaohua.com:36952/临时工BD1280高清中英双字.rmvb', url: 'thunder://QUFmdHA6Ly93d3c6cGlhb2h1YS5jb21AZHkxMjYucGlhb2h1YS5jb206MzY5NTIvJUU5JUEzJTk4JUU4JThBJUIxJUU3JTk0JUI1JUU1JUJEJUIxcGlhb2h1YS5jb20lRTQlQjglQjQlRTYlOTclQjYlRTUlQjclQTVCRDEyODAlRTklQUIlOTglRTYlQjglODUlRTQlQjglQUQlRTglOEIlQjElRTUlOEYlOEMlRTUlQUQlOTcucm12Ylpa'},
  //                 {id: 1, title: 'ftp://www:piaohua.com@dy126.piaohua.com:36952/临时工BD1280高清中英双字.rmvb', url: 'thunder://QUFmdHA6Ly93d3c6cGlhb2h1YS5jb21AZHkxMjYucGlhb2h1YS5jb206MzY5NTIvJUU5JUEzJTk4JUU4JThBJUIxJUU3JTk0JUI1JUU1JUJEJUIxcGlhb2h1YS5jb20lRTQlQjglQjQlRTYlOTclQjYlRTUlQjclQTVCRDEyODAlRTklQUIlOTglRTYlQjglODUlRTQlQjglQUQlRTglOEIlQjElRTUlOEYlOEMlRTUlQUQlOTcucm12Ylpa'},
  //             ]
  //         };
  //         data.push(obj);
  //     }
  //     return data;
  // }
  // private data: Array<any> = this.movies(15);
  data: Array<any> = [];
  classifyList: Nav[] = navList;

  getClassifyTitle(): string {
    if (!this.curData.classify) return '';
    const curClassify = this.classifyList.find(classify => classify.classify === this.curData.classify);
    return curClassify ? curClassify.title : '';
  }

  trackByList(index: number, classify: Nav): number {
    return classify.id;
  }

  changeClassify(e: Event) {
    console.log(e);
  }

  addMovie() {
    this.isShowDetail = true;
    this.curData = this.obj;
    document.body.style.overflowY = 'hidden';
    this.operateMode = 'add';
  }

  editMovie(id: number) {
    this.isShowDetail = true;
    document.body.style.overflowY = 'hidden';
    this.curData = this.getObjBykey(this.data, 'id', id);
    this.operateMode = 'edit';
  }

  delMovie(id: number) {
    this.movieService.deleteMovie(id).then(() => {
      this.movieService.getMovies().then(({ rows, count }) => {
        this.data = rows;
      });
    });
  }

  showDetail(id: number) {
    this.isShowDetail = true;
    this.isReadonly = true;
    document.body.style.overflowY = 'hidden';
    this.curData = this.getObjBykey(this.data, 'id', id);
  }

  submitMovie() {
    this.isShowDetail = false;
    this.isReadonly = false;
    switch (this.operateMode) {
      case 'add':
        this.movieService.addMovie(this.curData).then(() => {
          this.movieService.getMovies().then(({ rows, count }) => {
            this.data = rows;
          });
        });
        break;
      case 'edit':
        this.movieService.updateMovie(this.curData).then(() => {
          this.movieService.getMovies().then(({ rows, count }) => {
            this.data = rows;
          });
        });
        break;
    }
    document.body.style.overflowY = 'auto';
  }

  cancelEdit() {
    this.isShowDetail = false;
    document.body.style.overflowY = 'auto';
    this.isReadonly = false;
    this.curData = this.obj;
  }

  getObjBykey(data: Array<any>, key: string, value: string | number) {
    let curObj = null;
    for (let i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty(key) && data[i][key] == value) {
        curObj = Object.assign({}, data[i]);
      }
    }
    return curObj;
  }
}
