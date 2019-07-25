import {
  Component,
  OnChanges,
  OnInit, //在第一轮ngOnChanges完成之后调用，只调用一次。
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';

declare var $: any;
let Slider: any = require('../../../assets/js/slider.js');

export class Rotation {
  id: number;
  url: string;
  name: string;
  description: string;
}

@Component({
  selector: 'rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.css']
})
export class RotationComponent implements AfterViewInit {
  slider: any;

  rotations: Rotation[] = [
    {
      id: 0,
      name: '霍比特人3：五军之战',
      url: 'images/1.jpg',
      description: '矮人王与人类和精灵歃血为盟，共同对抗半兽人部队。'
    },
    { id: 1, name: '饥饿游戏3：嘲笑鸟', url: 'images/2.jpg', description: '新的领导者出现，一个革命的序幕正在拉开。' },
    {
      id: 2,
      name: '速度与激情7',
      url: 'images/3.jpg',
      description: '设计了更多与众不同的动作场面，三个光头猛男碰撞出更为热血的火花。'
    },
    {
      id: 3,
      name: '星际穿越',
      url: 'images/4.jpg',
      description: '讲述了一队探险家利用虫洞，超越人类对于太空旅行的极限的故事。'
    },
    {
      id: 4,
      name: '古德拉元年',
      url: 'images/5.jpg',
      description: '由环球公司花重金打造，民间传说吸血鬼鼻祖“德古拉伯爵糅合在一起'
    }
  ];
  trackByRotation(index: number, item: Rotation): number {
    return item.id;
  }

  ngAfterViewInit() {
    this.slider = new Slider({
      //开始创建效果
      pNode: '.slider-main', //容器的选择器 必填
      cNode: '.cNode', //轮播体的选择器 必填
      toggleBtnParent: '.slider-btn', //上下条切换按钮
      navParent: '.slider-nav', //高亮导航节点
      speed: 3000, //速度 默认3000 可不填写
      autoPlay: true //是否自动播放 默认true 可不填写
    });
  }
}
