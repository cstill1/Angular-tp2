import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetProductsService } from 'src/get-products.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor( public service:GetProductsService, public store : Store) { }

  ngOnInit() {
    
  }

  login = new FormControl('');
  pwd = new FormControl('')

  connexion(){
    this.service.connexion(this.login.value,this.pwd.value);
  }
}
