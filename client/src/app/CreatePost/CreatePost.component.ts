import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-CreatePost',
  templateUrl: './CreatePost.component.html',
  styleUrls: ['./CreatePost.component.css']
})

export class CreatePostComponent implements OnInit {

  baseUrl = environment.baseUrl
  public successMessage = "Postagem adicionada";
  public errorMessage = "";
  public showAlert: boolean = false;
  public showDanger: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  createPostForm = this.formBuilder.group({
    title: [''],
    description: [''],
    slug: [''],
    photo: [''],
    content: [''],
  });


  postSubmit() {
    this.http.post(`${this.baseUrl}post`, JSON.stringify(this.createPostForm.value), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).subscribe(
      (res:any) =>{
        this.showAlert = true;
        setTimeout(() =>{
          this.showAlert = false;
        }, 5000);
        this.createPostForm.reset();
      },
      (error: any) =>{
        if(error.status === 400){
          this.errorMessage = error.error.title;
          this.showDanger = true;
          setTimeout(() =>{
            this.showDanger = false;
          }, 10000);
        }
      }
    )
  }

}

interface Post{
    title: string,
    description: string,
    slug: string,
    photo: string,
    content: string
}
