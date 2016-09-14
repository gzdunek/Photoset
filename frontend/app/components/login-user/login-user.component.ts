/**
 * Created on 13.09.2016.
 */

import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'login-user',
    templateUrl: './app/components/login-user/login-user.component.html',
    styleUrls: ['styles.css', 'app/components/login-user/styles.css']
})
export class LoginUserComponent {
    private model = {'username': '', 'password': ''};

    constructor(private userService: UserService, private router: Router, private title: Title) {
        this.title.setTitle("Login");
    }

    private onSubmit() {
        this.userService.login(this.model).subscribe(response => {
                localStorage.setItem("token", JSON.parse(JSON.stringify(response))._body);
                localStorage.setItem("currentUsername", this.model.username);

                this.model.username = '';
                this.model.password = '';

                this.userService.isLoggedIn = true;

                this.router.navigate(['']);
            },
            error => console.log(error)
        );
    }
}