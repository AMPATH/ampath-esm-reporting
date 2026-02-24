import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
/**
 * Pipe format a date
 */
@Pipe({
  standalone: false, name: 'stringToDate' })
export class StringToDatePipe implements PipeTransform {
  constructor() {}

  public transform(value: string, format: string): any {
    let formatted = '';
    if (value) {
      formatted = dayjs(value).format(format);
    }
    return formatted;
  }
}
