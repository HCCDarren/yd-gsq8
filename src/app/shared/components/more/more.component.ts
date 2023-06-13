import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// Angular Material breakpoints are based on Google's Material Design specification.
// https://material.io/design/layout/responsive-layout-grid.html#breakpoints
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing


  label = null;
  @Input() text: string = null;
  @Input() routerLink: string | any[];
  @Input() queryParams: { [k: string]: any; }

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.label = this.text ? this.text : 'More';

    this.breakpointObserver.observe([ Breakpoints.XSmall ]).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(result => {
      if (!this.text) {
        if (result.matches) {
          this.label = "MORE";
        } else {
          this.label = "READ MORE";
        }
      }
    });
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
