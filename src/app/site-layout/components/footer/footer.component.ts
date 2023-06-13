import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from 'src/app/services/auth/services/auth-store/auth-store.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public authStore: AuthStoreService,
  ) { }

  ngOnInit() {
  }
  toggleAuthenticate(): void {
    if (this.authStore.state.authenticated) {
      this.authStore.setUnAuthenticated();
    } else {
      this.authStore.setAuthenticated();
    }
  }
}
