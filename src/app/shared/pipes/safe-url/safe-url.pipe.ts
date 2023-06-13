import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// for Working with iframe in Angular
// https://www.linkedin.com/pulse/working-iframe-angular-thiago-adriano
// usage:
// <iframe width="420" height="345" [src]="video | safeUrl">
// </iframe>

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
