// use class Dependency Providers to differentiat dept and society multi-level-selector
// https://angular.io/guide/dependency-injection-providers#class-providers-with-dependencies

// for future reference, this is use Injecting component-specific values into an Angular2 service
// see https://stackoverflow.com/questions/41616191/injecting-component-specific-values-into-an-angular2-service
// Configuring Dependency Injection in Angular
// https://codecraft.tv/courses/angular/dependency-injection-and-providers/configuring/

import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, BehaviorSubject, Observable, defer, timer, of } from 'rxjs';
import { takeUntil, withLatestFrom, filter, map, share, tap } from 'rxjs/operators';
import { Store } from 'rxjs-observable-store';

import { MlsStoreState, mlsDefaultConfig } from './mls-store.state';
import { MlsScreen } from '../../enums/mls-screen.enum';
import { MlsConfig } from '../../models/mls-config.model';
import { MlsItem } from '../../models/mls-item.model';
import { MlsConfigService } from '../mls-config/mls-config.service';

export const mlsSpaceHolderText = 'space-holder';

const timerInitialDelay = 2000;
const timerPeriod = 1500;

// max tick count for each item
const maxTickCount = 3;
// subItems for each tick for viewing
const subItemsPerTick = 5

@Injectable()
export class MlsStoreService extends Store<MlsStoreState> implements OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing

  // for every index, track the tick count for viewing subitems
  private tickCount: number = 0;

  pause = new BehaviorSubject<boolean>(false);

  config: MlsConfig = null;

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected mlsConfigService: MlsConfigService,
  ) {
    super(new MlsStoreState());

    // get config and selection data
    this.mlsConfigService.getMlsConfig().pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(config => {
      this.config = {
        ...mlsDefaultConfig,
        ...config
      }
      // use portrait data to create landscape data
      if (!this.config.landscapeItems && this.config.portraitItems) {
        this.config.landscapeItems = this.mirror(this.config.portraitItems);
      }
      // use landscape data to create portrait data
      if (!this.config.portraitItems && this.config.landscapeItems) {
        this.config.portraitItems = this.mirror(this.config.landscapeItems);
      }

      // set initial screen orientation
      this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
        takeUntil(this.ngUnsubscribe)).subscribe(result => {
          if (result.matches) {
            this.setScreen(MlsScreen.portrait);
          } else {
            this.setScreen(MlsScreen.landscape);
          }
        });
    });

    // // timer
    this.getPausableTimer(timerInitialDelay, timerPeriod, this.pause).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
        this.tickCount--;
        if (this.tickCount <= 0) {
          this._setIndex(this.findNextIndex());
        }
      });
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setIndex(index: number) {
    this._setIndex(index);
    this.tickCount=maxTickCount * 2;
  }

  clearIndex() {
    // clear the unPause delay
    this.pause.next(false);
    this.tickCount=0;
  }

  setScreen(screen: MlsScreen) {
    if (!this.config) return;
    this.setState({
      ...this.state,
      items: screen === MlsScreen.portrait ? this.config.portraitItems : this.config.landscapeItems
    });
  }

  private _setIndex(index: number) {
    if (index !== this.state.currentIndex) {
      this.setState({
        ...this.state,
        currentIndex: index,
        currentKey: this.state.items[index].name,
      });
      if (this.state.items[index].subItems) {
        this.tickCount = Math.ceil((this.state.items[index].subItems.filter((i) => { return (i.name !== mlsSpaceHolderText) }).length - 1) / subItemsPerTick);
        this.tickCount = this.tickCount > maxTickCount ? maxTickCount : this.tickCount;
      } else {
        this.tickCount = 1;
      }


    }
  }

  private getPausableTimer(
    initialDelay: number,
    period: number,
    pause: BehaviorSubject<boolean>): Observable<any> {

    return defer(() => {
      let count = 1;
      return timer(initialDelay, period).pipe(
        withLatestFrom(pause),
        filter(([v, paused]) => !paused),
        map(() => count++)
      )
    }).pipe(share());
  }

  private findNextIndex(): number {
    if (!this.state.items) return null;
    let i = this.state.items.findIndex((el, index) => {
      return (index > this.state.currentIndex && el.name);
    });
    if (i === -1) {
      i = this.state.items.findIndex((el) => {
        return (el.name ? true : false);
      });
    }
    return i;
  }

  private mirror(source: MlsItem[]): MlsItem[] {
    return !source ? null : source.map(i => {
      return {
        ...i,
        top: i.left,
        left: i.top,
        subItems: (!i.subItems) ? null : i.subItems.map(subI => {
          return {
            ...subI,
            top: subI.left,
            left: subI.top,
          }
        }),
      }
    });
  }


}
