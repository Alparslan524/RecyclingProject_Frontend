import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder  } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Sha256Service } from 'src/app/services/sha256.service';
import { SHA256 } from 'src/app/models/sHA256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm:FormGroup;
  sHA256s:SHA256[]=[];

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private sha256Service:Sha256Service
    ) {  }
     helper = new JwtHelperService();
  
  
  
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({},this.loginForm.value)
   
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        localStorage.setItem("token",response.data.token)
        
        let rol=this.helper.decodeToken(response.data.token)
        if ((rol["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])==="admin") 
        {
          this.router.navigate(["admin"]);
        }
        else
        {
          this.router.navigate(["customerPage"]);
        }

      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
    else
    {
      this.toastrService.error("Enter the Information Completely","Be careful");
    }

  }

 

  callRegister() {
    this.router.navigate(["register"]);
    }


   

}
