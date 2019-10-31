import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {GetProductsService} from '../../../get-products.service';
import { Produit } from '../../models/produit';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../../shared/action/product-action';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Observable<Produit[]>


  constructor(private productsService : GetProductsService,private store:Store) { }
  addToPanier(item:Produit){
    let qtn:number=1;
    this.store.dispatch(new AddProduct({item , qtn}));
    console.log("add to panier works");
  }  
  ngOnInit() {
    this.products = this.productsService.getProducts();
  }
}