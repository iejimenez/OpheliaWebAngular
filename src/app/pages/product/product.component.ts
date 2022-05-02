import { Component } from '@angular/core';
import { Product, ProductsService } from 'src/app/services/product.service';

import { ProblemDetails } from 'src/app/models/shared/exceptions.models';

@Component({
  templateUrl: 'product.component.html'
})

export class ProductComponent {
    products: Product[] = [];
    serviceProduct: ProductsService;

    isVisible = false;
    type = 'info';
    message = '';

    constructor(service: ProductsService) {
        this.getProducts(service);
        this.serviceProduct = service;
    }

    async getProducts(service: ProductsService){
      this.products = await service.getProducts();
    }

    async addNewProduct(event: any) {
      let product: Product = event.data;
      await this.serviceProduct.postProduct(product)
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
  
    async updateProduct(event: any) {
      let product: Product = event.oldData;
      product = {...product, ...event.newData}
      await this.serviceProduct.putProduct(product)
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

    async deleteProduct(event: any) {
      console.log(event);
      let product: Product = event.data;
      await this.serviceProduct.deleteProduct(product)
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

}
