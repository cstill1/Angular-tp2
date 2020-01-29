import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Produit } from './app/models/produit';
import { environment } from './environments/environment';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { User } from './shared/models/user';
import { DelProduct } from './shared/action/delproduct-action';

import { AddUser } from './shared/action/account-action';
import { Store } from '@ngxs/store';
import { Product } from './shared/models/product';
import { AddProduct } from './shared/action/product-action';
import { PanierComponent } from './app/panier/panier.component';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  product: Observable<Produit[]>;
  usrCreated: Observable<User[]>;
  token = null;
  isConnected = false;
  constructor(private http: HttpClient, private router: Router, private store: Store) { }
  environmentProduct = environment.backendClient + "/api/products";
  environmentAccount = environment.backendClient + "/api/account";
  environmentPanier = environment.backendClient + "/api/panier";


  public getProducts(): Observable<Produit[]> {
    this.product = this.http.get<Produit[]>(this.environmentProduct);
    return this.product;
  }

  public getProduct(id: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.environmentProduct + "/" + id).map(p => p.filter(p => p.id == +id));

  }
  getProductByFilter(type: string, name: string): Observable<Produit[]> {
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
    var body = JSON.stringify({
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
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };



    this.http.post(this.environmentAccount, body, httpOptions).subscribe(
      data => {
        debugger;
        if (data['Erreur'] == null) {
          console.log("POST Request is successful ", data);
          this.router.navigate(['connexion']);
         // alert("Vous avez bien été enregistré. Vos données :\n Login : " + data['login'] + "\n Password : " + data['pwd'] + "erreur : " + data['Erreur']);
        } else {
          alert(data['Erreur']);
        }
      },
      error => {

        console.log("Error", error);

      });
    console.log(this.usrCreated);
  }

  public getUser(login, token) {
    this.http.get<User[]>(this.environmentAccount + "/" + login + "/" + token).subscribe(
      data => {
        var usr: User = {
          token: data["token"],
          nom: data["nom"],
          prenom: data["prenom"],
          civ: data["civ"],
          email: data["email"],
          addresse: data["addresse"],
          ville: data["ville"],
          cp: data["cp"],
          login: data["login"],
          pwd: data["pwd"],
          pays: data["pays"],
          tel: data["tel"]
        };
        data["panier"].forEach(element => {
          let prd: Produit = {
            name: element["name"],
            prix: element["prix"],
            description: element["description"],
            type: element["type"],
            id: element["id"]
          };
          let prdu: Product = {
            item: prd,
            qtn: element["qtn"]
          };
          this.store.dispatch(new AddProduct(prdu));
        });


        this.store.dispatch(new AddUser(usr));
      }
    );
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

    this.http.post(environment.backendClient + "login", body, httpOptions).subscribe(
      data => {
                
        if (data['Erreur'] == null) {
          console.log("POST Request is successful ", data);
          this.router.navigate([''], { queryParams: { Nom: data['Name'] } });
          this.isConnected = true;
          debugger;
          this.getUser(login, data['token']);
        } else {
          alert("Erreur : Votre login ou password n'est pas bon!");
        }
      },
      error => {
        console.log("Error", error);
      });
  }

  public passOrder( panier: Product[], usr: User) {

    var body = JSON.stringify({

      pwd: usr.pwd,

      login: usr.login,

      typePost: "vente"
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };

    this.http.post(this.environmentPanier, body, httpOptions).subscribe(
      data => {
        console.log("tout est ok");
        for (var i=0; i<panier.length;i++){
        var produit = panier[i];
        var item: Produit = produit.item;
        let qtn = produit.qtn;
        this.store.dispatch(new DelProduct({ item, qtn }));
        }
      }
    );
  }

  public addToPanier(product: Product, user: User) {
    var body = JSON.stringify({

      pwd: user.pwd,

      login: user.login,
      quantite: product.qtn,
      produitid: product.item.id,
      typePost: "ajout"
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };

    this.http.post(this.environmentPanier, body, httpOptions).subscribe(
      data => {
        console.log("tout est ok");
      }

    );
  }
}
