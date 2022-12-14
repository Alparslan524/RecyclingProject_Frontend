import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  emailNow=this.authService.getEmail();


  constructor(private personDetailDtoService:PersonDetailDtoService,
    private authService:AuthService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder
    ) {}

  ngOnInit(): void {
        this.getByEmail();
  }

  getByEmail(){
    this.personDetailDtoService.getByEmail(this.emailNow).subscribe(response=>{
    this.personDetailDto=response.data;
    this.dataLoaded=true;
  })
  }
}