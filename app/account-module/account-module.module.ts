import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { AccountComponentRoutingModule } from './account-routing.module';
import { RecapComponent } from './recap/recap.component';
import { CheckdatasDirective } from '../checkdatas.directive';
import { PhoneNumberPipe } from '../phone.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxsModule} from '@ngxs/store';



@NgModule({
  declarations: [AccountComponent,
     RecapComponent,   
      PhoneNumberPipe,
    CheckdatasDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxsModule,
   
    AccountComponentRoutingModule,
    

  ]
})
export class AccountModuleModule { }
