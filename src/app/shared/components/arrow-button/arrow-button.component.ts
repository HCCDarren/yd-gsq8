// https://codepen.io/hakimel/pen/gfIsk

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


export enum ArrowButtonDirection {
  left = 'left',
  right = 'right',
}


@Component({
  selector: 'app-arrow-button',
  templateUrl: './arrow-button.component.html',
  styleUrls: ['./arrow-button.component.scss']
})
export class ArrowButtonComponent implements OnInit {
  right = ArrowButtonDirection.right;
  left = ArrowButtonDirection.left;

  @Input() direction: ArrowButtonDirection = ArrowButtonDirection.left;
  @Input() disabled = false;
  @Input() color = 'none';

  @Output() onClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  click() {
    this.onClick.emit();
  }
}
