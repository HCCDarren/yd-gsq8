// https://developers.google.com/identity/protocols/OAuth2UserAgent
//  Typescript Module Resolution:  https://www.typescriptlang.org/docs/handbook/module-resolution.html
// https://developers.google.com/sheets/api/quickstart/js

// rns, vss auth, /
// https://console.developers.google.com/apis/credentials?authuser=2&project=white-cider-734
// https://github.com/google/google-api-javascript-client
// https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md
// https://developers.google.com/identity/protocols/OAuth2

// https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html
/// <reference path="../../../../node_modules/@types/gapi/index.d.ts" />
import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { GoogleAuthState } from './google-auth-store.state';

const credentialData = {
  apiKey: 'AIzaSyBYZkVAZgZLZ5JQmZLPPviSKXeEAqURm_8',
  clientId: '108646065578-c2686spv71nge4gbdnh1c8k5pgpo4mic.apps.googleusercontent.com',
  clientSecret: 'ljk2WaFK0SQfgg7C3zNDAc7A'
}
const SCOPES = [
  'profile',
  // 'email',
  // 'https://www.googleapis.com/auth/spreadsheets.readonly',
  // 'https://www.googleapis.com/auth/youtube',
  // 'https://www.googleapis.com/auth/devstorage.read_only',
];

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthStoreService extends Store<GoogleAuthState> {
  private auth2: any;
  private loginOroutFn: any;
  private revokeFn: any;

  constructor(
  ) {
    super(new GoogleAuthState());
    // Load the API's client and auth2 modules.
    gapi.load('client:auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: credentialData.clientId,
        scope: SCOPES.join(' '),
      });

      // Listen for sign-in state changes.
      this.auth2.isSignedIn.listen((isSignedIn) => {
        this.setSigninStatus();
      });
      this.setSigninStatus();

      this.loginOroutFn = () => {
        if (this.state.isAuthorized) {
          this.auth2.signOut();
        } else {
          this.auth2.signIn();
        }
      }
      this.revokeFn = () => {
        this.auth2.disconnect();
      }
    })
  }

  loginOrOut() {
    if (!this.loginOroutFn) return;
    this.loginOroutFn();
  }

  revokeAccess() {
    if (!this.revokeFn) return;
    this.revokeFn();
  }

  private setSigninStatus() {
    const isSignedIn = this.auth2.isSignedIn.get();
    if (isSignedIn) {
      const user = this.auth2.currentUser.get();
      const profile = user.getBasicProfile();
      this.setState({
        ...this.state,
        profile: {
          id: profile.getId(),
          fullName: profile.getName(),
          giveName: profile.getGivenName(),
          familyName: profile.getFamilyName(),
          imageUrl: profile.getImageUrl(),
          email: profile.getEmail(),
        },
        isAuthorized: user.hasGrantedScopes(SCOPES.join(' '))
      })
    } else {
      this.setState({
        ...this.state,
        profile: null,
        isAuthorized: false,
      })
    }
    // this.changeDetectorRef.detectChanges();
  }


}
