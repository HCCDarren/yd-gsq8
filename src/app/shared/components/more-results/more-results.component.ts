import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-more-results',
  templateUrl: './more-results.component.html',
  styleUrls: ['./more-results.component.scss']
})
export class MoreResultsComponent implements OnInit {

  // use clicked not click, because click is an existing event, will cause event bubbling in the calling component
  @Output() clicked: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clicked.emit();
  }
}
