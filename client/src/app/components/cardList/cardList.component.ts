import {
    Component,
    Input,

    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy,

    SimpleChanges,

    ViewChild,
    ContentChild
} from '@angular/core';

import {Card} from './cardList.interface';

@Component({
    selector: 'card-list',
    templateUrl: './cardList.component.html',
    styleUrls: ['./cardList.component.css']
})

export class CardListComponent /*implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy*/ {
    @Input() cardList: Array<Card>;
    trackByList(index: number, card: Card): number {
        return card.id;
    };

 /*   constructor() {
        console.log('constructor');
    }

    ngOnChanges(changes: SimpleChanges): void {
        //当Angular（重新）设置数据绑定输入属性时响应。 该方法接受当前和上一属性值的SimpleChanges对象
        //当被绑定的输入属性的值发生变化时调用，首次调用一定会发生在ngOnInit之前。
        //一旦检测到该组件(或指令)的输入属性发生了变化，Angular就会调用它的ngOnChanges方法。
        //注意对象的引用，对象的引用没有发生变化，也就没有什么需要报告的变化了。
        console.log('OnChanges');
        console.log('******************************');
        for(let propName in changes) {
            let chng = changes[propName];
            let cur = JSON.stringify(chng.currentValue, null, 4);
            let prev = JSON.stringify(chng.previousValue, null, 4);
            let isFirstChange = JSON.stringify(chng.isFirstChange);
            let firstChange = JSON.stringify(chng.firstChange);
            console.log(`${propName}:\n isFirstChange = ${isFirstChange},\n firstChange = ${firstChange},\n previousValue = ${prev},\n currentValue = ${cur}`);
        }
        console.log('******************************');
    }

    ngOnInit() {
        //在Angular第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。
        //在第一轮ngOnChanges完成之后调用，只调用一次。
        console.log('OnInit');
    }

    ngDoCheck() {
        //检测，并在发生Angular无法或不愿意自己检测的变化时作出反应。
        //在每个Angular变更检测周期中调用，ngOnChanges和ngOnInit之后。

        //使用DoCheck钩子来检测那些Angular自身无法捕获的变更并采取行动。
        //DoCheck范例通过下面的DoCheck实现扩展了OnChanges范例：
        console.log('DoCheck');
        // 调用频繁
        // if (this.hero.name !== this.oldHeroName) {
        //     this.changeDetected = true;
        //     this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
        //     this.oldHeroName = this.hero.name;
        // }

        // if (this.power !== this.oldPower) {
        //     this.changeDetected = true;
        //     this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
        //     this.oldPower = this.power;
        // }

        // if (this.changeDetected) {
        //     this.noChangeCount = 0;
        // } else {
        //     // log that hook was called when there was no relevant change.
        //     let count = this.noChangeCount += 1;
        //     let noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
        //     if (count === 1) {
        //         // add new "no change" message
        //         this.changeLog.push(noChangeMsg);
        //     } else {
        //         // update last "no change" message
        //         this.changeLog[this.changeLog.length - 1] = noChangeMsg;
        //     }
        // }

        // this.changeDetected = false;
    }

    // Query for a CONTENT child of type `ChildComponent`
    // @ContentChild(ChildComponent) contentChild: ChildComponent;

    ngAfterContentInit() {
        //当把外来内容被投影到组件中之后调用它们。
        //第一次NgDoCheck之后调用，只调用一次。
        //只适用于组件。

        console.log('AfterContentInit');
    }

    ngAfterContentChecked() {
        //每次完成被投影组件内容的变更检测之后调用。
        //ngAfterContentInit和每次NgDoCheck之后调用
        //只适合组件。
        console.log('AfterContentChecked');

        // contentChild is updated after the content has been checked
        // if (this.prevHero === this.contentChild.hero) {
        //     this.logIt('AfterContentChecked (no change)');
        // } else {
        //     this.prevHero = this.contentChild.hero;
        //     this.logIt('AfterContentChecked');
        //     this.doSomething();
        // }
    }

    // 下列钩子基于子视图中的每一次数据变更采取行动，我们只能通过带@ViewChild装饰器的属性来访问子视图。
    // Query for a VIEW child of type `ChildViewComponent`
    //@ViewChild(ChildViewComponent) viewChild: ChildViewComponent;

    ngAfterViewInit() {
        //初始化完组件视图及其子视图之后调用。
        //第一次ngAfterContentChecked之后调用，只调用一次。
        //只适合组件。

        // Angular会在每次创建了组件的子视图后调用它们。
        // 
        console.log('AfterViewInit');
        // this.doSomething();
    }

    ngAfterViewChecked() {
        //每次做完组件视图和子视图的变更检测之后调用。
        //ngAfterViewInit和每次ngAfterContentChecked之后调用。
        //只适合组件。

        // Angular会在每次创建了组件的子视图后调用它们。
        //
        console.log('AfterViewChecked');

        // if (this.prevHero === this.viewChild.hero) {
        //     this.logIt('AfterViewChecked (no change)');
        // } else {
        //     this.prevHero = this.viewChild.hero;
        //     this.logIt('AfterViewChecked');
        //     this.doSomething();
        // }
    }

    ngOnDestroy() {
        //当Angular每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏。
        //在Angular销毁指令/组件之前调用。
        console.log('OnDestroy');
    }*/
}