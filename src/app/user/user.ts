import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import axios from 'axios';
import { ToyModel } from '../../models/toy.model';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-user',
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule, MatSelectModule, MatIcon],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activateUser = AuthService.getActiveUser()

  favoriteType = signal<string[]>([])
  selectedType = ''

  constructor(private router: Router) {
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
      return
    }

    this.selectedType = this.activateUser!.favorites

    axios.get('https://toy.pequla.com/api/toy')
    .then(rsp => {
      const toys = rsp.data as ToyModel[]
      const types = Array.from(
        new Set(toys.map(t => t.type?.name).filter((name): name is string => !!name))
      )
      this.favoriteType.set(types)
    })
    .catch(console.error)
  }

  updateUser(){
    AuthService.updateActiveUser(this.activateUser!)
  }
}
