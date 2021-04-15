import { TrustCssPipe } from './trust-css.pipe';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';

describe('TrustCssPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
  });

  it('create an instance', inject(
    [DomSanitizer],
    (domSanitizer: DomSanitizer) => {
      let pipe = new TrustCssPipe(domSanitizer);
      expect(pipe).toBeTruthy();
    }
  ));
});
