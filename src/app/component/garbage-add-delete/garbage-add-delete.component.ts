import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Garbage } from 'src/app/models/garbage';
import { GarbageService } from 'src/app/services/garbage.service';

@Component({
  selector: 'app-garbage-add-delete',
  templateUrl: './garbage-add-delete.component.html',
  styleUrls: ['./garbage-add-delete.component.css']
})
export class GarbageAddDeleteComponent implements OnInit {
  
  isDisabled=false;
  isDisabledDelete=false;
  garbages:Garbage[]=[];
  garbageAddForm:FormGroup;
  garbageDeleteForm:FormGroup;
  dataLoaded=false;
  constructor(private formBuilder:FormBuilder,
    private garbageService:GarbageService,
    private toastrService: ToastrService 
    ) {}
  
  
  ngOnInit(): void {
    this.createGarbageAddForm();
    this.createGarbageDeleteForm();
    this.getGarbages();
  }

  getGarbages(){
    this.garbageService.getGarbages().subscribe(response=>{
      this.garbages=response.data;
      this.dataLoaded=true;
    });
  }

  createGarbageAddForm(){
    this.garbageAddForm=this.formBuilder.group({
      type:["",Validators.required],
      carbon:["",Validators.required]
    });
  }
  add(){
    if (this.garbageAddForm.valid) {
      this.isDisabled=true;
      let garbageModel = Object.assign({},this.garbageAddForm.value); 
      this.garbageService.add(garbageModel).subscribe(data=>{
        setTimeout(() => {
          location.reload();
         }, 2300);
        this.toastrService.success(data.message,"Congratulations");
      }); //observable
      
    } else {
      this.toastrService.error("Enter the Information Completely","Be careful");
    }
  }


  createGarbageDeleteForm(){
    this.garbageDeleteForm=this.formBuilder.group({
      typeID:["",Validators.required],
      type:["",Validators.required],
      carbon:["",Validators.required]
    });
  }

  delete(){
    if (this.garbageDeleteForm.valid) {
      this.isDisabledDelete=true;
      let garbageModel = Object.assign({},this.garbageDeleteForm.value); 
      this.garbageService.delete(garbageModel).subscribe(data=>{
        setTimeout(() => {
          location.reload();
         }, 2300);
        this.toastrService.success(data.message,"Congratulations");
      }); //observable
      
    } else {
      this.toastrService.error("Enter the Information Completely","Be careful");
    }
  }
}
