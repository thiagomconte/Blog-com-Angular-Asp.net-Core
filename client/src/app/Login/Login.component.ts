import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import {authenticateUser} from './../store/actions/auth.actions';
import {Auth} from './../models/auth';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl = environment.baseUrl;
  public showDanger:boolean = false;
  public errorMessage:string = '';
  public payload: Auth ={
    email: '',
    token: '',
    isLoggedIn: false
  };

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private store: Store) { }

  ngOnInit() {
  }

  formLogin = this.formBuilder.group({
    email: '',
    password: '',
  })  

  login(){
    this.http.post(`${this.baseUrl}user/login`, this.formLogin.value
    ).subscribe(
      (res:any) => {
        this.payload.email = res.account.email
        this.payload.isLoggedIn = true;
        this.payload.token = res.token;
        this.store.dispatch(authenticateUser({payload: this.payload}))
        this.router.navigateByUrl("/");
      },
      (error: any) => {
        this.errorMessage = error.error;
        this.showDanger = true;
        setTimeout(() =>{
          this.showDanger = false;
        }, 5000);
      }
    )
  }

}

interface User{
  email: string,
  password: string
}


