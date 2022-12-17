import { Component, OnInit } from '@angular/core';
import { SHA256 } from 'src/app/models/sHA256';
import { Sha256Service } from 'src/app/services/sha256.service';

@Component({
  selector: 'app-sha256',
  templateUrl: './sha256.component.html',
  styleUrls: ['./sha256.component.css']
})
export class SHA256Component implements OnInit{
  sHA256s:SHA256[]=[];
  dataLoaded=false;

  
  constructor(private sha256Service:Sha256Service) {}
  
  ngOnInit(): void {
    this.getSha256();
  }

  getSha256(){
    this.sha256Service.getSha256().subscribe(response=>{
      this.sHA256s=response.data;
      this.dataLoaded=true;
    });
  }
  
  

  


  

}
