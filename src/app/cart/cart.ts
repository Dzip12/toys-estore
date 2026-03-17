import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Utils } from '../utils';
import { ToyService } from '../services/toy.service';
import { OrderModel } from '../../models/order.model';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  toyStores = DataService.getToyStores()
  displayedColumns = ['name', 'toyStore', 'count', 'createdAt', 'remove']
  total = signal<number>(0)

  constructor(public router: Router, public utils: Utils) {
    if (!AuthService.getActiveUser()) {
      router.navigate(['/login'])
      return
    }
    this.loadTotal()
  }

  async loadTotal() {
    let sum = 0
    const orders = this.getOrders()

    for (let order of orders) {
      try {
        const toyResponse = await ToyService.getToyById(order.toyId)
        const toy = toyResponse.data
        const store = this.toyStores.find(s => s.id === order.storeId)
        const priceImpact = store?.priceImpact ?? 1
        sum += toy.price * order.count * priceImpact
      } catch (e) {
        console.error('Error fetching toy:', e)
      }
    }
    this.total.set(Math.round(sum * 100) / 100)
  }

  async removeOrder(order: OrderModel) {
    Alerts.confirm('Are you sure you want to remove the item?', () => {
      AuthService.cancelOrder(order.createdAt)
      this.loadTotal()
    })
  }

  payAll() {
    Alerts.confirm('Are you sure you want to pay?', () => {
      AuthService.payOrders()
      this.loadTotal()
      setTimeout(() => {
        this.router.navigate(['/home'])
      }, 100)
    })
  }

  calculateTotal() {
    return this.total()
  }

  getOrders() {
    return AuthService.getOrdersByState('w')
  }

  getCanceledOrders() {
    return AuthService.getOrdersByState('c')
  }

  getStoreName(storeId: number) {
    return this.toyStores.find(s => s.id === storeId)?.name || 'Unknown'
  }

  getOrdersAsJSON() {
    return JSON.stringify(this.getOrders(), null, 2)
  }
}
