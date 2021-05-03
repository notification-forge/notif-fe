import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fade } from './router-animations';
import { AuthService } from './shared/auth.service';
import { LayoutService } from './shared/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade],
})
export class AppComponent implements OnInit {
  userIsLoggedIn: boolean = false;
  showHeaderSideNav: boolean = true;

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.userIsLoggedIn = !!user;
    });
    this.layoutService.shouldShowHeaderAndSideNav$.subscribe(
      (showHeaderSideNav) => {
        this.showHeaderSideNav = showHeaderSideNav;
        this.cd.detectChanges();
      }
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    console.log(
      outlet &&
        outlet.activatedRouteData &&
        outlet.activatedRouteData.animations
    );
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animations
    );
  }
}
