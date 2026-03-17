import { Component, signal } from '@angular/core';
import { ToyModel } from '../../models/toy.model';
import { RouterLink } from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Utils } from '../utils';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public service = AuthService

  toys = signal<ToyModel[]>([]);

  constructor(public utils: Utils) {
    fetch('https://toy.pequla.com/api/toy')
    .then(rsp => rsp.json())
    .then((obj: ToyModel[]) => this.toys.set(obj));
  }
}
