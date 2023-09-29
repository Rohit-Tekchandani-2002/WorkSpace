import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any): string[] {
    if (!value) {
      return [];
    }

    // Extract and return the keys of the object as an array
    return Object.keys(value);
  }
}
