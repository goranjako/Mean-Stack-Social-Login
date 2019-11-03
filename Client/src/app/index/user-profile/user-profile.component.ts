import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private service: AuthService, private loading: NgxSpinnerService) { }
  user;

  ngOnInit() {
    this.profile();
  }
  profile() {
    this.loading.show();
    this.user = this.service.getToken();
    this.loading.hide();

  }
}
