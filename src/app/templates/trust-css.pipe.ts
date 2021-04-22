import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustCss',
})
export class TrustCssPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: unknown): unknown {
    if (typeof value !== 'string') return null;

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
