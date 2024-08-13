import { Routes } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { UsersComponent } from './Components/users/users.component';
import { UserUpdateComponent } from './Components/user-update/user-update.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    {
        path:"navbar",
        component:NavbarComponent
    },
    {
        path:"registartion",
        component:RegistrationComponent,
        
    },
    {
        path:"login",
        component:LoginComponent
    }, {
        path:"users",
        component:UsersComponent,
        canActivate: [authGuard]

    }, {
        path:"updateuser/:id",
        component:UserUpdateComponent
    },
];
