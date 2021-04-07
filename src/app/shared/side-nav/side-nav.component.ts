import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  isCollapsed = false;
  sideNavItem: SideNavItem[] = [
    {
      url: 'template',
      display: 'Templates',
      icon: 'home',
    },
    {
      url: 'image-lib',
      display: 'Image Library',
      icon: 'home',
    },
  ];
  currentActive: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.currentActive = (event as NavigationStart).url;
      });
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
