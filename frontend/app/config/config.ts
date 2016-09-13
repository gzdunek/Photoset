/**
 * Created on 09.09.2016.
 */

import {Headers} from "@angular/http";

export class ApplicationProperties {
    public usernameFromLocalStorage: string = localStorage.getItem("currentUsername");
    public getTokenFromLocalStorage: string = localStorage.getItem("token");

    public jsonHeader: Headers = new Headers({'Content-Type': 'application/json'});
    public authHeader: Headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    });

    public newestPhotosUrl: string = "http://localhost:8080/photo/getByNewest";
    public uploadImageUrl: string = "http://localhost:8080/photo/upload";
    public deleteImageUrl: string = "http://localhost:8080/photo/delete";
    public addPhotoUrl: string = "http://localhost:8080/photo/add";

    public registerUserUrl: string = "http://localhost:8080/user/register";
    public isEmailExistingUrl: string = "http://localhost:8080/user/isEmailExisting";
    public getUserByUsernameUrl: string = "http://localhost:8080/user/getByUsername";
    public isUsernameExistingUrl: string = "http://localhost:8080/user/isUsernameExisting";

    public loginUserUrl: string = "http://localhost:8080/user/login";

}