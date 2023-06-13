import { GsqFormControlEnum } from '../enums/gsq-form-control.enum';
import { GsqInputTypeEnum } from '../enums/gsq-input-type.enum';

export interface GsqMetaColumn {
  num: number,          // column number for gsq-sheet
  formControl?: GsqFormControlEnum,  //
  inputType?: GsqInputTypeEnum
}
