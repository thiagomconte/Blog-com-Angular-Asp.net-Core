import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    baseUrl = environment.baseUrl

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService
    ) { }

    canActivate(): Observable<boolean> {
        return this.http.get(`${this.baseUrl}user/isAuth`).pipe(
            map((res: any) => {
                if (res['Error']) {
                    this.router.navigateByUrl("/login").then(() => {
                        this.toastr.error("Você precisa estar logado");
                    });
                    return false;
                } else {
                    return true;
                }
            }),
            catchError((err) => {
                this.router.navigateByUrl("/login").then(() => {
                    this.toastr.error("Você precisa estar logado");
                });
                return of(false);
            })
        );

    }


}