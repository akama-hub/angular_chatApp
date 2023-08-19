import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'ac-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  submit(form: NgForm): void {
    this.userService.update(form.value)
    .then( () => this.router.navigateByUrl('/'));
  }

}
