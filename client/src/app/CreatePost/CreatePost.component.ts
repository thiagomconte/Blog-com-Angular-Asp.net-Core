import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-CreatePost',
  templateUrl: './CreatePost.component.html',
  styleUrls: ['./CreatePost.component.css']
})

export class CreatePostComponent implements OnInit {

  baseUrl = environment.baseUrl

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

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
    this.http.post(`${this.baseUrl}post`, JSON.stringify(this.createPostForm.value)).subscribe(
      (res:any) =>{
        this.router.navigateByUrl("/").then(() =>{
          this.toastr.success("Postagem criada com sucesso");
        })
      },
      (error: any) =>{
        this.router.navigateByUrl("/createPost").then(() => {
          this.toastr.error(error.error.title);
        })
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
