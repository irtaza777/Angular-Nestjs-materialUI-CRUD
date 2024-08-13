import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../../Services/GeneralService/generalservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Fix typo here
})
export class LoginComponent {
  users: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private generalservice: GeneralService, private router: Router, private http: HttpClient) { }

  onlogin() {
    this.http.get("http://localhost:3000/users").subscribe({
      next: (res: any) => {
        const foundUser = res.find((user: { email: string; password: string; }) =>
          user.email === this.users.get('email')?.value && user.password === this.users.get('password')?.value
        );

        if (foundUser) {
          this.generalservice.login(foundUser);  // Make sure this method exists in your GeneralService
          this.router.navigateByUrl('users');
        } else {
          alert('Wrong credentials');
        }
      },
      error: (err) => {
        console.error('Login request failed', err);
        alert('An error occurred. Please try again.');
      }
    });
  }
}
