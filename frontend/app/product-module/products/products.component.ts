import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProductsService } from '../../../get-products.service';
import { Produit } from '../../models/produit';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../../shared/action/product-action';
import { User } from 'src/shared/models/user';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Observable<Produit[]>
  user: User;

  constructor(private productsService: GetProductsService, private service: GetProductsService, private store: Store) { }
  addToPanier(item: Produit) {
    let qtn: number = 1;
    this.store.dispatch(new AddProduct({ item, qtn }));
    this.service.addToPanier({ item, qtn }, this.user);
    console.log("add to panier works");
  }
  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.store.select(state => state.user.user).subscribe(u => { this.user = u[0]; });

    debugger;
  }
}