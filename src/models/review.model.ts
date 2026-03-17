export interface ReviewModel {
    toyId: number;
    userEmail: string;
    rating: number; // 1-5
    comment?: string;
    createdAt: string;
}

