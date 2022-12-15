import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Customer } from '../models/customer';
import { Garbage } from '../models/garbage';
import { PersonDetailDto } from '../models/personDetailDto';
import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';
import { PersonDetailDtoService } from './person-detail-dto.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  person:PersonDetailDto;
  personDetailDto: PersonDetailDto[]=[];
  totalCarbon=0;
  emailNow=this.authService.getEmail();

  
  
  constructor(private authService:AuthService,
    private personDetailDtoService:PersonDetailDtoService
    ) { }

  addToCart(garbage:Garbage){
    let item = CartItems.find(c=>c.garbage.typeID === garbage.typeID);
    if (item) {
      item.quantity+=1;
    } else {
      let cartItem = new CartItem();
      cartItem.garbage=garbage;
      cartItem.quantity=1;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(garbage:Garbage):number{
    let item = CartItems.find(c=>c.garbage.typeID === garbage.typeID);
    CartItems.splice(CartItems.indexOf(item),1);
    this.totalCarbon=this.totalCarbon-(item.garbage.carbon * item.quantity);
    return this.totalCarbon;
  }

  list():CartItem[]{
    return CartItems;
  }

  addToCarbon(garbage:Garbage):number{
    let item = CartItems.find(c=>c.garbage.typeID === garbage.typeID);
    this.totalCarbon=this.totalCarbon+item.garbage.carbon;
    return this.totalCarbon;
  }
}