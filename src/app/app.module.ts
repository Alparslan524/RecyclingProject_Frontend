import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  FormsModule,ReactiveFormsModule } from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GarbageComponent } from './component/garbage/garbage.component';
import { CustomerComponent } from './component/customer/customer.component';
import { NaviBarComponent } from './component/navi-bar/navi-bar.component';
import { CarbonToKycComponent } from './component/carbon-to-kyc/carbon-to-kyc.component';
import { SHA256Component } from './component/sha256/sha256.component';
import { PersonDetailDtoComponent } from './component/person-detail-dto/person-detail-dto.component';
import { FilterPersonPipePipe } from './pipes/filter-person-pipe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { GarbageAddDeleteComponent } from './component/garbage-add-delete/garbage-add-delete.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminComponent } from './component/admin/admin.component';
import { CustomerPageComponent } from './component/customer-page/customer-page.component';
import { CustomerDetailComponent } from './component/customer-detail/customer-detail.component';
import { CustomerPipePipe } from './pipes/customer-pipe.pipe';
import { MernisPageComponent } from './component/mernis-page/mernis-page.component';


@NgModule({
  declarations: [
    AppComponent,
    GarbageComponent,
    CustomerComponent,
    NaviBarComponent,
    CarbonToKycComponent,
    SHA256Component,
    PersonDetailDtoComponent,
    FilterPersonPipePipe,
    GarbageAddDeleteComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    CustomerPageComponent,
    CustomerDetailComponent,
    CustomerPipePipe,
    MernisPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
