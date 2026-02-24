import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false, name: 'zeroVl' })
export class ZeroVlPipe implements PipeTransform {
  public transform(vl) {
    if (vl === 0 || vl === '0') {
      return 'LDL';
    } else {
      return vl;
    }
  }
}
