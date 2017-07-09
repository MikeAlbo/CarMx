import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keyValue'})
export class KeyValuePipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let objKey in value) {
      value[objKey].key = objKey;
      keys.push(value[objKey]); // {key: key, value: value[key]}

    }
    return keys;
  }
}
