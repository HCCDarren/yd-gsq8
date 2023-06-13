import { Component, OnInit, Inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SidenavStoreState } from '../sidenav/sidenav-store/sidenav-store.state';
import { SidenavStoreService } from '../sidenav/sidenav-store/sidenav-store.service';
import { AuthStoreService } from 'src/app/services/auth/services/auth-store/auth-store.service';
import { WINDOW } from 'src/app/shared/providers/window.provider';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing

  sidenavState: SidenavStoreState = null;



  constructor(
    private sidenavStore: SidenavStoreService,
    @Inject(WINDOW) private window: Window,
    public authStore: AuthStoreService,
  ) { }

  ngOnInit() {
    // subsribe menuStore here, instead uing async pipe in template
    // to avoid 'Expression has changed after it was checked' error
    // see https://blog.angular-university.io/angular-debugging/
    this.sidenavStore.state$.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(state =>
        this.sidenavState = state
      );



  }


  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }




  onToggleSidenav() {
    this.sidenavStore.toggle()
  }

}
