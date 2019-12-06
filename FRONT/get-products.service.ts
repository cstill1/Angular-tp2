import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Produit } from './app/models/produit';
import { environment } from './environments/environment';
import 'rxjs/Rx';
import { User } from './shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  product: Observable<Produit[]>;
  usrCreated: Observable<User[]>;
  constructor(private http: HttpClient) { }
  environmentProduct = environment.backendClient + "/api/products";
  environmentAccount = environment.backendClient + "/api/account";


  public getProducts(): Observable<Produit[]> {
    this.product = this.http.get<Produit[]>(this.environmentProduct);
    return this.product;
  }

  public getProduct(id: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.environmentProduct + "/" + id).map(p => p.filter(p => p.id == +id));

  }
  getProductByFilter(type: string, name: string): Observable<Produit[]> {
    debugger
    this.product = this.http.get<Produit[]>(this.environmentProduct);
    if (type != null && type != "" && name != null && name != "") {
      return this.product.map(product => product.filter(product => product.type === type && product.name.search(name) >= 0));
    }
    else if (name != null && name != "") {
      return this.product.map(product => product.filter(product => product.name.search(name) >= 0));
    } else if (type != null && type != "") {
      return this.product.map(product => product.filter(product => product.type === type));
    } else {
      return this.product;
    }

  }

  public postUser(usr: User) {
    debugger;
    var body = "[" + JSON.stringify({
      nom: usr.nom,
      prenom: usr.prenom,
      email: usr.email,
      addresse: usr.addresse,
      pwd: usr.pwd,
      tel: usr.tel,
      ville: usr.ville,
      pays: usr.pays,
      login: usr.login,
      cp: usr.cp,
      civ: usr.civ
    }) + "]";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };



    this.http.post(this.environmentAccount, body, httpOptions).subscribe(
      data => {
        debugger;
        console.log("POST Request is successful ", data);
        alert("Vous avez bien été enregistré. Vos données :\n Login : " + data[0]['login'] + "\n Password : " + data[0]['pwd']);
      },
      error => {

        console.log("Error", error);

      });
    console.log(this.usrCreated);
  }

  public getUser(): Observable<User[]> {
    this.usrCreated = this.http.get<User[]>(this.environmentAccount);


    return this.usrCreated;
  }
  public connexion(login: string, pwd: string) {
    var body = JSON.stringify({
      login: login,
      pwd: pwd
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post(environment.backendClient+"login", body, httpOptions).subscribe(
      data => {
        debugger;
        console.log("POST Request is successful ", data);
        alert("Vous avez bien été connecté.\n Votre Token : " + data['token']);
      },
      error => {

        console.log("Error", error);

      });
  }

}
