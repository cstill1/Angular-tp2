import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  nbArticles = 0; 
  constructor(private store: Store) {
    this.store.select(state => state.panier.panier).subscribe(u => {
      this.nbArticles =0;
      u.forEach(element => {
        this.nbArticles += element.qtn;
      });
    
    });
   }
  

  ngOnInit() {
  }

}
