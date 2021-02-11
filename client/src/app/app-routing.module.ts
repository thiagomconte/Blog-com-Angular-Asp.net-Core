import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './Card/Card.component';
import { CreatePostComponent } from './CreatePost/CreatePost.component';
import { LoginComponent } from './Login/Login.component';
import { PostComponent } from './Post/Post.component';
import { RegisterComponent } from './Register/Register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: CardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'post', component: PostComponent},
  {path: 'createPost', component: CreatePostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
