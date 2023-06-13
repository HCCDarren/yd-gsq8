import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feature-title',
  templateUrl: './feature-title.component.html',
  styleUrls: ['./feature-title.component.scss']
})
export class FeatureTitleComponent implements OnInit {
  @Input() featureTitle: string = null;
  // @Input() borderColor: string = 'primary';
  constructor() { }

  ngOnInit() {
  }

}
