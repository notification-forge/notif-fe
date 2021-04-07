import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit {
  @Input() templateID: number;

  constructor() {}

  ngOnInit(): void {}
}
