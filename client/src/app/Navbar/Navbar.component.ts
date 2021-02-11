import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Auth } from './../models/auth';
import { logoutUser } from './../store/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed = true;

  auth!: Auth;

  constructor(private store: Store<{ auth: Auth }>, private router: Router) {
    store.select('auth').subscribe(x =>
      this.auth = x);
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(logoutUser());
    this.router.navigateByUrl("/");
  }

}
