import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GarbageComponent } from './component/garbage/garbage.component';
import { PersonComponent } from './component/person/person.component';
import { CustomerComponent } from './component/customer/customer.component';
import { NaviBarComponent } from './component/navi-bar/navi-bar.component';
import { CarbonToKycComponent } from './component/carbon-to-kyc/carbon-to-kyc.component';
import { PersonTypeComponent } from './component/person-type/person-type.component';
import { SHA256Component } from './component/sha256/sha256.component';
import { PersonDetailDtoComponent } from './component/person-detail-dto/person-detail-dto.component';

@NgModule({
  declarations: [
    AppComponent,
    GarbageComponent,
    PersonComponent,
    CustomerComponent,
    NaviBarComponent,
    CarbonToKycComponent,
    PersonTypeComponent,
    SHA256Component,
    PersonDetailDtoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
