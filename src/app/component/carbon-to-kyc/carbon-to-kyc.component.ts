import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarbonToKyc } from 'src/app/models/carbonToKYC';
import { CarbonToKycService } from 'src/app/services/carbon-to-kyc.service';

@Component({
  selector: 'app-carbon-to-kyc',
  templateUrl: './carbon-to-kyc.component.html',
  styleUrls: ['./carbon-to-kyc.component.css']
})
export class CarbonToKycComponent implements OnInit{
  carbonToKyc: CarbonToKyc[] = [];
  dataLoaded=false;
  carbonToKycUpdateForm: FormGroup;
  
  constructor(private carbontokycService: CarbonToKycService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
    ) {}


  ngOnInit(): void {
    this.getCarbonToKycs();
    this.createcarbonToKycUpdateForm();
  }
  
  createcarbonToKycUpdateForm(){
    this.carbonToKycUpdateForm=this.formBuilder.group({
      carbontoKYC:["",Validators.required],
      id:[1]
    });
  }

  getCarbonToKycs() {
    this.carbontokycService.getCarbonToKycs().subscribe(response=>{
      this.carbonToKyc=response.data;
      this.dataLoaded=true;
    });
  }

  update(){
    if (this.carbonToKycUpdateForm.valid) {
      let carbonToKycModel = Object.assign({},this.carbonToKycUpdateForm.value); 
      this.carbontokycService.update(carbonToKycModel).subscribe(data=>{
        this.toastrService.success(data.message,"Congratulations");
      }); //observable
      
    } else {
      this.toastrService.error("Enter the Information Completely","Be careful");
    }
  }



}
