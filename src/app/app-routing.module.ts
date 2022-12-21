import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { CustomerDetailComponent } from './component/customer-detail/customer-detail.component';
import { CustomerPageComponent } from './component/customer-page/customer-page.component';
import { GarbageAddDeleteComponent } from './component/garbage-add-delete/garbage-add-delete.component';
import { LoginComponent } from './component/login/login.component';
import { MernisPageComponent } from './component/mernis-page/mernis-page.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
{path:"",pathMatch:"full",component:LoginComponent},
{path:"garbages/add",component:GarbageAddDeleteComponent, canActivate:[LoginGuard]},
{path:"login",component:LoginComponent },
{path: "admin", component:AdminComponent},
{path: "customerPage", component:CustomerPageComponent},
{path: "register", component:RegisterComponent },
{path: "mernisPage", component:MernisPageComponent },
{path: "customers/getbyemail/:email", component:CustomerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
