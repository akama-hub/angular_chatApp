import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TimelineModule } from './timeline/timeline.module';


const routes: Routes = [
  { path: '', loadChildren: () => import('./timeline/timeline.module').then( m => m.TimelineModule)},
  // 式の中でインポートすることをダイナミックインポートといい、関数の実行時に実行される
  // ダイナミックインポートにすることで、ユーザがサイトにアクセスしたときに最低限のアプリケーション読み込みで済むので実行が早くなる
  { path: 'users', loadChildren: () => import('./users/users.module').then( m => m.UsersModule) },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  // '**'はtopページ以外のすべてのページを表す
  { path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
