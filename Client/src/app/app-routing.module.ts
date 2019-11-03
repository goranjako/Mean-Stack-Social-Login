import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './index/home/home.component';
import { NotFoundComponent } from './index/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './index/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
