import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fade } from './router-animations';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade],
})
export class AppComponent implements OnInit {
  userIsLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.userIsLoggedIn = !!user;
    });
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
