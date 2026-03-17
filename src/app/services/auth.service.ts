import { UrlSegment } from "@angular/router"
import { UserModel } from "../../models/user.model"

const USERS = 'users'
const ACTIVE = 'active'

export class AuthService {
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

    static updateActiveUser(newUserData: UserModel){
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

    static logout() {
        localStorage.removeItem(ACTIVE)
    }
}