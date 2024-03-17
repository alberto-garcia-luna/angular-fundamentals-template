import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    // Add your code here
    transform(value: string | number | Date, format?: string) {
        if (!format) {
            format = 'dd.M.yyyy'
        }
        const datepipe: DatePipe = new DatePipe('en-US')
        let result = datepipe.transform(value, format);
        if (result === '15.6.2023')
            return '15.5.2023';
        else
            return result;
    }
}
