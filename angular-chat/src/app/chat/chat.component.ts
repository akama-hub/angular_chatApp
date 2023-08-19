import { Component } from '@angular/core';

import { Comment } from '../class/comment';
import { User } from '../class/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, snapshotChanges, SnapshotAction } from '@angular/fire/compat/database';

const CURRENT_USER: User = new User(1, 'Hoge 太郎');
const ANOTHER_USER: User = new User(2, 'Hoge 三郎');

@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  comments$: Observable <Comment[]>;
  commentsRef: AngularFireList<Comment>;
  currentUser = CURRENT_USER;
  comment = ''; 
  // item$: Observable <any>;

  constructor(private db: AngularFireDatabase) {
    // リアルタイムデータベースから単一データを取得する（/itemから）
    // valueChangesでObservable型にキャストする
    // this.item$ = db.object('/item').valueChanges();
    
    // list()はAngularFireListを参照している
    // this.item$ = db.list('/item').valueChanges();

    this.commentsRef = db.list('/comments');
    
    // listの実データを取得している
    // this.comments$ = this.commentsRef.valueChanges();
    
    // listのkeyデータも含めたデータを取得できる
    this.comments$ = this.commentsRef.snapshotChanges().pipe(
      map((snapshots: SnapshotAction<Comment> []) => {
        return snapshots.map(snapshot => {
          // snapshotはkeyなどのmetaデータと実データを持つので、valをとることで実データのみを取り出す
          const value= snapshot.payload.val();
          return new Comment({key: snapshot.payload.key, ...value});
        })
      })
    );
  }

  addComment(comment: string): void{
    if(comment){
      this.commentsRef.push(new Comment({user: this.currentUser, message: comment}));
      // リストに保存した後はコメントエリアをクリア
      this.comment = '';
    }
  }

  updateComment(comment: Comment): void{
    const {key, message} = comment;
    if(key){
      this.commentsRef.update(key, {message});
    }
  }

  deleteComment(comment: Comment): void{
    this.commentsRef.remove(comment.key);
  }
}
