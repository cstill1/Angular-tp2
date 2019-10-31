import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';

import { SearchingproductComponent } from './searchingproduct/searchingproduct.component';





const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
   
  },
 
  {
      path:'search',
      component: SearchingproductComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class ProductComponentRoutingModule { }
