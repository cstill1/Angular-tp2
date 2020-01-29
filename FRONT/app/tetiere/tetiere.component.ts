import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/shared/models/user';
import { DefaultUrlSerializer, Router } from '@angular/router';
import { Product } from 'src/shared/models/product';
import { Produit } from '../models/produit';
import { DelProduct } from 'src/shared/action/delproduct-action';
import { DelUser } from 'src/shared/action/deluser-action';

@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.css']
})
export class TetiereComponent implements OnInit {

  constructor(public store: Store, private router: Router) { }
  user: User;
  panier: Product[];
  ngOnInit() {
    this.store.select(state => state.user.user).subscribe(u => { this.user = u[0]; });
    this.store.select(state => state.panier.panier).subscribe(u => { this.panier = u; });
  }
  deconnexion() {
    debugger;
    for (var i = 0; i < this.panier.length; i++) {
      var produit = this.panier[i];
      var item: Produit = produit.item;
      let qtn = produit.qtn;
      this.store.dispatch(new DelProduct({ item, qtn }));
    }
    this.store.dispatch(new DelUser(this.user));
    this.router.navigate(['connexion']);

  }

}
