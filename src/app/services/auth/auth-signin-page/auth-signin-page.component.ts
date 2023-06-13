import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from '../services/auth-store/auth-store.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-signin-page',
  templateUrl: './auth-signin-page.component.html',
  styleUrls: ['./auth-signin-page.component.scss']
})
export class AuthSigninPageComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    public authStore: AuthStoreService,
  ) { }

  ngOnInit() {

  }

}
