import { UserModel } from "../../models/user.model"

const USERS = 'users'
const ACTIVE = 'active'

export class AuthService {
    static getUsers(): UserModel[] {
        if (localStorage.getItem(USERS) != null) {
            localStorage.setItem(USERS, JSON.stringify({
                firstName: 'Petar',
                lastName: 'Jankovic',
                email: 'user@mail.com',
                password: '123',
                phone: '0601234567',
                adress: 'Kralja Aleksandra 107',
                favorites: 'Figura', 
                orders: []
            }))
        }

        return JSON.parse(localStorage.getItem(USERS)!)
    }

    static login(email: string, password: string) {
        const users = this.getUsers()
        for(let u of users){
            if(u.email === email && u.password === password){
                localStorage.setItem(ACTIVE, email)
            }
        }
    }

    static getActiveUser(): UserModel | null {
        const users = this.getUsers()
        for(let u of users){
            if(u.email === localStorage.getItem(ACTIVE)){
                return u
            }
        }

        return null
    }
}