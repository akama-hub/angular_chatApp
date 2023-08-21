import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { NewUserComponent } from './new-user/new-user.component';
// exports配列にFormsModule が exports されている
import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [
    NewUserComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
