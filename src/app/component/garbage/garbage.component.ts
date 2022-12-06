import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Garbage } from 'src/app/models/garbage';
import { GarbageService } from 'src/app/services/garbage.service';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css']
})
export class GarbageComponent implements OnInit{
  garbages: Garbage[] = [];
  dataLoaded=false;
  constructor(private garbageService: GarbageService) {}


  ngOnInit(): void {
    this.getGarbages();
  }

  getGarbages(){
    this.garbageService.getGarbages().subscribe(response=>{
      this.garbages=response.data;
      this.dataLoaded=true;
    });
  }
}
