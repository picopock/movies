import {Pipe, PipeTransform } from '@angular/core';


@Pipe({
    // @Pipe装饰器允许我们定义管道的名字，这个名字会被用在模板表达式中
    name: 'DateFormat'
})
/**
 * 这个管道实现了 PipeTransform 接口的 transform 方法
 * 使用时须在 declarations 数组中包含这个管道
 */
export class DateFormat implements PipeTransform {
    transform(value: Date): string {
        let val = value.getFullYear() + '-' + value.getMonth() + '-' + value.getDate() + ' '
                    + value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
                    console.log(val)
        return val;
    }
}