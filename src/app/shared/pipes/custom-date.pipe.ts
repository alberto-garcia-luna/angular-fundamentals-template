import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    // Add your code here
    transform(value: string | number | Date | undefined, format?: string) {
        if (!value) { 
            return;
        }

        if (!format) {
            format = 'dd.M.yyyy'
        }

        const datepipe: DatePipe = new DatePipe('en-US');

        if (typeof(value) === 'string')
        {
            let dateParts: string[] = value.split("/");
            value = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
        }
        
        return datepipe.transform(value, format);
    }
}
