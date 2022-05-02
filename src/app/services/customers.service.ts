import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app.settings';
 
export interface Customer {
    Id: string,
    Name: String,
    BirthDate: String
}
 

@Injectable({
    providedIn: 'root'
})
export class CustomersService {
    getCustomers(): Promise<Customer[]> {
        return fetch(AppSettings.API_ENDPOINT + 'Customer/get-all-customers')
                        .then(res=>res.json())
                        .then(res=> {return res as Customer[]});
    }


    postCustomer(data: Customer): Promise<Response> {
        return fetch(AppSettings.API_ENDPOINT + 'Customer/create-customer', {
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


    putCustomer(data: Customer): Promise<Response> {
        return fetch(AppSettings.API_ENDPOINT +'Customer/update-customer', {
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

    deleteCustomer(data: Customer): Promise<Response> {
        return fetch(AppSettings.API_ENDPOINT +'Customer/delete-customer', {
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