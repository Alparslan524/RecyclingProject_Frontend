import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarbonToKyc } from 'src/app/models/carbonToKYC';
import { CarbonToKycService } from 'src/app/services/carbon-to-kyc.service';

@Component({
  selector: 'app-carbon-to-kyc',
  templateUrl: './carbon-to-kyc.component.html',
  styleUrls: ['./carbon-to-kyc.component.css']
})
export class CarbonToKycComponent implements OnInit{
  carbonToKyc: CarbonToKyc[] = [];
  dataLoaded=false;
  constructor(private carbontokycService: CarbonToKycService) {}

  ngOnInit(): void {
    this.getCarbonToKycs();
  }
  getCarbonToKycs() {
    this.carbontokycService.getCarbonToKycs().subscribe(response=>{
      this.carbonToKyc=response.data;
      this.dataLoaded=true;
    });
  }
}
