import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    // emailが認証されているか確認できる
    // user.emailVerifiedの真偽値で分かる
    // this.afAuth.onAuthStateChanged( user => console.log(user));

  }

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
          url: `http://localhost:4200/?newAccount=true&email=${user?.email}`
        };
        user?.sendEmailVerification(actionCodeSettings);
      });
  }

  login(email: string, password: string): Promise<firebase.default.auth.UserCredential | void>{
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch( error => console.error(error) );
  } 

  logout(): Promise<void>{
    return this.afAuth.signOut();
  }
}
