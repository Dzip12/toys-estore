import { UrlSegment } from "@angular/router"
import { UserModel } from "../../models/user.model"
import { OrderModel } from "../../models/order.model"
import { Order } from "../order/order"
import { ToyModel } from "../../models/toy.model"

const USERS = 'users'
const ACTIVE = 'active'

export class AuthService {
    static setUsers(users: UserModel[]) {
        localStorage.setItem(USERS, JSON.stringify(users))
    }
    static getUsers(): UserModel[] {
        const baseUser: UserModel = {
            email: 'user@gmail.com',
            password: '123',
            firstName: 'Petar',
            lastName: 'Jankovic',
            favorites: 'Figura',
            address: 'Bulevar Oslobodjenja 1',
            phone: '0641234567',
            orders: []
        }
        if (localStorage.getItem(USERS) == null) {
            localStorage.setItem(USERS, JSON.stringify([baseUser]))
        }

        return JSON.parse(localStorage.getItem(USERS)!)
    }

    static login(email: string, password: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === email && u.password === password) {
                localStorage.setItem(ACTIVE, email)
                return true
            }
        }

        return false
    }

    static getActiveUser(): UserModel | null {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u
            }
        }

        return null
    }

    static updateActiveUser(newUserData: UserModel) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.firstName = newUserData.firstName
                u.lastName = newUserData.lastName
                u.email = newUserData.email
                u.address = newUserData.address
                u.phone = newUserData.phone
                u.favorites = newUserData.favorites
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static updateActiveUserPassword(newPassword: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.password = newPassword
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static logout() {
        localStorage.removeItem(ACTIVE)
    }

    static createOrder(order: Partial<OrderModel>, toy: ToyModel) {
        order.state = 'w'
        order.toyId = toy.toyId
        order.name = toy.name
        order.createdAt = new Date().toISOString()

        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                if (!u.orders) {
                    u.orders = []
                }
                u.orders.push(order as OrderModel)
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static getOrdersOnWaiting() {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u.orders.filter(o => o.state === 'w')
            }
        }
        return []
    }

    static getOrdersByState(state: 'w' | 'p' | 'c') {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u.orders.filter(o => o.state === state)
            }
        }
        return []
    }

    static cancelOrder(createdAt: string) {
        const users = this.getUsers();
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                for (let o of u.orders) {
                    if ((o.state === 'w' || o.state === 'p') && o.createdAt === createdAt) {
                        o.state = 'c';
                    }
                }
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users));
    }

    static markOrderArrived(createdAt: string) {
        const users = this.getUsers();
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                for (let o of u.orders) {
                    if (o.state === 'w' && o.createdAt === createdAt) {
                        o.state = 'p';
                    }
                }
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users));
    }

    static payOrders() {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                for (let o of u.orders) {
                    if (o.state == 'w') {
                        o.state = 'p'
                    }
                }
            }
        }

        localStorage.setItem(USERS, JSON.stringify(users))
    }
}