import { Injectable } from '@angular/core';
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

  constructor() {}

  toggleSideNavCollapsed(): void {
    this.sideNavCollapsed$.next(!this.sideNavCollapsed);
    this.sideNavCollapsed = !this.sideNavCollapsed;
  }

  setHeaderTitle(title: string): void {
    this.headerTitle$.next(title);
  }
}
