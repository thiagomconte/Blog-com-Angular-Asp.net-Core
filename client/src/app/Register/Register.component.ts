import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  baseUrl = environment.baseUrl

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  formUser = this.formBuilder.group({
    nome: '',
    email: '',
    password: '',
    checkpassword: ''
  })

  register() {
    var data = this.formUser.value;
    if (data.password !== data.checkpassword) {
      this.toastr.error("Senhas estão diferentes")
    }
    else {
      this.http.post(`${this.baseUrl}user`, JSON.stringify(data)).subscribe(
        (res: any) => {
          this.router.navigateByUrl('/login').then(() => {
            this.toastr.success("Conta cadastrada com sucesso");
          });
        },
        (error: any) => {
          this.router.navigateByUrl("/register").then(() => {
            this.toastr.error(error.error);
          })
        }
      )
    }
  }

}


interface User {
  nome: string,
  email: string,
  password: string
}
