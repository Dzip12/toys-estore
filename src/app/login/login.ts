import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule, RouterLinkWithHref],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = 'user@gmail.com'
  password: string = '123'

  constructor(private router: Router) {
    if (AuthService.getActiveUser()) {
      router.navigate(['/'])
    }
  }

  doLogin() {
    if (AuthService.login(this.email, this.password)) {
      this.router.navigate(['/'])
      return
    }

    Alerts.error('Invalid email or password')
  }
}
