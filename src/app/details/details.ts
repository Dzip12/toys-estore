import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToyModel } from '../../models/toy.model';
import { Utils } from '../utils';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, MatListModule, RouterLink, MatIconModule, MatButtonModule, Loading],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public service = AuthService

  toy = signal<ToyModel | null>(null)

  constructor(route: ActivatedRoute, public utils: Utils) {
    route.params.subscribe(params => {
      const id = params['id'];
      fetch(`https://toy.pequla.com/api/toy/${id}`)
        .then(response => response.json())
        .then(data => this.toy.set(data))
    })
  }
}