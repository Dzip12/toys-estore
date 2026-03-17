import axios from "axios";
import { ToyModel } from "../../models/toy.model";

const client = axios.create({
    baseURL: 'https://toy.pequla.com/api/toy',
    headers: {
        'Accept': 'application/json',
        'X-name': 'kva_ispit/dev'
    },
    validateStatus(status) {
        return status === 200
    }
})

export class ToyService {
    static async getToys() {
        return await client.get<ToyModel[]>('/toy')
    }

    static async getToyById(id: number) {
        return await client.get<ToyModel>('/toy/' + id)
    }

    static async getToysByType(type: string) {
        return await client.get<string[]>(`/toy/type/${name}`)
    }
}