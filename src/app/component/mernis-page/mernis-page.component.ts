import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mernis-page',
  templateUrl: './mernis-page.component.html',
  styleUrls: ['./mernis-page.component.css']
})
export class MernisPageComponent implements OnInit{
  
  mernisForm:FormGroup;
  result:string;

  
  constructor(private router:Router,
   private formBuilder:FormBuilder,
   private toastrService:ToastrService,
   private authService:AuthService
    ) { }
  ngOnInit(): void {
    this.createMernisForm();
  }

  createMernisForm(){
    this.mernisForm=this.formBuilder.group({
      name:["",Validators.required],
      lastName:["",Validators.required],
      identityNumber:["",Validators.required],
      birthDate:["",Validators.required]
    })
  }

  verify(){
    if (this.mernisForm.valid) {
      let mernisModel = Object.assign({},this.mernisForm.value);

      this.authService.mernis(mernisModel.name, mernisModel.lastName, mernisModel.identityNumber, mernisModel.birthDate).subscribe(response=>{
       this.result=response.toString()
        if (this.result=="true") {
          this.toastrService.info("You have been verified. You are being redirected to the registration page...")
          setTimeout(() => {
            this.router.navigate(["register"]);
           }, 2000);
          
        } else {
          this.toastrService.error("Your information is incorrect. Try again");
        }
      })
    }
    else
    {
      this.toastrService.error("Enter the Information Completely","Be careful");
    }
  }
  cancel(){
    this.router.navigate(["login"]);
  }
}
