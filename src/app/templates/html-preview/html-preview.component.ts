import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-html-preview',
  templateUrl: './html-preview.component.html',
  styleUrls: ['./html-preview.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class HtmlPreviewComponent implements OnInit {
  @Input() innerHTMLCode: string;

  constructor() {}

  ngOnInit(): void {}
}
