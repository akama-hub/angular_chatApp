import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CommentDatePipe } from '../pipes/comment-date.pipe';



@NgModule({
  declarations: [
    CommentDatePipe
  ],
  imports: [
    // angularのモジュールに必要な機能、これがないとモジュールとして機能しない
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    CommentDatePipe
  ]
})
export class SharedModule { }
