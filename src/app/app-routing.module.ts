import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:  '', redirectTo:  'home', pathMatch:  'full' },

  {
      path:  'login',
      component:  LoginComponent
  },
  {
      path:  'home',
      component:  HomeComponent
  },
  {
    path:  'board/:id',
    component:  BoardComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
