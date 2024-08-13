import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GeneralService } from '../../Services/GeneralService/generalservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  users: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  generalservice=inject(GeneralService)
  router=inject(Router)
  Onregister() {
    if (this.users.valid) {
      console.log(this.users.value);
      this.generalservice.saveuser(this.users.value).subscribe((res: any) => {
        console.log(res);
this.router.navigateByUrl("login")
      }, (error) => {
        console.error('Error:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
