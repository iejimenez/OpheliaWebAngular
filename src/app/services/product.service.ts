import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app.settings';
 
export interface Product {
    Id: number,
    Name: string,
    UnitPrice: number,
    Stock: number
}
 

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    getProducts(): Promise<Product[]> {
        return fetch(AppSettings.API_ENDPOINT + 'Product/get-all-products')
                        .then(res=>res.json())
                        .then(res=> {return res as Product[]});
    }


    postProduct(data: Product): Promise<Response> {
        return fetch( AppSettings.API_ENDPOINT + 'Product/create-product', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
        });
        
    }


    putProduct(data: Product): Promise<Response> {
        return fetch(AppSettings.API_ENDPOINT + 'Product/update-product', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
        });
        
    }

    deleteProduct(data: Product): Promise<Response> {
        return fetch( AppSettings.API_ENDPOINT + 'Product/delete-product', {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
        });
    }
}