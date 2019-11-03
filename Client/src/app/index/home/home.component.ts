import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Mean Stack Social Login with Facebook & Google ';
  token;
  constructor(private router: Router, private log: AuthService, private toast: Sweetalert2Service,
    // tslint:disable-next-line:align
    private loading: NgxSpinnerService, private route: ActivatedRoute) {
    {
      this.route.queryParams.subscribe((token: any) => {
        if (token) {
          localStorage.setItem('token', token.token);

        }
      });
    }
  }


  ngOnInit() {
    this.getProfile();
  }
  FacebookSignIn() {
    window.location.assign('http://localhost:3000/auth/facebook');
  }
  GoogleSignIn() {
    window.location.assign('http://localhost:3000/auth/google');
  }

  getProfile() {
    if (this.log.getToken() !== null) {
      this.router.navigate(['/profile']);
  }

}
}
