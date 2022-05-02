import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app.settings';
 

export interface OrderDetail {
    orderId: number,
    productId :number,
    unitPrice: number,
    quantity:number
}

export interface Order {
    orderId: number,
    customerId: string,
    orderDate: Date,
    shipAddress: string,
    orderDetails: OrderDetail[]
}
 

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    getOrders(): Promise<Order[]> {
        return fetch(AppSettings.API_ENDPOINT + 'Order/get-all-orders')
                        .then(res=>res.json())
                        .then(res=> {return res as Order[]});
    }


    postOrder(data: Order): Promise<Response> {
        return fetch( AppSettings.API_ENDPOINT + 'Order/create-order', {
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


    putProduct(data: Order): Promise<Response> {
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

    deleteProduct(data: Order): Promise<Response> {
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