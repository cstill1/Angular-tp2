import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponentRoutingModule } from './product-routing.module';
import { ProductsComponent } from './products/products.component';
import { SearchingproductComponent } from './searchingproduct/searchingproduct.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    
    ProductsComponent,
    SearchingproductComponent
  ],
  imports: [
    CommonModule,
    ProductComponentRoutingModule,
    ReactiveFormsModule,
  
  ]
})
export class ProductModuleModule { }
