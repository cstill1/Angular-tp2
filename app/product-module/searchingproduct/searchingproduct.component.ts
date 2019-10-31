import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {GetProductsService} from '../../../get-products.service';
import { Produit } from '../../models/produit';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/shared/action/product-action';

@Component({
  selector: 'app-searchingproduct',
  templateUrl: './searchingproduct.component.html',
  styleUrls: ['./searchingproduct.component.css']
})
export class SearchingproductComponent implements OnInit {

  constructor(private productsService : GetProductsService,private store:Store) { }
  myForm = new FormGroup({});
 
  productname = new FormControl('');
  producttype = new FormControl('');

  products : Observable<Produit[]>;


  ngOnInit() {

  }
  addToPanier(item:Produit){
    let qtn:number=1;
    this.store.dispatch(new AddProduct({item , qtn}));
    console.log("add to panier works");
  } 
  onSearchSubmit(){
    debugger;
    this.products = this.productsService.getProductByFilter(this.producttype.value,this.productname.value);
  }


}
