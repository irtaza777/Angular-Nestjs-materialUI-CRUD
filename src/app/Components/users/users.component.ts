import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { GeneralService } from '../../Services/GeneralService/generalservice.service';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, MatTableModule,CommonModule,MatCard,MatCardContent,RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  users: any[] = [];

  generalservice = inject(GeneralService);
  router = inject(Router);

  constructor() {
    this.generalservice.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    this.generalservice.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}
