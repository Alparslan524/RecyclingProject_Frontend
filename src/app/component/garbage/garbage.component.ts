import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Garbage } from 'src/app/models/garbage';
import { GarbageService } from 'src/app/services/garbage.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { Customer } from 'src/app/models/customer';
import { PersonDetailDto } from 'src/app/models/personDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { PersonDetailDtoService } from 'src/app/services/person-detail-dto.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CarbonToKycService } from 'src/app/services/carbon-to-kyc.service';
import { CarbonToKyc } from 'src/app/models/carbonToKYC';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TransferKYC} from 'src/app/models/transferKYC';
import { ResponseModel } from 'src/app/models/responseModel';
import { Sha256Service } from 'src/app/services/sha256.service';
import { SHA256 } from 'src/app/models/sHA256';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css']
})
export class GarbageComponent implements OnInit{
  carbonToKyc: CarbonToKyc[] = [];
  garbages: Garbage[] = [];
  dataLoaded=false;
  totalCarbon=0;
  cartItems:CartItem[]=[];
  personDetailDto: PersonDetailDto[]=[];
  person:PersonDetailDto;
  emailNow=this.authService.getEmail();
  transferKYCformGroup:FormGroup;
  transferKYCModel:TransferKYC[]=[];
  sHA256s:SHA256;
  buyerCustomer:Customer;
  
  constructor(private garbageService: GarbageService,
    private toastrService:ToastrService,
    private cartService:CartService,
    private authService:AuthService,
    private personDetailDtoService:PersonDetailDtoService,
    private customerService:CustomerService,
    private carbontokycService:CarbonToKycService,
    private formBuilder:FormBuilder,
    private sha256Service:Sha256Service
    ) {}
    customer:Customer;
    
  ngOnInit(): void {
    this.getCarbonToKycs();
    this.getGarbages();
    this.getCart();
    this.createtransferKYCformGroupForm();
  }

  getGarbages(){
    this.garbageService.getGarbages().subscribe(response=>{
      this.garbages=response.data;
      this.dataLoaded=true;
    });
  }

  addToCart(garbage:Garbage){ 
      this.cartService.addToCart(garbage);
      this.toastrService.success("Added to Cart",garbage.type)
    }

  addToCarbon(garbage:Garbage){
    this.totalCarbon=this.cartService.addToCarbon(garbage)
  }
  
 
  getCart(){
    this.cartItems=this.cartService.list();
  }

  removeFromCart(garbage:Garbage){
    this.totalCarbon=this.cartService.removeFromCart(garbage);
    this.toastrService.warning(garbage.type + " Deleted Cart")
  }

  getCarbonToKycs() {
    this.carbontokycService.getCarbonToKycs().subscribe(response=>{
      this.carbonToKyc=response.data;
      this.dataLoaded=true;
    });
  }


  getByCarbonValue(){
    this.personDetailDtoService.getByEmail(this.emailNow).subscribe(response=>{
    this.personDetailDto=response.data;
    this.person=this.personDetailDto[0]
    
    this.person.carbon=this.person.carbon+this.totalCarbon

    this.update();
  });
  }

  update(){
  let customer1:Customer={
    customerId:this.person.customerId,
    carbon:this.person.carbon,
    kyc:this.person.kyc,
    shaId:this.person.shaId,
    userId:this.person.id};
    this.customerService.update(customer1).subscribe(response=>{
    this.toastrService.success(response.message,"Congratulations");
  })
  }

  
  convertKYC(){
    this.personDetailDtoService.getByEmail(this.emailNow).subscribe(response=>{
    this.personDetailDto=response.data;
    this.person=this.personDetailDto[0]
    if (this.person.carbon===0) {
      this.toastrService.error("Your carbon is zero. You cannot convert")
    } else {
      this.updateKyc();
    }
    
  });
  }



  updateKyc(){
    let customer1:Customer={
      customerId:this.person.customerId,
      carbon:0,
      kyc:(this.person.kyc+(this.person.carbon/this.carbonToKyc[0].carbontoKYC)),
      shaId:this.person.shaId,
      userId:this.person.id};
      this.customerService.update(customer1).subscribe(response=>{
      this.toastrService.success(response.message,"Congratulations! Your Carbons Are Converted To KYC");
    })
    }
    







    
    createtransferKYCformGroupForm(){
      this.transferKYCformGroup=this.formBuilder.group({
        transferKYCValue:["",Validators.required],
        adress:["",Validators.required]
      });
    }

    getByAdress(adress:string){
      this.sha256Service.getByAdress(adress).subscribe(response=>{
        this.sHA256s=response.data
        this.customerService.getById(this.sHA256s.shaId).subscribe(response=>{
          this.buyerCustomer=response.data
        })
      });  
    }



    sendKYC=async()=>{
      if (this.transferKYCformGroup.valid) {
        let transferKYCModel = Object.assign({},this.transferKYCformGroup.value); 
        
        this.personDetailDtoService.getByEmail(this.emailNow).subscribe(response=>{
          this.personDetailDto=response.data;
          this.person=this.personDetailDto[0]
          if (transferKYCModel.transferKYCValue>this.person.kyc) {
            this.toastrService.error("Error! Insufficient balance")
          }
          else
          {
            this.updateKYCTransfer(transferKYCModel.transferKYCValue);
          
            this.getByAdress(transferKYCModel.adress)
          }
          
        });
        await setTimeout(()=>{
          this.updateBuyer(transferKYCModel.transferKYCValue)
        },3000)
        
        
        
        
      } else {
        this.toastrService.error("Enter the Information Completely","Be careful");
      }
    }


     updateKYCTransfer(KYCValue:number) {
       let customerSender:Customer={
         customerId:this.person.customerId,
         carbon:this.person.carbon,
         kyc:this.person.kyc-KYCValue,
         shaId:this.person.shaId,
         userId:this.person.id};
         this.customerService.update(customerSender).subscribe(response=>{
          return this.toastrService.success(response.message,"Congratulations! Your KYC has reached its recipient");
       })
     }
    


     updateBuyer(KYCValue:number){
      let customerBuyer:Customer={
        customerId :this.buyerCustomer.customerId,
        carbon:this.buyerCustomer.carbon,
        kyc:this.buyerCustomer.kyc+ KYCValue,
        shaId:this.buyerCustomer.shaId,
        userId:this.buyerCustomer.userId}
        this.customerService.update(customerBuyer).subscribe(response=>{
          return this.toastrService.success(response.message,"Congratulations! Your KYC has been Send");
        })
     }
    
    
    
    
}
