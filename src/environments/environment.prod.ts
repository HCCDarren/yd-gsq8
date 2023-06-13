export const environment = {
  production: false,
  cssVar: {
    primaryColor : '#D32F2F', //  #{matColor($primary)};
    primaryLighterColor : '#FFCDD2', //  #{matColor($primary, lighter)};
    primaryDarkerColor : '#B71C1C', //  #{matColor($primary, darker)};

    accentColor : '#3949AB', //  #{matColor($accent)};
    accentLighterColor : '#C5CAE9', //  #{matColor($accent, lighter)};
    accentDarkerColor : '#1A237E', //  #{matColor($accent, darker)};

    warnColor : '#FF4081', //  #{matColor($warn)};
    warnLighterColor : '#F8BBD0', //  #{matColor($warn, lighter)};
    warnDarkerColor : '#880E4F', //  #{matColor($warn, darker)};

    backgroundColor : '#9E9E9E', //  #{matColor( map-get($theme, background), background)};
    foregroundColor : '#FFFFFF', //  #{matColor( map-get($theme, foreground), base)};

    textColor : '#000000', //  #{matColor( map-get($theme, foreground), text)};
    secondaryTextColor : '#616161', //  #{matColor( map-get($theme, foreground), secondaryText)};

    dividerColor : '#E0E0E0', //  #{matColor( map-get($theme, foreground), divider)};

    breakpointMax : '599px',
    breakpointMin : '600px',


    gap : '2vw', //  2vw;
    lGap : '16px', //  16px;
  },
  credential: {
    apiKey: 'AIzaSyBYZkVAZgZLZ5JQmZLPPviSKXeEAqURm_8', // ng build --prod 前暫時換成 real api-key
  },

  V2UrlSegment: 'v2',   // v2 enfore ciphered spreadsheet id, uses 'v2' as 1st url segment
  QueryParamLabelForLog: 'log',

  spreadsheetsIdCipherKey: '5n5Y7asU5dkowriVewKh',  // 對 Google Spreadsheet Id 加密，用於 /v2/gsq route

  defaultQueriesSettingRange: 'Yd設定',    // 預設的Spreadsheet 命名，用來取得查詢群
  QueryParamLabelForQueriesSettingRange: 'config',

  managemantSettingRange: 'Yd設定m',    // 預設的Spreadsheet 命名，用來取得管理查詢群

};
