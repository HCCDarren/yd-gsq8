import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// import { SidenavStoreService } from 'src/app/main/layout/sidenav/sidenav-store/sidenav-store.service';
import { MlsItem } from '../../models/mls-item.model';
import { MlsStoreService } from '../../services/mls-store/mls-store.service';
import { MlsConfig } from '../../models/mls-config.model';
import { getStrArrayFromStr } from 'src/app/shared/utilities/utilities';
import { TextTokensBlockConfig } from '../../../text-tokens-block/text-tokens-block.component';


@Component({
  selector: 'app-mls-item',
  templateUrl: './mls-item.component.html',
  styleUrls: ['./mls-item.component.scss']
})
export class MlsItemComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing

  @Input() item: MlsItem;
  @Input() index: number;
  isDisabled: boolean = false;

  @ViewChild('containerRef', { static: true }) containerRef: ElementRef;
  cEl: any;
  el: any;

  currentIndex: number = null;
  isComputer: boolean = false;    // ! Breakpoints.Handset

  public cfg: MlsConfig = null;

  textTokensBlockConfig: TextTokensBlockConfig = {
    maxLength: 4,
    maxLatinLength: 10,
    maxTokensToDisplay: 3,
    fontSizeUnit: 'em',
  }

  constructor(
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
    public mlsStore: MlsStoreService,
    // public sidnavStore: SidenavStoreService,
  ) { }

  ngOnInit() {
    this.cEl = this.containerRef.nativeElement;
    this.el = this.cEl.querySelector("div");
    this.cfg = this.mlsStore.config;

    // if no displayNames, get from name
    if (this.item.name && !this.item.displayNames) {
      this.item.displayNames = getStrArrayFromStr(this.item.name);
    }


    this.setItemStyle();

    this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.matches) {
          this.portraiteLayout();
        } else {
          this.landscapeLayout();
        }
      });


    // check if is computer
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(result => {
        this.isComputer = !result.matches;
      });

    // should use @Input() isDisabled
    // this.sidnavStore.state$.pipe(
    //   takeUntil(this.ngUnsubscribe)).subscribe(state => {
    //     this.isDisabled = state.opened;
    //   });

    // get current index
    this.mlsStore.state$.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(state => {
        this.currentIndex = state.currentIndex;
      }
      )
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onMouseenter() {
    // if is a computer, on mouse enter show the submenu
    if (this.isComputer) {
      if (this.item.name) {
        this.mlsStore.setIndex(this.index);
      }
    }
  }

  public onClick() {
    // if is not a computer, on click show submenu
    if (!this.isComputer) {
      if (this.item.name) {
        this.mlsStore.setIndex(this.index);
      }
    }
  }

  private portraiteLayout() {
    // set the top and left css property for protraite mode
    this.renderer.setStyle(this.cEl, 'top', parseInt(this.item.top) * this.cfg.portraitFactor + 'vw');
    this.renderer.setStyle(this.cEl, 'left', parseInt(this.item.left) * this.cfg.portraitFactor + 'vw');
    this.renderer.setStyle(this.cEl, 'width', this.cfg.portraitItemContainerWidth);
    this.renderer.setStyle(this.cEl, 'height', this.cfg.portraitItemContainerHeight);

    this.textTokensBlockConfig = {
      ...this.textTokensBlockConfig,
      // set the font size unit
      fontSizeUnit: this.cfg.fontSizeUnit,
      // for 1, 2, 3 or more, set font size for each row count
      fontSizeByMaxCount: [this.cfg.portraitFontSize, this.cfg.portraitFontSize, this.cfg.portraitSmallFontSize],
      // for max token length of 1, 2, 3, or 4  or more, set the font size for each max length
      fontSizeByMaxLen: [this.cfg.portraitFontSize, this.cfg.portraitFontSize, this.cfg.portraitFontSize, this.cfg.portraitSmallFontSize, this.cfg.portraitSmallFontSize * 0.8]
    }
  }

  private landscapeLayout() {
    // set the top and left css property for landscape mode
    this.renderer.setStyle(this.cEl, 'top', parseInt(this.item.top) * this.cfg.landscapeFactor + 'vw');
    this.renderer.setStyle(this.cEl, 'left', parseInt(this.item.left) * this.cfg.landscapeFactor + 'vw');
    this.renderer.setStyle(this.cEl, 'width', this.cfg.landscapeItemContainerWidth);
    this.renderer.setStyle(this.cEl, 'height', this.cfg.landscapeItemContainerHeight);

    this.textTokensBlockConfig = {
      ...this.textTokensBlockConfig,
      // set the font size unit
      fontSizeUnit: this.cfg.fontSizeUnit,
      // for 1, 2, 3 or more, set font size for each row count
      fontSizeByMaxCount: [this.cfg.landscapeFontSize, this.cfg.landscapeFontSize, this.cfg.landscapeSmallFontSize],
      // for max token length of 1, 2, 3, 4, 5 or more, set the font size for each max length
      fontSizeByMaxLen: [this.cfg.landscapeFontSize, this.cfg.landscapeFontSize, this.cfg.landscapeFontSize, this.cfg.landscapeSmallFontSize, this.cfg.portraitSmallFontSize * 0.3],
    }
  }

  private setItemStyle() {
    this.renderer.setStyle(this.el, 'color', this.cfg.itemTextColor);
    if (!this.isDisabled) {
      if (this.item.name) {
        if (this.item.backgroundColor) {
          this.renderer.setStyle(this.el, 'background-color', this.item.backgroundColor);
        } else {
          this.renderer.setStyle(this.el, 'background-color', this.cfg.itemBackgroundColor);
        }
      } else {
        this.renderer.setStyle(this.el, 'border', this.cfg.itemBorder);
      }
    }

  }
}

