import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    // Add your code here
    transform(value: string | Date, format?: string) {
        if(!format){
            format = 'dd.M.yyyy'
        }
    
        return formatDate(value, format, 'en-US');
    }
}
