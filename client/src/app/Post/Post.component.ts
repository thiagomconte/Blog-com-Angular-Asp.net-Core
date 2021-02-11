import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store} from '@ngrx/store';
import {Auth} from '../models/auth';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-Post',
  templateUrl: './Post.component.html',
  styleUrls: ['./Post.component.css']
})
export class PostComponent implements OnInit {

  baseUrl = environment.baseUrl
  public post: Post = {
    id: 0,
    title: '',
    description: '',
    slug: '',
    photo: '',
    content: '',
    created_at: new Date(),
  };

  auth!: Auth;

  constructor(private toastr : ToastrService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private store: Store<{ auth: Auth }>) {
    store.select('auth').subscribe(x => {
      this.auth = x;
    })
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const slug = params['slug'];
      this.http.get<Post>(`${this.baseUrl}post/getPostBySlug/${slug}`).subscribe(
        res => {
          this.post = res;
        },
        err => {
          console.log(err);
        }
      )
    });
  }

  deletePost(id: number){
    this.http.delete(`${this.baseUrl}post/${id}`).subscribe(
      res => {
        this.router.navigateByUrl("/").then(() => {
          this.toastr.success("Postagem deletada com sucesso")
        });
      },
      err => {
        this.router.navigateByUrl(this.router.url).then(()=>{
          this.toastr.error(err.error);
        })
      }
    )
  }
}

interface Post {
  id: number,
  title: string,
  description: string,
  slug: string,
  photo: string,
  content: string,
  created_at: Date,
}


