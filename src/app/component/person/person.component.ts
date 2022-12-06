import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit{
  
  persons: Person[]=[]; 
  dataLoaded=false;
  
  constructor(private personService:PersonService) {}
  
  ngOnInit(): void {
    this.getPersons();
  }
  getPersons(){
    this.personService.getPersons().subscribe(response=>{
      this.persons=response.data;
      this.dataLoaded=true;
    });
  }
}
