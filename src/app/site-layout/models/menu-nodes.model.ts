
// for ng-material-multilevel-menu
// see https://github.com/ShankyTiwari/ng-material-multilevel-menu
// use this inplace of  ng-material-multilevel-menu's MultilevelNodes, see below
// export interface MultilevelNodes {
//   id: string;    // not ?
//   label: string;
//   faIcon?: string;
//   icon?: string;
//   imageIcon?: string;
//   hidden?: boolean;
//   link?: string;
//   externalRedirect?: boolean;
//   data: any; // not ?
//   items?: MultilevelNodes[];
//   onSelected?: Function;
// }


export interface MenuNodes  {
  id?: string;    // add ?
  label: string;
  faIcon?: string;
  icon?: string;
  imageIcon?: string;
  hidden?: boolean;
  link?: string;
  externalRedirect?: boolean;
  data?: any;    // add ?
  items?: MenuNodes[];
  onSelected?: Function;

}


