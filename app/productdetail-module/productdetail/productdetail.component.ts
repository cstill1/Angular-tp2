import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../../../get-products.service';
import { Store } from '@ngxs/store';
import { Produit } from '../../models/produit';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AddProduct } from '../../../shared/action/product-action';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  prod :Observable< Produit[]>;

  constructor( private route: ActivatedRoute,
    private router: Router
    ,private productsService : GetProductsService,private store:Store) { }

    addToPanier(item:Produit){
      let qtn:number=1;
      this.store.dispatch(new AddProduct({item , qtn}));
      console.log("add to panier works");
    } 
  ngOnInit() {
    this.prod = this.productsService.getProduct(this.route.snapshot.params.id);
  }

}
