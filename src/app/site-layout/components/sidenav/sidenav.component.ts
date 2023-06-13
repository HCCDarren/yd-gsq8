// tslint:disable: max-line-length
// tslint:disable: curly
// use ng-material-multilevel-menu for menu
// see https://www.npmjs.com/package/ng-material-multilevel-menu
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Configuration, MultilevelNodes } from 'ng-material-multilevel-menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GoogleAuthStoreService } from 'src/app/services/google-auth-store/google-auth-store.service';
import { environment } from 'src/environments/environment';
import { MenuStoreService } from '../../menu-store/menu-store.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {

  constructor(
    public menuStore: MenuStoreService,
    private breakpointObserver: BreakpointObserver,
    public gAuthStore: GoogleAuthStoreService,
    private changeDetectorRef: ChangeDetectorRef,  // for initiate change-detection
  ) { }
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing
  isMobile = false;

  // for google login
  gFullName: string = null;
  // tslint:disable-next-line: ban-types
  gIsAuthorized: Boolean = false;

  config: Configuration = {

    paddingAtStart: true,           // boolean => [optional] If you don't want padding at the start of the list item, then you can give false. The default value will be true.
    interfaceWithRoute: true,       // boolean => [required] only if you want to use Angular Routing with this menu.
    highlightOnSelect: true,        // boolean => [optional] If you want to highlight the clicked item in the list, then you can do that by making it true. The default value will be false.
    collapseOnSelect: true,         // boolean; => [optional] You have the option to collapse another parent when clicked on the current parent. The default value will be false.
    rtlLayout: false,               // boolean; => [optional] whether display is Right To Left. The default value will be false.
    classname: 'menu',              // string; => [optional] You can give your own custom class name in order to modify the list appearance.
    listBackgroundColor: 'white',   // string; => [optional] You can apply custom color to the background of the list.
    fontColor: 'black',             // string; => [optional] Changes the color of Text and icons inside the list.
    backgroundColor: 'white',       // string; => [optional] This will change the background color list container.
    selectedListFontColor: environment.cssVar.primaryColor,   // string; => [optional] This will change the font color of selected list item.
  };
  gLoginOrOutFn = () => { };
  gRevokeFn = () => { };

  ngOnInit() {
    // listen to screen to change for isMobile
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(result => {
        this.isMobile = result.matches;
      });

    // listen for google auth, and set menu items
    this.gAuthStore.state$.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(state => {

        if (state.profile) this.gFullName = state.profile.fullName;
        else this.gFullName = null;

        this.gIsAuthorized = state.isAuthorized;
        this.gLoginOrOutFn = () => { this.gAuthStore.loginOrOut(); }
        this.gRevokeFn = () => { this.gAuthStore.revokeAccess(); }

        const menu = this.menuStore.state.menu;
        const loginMenuIndex = menu.items.findIndex(item => {
          return item.data === 'itemForLoginOrOut';
        });
        const loginLabel =  this.gFullName ? this.gFullName + '，登出 Google' : '登入 Google';
        const loginIcon =  this.gFullName ? 'phonelink_erase' : 'phonelink_lock';
        if (loginMenuIndex > 0) {
          // if login item exit, update statue
          menu.items[loginMenuIndex].label = loginLabel;
          menu.items[loginMenuIndex].icon = loginIcon;
        } else {
          // add login and revoke items
          menu.items.push({
            label: loginLabel,
            icon: loginIcon,
            onSelected: this.gLoginOrOutFn,
            data: 'itemForLoginOrOut',
          })
          menu.items.push({
            label: '撤銷 Google 存取權',
            icon: 'mobile_off',
            onSelected: this.gRevokeFn,
          })
        }
        this.menuStore.setMenu(menu);
        this.changeDetectorRef.detectChanges();
      })

  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  selectedItem(event: MultilevelNodes) {
  }

  selectedLabel(event: MultilevelNodes) {
  }

}

