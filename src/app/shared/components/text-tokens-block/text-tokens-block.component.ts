import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef, ViewChildren, QueryList, Inject, Renderer2 } from '@angular/core';
import { getStrArrayFromStr, isLatinStr } from '../../utilities/utilities';

const FONT_SIZE_UNIT: string = 'em';
const FONT_SIZE: number = 1;

export interface TextTokensBlockConfig {
  maxLength?: number;
  maxLatinLength?: number;
  maxTokensToDisplay?: number;
  fontSizeUnit: string;             // 'px', 'vw', 'em', ...          //
  fontSizeByMaxCount?: number[];    // font size by max token count, ex: [fontsizeBy1Token, fontSizeBy2Token, ...]
  fontSizeByMaxLen?: number[];      // font size by max token length, ex: [fontsizeBy1MaxLen, fontsizeBy2MaxLen, ...]
  fullJustify?: boolean;
}

@Component({
  selector: 'app-text-tokens-block',
  templateUrl: './text-tokens-block.component.html',
  styleUrls: ['./text-tokens-block.component.scss']
})
export class TextTokensBlockComponent implements OnInit {
  @ViewChild('containerRef', { static: true }) containerRef: ElementRef;


  @Input() config: TextTokensBlockConfig = null;
  @Input() textArray: string[] | string = null;

  tokenArray: string[] = null;
  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['textArray'] || changes['config']) {
      let textArrayValue: any;
      if (changes['textArray']) {
        textArrayValue = changes['textArray'].currentValue;
      }
      if (!textArrayValue) return;
      const config: TextTokensBlockConfig = changes['config'].currentValue;

      // ensure textArray is an array not a string
      const textArray: string[] = Array.isArray(textArrayValue) ? textArrayValue : [textArrayValue];

      if (textArray && config) {
        // set maxLen and maxLatinLen from config or use MAX_VALUE as default
        const maxLength = config.maxLength ? config.maxLength : Number.MAX_VALUE;
        const maxLatinLength = config.maxLatinLength ? config.maxLatinLength : config.maxLength;

        this.tokenArray = [];
        // tokenize each item in textArray, then put the tokens into tokenArray


        textArray.forEach(text => {
          const tokens = getStrArrayFromStr(text, maxLength, maxLatinLength);
          tokens.forEach(token => {
            this.tokenArray.push(token);
          });
        });


        // set token count limit by config
        if (this.config.maxTokensToDisplay) {
          this.tokenArray = this.tokenArray.slice(0, this.config.maxTokensToDisplay);
        }

        // compute font size
        let fontSize: number = null;
        if ((config.fontSizeByMaxCount && config.fontSizeByMaxCount[0]) || (config.fontSizeByMaxLen && config.fontSizeByMaxLen[0])) {
          // compute font size for token count
          const fontSizeByCount = config.fontSizeByMaxCount ? config.fontSizeByMaxCount[Math.min(this.tokenArray.length - 1, config.fontSizeByMaxCount.length - 1)] : null;

          // compute max token length
          const maxLen = Math.max(...this.tokenArray.map((token) => {
            if (isLatinStr(token)) {
              const latinLen = Math.round(token.length / 2);
              return latinLen;
            } else {
              return token.length;
            }
          }));
          // font size for from max token length
          const fontSizeByLen = config.fontSizeByMaxLen ? config.fontSizeByMaxLen[Math.min(maxLen - 1, config.fontSizeByMaxLen.length - 1)] : null;

          // get default font size
          const fontSizeByCountMax = config.fontSizeByMaxCount ? Math.max(...config.fontSizeByMaxCount) : null;
          const fontSizeByLenMax = config.fontSizeByMaxLen ? Math.max(...config.fontSizeByMaxLen) : null;
          if (fontSizeByCountMax && fontSizeByLenMax) {
            fontSize = Math.min(fontSizeByCountMax, fontSizeByLenMax);
          } else if (fontSizeByCountMax) {
            fontSize = fontSizeByCountMax;
          } else {
            fontSize = fontSizeByLenMax;
          }

          // get the min font size either by token count or max token length
          fontSize = fontSizeByCount ? Math.min(fontSizeByCount, fontSize) : fontSize;
          fontSize = fontSizeByLen ? Math.min(fontSizeByLen, fontSize) : fontSize;
        } else {
          // use default font size
          fontSize = FONT_SIZE;
        }
        // use config.fontSizeUnit to get the css font value , ie '10px'
        const fontSizeString = this.config.fontSizeUnit ? fontSize + this.config.fontSizeUnit : fontSize + FONT_SIZE_UNIT;
        this.renderer.setStyle(this.containerRef.nativeElement, 'font-size', fontSizeString);
      }
    }
  }
}
