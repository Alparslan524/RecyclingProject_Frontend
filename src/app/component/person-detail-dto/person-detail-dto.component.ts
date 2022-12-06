import { Component, OnInit } from '@angular/core';
import { PersonDetailDto } from 'src/app/models/personDetailDto';
import { PersonDetailDtoService } from 'src/app/services/person-detail-dto.service';

@Component({
  selector: 'app-person-detail-dto',
  templateUrl: './person-detail-dto.component.html',
  styleUrls: ['./person-detail-dto.component.css']
})
export class PersonDetailDtoComponent implements OnInit{
  personDetailDto: PersonDetailDto[]=[];
  dataLoaded=false;
  
  constructor(private personDetailDtoService:PersonDetailDtoService) {}

  ngOnInit(): void {
    this.getPersonDetail();
  }

  getPersonDetail(){
    this.personDetailDtoService.getPersonDetail().subscribe(response=>{
      this.personDetailDto=response.data;
      this.dataLoaded=true;
    })
  }
}
