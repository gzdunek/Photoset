/**
 * Created on 09.09.2016.
 */

import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {ApplicationProperties} from "../config/config";
import {Photo} from "../models/photo";
import {User} from "../models/user";

@Injectable()
export class PhotoService {

    properties: ApplicationProperties = new ApplicationProperties();

    constructor(private http: Http) {
    }

    getByNewest(limit: number) {
        let params = new URLSearchParams();
        params.set("limit", limit.toString());
        return this.http.get(this.properties.newestPhotosUrl, {
            search: params,
            headers: this.properties.jsonHeader
        }).map(res => res.json());
    }

    getPhotosByIdOfFirst(idOfFirst: number, limit: number) {
        let params = new URLSearchParams();
        params.set("limit", limit.toString());
        params.set("idOfFirst", idOfFirst.toString());
        return this.http.get(this.properties.byIdOfFirstPhotosUrl, {
            search: params,
            headers: this.properties.jsonHeader
        }).map(res => res.json());
    }

    getByUser(user: User) {
        return this.http.get(this.properties.photosByUserUrl.concat('/' + user.username), {headers: this.properties.jsonHeader}).map(res => res.json());
    }

    add(photo: Photo) {
        return this.http.post(this.properties.addPhotoUrl, photo, {headers: this.properties.authHeader}).map(res => res.json());
    }

    deleteImage(fileName: string) {
        return this.http.delete(this.properties.deleteImageUrl.concat('/' + fileName), {headers: this.properties.authHeader});
    }

    giveLikeToPhoto(photo: Photo, user: User) {
        return this.http.post(this.properties.addLikeToPhotoUrl.concat('/' + photo.id), user, {headers: this.properties.authHeader});
    }

    takeLikeFromPhoto(photo: Photo, user: User) {
        return this.http.post(this.properties.undoLikeToPhotoUrl.concat('/' + photo.id), user, {headers: this.properties.authHeader});
    }
}