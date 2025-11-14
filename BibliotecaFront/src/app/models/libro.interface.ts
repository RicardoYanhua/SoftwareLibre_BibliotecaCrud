export interface Libro {
    id?: number;
    titulo: string;
    autor: string;
    isbn: string;
    editorial: string;
    idCategoria: number;
}

export interface LibroResponse {
    success: boolean;
    data?: Libro | Libro[];
    count?: number;
    mensaje?: string;
    error?: string;
}