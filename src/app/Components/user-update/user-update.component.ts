import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../Services/GeneralService/generalservice.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  generalService = inject(GeneralService);
  route = inject(ActivatedRoute);
  router=inject(Router)
  
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.generalService.getUserById(userId).subscribe((user) => {
        this.userForm.patchValue({
          name: user.name,
          email: user.email
        });
      });
    }
  }

  onUpdate() {
    if (this.userForm.valid) {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.generalService.updateUser(userId, this.userForm.value).subscribe((res) => {
          this.router.navigateByUrl("users")       
         });
      }
    }
  }
}
