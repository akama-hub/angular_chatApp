import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard{

  constructor(
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const auth = getAuth();
    const user = auth.currentUser;
    if(user){
      // this.router.navigateByUrl('/');
      // return false;
      
      // 一行にまとめると
      return this.router.parseUrl('');
    }
    else{
      return true;
    }
  }

}

