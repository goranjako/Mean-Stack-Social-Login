import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Interceptor } from './auth/interceptor';
import { HomeComponent } from './index/home/home.component';
import { NotFoundComponent } from './index/not-found/not-found.component';
import { UserProfileComponent } from './index/user-profile/user-profile.component';
import { NavbarComponent } from './index/navbar/navbar.component';
import { NgxSocialButtonModule, SocialServiceConfig} from 'ngx-social-button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent, NotFoundComponent, NavbarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(), NgxSpinnerModule, MDBBootstrapModule.forRoot(), SweetAlert2Module.forRoot(),
    FormsModule, ReactiveFormsModule, HttpClientModule, NgxSocialButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },

      }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
