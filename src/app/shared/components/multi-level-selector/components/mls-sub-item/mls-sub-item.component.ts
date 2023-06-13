import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { MlsSubItem } from '../../models/mls-item.model';
import { MlsStoreService } from '../../services/mls-store/mls-store.service';
import { MlsConfig } from '../../models/mls-config.model';
import { TextTokensBlockConfig } from '../../../text-tokens-block/text-tokens-block.component';

@Component({
  selector: 'app-mls-sub-item',
  templateUrl: './mls-sub-item.component.html',
  styleUrls: ['./mls-sub-item.component.scss']
})
export class MlsSubItemComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing

  @Input() subItem: MlsSubItem;
  @Input() parentName: string;
  @Input() index: number;   // index for items array
  @Input() i: number;   // index for subItems array

  @ViewChild('containerRef', { static: true }) containerRef: ElementRef;
  cEl: any;
  el: any;
  cfg: MlsConfig = null;

  textTokensBlockConfig: TextTokensBlockConfig = {
    maxLength: 4,
    maxLatinLength: 10,
    maxTokensToDisplay: 3,
    fontSizeUnit: 'em',
  }

  constructor(
    private renderer: Renderer2,
    public mlsStore: MlsStoreService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    this.cEl = this.containerRef.nativeElement;
    this.el = this.cEl.querySelector("div");
    this.cfg = this.mlsStore.config;

    // if no displayNames, get from name
    // this.subItem.displayNames = this.subItem.displayNames ? this.subItem.displayNames : getStrArrayFromStr(this.subItem.name);
    this.subItem.displayNames = this.subItem.displayNames ? this.subItem.displayNames : [this.subItem.name];

    this.setSubItemStyle();

    this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.matches) {
          this.portraiteLayout();
        } else {
          this.landscapeLayout();
        }
      });
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onMouseleave() {
    this.mlsStore.clearIndex();
    this.setSubItemStyle();
  }

  public onMouseenter() {
    this.mlsStore.setIndex(this.index);
    this.setSubItemHoverStyle();

  }

  public onClick() {
    if (this.subItem.notClickable) return;
    // this.router.navigate(['/main/dept/' + this.subItem.name]);
    if (this.subItem.navigationCommands) {
      this.router.navigate(this.subItem.navigationCommands, this.subItem.navigationExtras);
    }

  }

  private portraiteLayout() {
    this.renderer.setStyle(this.cEl, 'top', parseInt(this.subItem.top) * this.cfg.portraitFactor + 'vw');
    this.renderer.setStyle(this.cEl, 'left', parseInt(this.subItem.left) * this.cfg.portraitFactor + 'vw');
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
    this.renderer.setStyle(this.cEl, 'top', parseInt(this.subItem.top) * this.cfg.landscapeFactor + 'vw');
    this.renderer.setStyle(this.cEl, 'left', parseInt(this.subItem.left) * this.cfg.landscapeFactor + 'vw');
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

  private setSubItemStyle() {
    this.renderer.setStyle(this.el, 'color', this.cfg.subItemTextColor);
    // this.renderer.setStyle(this.subItemElement, 'border', this.cfg.itemBorder);
    if (this.subItem.notClickable) {
      this.renderer.setStyle(this.el, 'cursor', 'default');
    }
    if (this.subItem.backgroundColor) {
      this.renderer.setStyle(this.el, 'background-color', this.subItem.backgroundColor);
    } else {
      this.renderer.setStyle(this.el, 'background-color', this.cfg.subItemBackgroundColor);
    }
  }

  private setSubItemHoverStyle() {
    if (!this.subItem.notClickable) {
      this.renderer.setStyle(this.el, 'color', this.cfg.subItemHoverTextColor);
      this.renderer.setStyle(this.el, 'background-color', this.cfg.subItemHoverBackgroundColor);
    }
  }
}
