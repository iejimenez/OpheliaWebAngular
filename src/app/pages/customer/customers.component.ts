import { Component } from '@angular/core';
import { Customer, CustomersService } from 'src/app/services/customers.service';

import { ProblemDetails } from 'src/app/models/shared/exceptions.models';

@Component({
  templateUrl: 'customers.component.html'
})

export class CustomerComponent {
    customers: Customer[] = [];
    serviceCustomer: CustomersService;

    isVisible = false;
    type = 'info';
    message = '';

    constructor(service: CustomersService) {
        this.getCustomers(service);
        this.serviceCustomer = service;
    }

    async getCustomers(service: CustomersService){
      this.customers = await service.getCustomers();
    }

    async addNewCustomer(event: any) {
      let customer: Customer = event.data;
      await this.serviceCustomer.postCustomer(customer)
      .then( async result  => { 

          if(result.ok)
            return await result.json().then(res=>{return res as string});
          else{
            let exception = await result.json().then(res=>{return res as ProblemDetails});
            throw new Error(exception.detail);
          }
        })
        .catch((error)=>{
            this.isVisible = true;
            this.type = 'info',
            this.message = error.message;
            event.cancel = true;
        });
    }
  
    async updateCustomer(event: any) {
      let customer: Customer = event.oldData;
      customer = {...customer, ...event.newData}
      await this.serviceCustomer.putCustomer(customer)
      .then( async result  => { 

          if(result.ok)
            return await result.json().then(res=>{return res as boolean});
          else{
            let exception = await result.json().then(res=>{return res as ProblemDetails});
            throw new Error(exception.detail);
          }
        })
        .catch((error)=>{
            this.isVisible = true;
            this.type = 'info',
            this.message = error.message;
            event.cancel = true;
        });
    }

    async deleteCustomer(event: any) {
      console.log(event);
      let customer: Customer = event.data;
      await this.serviceCustomer.deleteCustomer(customer)
      .then( async result  => { 

          if(result.ok)
            return await result.json().then(res=>{return res as string});
          else{
            let exception = await result.json().then(res=>{return res as ProblemDetails});
            throw new Error(exception.detail);
          }
        })
        .catch((error)=>{
            this.isVisible = true;
            this.type = 'info',
            this.message = error.message;
            event.cancel = true;
        });
    }

}
