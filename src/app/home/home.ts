import { Component, signal } from '@angular/core';
import { ToyModel } from '../../models/toy.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  toys = signal<ToyModel[]>([]);

  constructor(){
    fetch('https://toy.pequla.com/api/toy')
    .then(rsp => rsp.json())
    .then((obj: ToyModel[]) => this.toys.set(obj));
  }
}
