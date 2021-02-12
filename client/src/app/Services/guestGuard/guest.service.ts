import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class GuestService implements CanActivate {


    constructor(
        private router: Router,
    ) { }

    canActivate(): boolean {
        var localStrg = JSON.parse(localStorage.getItem('auth') || '{}');
        if(localStrg.isLoggedIn){
            this.router.navigateByUrl("/");
            return false;
        }else{
            return true;
        } 
    }


}