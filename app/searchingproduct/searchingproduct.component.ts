import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {GetProductsService} from '../../get-products.service';
import { Produit } from '../models/produit';

@Component({
  selector: 'app-searchingproduct',
  templateUrl: './searchingproduct.component.html',
  styleUrls: ['./searchingproduct.component.css']
})
export class SearchingproductComponent implements OnInit {

  constructor(private productsService : GetProductsService) { }

  productname = new FormControl('');
  producttype = new FormControl('');

  products : Observable<Produit[]>;


  ngOnInit() {

  }
  onSearchSubmit(){
    debugger;
    this.products = this.productsService.getProductByFilter(this.producttype.value,this.productname.value);
  }


}
