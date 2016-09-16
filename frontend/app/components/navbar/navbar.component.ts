/**
 * Created on 09.09.2016.
 */

import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";
import {SearchService} from "../../services/search.service";

@Component({
    selector: 'navbar',
    providers: [SearchService],
    templateUrl: './app/components/navbar/navbar.component.html',
    styleUrls: ['styles.css', 'app/components/navbar/styles.css']
})
export class NavbarComponent {
    constructor(private userService: UserService) {
    }

    logout() {
        this.userService.logout();
    }

}