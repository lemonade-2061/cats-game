export interface Cat {
    id: string;
    name: string; 
    coatColor: string;
    age: number;
    created_at: string;
    birthday: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    created_at: string;
}

export interface GameRecord {
    id: string;
    user_id: string;
    cat_id: string;
    created_at: string;
    money: number;
    hairball_count: number;
    total_hairball: number;
    days_played: number
    items: Item[];
}

export interface Item {
    id: string;
    name: string;
    price: number;
}

