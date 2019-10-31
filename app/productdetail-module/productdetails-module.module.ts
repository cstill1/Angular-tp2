import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponentRoutingModule } from './productdetails-routing.module';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductdetailComponent,
  ],
  imports: [
    CommonModule,
    ProductDetailComponentRoutingModule,
    ReactiveFormsModule,
  
  ]
})
export class ProductDetailModuleModule { }
