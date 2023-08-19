import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'src/app/class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }
 
  // PromiseオブジェクトはauthService.create(email, passward)という形で、利用でき、firebaseと通信し、
  // かえってきた値をpromiseのthen((credential) => credential)メソッドで処理することができる
  // .catch((error) => error)でエラー処理もできる
  // create(email: string, passward: string): Promise<firebase.auth.UserCredential> {
  // create(email: string, passward: string): Promise<firebase.default.auth.UserCredential> {

  // thenの返り値はpromiseオブジェクトとなり、コールバックチェーンをつなげていける
  create(email: string, passward: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, passward)
      .then( (credential) => {
        const { user } = credential;
        const actionCodeSettings = {
          url: `http://localhost:4200/?newAccount=true&email=${user!.email}`
        };
        user!.sendEmailVerification(actionCodeSettings);

        this.db.object(`/users/${user!.uid}`).set( new User(user!));
      });
  }

  update(values: { displayName?: string, photoURL?: string } ): Promise <void> {
    return this.afAuth.currentUser.then((user: firebase.default.User | null) => {
      if(user){
        user.updateProfile(values)
        .then( () => this.db.object(`/users/${user.uid}`).update(values))
        .catch( error => console.error( error ) );
      }
    });
  }
}
