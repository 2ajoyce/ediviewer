import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pad'
})
export class PadPipe implements PipeTransform {

  transform(value: string, arg: number): string {
    while (value.length < arg) {
      value = '0' + value;
    }

    return value;
  }

}
