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
  images: ImageItem[] = [
    {
      app: 'BCAT',
      fileName: 'IMG_001.png',
      url:
        'https://compote.slate.com/images/18ba92e4-e39b-44a3-af3b-88f735703fa7.png?width=780&height=520&rect=1560x1040&offset=0x0',
    },
    {
      app: 'SDWT',
      fileName: 'IMG_002.png',
      url:
        'http://cdn.cnn.com/cnnnext/dam/assets/210226040722-01-pokemon-anniversary-design.jpg',
    },
    {
      app: 'BCAT',
      fileName: 'IMG_001.png',
      url:
        'https://compote.slate.com/images/18ba92e4-e39b-44a3-af3b-88f735703fa7.png?width=780&height=520&rect=1560x1040&offset=0x0',
    },
    {
      app: 'SDWT',
      fileName: 'IMG_002.png',
      url:
        'https://d.newsweek.com/en/full/1569992/pokemon-anime-x-y-greninja.png?w=1600&h=1600&l=38&t=49&q=88&f=2fcab6e2455ae10afb2400b67532dea0',
    },
    {
      app: 'BCAT',
      fileName: 'IMG_001.png',
      url:
        'https://compote.slate.com/images/18ba92e4-e39b-44a3-af3b-88f735703fa7.png?width=780&height=520&rect=1560x1040&offset=0x0',
    },
    {
      app: 'SDWT',
      fileName: 'IMG_002.png',
      url:
        'http://cdn.cnn.com/cnnnext/dam/assets/210226040722-01-pokemon-anniversary-design.jpg',
    },
    {
      app: 'BCAT',
      fileName: 'IMG_001.png',
      url:
        'https://assets3.razerzone.com/zm4FnwTHu3gjy0gO2hGrHDE6LVo=/767x511/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fhda%2Fh32%2F9092791762974%2Fpokemon-hhtw-1.jpg',
    },
    {
      app: 'SDWT',
      fileName: 'IMG_002.png',
      url:
        'http://cdn.cnn.com/cnnnext/dam/assets/210226040722-01-pokemon-anniversary-design.jpg',
    },
    {
      app: 'BCAT',
      fileName: 'IMG_001.png',
      url:
        'http://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/e/ea/Grookey.jpg',
    },
    {
      app: 'SDWT',
      fileName: 'IMG_002.png',
      url:
        'http://cdn.cnn.com/cnnnext/dam/assets/210226040722-01-pokemon-anniversary-design.jpg',
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

interface ImageItem {
  url: string;
  fileName: string;
  app: string;
}
