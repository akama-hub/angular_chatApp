import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentDate'
})
export class CommentDatePipe implements PipeTransform {

  // テンプレートからわたってくるデータを処理するメインのメソッド
  // valueがテンプレート文字列
  // 第二引数以降は可変長
  transform(value: number, ...args: string[]): string {
    const format = args[0] || 'yyyy年MM月dd日 HH:mm';
    return formatDate(value, format, 'en-US');
  }

}
