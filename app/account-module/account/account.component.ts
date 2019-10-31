import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core'
import { AddUser } from 'src/shared/action/account-action';
import { Store } from '@ngxs/store';
import {User } from '../../../shared/models/user'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  myForm = new FormGroup({
   
  })
 
  UserName = new FormControl('');

  UserFirstname = new FormControl('');
  UserAddress = new FormControl('');
  UserTel = new FormControl('');
  UserEmail = new FormControl('');
  ville = new FormControl('');
  civility = new FormControl('');
  UserCP = new FormControl('');
  UserLogin = new FormControl('');
  userPwd = new FormControl('');
  pays = new FormControl('');


  valid:boolean=false;
  errorMessage:string;

  user :Observable<User[]>;


  constructor(private store:Store) { }
 
  ngOnInit() {
   
   
    this.store.select(state => state.user.user).subscribe(u => { this.user = u;
      if(u.length>0){
      this.UserName.setValue(u[0].nom);
      this.UserFirstname.setValue(u[0].prenom);
      this.civility.setValue(u[0].civ);
      this.UserEmail.setValue(u[0].email);
      this.UserTel.setValue(u[0].tel);
      this.UserAddress.setValue(u[0].addresse);
      this.ville.setValue(u[0].ville);
      this.UserCP.setValue(u[0].cp);
      this.pays.setValue(u[0].pays);
      this.UserLogin.setValue(u[0].login);
      this.userPwd.setValue(u[0].pwd);
      }
    
    });
    this.valid=false;
  }

  checkAllData():Boolean{
    var res : Boolean =false;
    res = this.checkEmailDir();
    if(!res){
      this.errorMessage="Email incorrect !";
      return res;
    }
    res = this.checkVideNameDir();
    if(!res){
      this.errorMessage="Nom incorrect !";
      return res;
    }
    res = this.checkVideFirstNameDir();
    if(!res){
      this.errorMessage="Prénom incorrect !";
      return res;
    }
    res = this.checkTelDir();
    if(!res){
      this.errorMessage="Téléphone incorrect !";
      return res;
    }
    res = this.checkPwdDir();
    if(!res){
      this.errorMessage="Password incorrect !";
      return res;
    }
    res = this.checkVideLoginDir();
    if(!res){
      this.errorMessage="Login incorrect !";
      return res;
    }
    this.errorMessage="";
    return res ;
  }
  onFormSubmit(){
    if(this.checkAllData()){
    var nom= this.UserName.value;
    var prenom=this.UserFirstname.value;
 
    var civ:string=this.civility.value;
    var email:string= this.UserEmail.value;
    var tel:string = this.UserTel.value;
    var addresse:string= this.UserAddress.value;
    var ville:string= this.ville.value;
    var cp:string = this.UserCP.value;
    var pays:string = this.pays.value;
    var login:string = this.UserLogin.value;
    var pwd:string = this.userPwd.value
    this.store.dispatch(new AddUser({    nom,
      prenom,
      civ,
      email,
      tel,
      addresse,
      ville,
      cp,
      pays,
      login,
      pwd}));
    }
  }

  checkEmail(mail: string): Boolean {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = false;
    if (mail.match(emailRegex)) {
      valid = true;
    }
    return valid;
  }


  checkVide(text: string): Boolean {
    var emailRegex = /^[A-z]{1,}/;
    var valid = false;
    if (text.match(emailRegex)) {
      valid = true;
    }
    return valid;
  }


  checkPwd(pwd: string): boolean {
    var emailRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}/;
    var valid = false;
    if (pwd.match(emailRegex)) {
      valid = true;
    }
    return valid;
  }

  checkTel(tel: string): Boolean {
    var emailRegex = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
    var valid = false;
    if (tel.match(emailRegex)) {
      valid = true;
    }
    return valid;
  }
  
 
  checkEmailDir() : Boolean{console.log("dans le email");

    return this.checkEmail(this.UserEmail.value);
  }
  checkVideNameDir() : Boolean{
    console.log("dans le name");
    return this.checkVide(this.UserName.value);
  }
  checkVideFirstNameDir() : Boolean{
    console.log("dans le prenom");
    return this.checkVide(this.UserFirstname.value);
  }
  checkTelDir() : Boolean{
    console.log("dans le tel");
    return this.checkTel(this.UserTel.value);
  }
  checkVideLoginDir() : Boolean{
  
    console.log("dans le tel");
    return this.checkVide(this.UserLogin.value);
  }

  checkPwdDir(): boolean{

    console.log("dans le tel");
    return this.checkPwd(this.userPwd.value);
  }

}

