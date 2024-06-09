//@ts-nocheck
declare var $: any;

export interface SliderOptions {
  pNode: string;
  cNode: string;
  toggleBtnParent: string;
  navParent: string;
  speed: number;
  autoPlay: boolean;
}

export default function Slider(objs: SliderOptions) {
  let that = this; //that获得this的作用域 后面都是that 防止干扰
  that.objs = objs; //将传送来的对象赋予this
  that.pNode = $(that.objs.pNode); //pNode轮播容器对象
  that.parentNode = that.pNode.parent();  //父容器
  that.cNodes = $(that.objs.cNode); //cNodes轮播子节点对象集合
  that.toggleBtnParent = $(that.objs.toggleBtnParent);//上下条切换按钮
  that.navParent = $(that.objs.navParent);    //高亮导航节点
  that.cNodeNums = that.cNodes.length; //预存轮播体的总数
  that.nowNodeKey = 0; //初始第一次默认显示节点为第一个
  that.width = that.cNodes.find('img').width();//得到容器的宽度
  that.height = that.cNodes.find('img').height();//得到容器的高度
  that.moveFlag = true;//添加是否可以进行下一个轮播状态
  that.isPause = false;//是否暂停状态
  that.speedNum = 0;//自动轮播的计数
  if (!that.objs.speed) {//添加默认时间
    that.objs.speed = 3000;
  }
  if (!that.objs.hasOwnProperty('autoPlay')) {//添加默认自动播放
    that.objs.autoPlay = true;
  }
  that.init = function () {//轮播的初始化
    that.pNode.addClass('slider-main');
    that.pNode.css({//轮播容器的大小控制 启用bfc模式
      'width': that.width,
      'height': that.height,
      'overflow': 'hidden',
      'position': 'relative'
    });
    //为切换按钮绑定事件
    that.parentNode.find('.slider-btn-prev').bind('click', function () {
      that.toggleMove('prev');
    });
    that.parentNode.find('.slider-btn-next').bind('click', function () {
      that.toggleMove('next');
    });

    that.cNodes.each(function (index, el) {//采用遍历，添加前后顺序
      let indexNum = index;
      if (index == 0) {//让第一个显示在前面 同时为每个轮播体创建对应nav点
        indexNum = 20;
      }
      $(this).css({//为每一个轮播体添加样式和顺序
        'width': that.width + 'px',
        'height': that.height + 'px',
        'overflow': 'hidden',
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'z-index': indexNum
      });
    });
    //为高亮导航节点绑定事件
    that.parentNode.find('.slider-nav li').each(function (index, el) {
      $(this).bind('click', function () {
        that.toggleMove(false, index);
      });
    });
    //判断是否自动播放
    if (that.objs.autoPlay) {
      that.moveTime();
    }
  }
  /**
   * 切换轮播后 轮播导航的高亮
   * @param {Number} tid
   */
  that.sliderNavToggle = function (nid, tid) {
    $('.slider-nav li').each(function (index, el) {
      if (index == tid) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }
  /**
   * 切换效果指令函数 避免BUG
   * @param {String} command 'prev'|'next'
   * @param {Number} tid 下一个要切换的tid
   * command与tid可以缺省一个，函数自动判断
   */
  that.toggleMove = function (command, tid) {
    if (that.moveFlag) {
      if (!command) {
        if (that.nowNodeKey == tid) {
          return;
        } else if ((that.nowNodeKey == 0 && tid == that.cNodeNums - 1) || tid < that.nowNodeKey) {
          command = 'prev';
        } else {
          command = 'next';
        }
      }
      if (!tid) {
        if (tid == 0) {
        } else if (command == 'prev') {
          tid = that.nowNodeKey - 1;
          if (that.nowNodeKey == 0) {
            tid = that.cNodeNums - 1;
          }
        } else {
          tid = that.nowNodeKey + 1;
          if (that.nowNodeKey == that.cNodeNums - 1) {
            tid = 0;
          }
        }
      }
      /**
       * 随机函数
       */
      function random(min, max) {
        return Math.floor(Math.random() * (max + 1) - min);
      }
      that.moveSwitch(random(0, 6), tid);
    }
  }
  /**
   * 根据分配的切换指令执行效果
   * @param {Number} mid 动画指令
   * @param {Number} tid 下一个要切换的tid
   */
  that.moveSwitch = function (mid, tid) {
    let nid = that.nowNodeKey;
    that.moveFlag = false;
    that.speedNum = 0;
    that.sliderNavToggle(nid, tid);
    switch (mid) {
      case 0:
        that.gridTop(tid, 0);
        break;
      case 1:
        that.gridTop(tid, 1);
        break;
      case 2:
        that.gridTop(tid, 2);
        break;
      case 3:
        that.gridLeft(tid, 0);
        break;
      case 4:
        that.gridLeft(tid, 1);
        break;
      case 5:
        that.gridLeft(tid, 2);
        break;
      case 6:
        that.cellToggle(tid);
        break;
      default:
        that.gridTop(tid);
        break;
    }
  }
  /**
   * 栅格上下切换
   */
  that.gridTop = function (tid, showNum) {
    that.cNodes[tid].style.zIndex = 19;//让下个节点准备好
    let $backHTML = that.cNodes[that.nowNodeKey].innerHTML;//备份当前节点的内容
    that.cNodes[that.nowNodeKey].innerHTML = '';//清空节点，方便使用
    for (let i = 0; i < 12; i++) {//利用循环 创建出栅格节点
      let $cvNode = $('<div class="cvNode"></div>');
      $(that.cNodes[that.nowNodeKey]).append($cvNode);
      $cvNode.html($backHTML);
      $cvNode.css({//为每个栅格节点添加css样式
        'position': 'absolute',
        'width': that.width / 12 + 'px',
        'height': that.height + 'px',
        'zIndex': 20,
        'overflow': 'hidden',
        'left': that.width / 12 * i + 'px',
        'top': '0'
      });
      $cvNode.find('*').first().css({
        'display': 'block',
        'margin-left': that.width / -12 * i + 'px'
      });
    }

    //分配对应效果
    switch (showNum) {
      default:
      case 0:
        //添加动画过渡效果 张牙舞爪
        $(that.cNodes[that.nowNodeKey]).find('.cvNode').each(function (index, el) {
          let topNums;
          if (index % 2 == 0) {
            topNums = that.height;
          } else {
            topNums = that.height * -1;
          }
          $(this).animate({
            top: topNums + 'px'
          }, 1500);
        });
        setTimeout(function () {//动画结束后开始恢复原有状态
          that.moveFlag = true;
          that.cNodes[tid].style.zIndex = 20;
          that.cNodes[that.nowNodeKey].style.zIndex = that.nowNodeKey;
          $(that.cNodes[that.nowNodeKey]).html($backHTML);//清除动画产生的多余内容
          that.nowNodeKey = tid;//得到新的当前节点key
        }, 1500);
        break;
      case 1:
      //兼容到下面
      case 2:
        let sp;
        if (showNum == 1) {
          //添加动画过渡效果 下降
          $(that.cNodes[that.nowNodeKey]).find('.cvNode').each(function (index, el) {
            sp = 80 * index;
            $(this).animate({
              top: $(this).height() + 'px'
            }, 500 + sp);
          });
        } else {
          //添加动画过渡效果 上升
          $(that.cNodes[that.nowNodeKey]).find('.cvNode').each(function (index, el) {
            sp = 80 * index;
            $(this).animate({
              top: $(this).height() * -1 + 'px'
            }, 500 + sp);
          });
        }
        setTimeout(function () {//动画结束后开始恢复原有状态
          that.moveFlag = true;
          that.cNodes[tid].style.zIndex = 20;
          that.cNodes[that.nowNodeKey].style.zIndex = that.nowNodeKey;
          $(that.cNodes[that.nowNodeKey]).html($backHTML);//清除动画产生的多余内容
          that.nowNodeKey = tid;//得到新的当前节点key
        }, 1380);
        break;
    }
  }

  /**
   * 栅格左右张牙舞爪切换
   */
  that.gridLeft = function (tid, showNum) {
    that.cNodes[tid].style.zIndex = 19;//让下个节点准备好
    let $backHTML = that.cNodes[that.nowNodeKey].innerHTML;//备份当前节点的内容
    that.cNodes[that.nowNodeKey].innerHTML = '';//清空节点，方便使用
    for (let i = 0; i < 12; i++) {//利用循环 创建出栅格节点
      let $cvNode = $('<div class="cvNode"></div>');
      $(that.cNodes[that.nowNodeKey]).append($cvNode);
      $cvNode.html($backHTML);
      $cvNode.css({//为每个栅格节点添加css样式
        'position': 'absolute',
        'width': that.width + 'px',
        'height': that.height / 12 + 'px',
        'zIndex': 20,
        'overflow': 'hidden',
        'left': '0',
        'top': that.height / 12 * i + 'px',
      });
      $cvNode.find('*').first().css({
        'display': 'block',
        'margin-top': that.height / -12 * i + 'px'
      });
    }
    switch (showNum) {
      default:
      case 0:
        //添加动画过渡效果 张牙舞爪
        $(that.cNodes[that.nowNodeKey]).find('.cvNode').each(function (index, el) {
          let leftNums;
          if (index % 2 == 0) {
            leftNums = that.width;
          } else {
            leftNums = that.width * -1;
          }
          $(this).animate({
            'left': leftNums + 'px'
          }, 1500);
        });
        break;
      case 1:
      case 2:
        let sp;
        if (showNum == 1) {
          //添加动画过渡效果 向左
          $(that.cNodes[that.nowNodeKey]).find('.cvNode').each(function (index, el) {
            sp = 80 * index;
            $(this).animate({
              'left': that.width * -1 + 'px'
            }, 620 + sp);
          });
        } else {
          //添加动画过渡效果 向右
          $(that.cNodes[that.nowNodeKey]).find('.cvNode').each(function (index, el) {
            sp = 80 * index;
            $(this).animate({
              'left': that.width + 'px'
            }, 620 + sp);
          });
        }
        break;
    }
    setTimeout(function () {//动画结束后开始恢复原有状态
      that.moveFlag = true;
      that.cNodes[tid].style.zIndex = 20;
      that.cNodes[that.nowNodeKey].style.zIndex = that.nowNodeKey;
      $(that.cNodes[that.nowNodeKey]).html($backHTML);//清除动画产生的多余内容
      that.nowNodeKey = tid;//得到新的当前节点key
    }, 1500);
  }

  //格子切换效果
  that.cellToggle = function (tid) {
    that.cNodes[tid].style.zIndex = 19;//让下个节点准备好
    let $backHTML = that.cNodes[that.nowNodeKey].innerHTML;//备份当前节点的内容
    that.cNodes[that.nowNodeKey].innerHTML = '';//清空节点，方便使用
    let rows;
    for (let i = 0; i < 20; i++) {//利用循环 创建出栅格节点
      if (i < 5) {//行数判断
        rows = 0;
      } else if (i < 10) {
        rows = 1;
      } else if (i < 15) {
        rows = 2;
      } else {
        rows = 3;
      }
      let $cvNode = $('<div class="cvNode"></div>');
      $(that.cNodes[that.nowNodeKey]).append($cvNode);
      $cvNode.html($backHTML);
      $cvNode.css({//为每个栅格节点添加css样式
        'position': 'absolute',
        'width': that.width / 5 + 'px',
        'height': that.height / 4 + 'px',
        'zIndex': 20,
        'overflow': 'hidden',
        'left': that.width / 5 * (i % 5) + 'px',
        'top': that.height / 4 * rows + 'px',
      });
      $cvNode.find('*').first().css({
        'display': 'block',
        'margin-left': that.width / -5 * (i % 5) + 'px',
        'margin-top': that.height / -4 * rows + 'px',
      });
    }
    //添加动画过渡效果
    $(that.cNodes[that.nowNodeKey]).find('.cvNode').each(function (index, el) {
      if (index % 2 == 0) {
        $(this).find('*').first().animate({
          "margin-left": $(this).width() + 'px'
        }, 500);
      }
    });
    setTimeout(function () {
      $(that.cNodes[that.nowNodeKey]).find('.cvNode').each(function (index, el) {
        if (index % 1 == 0) {
          $(this).find('*').first().animate({
            "margin-left": $(this).width() + 'px'
          }, 500);
        }
      });
    }, 600);
    setTimeout(function () {//动画结束后开始恢复原有状态
      that.moveFlag = true;
      that.cNodes[tid].style.zIndex = 20;
      that.cNodes[that.nowNodeKey].style.zIndex = that.nowNodeKey;
      $(that.cNodes[that.nowNodeKey]).html($backHTML);//清除动画产生的多余内容
      that.nowNodeKey = tid;//得到新的当前节点key
    }, 1100);
  }

  //自动播放控制方法
  that.moveTime = function () {
    setTimeout(function fnA() {
      if (that.moveFlag) {
        that.speedNum++;
        if (that.speedNum >= that.objs.speed / 100) {
          that.speedNum = 0;
          that.toggleMove('next');
        }
      }
      if (!that.isPause) {
        setTimeout(fnA, 100);
      }
    }, 100);
  }
  that.init();
}
