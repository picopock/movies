import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-manage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./manage.component.css', './font.css'],
  templateUrl: './manage.component.html'
})

/**
 * Follows is to solve Error:
 *      ExpressionChangedAfterItHasBeenCheckedError
 *
 *  changeDetection: ChangeDetectionStrategy.OnPush,
 *  ChangeDetectorRef
 *  this.ref.markForCheck()
 *
 */
export class ManageComponent implements AfterViewInit, OnDestroy {
  currentDate: Date = new Date();
  manageInterval: any;
  marqueeWidth: string = '0px';
  animationDuration: string = '70s';
  title: string =
    '人生就是加法：梦想越多，道路越多，机遇越多，成功越多。人生也是减法：梦想越少，道路越少，机遇越少，成功越少。人生还是加减混合运算：烦恼越多，快乐越少；阳光越多，阴霾越少；成功越多，失败越少；机遇越多，失意越少。心态越好，快乐越多，烦恼就越少；贪心越少，烦恼越少，幸福就越多。';

  constructor(private ref: ChangeDetectorRef) { }

  ngAfterViewInit() {
    let marquee = document.getElementById('marquee');
    // this.marqueeWidth = document.defaultView.getComputedStyle(marquee).width;
    this.marqueeWidth = marquee?.offsetWidth + 'px';

    this.manageInterval = setInterval(() => {
      this.currentDate = new Date();
      // Note
      this.ref.markForCheck();
    }, 1000);
  }

  ngOnDestroy() {
    this.manageInterval = null;
  }
}
