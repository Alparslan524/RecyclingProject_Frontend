import { Component, OnInit } from '@angular/core';
import { PersonDetailDto } from 'src/app/models/personDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { PersonDetailDtoService } from 'src/app/services/person-detail-dto.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit{
  personDetailDto: PersonDetailDto[]=[];
  dataLoaded=false;
  filterText=this.authService.getEmail();
  
  constructor(private personDetailDtoService:PersonDetailDtoService,
    private authService:AuthService
    ) {}

  ngOnInit(): void {
    this.getPersonDetail();
  }

  getPersonDetail(){
    this.personDetailDtoService.getPersonDetail().subscribe(response=>{
      this.personDetailDto=response.data;
      this.dataLoaded=true;
    })
  }

  getEmail(){
    console.log(this.authService.getEmail())
  }



}