import { Component, OnInit, Input } from '@angular/core';
import { GsqSheet } from 'src/app/services/gsq-data/models/gsq-sheet';

@Component({
  selector: 'app-gsq-sheet-data',
  templateUrl: './gsq-sheet-data.component.html',
  styleUrls: ['./gsq-sheet-data.component.scss']
})
export class GsqSheetDataComponent implements OnInit {

  @Input() keyValues: (number | string)[];
  @Input() sheet: GsqSheet;

  constructor() { }

  ngOnInit() {
  }

}
