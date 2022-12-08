import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarbageAddDeleteComponent } from './component/garbage-add-delete/garbage-add-delete.component';


const routes: Routes = [
{path:"garbages/add",component:GarbageAddDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
