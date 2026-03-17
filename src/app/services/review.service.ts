import { ReviewModel } from "../../models/review.model";

const STORAGE_KEY = 'reviews';

export class ReviewService {
    private static getAll(): ReviewModel[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return [];
        }
        try {
            return JSON.parse(raw) as ReviewModel[];
        } catch {
            return [];
        }
    }

    private static saveAll(reviews: ReviewModel[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    }

    static getByToyId(toyId: number): ReviewModel[] {
        return this.getAll().filter(r => r.toyId === toyId);
    }

    static add(review: ReviewModel) {
        const all = this.getAll();
        all.push(review);
        this.saveAll(all);
    }

    static getAverageRating(toyId: number): number {
        const list = this.getByToyId(toyId);
        if (list.length === 0) {
            return 0;
        }
        const sum = list.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / list.length) * 10) / 10;
    }
}

