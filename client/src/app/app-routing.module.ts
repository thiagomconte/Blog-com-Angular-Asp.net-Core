import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './Card/Card.component';
import { CreatePostComponent } from './CreatePost/CreatePost.component';
import { LoginComponent } from './Login/Login.component';
import { PostComponent } from './Post/Post.component';
import { RegisterComponent } from './Register/Register.component';
import { UpdatePostComponent } from './UpdatePost/UpdatePost.component';
import { AuthService} from './Services/authGuard/auth.service';
import { GuestService} from './Services/guestGuard/guest.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuestService]},
  {path: '', component: CardComponent},
  {path: 'register', component: RegisterComponent, canActivate: [GuestService]},
  {path: 'post', component: PostComponent},
  {path: 'createPost', component: CreatePostComponent, canActivate: [AuthService]},
  {path: 'updatePost', component: UpdatePostComponent, canActivate: [AuthService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
