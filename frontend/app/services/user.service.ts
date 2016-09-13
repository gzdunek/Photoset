/**
 * Created on 13.09.2016.
 */

import {Injectable} from "@angular/core";
import {ApplicationProperties} from "../config/config";
import {User} from "../models/user";
import {Http} from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class UserService {

    properties: ApplicationProperties = new ApplicationProperties();

    isLoggedIn: boolean = false;

    constructor(private http: Http) {
        let username: string = this.properties.usernameFromLocalStorage;
        if (username != null)
            this.isLoggedIn = true;
    }

    isEmailExisting(email: string) {
        return this.http.post(this.properties.isEmailExistingUrl, email, {headers: this.properties.jsonHeader}).map(res => res.json());
    }

    isUsernameExisting(username: string) {
        return this.http.post(this.properties.isUsernameExistingUrl, username, {headers: this.properties.jsonHeader}).map(res => res.json());
    }

    getUserByUsername(username: string) {
        return this.http.post(this.properties.getUserByUsernameUrl, username, {headers: this.properties.jsonHeader});
    }

    register(user: User) {
        return this.http.post(this.properties.registerUserUrl, user, {headers: this.properties.jsonHeader});
    }

    login(model: {username: string; password: string}) {
        return this.http.post(this.properties.loginUserUrl, JSON.stringify(model), {headers: this.properties.jsonHeader});
    }

    logout() {
        localStorage.clear();
        this.isLoggedIn = false;
    }
}