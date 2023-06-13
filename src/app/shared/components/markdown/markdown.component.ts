// use https://www.npmjs.com/package/ngx-markdown
// https://marked.js.org/#/USING_ADVANCED.md#options

import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {

  private MDDATA: string;

  get mdData(): string {
    // remove  \r  Carriage return (CR), ASCII 13(十進位)
    // return this._mdData.replace(/\r/g, '');
    return this.MDDATA;
  }
  @Input() set mdData(data: string) {
    this.MDDATA = this.replaceURLWithHTMLLinks(data);
  }

  constructor() { }

  ngOnInit() {
  }

  private replaceURLWithHTMLLinks(text: string): string {
    // tslint:disable-next-line: curly
    if (!text) return '';
    text = '' + text; // ensure even 123 is a text type
    const exp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, '<a href=\'$1\' target=\'_blank\'>$3</a>');
  }
}
