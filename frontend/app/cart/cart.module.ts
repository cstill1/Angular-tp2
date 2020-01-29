import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductincartComponent } from './productincart/productincart.component';

import { CartComponentRoutingModule } from './cart-routing.module';
import {GetProductsService} from '../../get-products.service';





@NgModule({
  declarations: [ProductincartComponent],
  imports: [
    CommonModule,
    
    CartComponentRoutingModule
  ],
  providers: [GetProductsService]

})
export class CartModule { }


