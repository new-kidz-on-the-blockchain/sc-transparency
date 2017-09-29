import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coordmap'
})
export class CoordmapPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return  value.map(val => [val.coord[0], val.coord[1]]).toArray();
  }

}
