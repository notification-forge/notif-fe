import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerTitle = '';
  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.headerTitle$.subscribe(
      (title) => (this.headerTitle = title)
    );
  }

  toggleHeader(): void {
    this.layoutService.toggleSideNavCollapsed();
  }
}