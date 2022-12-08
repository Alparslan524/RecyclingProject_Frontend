import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GarbageService } from 'src/app/services/garbage.service';

@Component({
  selector: 'app-garbage-add-delete',
  templateUrl: './garbage-add-delete.component.html',
  styleUrls: ['./garbage-add-delete.component.css']
})
export class GarbageAddDeleteComponent implements OnInit {
  
  
  garbageAddForm:FormGroup;
  garbageDeleteForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private garbageService:GarbageService,
    private toastrService: ToastrService 
    ) {}
  
  
  ngOnInit(): void {
    this.createGarbageAddForm();
    this.createGarbageDeleteForm();
  }

  createGarbageAddForm(){
    this.garbageAddForm=this.formBuilder.group({
      type:["",Validators.required],
      carbon:["",Validators.required]
    });
  }
  add(){
    if (this.garbageAddForm.valid) {
      let garbageModel = Object.assign({},this.garbageAddForm.value); 
      this.garbageService.add(garbageModel).subscribe(data=>{
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
      let garbageModel = Object.assign({},this.garbageDeleteForm.value); 
      this.garbageService.delete(garbageModel).subscribe(data=>{
        this.toastrService.success(data.message,"Congratulations");
      }); //observable
      
    } else {
      this.toastrService.error("Enter the Information Completely","Be careful");
    }
  }
}
