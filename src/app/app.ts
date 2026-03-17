import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, MatButtonModule, MatMenuModule, MatToolbarModule, MatIcon],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  activeUser = AuthService.getActiveUser()

  constructor(private router: Router){}

  doLogout() {
    AuthService.logout()
    this.router.navigate(['/login'])
  }

}
