import { Pipe, PipeTransform } from '@angular/core';
import { PersonDetailDto } from '../models/personDetailDto';

@Pipe({
  name: 'filterPersonPipe'
})
export class FilterPersonPipePipe implements PipeTransform {

  transform(value: PersonDetailDto[], filterText:string): PersonDetailDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase():"";
    return filterText?value.filter((p:PersonDetailDto)=>p.firstName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
