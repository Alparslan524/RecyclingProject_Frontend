import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PersonType } from 'src/app/models/personType';
import { PersonTypeService } from 'src/app/services/person-type.service';

@Component({
  selector: 'app-person-type',
  templateUrl: './person-type.component.html',
  styleUrls: ['./person-type.component.css']
})
export class PersonTypeComponent implements OnInit {
  personTypes:PersonType[]=[];
  dataLoaded=false;

  constructor(private personTypeService:PersonTypeService) {}
  
  ngOnInit(): void {
    this.getPersonType();
  }

  getPersonType(){
    this.personTypeService.getPersonType().subscribe(response=>{
      this.personTypes=response.data;
      this.dataLoaded=true;
    });
  }
}