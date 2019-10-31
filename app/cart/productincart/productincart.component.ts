import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {Produit} from '../../models/produit'
import {Observable} from 'rxjs'
import { Product } from '../../../shared/models/product';
import { DelProduct } from '../../../shared/action/delproduct-action';

@Component({
  selector: 'app-productincart',
  templateUrl: './productincart.component.html',
  styleUrls: ['./productincart.component.css']
})
export class ProductincartComponent implements OnInit {


  produitincart : Product[];
  constructor(private store: Store) {
    
  
    this.store.select(state => state.panier.panier).subscribe(u => { this.produitincart = u;});

   }
   delToPanier(item:Produit){
    let qtn:number=1;
    this.store.dispatch(new DelProduct({item , qtn}));
   }
  ngOnInit() {
  }
}
