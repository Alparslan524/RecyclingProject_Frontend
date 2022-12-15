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

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css']
})
export class GarbageComponent implements OnInit{
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
    private personDetailDtoService:PersonDetailDtoService
    ) {}
    customer:Customer;
    
  ngOnInit(): void {
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

  


  getByCarbonValue(){
    this.personDetailDtoService.getByEmail(this.emailNow).subscribe(response=>{
    this.personDetailDto=response.data;
    this.person=this.personDetailDto[0]
    
    this.person.carbon=this.person.carbon+this.totalCarbon
    this.cartService.addBalance(this.person.carbon)
  })
  }





}
