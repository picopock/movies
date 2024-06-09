import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() total!: number;
  @Input() limit!: number;
  @Input() page!: number;
  @Input() getCurPageDatas!: Function;
  public totalPage: number = 0;
  public goToPage: number = 1;
  public showPage: number[] = [];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
    this.totalPage = Math.floor(this.total / this.limit) + (this.total % this.limit == 0 ? 0 : 1);
    this.showPage = (() => {
      let arr = [];
      if (this.page >= 5) arr = [this.page - 2, this.page - 1, this.page, this.page + 1, this.page + 2];
      else {
        let curPage = this.page;
        while (curPage > 0) {
          arr.push(curPage);
          curPage--;
        }
      }
      return arr;
    })();
  }

  getChangedData(inx?: number) {
    this.getCurPageDatas(inx || this.goToPage);
    this.getPageData();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getChangedData();
  }

  trackByList(item: number) {
    return item;
  }
}
