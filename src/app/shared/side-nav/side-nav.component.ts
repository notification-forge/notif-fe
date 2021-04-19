import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  isCollapsed = false;
  sideNavItem: SideNavItem[] = [
    {
      url: 'templates',
      display: 'Templates',
      icon: 'book',
    },
    {
      url: 'image-lib',
      display: 'Image Library',
      icon: 'file-image',
    },
  ];
  currentActive: string | null = null;

  constructor(private router: Router, private layoutService: LayoutService) {
    const currentRoute = this.router.url;
    this.currentActive = currentRoute;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentActive = (event as NavigationEnd).url;
      });

    this.layoutService.sideNavCollapsed$.subscribe(
      (isCollapsed) => (this.isCollapsed = isCollapsed)
    );
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}

interface SideNavItem {
  url: string;
  display: string;
  icon: string;
}
