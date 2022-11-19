export interface registerProductDTO{
    name: string;
    description: string;
    filter: string;
    price: number;
    urlPicture: string;
}

export interface deleteProductDTO{
    id: number
}