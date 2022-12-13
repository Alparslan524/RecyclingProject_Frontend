import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi-bar',
  templateUrl: './navi-bar.component.html',
  styleUrls: ['./navi-bar.component.css']
})
export class NaviBarComponent {
  
  constructor(private authService:AuthService,
    private router:Router
    ) {}
    
    logout(){
    this.authService.logout();
    this.router.navigate(["login"]);
  }

}
