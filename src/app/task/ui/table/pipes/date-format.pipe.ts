import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    let date: Date;

    if (value.seconds !== undefined) {
      //Format _Timestamp to Date
      date = new Date(value.seconds * 1000);
    } else if (value instanceof Date) {
      date = value;
    } else if (typeof value === 'string') {
      date = new Date(value);
    } else {
      return 'Fecha inválida';
    }

    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
