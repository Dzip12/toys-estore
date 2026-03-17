import { Component, signal } from '@angular/core';
import { ToyModel } from '../../models/toy.model';
import { identity } from 'rxjs';
import { DataService } from '../services/data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

@Component({
  selector: 'app-order',
  imports: [MatCardModule, RouterLink, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, Loading, MatListModule, MatSelectModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  toy = signal<ToyModel | null>(null)
  toyStores = DataService.getToyStores()
  size = DataService.getSize()

  order: Partial<OrderModel> = {
    storeId: this.toyStores[0].id,
    count: 1
  }

  constructor(private route: ActivatedRoute, public utils: Utils){
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

    const count = Number(this.order.count) || 0
    const store = this.toyStores.find(s => s.id === this.order.storeId)
    const priceImpact = store?.priceImpact ?? 1

    const total = toy.price * count * priceImpact
    return Math.round(total * 100) / 100
  }

  placeOrder(){
    AuthService.createOrder(this.order, this.toy()!.toyId)
  }
}
