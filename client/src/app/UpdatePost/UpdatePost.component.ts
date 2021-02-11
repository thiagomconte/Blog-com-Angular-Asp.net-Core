import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-UpdatePost',
  templateUrl: './UpdatePost.component.html',
  styleUrls: ['./UpdatePost.component.css']
})
export class UpdatePostComponent implements OnInit {

  baseUrl = environment.baseUrl
  public errorMessage = "";
  public showDanger: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params =>{
      const slug = params['slug'];
      this.http.get<Post>(`${this.baseUrl}post/getPostBySlug/${slug}`).subscribe(
        res => {
          this.updatePostForm.setValue(res);
        },
        err => {
          console.log(err);
        }
      )
    })
  }

  updatePostForm = this.formBuilder.group({
    id: 0,
    title: [''],
    description: [''],
    slug: [''],
    photo: [''],
    content: [''],
    created_at: new Date(),
  });


  postSubmit() {
    this.http.put(`${this.baseUrl}post/update`, JSON.stringify(this.updatePostForm.value)).subscribe(
      (res:any) =>{
        this.router.navigateByUrl("/");
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
    id: number;
    title: string,
    description: string,
    slug: string,
    photo: string,
    content: string,
    created_at: Date
}
