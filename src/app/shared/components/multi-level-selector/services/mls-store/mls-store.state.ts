import { MlsItem } from '../../models/mls-item.model';
import { MlsConfig } from '../../models/mls-config.model';

export class MlsStoreState {
  items: MlsItem[] = null;
  currentIndex: number | null = null;
  currentKey: string = null
}

export const mlsDefaultConfig: MlsConfig = {
  portraitItems: null,
  landscapeItems: null,

  debugMode: false,

  portraitFactor: 11,
  portraitItemContainerWidth: '15vw',
  portraitItemContainerHeight: '15vw',
  portraitFontSize: 3.8,
  portraitSmallFontSize: 3.4,

  landscapeFactor: 4.3,
  landscapeItemContainerWidth: '5.5vw',
  landscapeItemContainerHeight: '5.5vw',
  landscapeFontSize: 1.4,
  landscapeSmallFontSize: 1.2,

  fontSizeUnit: "vw",
  itemBackgroundColor: 'black',
  subItemBackgroundColor: '#ff2a95',
  subItemHoverBackgroundColor: '#d32f2f',

  itemTextColor: 'white',
  subItemTextColor: 'white',
  subItemHoverTextColor: 'white',

  itemBorder:'1px solid white',
}

