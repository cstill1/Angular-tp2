import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecapComponent } from '../recap/recap.component';
import { EventEmitter } from '@angular/core'


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  name :string="";
  firstname:string="";
  email:string="";
  tel:string="";
  pwd:string="";
  login:string="";
  adresse:string="";
  cp:string="";

  civ:string ="";
  ville:string="";
  pays:string="";


  valid:boolean=false;
  errorMessage:string;

  @Output() change : EventEmitter<string> = new EventEmitter<string>();


  constructor() { }
 
  ngOnInit() {

    this.valid=true;
  }

  
  onFormSubmit(userForm:NgForm){

    this.name="";
    this.firstname="";
    this.email="";
    this.tel="";
    this.pwd="";
    this.adresse="";
    this.cp="";
    this.civ="";
    this.ville="";
    this.pays="";

    
    console.log(userForm);
    this.errorMessage="";
    this.valid=false;
    if( this.checkEmail(userForm.value.UserEmail)){
      this.email=userForm.value.UserEmail;
      
    }else{
      this.email=userForm.value.UserEmail;
      if(!this.valid){
        this.valid=true;
        this.errorMessage = " Email not valid!";
      }else{
        this.errorMessage += " Email not valid!";
      }
     
    }

    if( this.checkTel(userForm.value.UserTel)){
      this.tel=userForm.value.UserTel;
    }else{
      this.tel=userForm.value.UserEmail;
      if(!this.valid){
        this.valid=true;
        this.errorMessage = " Tel not valid!";
      }else{
        this.errorMessage += " Tel not valid!";
      }
      
    }
    if( this.checkPwd(userForm.value.userPwd)){
      this.pwd=userForm.value.userPwd
    }else{
      this.pwd=userForm.value.userPwd
      if(!this.valid){
        this.valid=true;
        this.errorMessage = " Format password faux : Entrez un password entre 8 et 10 caractères avec au moins 1 majuscule 1 miniscule 1 caractère contenue dans la liste suivante (#$^+=!*@%&)!";
      }else{
        this.errorMessage += " Format password faux : Entrez un password entre 8 et 10 caractères avec au moins 1 majuscule 1 miniscule 1 caractère contenue dans la liste suivante (#$^+=!*@%&)!";
      }
      
    }

    if( this.checkVide(userForm.value.UserName)){
      this.name=userForm.value.UserName;
      
    }else{
      this.name=userForm.value.UserName;
      if(!this.valid){
        this.valid=true;
        this.errorMessage = " Nom vide!";
      }else{
        this.errorMessage += " Nom vide!";
      }
     
    }

    if( this.checkVide(userForm.value.UserFirstname)){
      this.firstname=userForm.value.UserFirstname;
    }else{
      this.firstname=userForm.value.UserFirstname;
      if(!this.valid){
        
        this.valid=true;
        this.errorMessage = " Prénom vide!";
      }else{
        this.errorMessage += " Prénom vide!";
      }
     
    }

    if( this.checkVide(userForm.value.UserLogin)){
      this.login = userForm.value.UserLogin;
    }else{
      this.login = userForm.value.UserLogin;
      if(!this.valid){
        this.valid=true;
        this.errorMessage = " Login est vide!";
      }else{
        this.errorMessage += " Login est vide!";
      }
      
    }

    this.pays = userForm.value.pays;
    this.ville = userForm.value.ville;
    this.civ = userForm.value.civility;
    this.cp=userForm.value.UserCP;
    this.adresse = userForm.value.UserAddress;

    
    

    

  }
  nameChange(event){

    this.change=event;
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
  resetUserForm(userForm:NgForm){
    userForm.resetForm();
  }
 
  checkEmailDir() : Boolean{console.log("dans le email");

    return this.checkEmail(this.email);
  }
  checkVideNameDir() : Boolean{
    console.log("dans le name");
    return this.checkVide(this.name);
  }
  checkVideFirstNameDir() : Boolean{
    console.log("dans le prenom");
    return this.checkVide(this.firstname);
  }
  checkTelDir() : Boolean{
    console.log("dans le tel");
    return this.checkTel(this.tel);
  }
  checkVideLoginDir() : Boolean{
  
    console.log("dans le tel");
    return this.checkVide(this.login);
  }

  checkPwdDir(): boolean{

    console.log("dans le tel");
    return this.checkPwd(this.pwd);
  }

}

