import { Injectable, EventEmitter } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { SidenavStoreState } from './sidenav-store.state';


@Injectable({
  providedIn: 'root'
})
export class SidenavStoreService extends Store<SidenavStoreState> {

  // emit and event after this.state.opened changed
  openedChange:EventEmitter<void> = new EventEmitter();

  constructor() {
    super(new SidenavStoreState());
  }

  open() {
    if (!this.state.opened) {
      this.setState({
        ...this.state,
        opened: true
      });
    }
  }

  close() {
    if (this.state.opened) {
      this.setState({
        ...this.state,
        opened: false
      });
    }
  }
  toggle() {
    this.setState({
      ...this.state,
      opened: !this.state.opened
    });
  }

  setDisable(){
    this.state.opened = true;
    this.state.disabled = true;
  }
  setEnable() {
    this.state.disabled = false;
  }
}
