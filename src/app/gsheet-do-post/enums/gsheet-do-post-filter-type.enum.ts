
export enum GsheetDoPostFilterType {
  byValue ='byValue',
  byValueWithBothSidesTrimmedAndConvertToLowerCase ='byValueWithBothSidesTrimmedAndConvertToLowerCase',

  byIsEmpty = 'byIsEmpty',
  byIsNotEmpty = 'byIsNotEmpty',

  byTextContains = 'byTextContains',
  byTextDoesNotContain = 'byTextDoesNotContain',
  byTextStartsWith = 'byTextStartsWith',
  byTextEndsWith = 'byTextEndsWith',
  byTextIsExactly = 'byTextIsExactly',

  byDateIs = 'byDateIs',
  byDateIsBefore = 'byDateIsBefore',
  byDateIsAfter = 'byDateIsAfter',


  byGreaterThan = 'byGreaterThan',
  byGreaterThanOrEqualTo = 'byGreaterThanOrEqualTo',
  byLessThan = 'byLessThan',
  byLessThanOrEqualTo = 'byLessThanOrEqualTo',

  byIsNotEqualTo = 'byIsNotEqualTo',
}


