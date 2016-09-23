/**
 * Created on 13.09.2016.
 */

import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  private model = {'email': '', 'password': ''};

  constructor(private userService: UserService, private router: Router, private title: Title) {
    this.title.setTitle("Login");
  }

  private onSubmit() {
    this.userService.login(this.model).subscribe(response => {
        localStorage.setItem("token", JSON.parse(JSON.stringify(response))._body);

        this.userService.getUserByEmail(this.model.email).subscribe(user => {
          localStorage.setItem("currentUsername", user.username);

          this.model.email = '';
          this.model.password = '';

          this.userService.isLoggedIn = true;

          this.router.navigate(['/home']);
        });
      },
      error => {
        console.log(error);
        alert(error);
      }
    );
  }
}
