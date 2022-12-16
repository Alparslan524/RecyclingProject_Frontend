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

  

  
  constructor(private garbageService: GarbageService,
    private toastrService:ToastrService,
    private cartService:CartService,
    private authService:AuthService,
    private personDetailDtoService:PersonDetailDtoService,
    private customerService:CustomerService,
    private carbontokycService:CarbonToKycService
    ) {}
    customer:Customer;
    
  ngOnInit(): void {
    this.getCarbonToKycs();
    this.getGarbages();
    this.getCart();
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
    let customer2:Customer={
      customerId:this.person.customerId,
      carbon:0,
      kyc:(this.person.kyc+(this.person.carbon/this.carbonToKyc[0].carbontoKYC)),
      shaId:this.person.shaId,
      userId:this.person.id};
      this.customerService.update(customer2).subscribe(response=>{
      this.toastrService.success(response.message,"Congratulations! Your Carbons Are Converted To KYC");
    })
    }
  
    

}
