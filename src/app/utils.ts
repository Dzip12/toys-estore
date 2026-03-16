import { Injectable } from '@angular/core';
import { ToyModel } from '../models/toy.model';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  getImageUrl(toy: ToyModel) {
    return `https://toy.pequla.com/img/${toy.toyId}.png`;
  }
}
