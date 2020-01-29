import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {Produit} from '../../models/produit'
import { Product } from '../../../shared/models/product';
import { DelProduct } from '../../../shared/action/delproduct-action';
import { GetProductsService } from 'src/get-products.service';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-productincart',
  templateUrl: './productincart.component.html',
  styleUrls: ['./productincart.component.css']
})
export class ProductincartComponent implements OnInit {


  produitincart : Product[];
  user:User;
  constructor(private store: Store,private service:GetProductsService) {
    
  
    this.store.select(state => state.panier.panier).subscribe(u => { this.produitincart = u;});
    this.store.select(state => state.user.user).subscribe(u => { this.user = u[0];});

   }
   delToPanier(item:Produit){
    let qtn:number=1;
    this.store.dispatch(new DelProduct({item , qtn}));
    qtn-=2;
    this.service.addToPanier({item,qtn},this.user);
   }
   passOrder(){
     this.service.passOrder(this.produitincart,this.user);
   }
  ngOnInit() {
  }
}
