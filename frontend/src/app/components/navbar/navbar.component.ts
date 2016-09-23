/**
 * Created on 09.09.2016.
 */

import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private userService: UserService, private router: Router) {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
