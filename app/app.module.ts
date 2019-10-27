import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TetiereComponent } from './tetiere/tetiere.component';
import { RecapComponent } from './recap/recap.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberPipe } from './phone.pipe';
import { CheckdatasDirective } from './checkdatas.directive';
import { ProductsComponent } from './products/products.component';
import { SearchingproductComponent } from './searchingproduct/searchingproduct.component';





@NgModule({
  declarations: [
    AppComponent,
    TetiereComponent,
    RecapComponent,
    CheckdatasDirective,
    AccountComponent,
    PhoneNumberPipe,
    FooterComponent,
    ProductsComponent,
    SearchingproductComponent
    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
