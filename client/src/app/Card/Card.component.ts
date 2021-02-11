import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Card',
  templateUrl: './Card.component.html',
  styleUrls: ['./Card.component.css']
})
export class CardComponent implements OnInit {

  baseUrl = environment.baseUrl

  public posts: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Post[]>(`${this.baseUrl}post`).subscribe( (response: Post[]) =>{
      this.posts = response;
    })
  }

}


interface Post{
  title: string,
  description: string,
  slug: string,
  photo: string,
  content: string,
  created_at: Date,
}