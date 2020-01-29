import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { RecapComponent } from './recap/recap.component';



const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    
    },
    {
          path: 'recap',
          component: RecapComponent,
    }
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AccountComponentRoutingModule { }


