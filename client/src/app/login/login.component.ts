import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor ( private session: SessionService, private router: Router ) { }

user: User;
loginInfo = {
  username: '',
  password: ''
};

errorMessage: string;
isLoggedIn: boolean = false

ngOnInit() {
  this.session.loggedIn$.subscribe((userFromApi) => {
    this.isLoggedIn = true;
  })
}

login() {
  this.session.login(this.loginInfo)
    .then((userFromApi) => {
      this.session.loggedIn(userFromApi);
      this.router.navigate(['/miami']);
    })
    .catch((errResponse) => {
      const apiInfo = errResponse.json();
      this.errorMessage = apiInfo.message;
    });
}

}
