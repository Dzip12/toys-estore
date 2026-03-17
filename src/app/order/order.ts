import { Component, signal } from '@angular/core';
import { ToyModel } from '../../models/toy.model';
import { identity } from 'rxjs';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToyService } from '../services/toy.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Utils } from '../utils';
import { Loading } from "../loading/loading";
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { OrderModel } from '../../models/order.model';
import { AuthService } from '../services/auth.service';
import { Alerts } from '../alerts';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order',
  imports: [MatCardModule, FormsModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, Loading, MatListModule, MatSelectModule, MatIconModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  toy = signal<ToyModel | null>(null)
  toyStores = DataService.getToyStores()

  order: Partial<OrderModel> = {
    storeId: this.toyStores[0].id,
    count: 1
  }

  constructor(public router: Router, private route: ActivatedRoute, public utils: Utils){
    this.route.params.subscribe(params =>{
      const id = Number(params['id'])
      ToyService.getToyById(id)
      .then(rsp => {
        this.toy.set(rsp.data)
      })
    })
  }

  calculateTotal(){
    const toy = this.toy()
    if (!toy) return 0

    let count = Number(this.order.count) || 0
    if (count < 1) {
      count = 1
      this.order.count = 1
    }
    const store = this.toyStores.find(s => s.id === this.order.storeId)
    const priceImpact = store?.priceImpact ?? 1

    const total = toy.price * count * priceImpact
    return Math.round(total * 100) / 100
  }

  placeOrder(){
    Alerts.confirm(`Are you sure you want to place order for ${this.calculateTotal()}?`, ()=>{
      AuthService.createOrder(this.order, this.toy()!)
      this.router.navigate(['/cart'])
    })
  }
}
