import { Component } from '@angular/core';
import { Order, OrderDetail, OrdersService } from 'src/app/services/order.service';

import { ProblemDetails } from 'src/app/models/shared/exceptions.models';

@Component({
  templateUrl: 'order.component.html'
})

export class OrderComponent {
    orders: Order[] = [];
    serviceOrder: OrdersService;

    isVisible = false;
    type = 'info';
    message = '';

    constructor(service: OrdersService) {
        this.getOrders(service);
        this.serviceOrder = service;
    }

    async getOrders(service: OrdersService){
      this.orders = await service.getOrders();
    }

    async addNewOrder(event: any) {
      let order: Order = event.data;
      await this.serviceOrder.postOrder(order)
      .then( async result  => { 

          if(result.ok)
            return await result.json().then(res=>{return res as number});
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
