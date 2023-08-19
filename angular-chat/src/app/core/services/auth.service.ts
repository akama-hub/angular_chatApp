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

  login(email: string, password: string): Promise<firebase.default.auth.UserCredential | void>{
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch( error => console.error(error) );
  } 

  logout(): Promise<void>{
    return this.afAuth.signOut();
  }
}