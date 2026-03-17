import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Alerts } from '../alerts';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule, MatSelectModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  phone = '';
  address = '';
  favorites = '';

  constructor(private router: Router) {
    if (AuthService.getActiveUser()) {
      router.navigate(['/']);
    }
  }

  doRegister() {
    if (!this.firstName || !this.lastName || !this.email || !this.password || !this.phone || !this.address) {
      Alerts.error('All fields are required');
      return;
    }

    const users = AuthService.getUsers();
    if (users.some(u => u.email === this.email)) {
      Alerts.error('User with this email already exists');
      return;
    }

    const newUser: UserModel = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      favorites: this.favorites || 'Figura',
      orders: [],
    };

    users.push(newUser);
    (AuthService as any).setUsers(users);
    Alerts.success('Registration successful');
    this.router.navigate(['/login']);
  }
}

