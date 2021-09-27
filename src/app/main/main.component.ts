import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../providers/user.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  users: Observable<User[]>;

  checkoutForm = this.formBuilder.group({
    name: '',
    email: '',
    phone: ''
  });

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.users = this.userService.getAll();
  }

  onSubmit(): void {
    let user = new User(this.checkoutForm.value.name, this.checkoutForm.value.email, this.checkoutForm.value.phone)
    this.userService.save(user)
    .subscribe();
    window.location.reload();
 }

}
