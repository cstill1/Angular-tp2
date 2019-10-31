import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductincartComponent } from './productincart/productincart.component';



const routes: Routes = [
  {
    path: '',
    component: ProductincartComponent,
    children : [
      {
          path: 'details',
          component: ProductincartComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class CartComponentRoutingModule { }


