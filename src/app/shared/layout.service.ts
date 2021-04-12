import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService implements OnDestroy {
  private sideNavCollapsed = false;
  private bindResizeHandler: () => void;
  sideNavCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  headerTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  windowSize$: BehaviorSubject<WindowDimension> = new BehaviorSubject<WindowDimension>(
    {
      width: 0,
      height: 0,
    }
  );

  constructor() {
    const handleWindowResize = () => {
      this.windowSize$.next({
        width: window.innerHeight,
        height: window.innerHeight,
      });
    };

    const bindResizeHandler = handleWindowResize.bind(this);
    this.bindResizeHandler = bindResizeHandler;
    window.addEventListener('resize', bindResizeHandler);
    bindResizeHandler();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.bindResizeHandler);
  }

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
