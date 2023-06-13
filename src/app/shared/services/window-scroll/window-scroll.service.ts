import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, Observable, empty } from 'rxjs';
import { map, share, pairwise, throttleTime } from 'rxjs/operators';
import { WINDOW } from '../../providers/window.provider';
// see https://stackblitz.com/edit/angular-scroll-service
// see https://netbasal.com/reactive-sticky-header-in-angular-12dbffb3f1d3
// const nearTopYOffset = 60;
// enum Direction {
//   Up = 1,
//   Down = -1
// }
export interface WindowScrollData {
  y: number;
  speed: number;
  maxY: number;
  isScrollFastToBottom;
}

const RELOAD_SCROLL_SPEED = -100;
const RELOAD_SCROLL_BOTTOM_POSITION = 100;

@Injectable({
  providedIn: 'root'
})
export class WindowScrollService {

  public scroll$: Observable<WindowScrollData>;

  constructor(
    // @Inject('Window') private window: Window,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(WINDOW) private window: Window,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.scroll$ = fromEvent(this.window, 'scroll').pipe(
        throttleTime(30),
        map(event => {

          return this.window.scrollY || this.document.documentElement.scrollTop;
        }),
        pairwise(),
        map(([y1, y2]) => {

          const scrollData =  {
            y: y2,
            speed: (y1 - y2),
            maxY: document.documentElement.scrollHeight - this.window.outerHeight,
          };
          return {
            ...scrollData,
            isScrollFastToBottom: this.isScrollFastToBottom(scrollData),
          } as WindowScrollData;
          // direction = (y2 < nearTopYOffset || y2 < y1 ? Direction.Up : Direction.Down)
        }),
        share()
      );
    }
    else {
      //in non-browser environments, provide an empty observable so you can safely subscribe to scroll$
      this.scroll$ = empty();

    }
  }

  // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
  scrollTop() {
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0;  // For Chrome, Firefox, IE and Opera
    try {

      document.body.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    } catch (e) {
      document.body.scrollTo(0, 0);
    }

    try {
      // For Chrome, Firefox, IE and Opera
      document.documentElement.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    } catch (e) {
      document.documentElement.scrollTo(0, 0);
    }
  }

  private isScrollFastToBottom(scrollData): boolean {
    const bottomPosition = scrollData.maxY - scrollData.y;
    return scrollData.speed < RELOAD_SCROLL_SPEED && bottomPosition < RELOAD_SCROLL_BOTTOM_POSITION;
  }

}
