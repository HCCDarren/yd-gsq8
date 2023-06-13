import { Injectable } from '@angular/core';
import { AuthStoreState } from './auth.store.state';
import { Store } from 'rxjs-observable-store';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService extends Store<AuthStoreState>  {

  constructor() {
    super(new AuthStoreState());
   }

   setAuthenticated() {
     this.setState({
       ...this.state,
       authenticated: true,
     })
   }
   setUnAuthenticated() {
    this.setState({
      ...this.state,
      authenticated: false,
    })
  }

}
