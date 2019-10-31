import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Produit } from './app/models/produit';
import { environment } from './environments/environment';
import { filter } from 'rxjs/operators';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  product:Observable<Produit[]>;
  constructor(private http:HttpClient) {}

  public getProducts() : Observable<Produit[]> {
     
     this.product =  this.http.get<Produit[]>(environment.backendClient);
     return this.product;
  }

  public getProduct(id:string) : Observable<Produit[]> {
   return  this.http.get<Produit[]>(environment.backendClient).map(p => p.filter(p=>p.id == +id));
   
 }
  getProductByFilter(type:string,name:string): Observable<Produit[]> {
    this.product = this.http.get<Produit[]>(environment.backendClient);
    if(type != null && type != "" && name!=null && name !=""){
      return this.product.map(product => product.filter(product => product.type === type &&  product.name.search(name)>=0));
    }
    else if(name != null && name!=""){
      return this.product.map(product => product.filter(product=> product.name.search(name)>=0));
    }else if(type != null && type!=""){
      return this.product.map(product => product.filter(product=>product.type === type) );
    }else{
      return this.product;
    }
  
  }
 
  
}
