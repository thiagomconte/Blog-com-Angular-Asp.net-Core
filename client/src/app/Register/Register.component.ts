import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  baseUrl = environment.baseUrl
  public showDanger:boolean = false;
  public errorMessage:string = "";


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  formUser = this.formBuilder.group({
    nome: '',
    email: '',
    password: '',
    checkpassword: ''
  })

  register(){
    var data = this.formUser.value;
    if(data.password !== data.checkpassword){
      this.funcShowError("Passwords do not match");
    }
    else{
      this.http.post(`${this.baseUrl}user`, JSON.stringify(data)).subscribe(
        (res: any) =>{
          this.router.navigateByUrl('/login');
        },
        (error: any) => {
          this.funcShowError(error.error);
          console.log(error);
          this.router.navigateByUrl('/register');
        }
      )
    }
  }

  funcShowError(msg: string){
    this.errorMessage = msg;
    this.showDanger = true;
    setTimeout(() =>{
      this.showDanger = false;
    }, 8000);
  }

}


interface User{
  nome: string,
  email: string,
  password: string
}
