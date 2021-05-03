import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private sideNavCollapsed = false;
  sideNavCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  headerTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  shouldShowHeaderAndSideNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor() {}

  toggleSideNavCollapsed(): void {
    this.sideNavCollapsed$.next(!this.sideNavCollapsed);
    this.sideNavCollapsed = !this.sideNavCollapsed;
  }

  setHeaderTitle(title: string): void {
    this.headerTitle$.next(title);
  }
}

interface WindowDimension {
  width: number;
  height: number;
}
