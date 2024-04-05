import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    // Add your code here
    transform(value: number | undefined) {
        if (!value) {
            return;
        }

        const hours: number = Math.floor(value / 60);
        const minutes: number = value % 60;
    
        return hours + ":" + minutes.toLocaleString('en-US', {minimumIntegerDigits: 2}) + " hours";
    }
}
