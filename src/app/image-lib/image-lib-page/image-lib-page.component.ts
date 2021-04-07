import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/layout.service';

@Component({
  selector: 'app-image-lib-page',
  templateUrl: './image-lib-page.component.html',
  styleUrls: ['./image-lib-page.component.scss'],
})
export class ImageLibPageComponent implements OnInit {
  tagValue = [];
  listOfOption: DropdownOption[] = [
    {
      label: 'BCAT',
      value: 'bcat',
    },
    {
      label: 'SDWT',
      value: 'sdwt',
    },
  ];

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.setHeaderTitle('Image Library');
  }
}

interface DropdownOption {
  label: string;
  value: string;
}
