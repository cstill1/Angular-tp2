import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductdetailComponent } from './productdetail/productdetail.component';






const routes: Routes = [

  {
    path: ':id',
    component: ProductdetailComponent,  
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class ProductDetailComponentRoutingModule { }
