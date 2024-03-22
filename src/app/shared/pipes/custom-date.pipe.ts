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
        
        return datepipe.transform(value, format);
    }
}
