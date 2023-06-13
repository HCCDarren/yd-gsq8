import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';

import { MenuStoreState } from './menu-store.state';
import { MenuNodes } from '../models/menu-nodes.model';
// use ng-material-multilevel-menu
// see https://github.com/ShankyTiwari/ng-material-multilevel-menu

@Injectable({
  providedIn: 'root'
})
export class MenuStoreService extends Store<MenuStoreState> {

  constructor(
  ) {
    super(new MenuStoreState());
  }

  setMenu(menu: MenuNodes) {
    this.setState({
      ...this.state,
      menu: menu,
    });
  }
}
