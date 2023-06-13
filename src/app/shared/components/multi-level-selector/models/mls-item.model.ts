import { NavigationExtras } from '@angular/router';

export interface MlsItem {
  top: string;
  left: string;
  name?: string,
  displayNames?: string[],
  backgroundColor?: string;
  // portraitSubDirection?: string;
  // hovered?: boolean;
  subItems?: MlsSubItem[]
  navigationCommands?: any[];
  navigationExtras?: NavigationExtras;
}

export interface MlsSubItem {
  top: string;
  left: string;
  name: string,
  displayNames?: string[],
  backgroundColor? : string;
  notClickable? :boolean;
  navigationCommands?: any[];
  navigationExtras?: NavigationExtras;
  // portraitSubDirection?: string;
}


