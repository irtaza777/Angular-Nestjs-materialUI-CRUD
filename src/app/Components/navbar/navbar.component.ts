import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GeneralService } from '../../Services/GeneralService/generalservice.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn;//signal for login/logout state
  userEmail;
  constructor(private generalservice: GeneralService, private router: Router) {

    this.isLoggedIn = this.generalservice.isLoggedIn;
    this.userEmail = this.generalservice.userEmail;


  

    effect(() => {
      console.log("Signal isLoggedIn:", this.isLoggedIn());
      console.log("Signal userEmail:", this.userEmail());

    });
  }
  logout() {
    this.generalservice.logout(); // Call the logout method from AuthService
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
