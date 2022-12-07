import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { Garbage } from 'src/app/models/garbage';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit{

  cartItems:CartItem[]=[];
  totalCarbon=0;

  constructor(private cartService:CartService,
    private toastrService:ToastrService
    ) {}
  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems=this.cartService.list();
  }

  removeFromCart(garbage:Garbage){
    this.totalCarbon=this.cartService.removeFromCart(garbage);
    this.toastrService.warning(garbage.type+" Deleted Cart")
  }

 
 

}
