import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LinkComponent } from './link/link.component';
import { FriendComponent } from './friend/friend.component';
import { ButtonComponent } from './button/button.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },  
  { path: 'home', component: ButtonComponent },
  { path: 'link', component: LinkComponent },
  { path: 'result', component: FriendComponent },
  { path: 'button', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
