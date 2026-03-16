import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToyModel } from '../../models/toy.model';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  toy = signal<ToyModel | null>(null)

  constructor(route: ActivatedRoute) {
    route.params.subscribe(params => {
      const id = params['id'];
      fetch(`https://toy.pequla.com/api/toy/${id}`)
        .then(response => response.json())
        .then(data => this.toy.set(data))
    })
  }
}