import { Pipe, PipeTransform } from '@angular/core';
import { PersonDetailDto } from '../models/personDetailDto';

@Pipe({
  name: 'customerPipe'
})
export class CustomerPipePipe implements PipeTransform {

  transform(value: PersonDetailDto[], filterText:string): PersonDetailDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase():"";
    return filterText?value.filter((p:PersonDetailDto)=>p.email.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
