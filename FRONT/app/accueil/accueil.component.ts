import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private store: Store) { }

  user: User;
  nom: string;
  prenom: string;

  ngOnInit() {
    this.store.select(state => state.user.user).subscribe(u => {
    this.user = u[0];
      if (u[0] != null) {
        this.nom = u[0]['nom'];
        this.prenom = u[0]['prenom'];
      }
    });

  }

}
