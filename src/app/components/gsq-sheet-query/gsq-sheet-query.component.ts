import { ActivatedRoute } from '@angular/router';
// https://www.google.com/recaptcha/admin/create
// tslint:disable: curly
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { GsqFormControlEnum } from 'src/app/services/gsq-data/enums/gsq-form-control.enum';
import { GsqInputTypeEnum } from 'src/app/services/gsq-data/enums/gsq-input-type.enum';
import { GsqSheet } from 'src/app/services/gsq-data/models/gsq-sheet';


interface KeyConfig {
  label: string;  // 識別欄名稱
  formControl: GsqFormControlEnum; // 識別欄控制方式
  inputType: GsqInputTypeEnum;   // 識別欄輸入方式
  options: string[];
}

@Component({
  selector: 'app-gsq-sheet-query',
  templateUrl: './gsq-sheet-query.component.html',
  styleUrls: ['./gsq-sheet-query.component.scss']
})
export class GsqSheetQueryComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing

  private SHEET: GsqSheet = null;
  get sheet(): GsqSheet {
    return this.SHEET;
  }
  @Input() set sheet(value: GsqSheet) {
    this.SHEET = value;
    if (this.SHEET) {

      this.keyConfigs = this.SHEET.keyColumns.map((col, index) => {
        let options: string[] = [];
        if (this.SHEET.keyOptions) {
          options = this.SHEET.keyOptions[index].map(keyOption => {
            return keyOption + '';
          });
        }
        return {
          label: this.SHEET.columnNames[col.num],
          formControl: col.formControl,
          inputType: col.inputType,
          options,
        };
      });

      this.keyConfigs.forEach(keyConfig => {
        const validators = [Validators.required];
        let defaultValue: any = '';

        if (keyConfig.formControl === GsqFormControlEnum.checkbox) defaultValue = false;
        if (keyConfig.inputType === GsqInputTypeEnum.email) validators.push(Validators.email);
        this.keys.push(new FormControl(defaultValue, validators));
      });
    }
  }

  keyConfigs: KeyConfig[] = null;

  @Output() querySubmit = new EventEmitter<(number | string)[]>();

  @Input()
  buttonLabel: string = null;

  // form for query
  queryForm = new FormGroup({
    keys: new FormArray([]),
    // recaptcha: new FormControl(null, Validators.required)
  });

  // shorthand to get they keys formarray
  get keys() {
    return this.queryForm.get('keys') as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.route.queryParams.pipe(
    //   takeUntil(this.ngUnsubscribe)).subscribe((queryParams) => {
    //     this.buttonLabel = queryParams.button;
    //   });

    // reset result when form is not valid
    this.queryForm.statusChanges.pipe(
      filter((status: string) => !this.queryForm.valid),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
        this.querySubmit.emit(null);
      });
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    // emit the keys values to parent component
    const keyValues = this.keys.value;
    this.querySubmit.emit(keyValues);
  }

  // on selection change, if '無' set selection to null
  onKeySelectionChange(keyIndex: number, event: any) {
    const nullOption = this.sheet.keyOptions[keyIndex][0];
    if (event.value === nullOption) {
      this.keys.controls[keyIndex].setValue(null);
    }
  }
}
