import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Post',
  templateUrl: './Post.component.html',
  styleUrls: ['./Post.component.css']
})
export class PostComponent implements OnInit {

  baseUrl = environment.baseUrl
  public post: Post = {
    title: '',
    description: '',
    slug: '',
    photo: '',
    content: '',
    created_at: new Date(),
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const slug = params['slug'];
      this.http.get<Post>(`${this.baseUrl}post/getPostBySlug/${slug}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).subscribe(
        res => {
          this.post = res;
        },
        err => {
          console.log(err);
        }
      )
    });
  }
}

interface Post {
  title: string,
  description: string,
  slug: string,
  photo: string,
  content: string,
  created_at: Date,
}


