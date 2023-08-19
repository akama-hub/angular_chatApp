import { Component } from '@angular/core';

@Component({
  selector: 'ac-root',
  // tmplateurlではなくtemplateにすることでテンプレート文字列で直接htmlを指定できる
  // インライン形式にすることでapp.component上にコードを書かなくてすむようにするため
  template: `
    <ac-header></ac-header>
    <div class="page">
      <router-outlet></router-outlet>
    </div>
    <!-- <ac-chat></ac-chat> -->
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
