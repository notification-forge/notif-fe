import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerTitle = '';
  constructor(
    private layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.layoutService.headerTitle$.subscribe((title) => {
      this.headerTitle = title;
      this.cd.detectChanges();
    });
  }

  toggleHeader(): void {
    this.layoutService.toggleSideNavCollapsed();
  }

  logout(): void {
    this.authService.logout();
  }
}
