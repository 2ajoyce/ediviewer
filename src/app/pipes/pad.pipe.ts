import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pad'
})
export class PadPipe implements PipeTransform {

  transform(value: string, arg: number): string {
    let result = value;
    while (result.length < arg) {
      result = '0' + result;
    }

    return result;
  }

}
