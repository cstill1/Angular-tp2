import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TetiereComponent } from './tetiere/tetiere.component';

import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgxsModule} from '@ngxs/store';
import {RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import {AccountState} from '../shared/states/account-state'
import { PanierState} from '../shared/states/panier-state';
import { AccueilComponent } from './accueil/accueil.component'


const routes: Routes = [
    {
      path:'',
      component:AccueilComponent
    },
  { path: 'account', 
    loadChildren: () => import('./account-module/account-module.module').then(m => m.AccountModuleModule) 
  },
  { path: 'productdetail',
   
  loadChildren: () => import('./productdetail-module/productdetails-module.module').then(m => m.ProductDetailModuleModule)
},


  { path: 'product',
   
    loadChildren: () => import('./product-module/product-module.module').then(m => m.ProductModuleModule)
  },
  { 
    path: 'panier',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) 
  }



  ];



@NgModule({
  declarations: [
    AppComponent,
    TetiereComponent,

  

    FooterComponent,

    PanierComponent,

    AccueilComponent,
 
    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([
      AccountState,
        PanierState
      ]),
  
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
