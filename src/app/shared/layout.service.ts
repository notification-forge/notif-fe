import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _sideNavCollapsed: boolean = false;
  sideNavCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  headerTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  toggleSideNavCollapsed() {
    this.sideNavCollapsed$.next(!this._sideNavCollapsed);
    this._sideNavCollapsed = !this._sideNavCollapsed;
  }

  setHeaderTitle(title: string) {
    this.headerTitle$.next(title);
  }
}
