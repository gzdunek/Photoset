/**
 * Created on 13.09.2016.
 */

import {Component} from "@angular/core";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'register-user',
    providers: [UserService],
    // directives: [AsyncEmailValidator, AsyncUsernameValidator, EqualValidator],
    templateUrl: './app/components/register-user/register-user.component.html',
    styleUrls: ['styles.css', 'app/components/register-user/styles.css']
})
export class RegisterUserComponent {
    private user: User = new User();

    constructor(private userService: UserService, private title: Title) {
        this.title.setTitle("Register");
    }

    onSubmit() {
        this.userService.register(this.user).subscribe();
    }
}