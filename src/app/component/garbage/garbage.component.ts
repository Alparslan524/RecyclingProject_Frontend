import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Garbage } from 'src/app/models/garbage';
import { GarbageService } from 'src/app/services/garbage.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css']
})
export class GarbageComponent implements OnInit{
  garbages: Garbage[] = [];
  dataLoaded=false;
  totalCarbon:number;
  constructor(private garbageService: GarbageService,
    private toastrService:ToastrService,
    private cartService:CartService
    ) {}


  ngOnInit(): void {
    this.getGarbages();
  }

  getGarbages(){
    this.garbageService.getGarbages().subscribe(response=>{
      this.garbages=response.data;
      this.dataLoaded=true;
    });
  }
  addToCart(garbage:Garbage){ 
      this.toastrService.success("Added to Cart",garbage.type)
      this.cartService.addToCart(garbage);
  }

  addToCarbon(garbage:Garbage){
    this.totalCarbon=this.cartService.addToCarbon(garbage)
  }
  
 
}
