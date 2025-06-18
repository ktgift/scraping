export interface MovieDetail {
    date: string;
    title: string;
    imageUrl: string;
    ref: string;
    description?: string;
    duration?: string;
    genre?: string;
    director?: string;
    cast?: { name: string; image: string }[];
}

export interface Movie {
    date: string;
    title: string;
    imageUrl: string;
    ref: string;
}