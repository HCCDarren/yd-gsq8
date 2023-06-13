import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import { SidenavStoreService } from 'src/app/main/layout/sidenav/sidenav-store/sidenav-store.service';
import { MlsScreen } from './enums/mls-screen.enum';
import { MlsStoreService } from './services/mls-store/mls-store.service';

@Component({
  selector: 'app-multi-level-selector',
  templateUrl: './multi-level-selector.component.html',
  styleUrls: ['./multi-level-selector.component.scss']
})
export class MultiLevelSelectorComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing

  // @ViewChild('mlSelectors', { static: true }) mlSelectors: ElementRef;

  isDisabled:boolean = false;

  constructor(
    public mlsStore: MlsStoreService,
    private breakpointObserver: BreakpointObserver,
    // public sidnavStore: SidenavStoreService,
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.matches) {
          this.mlsStore.setScreen(MlsScreen.portrait);
        } else {
          this.mlsStore.setScreen(MlsScreen.landscape);
        }
      });

    // should use @Input() isDisabled
    // this.sidnavStore.state$.pipe(
    //   takeUntil(this.ngUnsubscribe)).subscribe(state => {
    //     this.isDisabled = state.opened;
    //     if (this.isDisabled) {
    //       this.mlsStore.pause.next(true);
    //     } else {
    //       this.mlsStore.pause.next(false);
    //     }
    //   });
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
