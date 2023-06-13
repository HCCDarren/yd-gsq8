import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit {
  @Input() sectionTitle: string = null;
  @Input() hasMore = true;
  @Input() borderColor = 'primary';


  @Output() moreClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
