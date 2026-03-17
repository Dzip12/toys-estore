import { Component, signal } from '@angular/core';
import { ToyModel } from '../../models/toy.model';
import { RouterLink } from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { Loading } from '../loading/loading';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    Loading,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public service = AuthService

  toys = signal<ToyModel[]>([]);

  searchName = ''
  searchDescription = ''
  searchType = ''
  searchAgeGroup = ''
  searchTargetGroup = ''
  searchProductionDate = ''
  minPrice: number | null = null
  maxPrice: number | null = null
  minRating: number | null = null

  constructor(public utils: Utils) {
    fetch('https://toy.pequla.com/api/toy')
      .then(rsp => rsp.json())
      .then((obj: ToyModel[]) => this.toys.set(obj));
  }

  getFilteredToys() {
    const items = this.toys();

    return items.filter(t => {
      if (this.searchName && !t.name.toLowerCase().includes(this.searchName.toLowerCase())) {
        return false;
      }

      if (this.searchDescription && !t.description.toLowerCase().includes(this.searchDescription.toLowerCase())) {
        return false;
      }

      if (this.searchType && t.type?.name && t.type.name !== this.searchType) {
        return false;
      }

      if (this.searchAgeGroup && t.ageGroup?.name && t.ageGroup.name !== this.searchAgeGroup) {
        return false;
      }

      if (this.searchTargetGroup && t.targetGroup !== this.searchTargetGroup) {
        return false;
      }

      if (this.searchProductionDate && !t.productionDate.startsWith(this.searchProductionDate)) {
        return false;
      }

      if (this.minPrice != null && t.price < this.minPrice) {
        return false;
      }

      if (this.maxPrice != null && t.price > this.maxPrice) {
        return false;
      }

      if (this.minRating != null) {
        const avg = ReviewService.getAverageRating(t.toyId);
        if (avg < this.minRating) {
          return false;
        }
      }

      return true;
    });
  }
}
