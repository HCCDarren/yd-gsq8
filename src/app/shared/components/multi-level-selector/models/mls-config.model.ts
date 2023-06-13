import { MlsItem } from './mls-item.model';

export interface MlsConfig {
  landscapeItems: MlsItem[],
  portraitItems: MlsItem[],
  debugMode?: boolean,
  landscapeFactor?: number,
  landscapeItemContainerWidth?: string,
  landscapeItemContainerHeight?: string,
  landscapeFontSize?: number,
  landscapeSmallFontSize?: number,

  portraitFactor?: number,
  portraitItemContainerWidth?: string,
  portraitItemContainerHeight?: string,
  portraitFontSize?: number,
  portraitSmallFontSize?: number,

  fontSizeUnit?: string;

  itemBackgroundColor?: string,
  subItemBackgroundColor?: string,
  subItemHoverBackgroundColor?: string,

  itemTextColor?: string,
  subItemTextColor?: string,
  subItemHoverTextColor?: string,

  itemBorder?: string;
};
