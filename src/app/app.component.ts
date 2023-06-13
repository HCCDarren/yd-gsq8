import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GsqSheet } from './services/gsq-data/models/gsq-sheet';
import { WINDOW } from './shared/providers/window.provider';
import { SidenavStoreService } from './site-layout/components/sidenav/sidenav-store/sidenav-store.service';
import { SidenavStoreState } from './site-layout/components/sidenav/sidenav-store/sidenav-store.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing
  private IS_IE_BROWSER: boolean = null;
  sidenavState: SidenavStoreState = null;

  // title = 'GSQ 資料查詢系統';
  isMobile = false;

  // fullName: string = null;
  // isAuthorized: Boolean = false;

  sheet: GsqSheet = null;
  keyValues: (number | string)[];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavStore: SidenavStoreService,
    @Inject(WINDOW) private window: Window,
    // private changeDetectorRef: ChangeDetectorRef,  // for initiate change-detection
    // public googleAuthStore: GoogleAuthStoreService,
    // public authStore: AuthStoreService,
  ) { }

  ngOnInit() {
    // listen to screen to change for isMobile
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(result => {
        this.isMobile = result.matches;
      });


    // subsribe menuStore here, instead uing async pipe in template
    // to avoid 'Expression has changed after it was checked' error
    // see https://blog.angular-university.io/angular-debugging/
    this.sidenavStore.state$.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(state =>
        this.sidenavState = state
      );


    // this.googleAuthStore.state$.pipe(
    //   takeUntil(this.ngUnsubscribe)).subscribe(state => {
    //     if (state.profile) this.fullName = state.profile.fullName;
    //     else this.fullName = null;

    //     this.isAuthorized = state.isAuthorized;
    //     this.changeDetectorRef.detectChanges();
    //   })
  }

  onQuerySubmit(keyValues: (number | string)[]) {
    this.keyValues = keyValues;
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // when the menu open state is changed, reset menu and emit an openedChangeevent
  onOpenedChange() {
    this.sidenavStore.openedChange.emit();
  }
  // onLoginOrOut() {
  //   this.googleAuthStore.loginOrOut();
  // }

  // onRevoke() {
  //   this.googleAuthStore.revokeAccess();
  // }


  // onToggleSidenav() {
  //   this.sidenavStore.toggle()
  // }


  public isIeBrowser(): boolean {
    if (this.IS_IE_BROWSER !== null) { return this.IS_IE_BROWSER; }
    const ua = this.window.navigator.userAgent;
    this.IS_IE_BROWSER = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1;
    return this.IS_IE_BROWSER;
  }

}
