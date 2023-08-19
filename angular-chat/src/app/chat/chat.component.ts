import { Component } from '@angular/core';
import { Comment } from '../class/comment';
import { User } from '../class/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, snapshotChanges, SnapshotAction } from '@angular/fire/compat/database';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  comments$: Observable <Comment[]>;
  commentsRef: AngularFireList<Comment>;
  currentUser: User;
  currentUser$: User;
  comment = ''; 
  // item$: Observable <any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
    // リアルタイムデータベースから単一データを取得する（/itemから）
    // valueChangesでObservable型にキャストする
    // this.item$ = db.object('/item').valueChanges();
    
    // list()はAngularFireListを参照している
    // this.item$ = db.list('/item').valueChanges();

    this.commentsRef = db.list('/comments');
  }

  ngOnInit(): void{
    this.currentUser$ = this.afAuth.authState.pipe(
      map( (user: firebase.default.User) => {
        if(user){
          this.currentUser = new User(user);
          return this.currentUser
        }
        return null;
      })
    );

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
