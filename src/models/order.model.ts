export interface OrderModel{
    toyId: number
    storeId: number
    name: string
    count: number
    state: 'w' | 'c' | 'p'
    createdAt: string
}