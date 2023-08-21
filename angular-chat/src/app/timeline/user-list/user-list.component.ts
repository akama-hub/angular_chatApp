import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { User } from 'src/app/class/user';
import { map } from 'rxjs/operators';
import { __values } from 'tslib';

@Component({
  selector: 'ac-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  usersRef: AngularFireList<User>;
  users$: Observable<User[]|null>;

  constructor(private db: AngularFireDatabase){
    this.usersRef = db.list('/users');
  }

  ngOnInit(): void{
    this.users$ = this.usersRef.snapshotChanges().pipe(
      map( ( snapshots: SnapshotAction<User> [] ) => {
        return snapshots.map(snapshot => {
          const values = snapshot.payload.val();
          return new User(values!);
        });
      })
    );
  }

}
