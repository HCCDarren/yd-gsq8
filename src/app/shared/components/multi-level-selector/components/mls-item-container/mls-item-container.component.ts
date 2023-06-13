import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
// import { SidenavStoreService } from 'src/app/main/layout/sidenav/sidenav-store/sidenav-store.service';
import { MlsItem } from '../../models/mls-item.model';
import { mlsSpaceHolderText, MlsStoreService } from '../../services/mls-store/mls-store.service';



@Component({
  selector: 'app-mls-item-container',
  templateUrl: './mls-item-container.component.html',
  styleUrls: ['./mls-item-container.component.scss']
})
export class MlsItemContainerComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing
  spaceHolderText = mlsSpaceHolderText;
  @Input() item: MlsItem;
  @Input() index: number;
  @Input() isDisabled = false;

  constructor(
    // private renderer: Renderer2,
    // private breakpointObserver: BreakpointObserver,
    public mlsStore: MlsStoreService,
    // public sidnavStore: SidenavStoreService,
  ) { }

  ngOnInit() {
    // should use @Input() isDisabled
    // this.sidnavStore.state$.pipe(
    //   takeUntil(this.ngUnsubscribe)).subscribe(state => {
    //     this.isDisabled = state.opened;
    //   });
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

