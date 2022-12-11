import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarbageAddDeleteComponent } from './component/garbage-add-delete/garbage-add-delete.component';
import { LoginComponent } from './component/login/login.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
{path:"garbages/add",component:GarbageAddDeleteComponent, canActivate:[LoginGuard]},
{path:"login",component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
