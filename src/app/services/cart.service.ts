import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Garbage } from '../models/garbage';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  totalCarbon=0;
  
  constructor() { }

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
