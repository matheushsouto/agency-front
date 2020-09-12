import {Injectable, PipeTransform} from '@angular/core';

@Injectable({
    providedIn: 'root',
})


export class DateFormatPipeService implements PipeTransform {
    transform(value: string) {
        value = new Date(value).toLocaleDateString('pt-br');
        return value;
    }
}
