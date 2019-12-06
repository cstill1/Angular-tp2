import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetProductsService } from 'src/get-products.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor( public service:GetProductsService) { }

  ngOnInit() {
  }

  login = new FormControl('');
  pwd = new FormControl('')

  connexion(){
    this.service.connexion(this.login.value,this.pwd.value);
  }
}
