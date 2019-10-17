import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { RecapComponent } from './recap/recap.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PhoneNumberPipe } from './phone.pipe';
import { CheckdatasDirective } from './checkdatas.directive'




@NgModule({
  declarations: [
    AppComponent,
    TetiereComponent,
    RecapComponent,
    CheckdatasDirective,
    AccountComponent,
    PhoneNumberPipe,
    FooterComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
