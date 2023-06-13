import { GsqButtonList } from './../../services/gsq-data/models/gsq-button-list.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gsq-button-list',
  templateUrl: './gsq-button-list.component.html',
  styleUrls: ['./gsq-button-list.component.scss']
})
export class GsqButtonListComponent implements OnInit {

  @Input() buttonList: GsqButtonList;

  constructor() { }

  ngOnInit() {
  }

}
