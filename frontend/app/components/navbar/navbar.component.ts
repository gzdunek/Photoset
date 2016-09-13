/**
 * Created on 09.09.2016.
 */

import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'navbar',
    templateUrl: './app/components/navbar/navbar.component.html',
    styleUrls: ['app/components/navbar/styles.css']
})
export class NavbarComponent {
    constructor(private userService: UserService) {
    }

    logout() {
        this.userService.logout();
    }
}