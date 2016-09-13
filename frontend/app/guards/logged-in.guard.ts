/**
 * Created on 13.09.2016.
 */

import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (this.userService.isLoggedIn)
            return true
        else {
            alert("Please log in");
            this.router.navigate(['']);
            return false;
        }
    }
}