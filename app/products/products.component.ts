import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {GetProductsService} from '../../get-products.service';
import { Produit } from '../models/produit';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Observable<Produit[]>


  constructor(private productsService : GetProductsService) { }

  ngOnInit() {
    this.products = this.productsService.getProducts();

  }
}