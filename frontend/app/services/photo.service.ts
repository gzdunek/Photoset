/**
 * Created on 09.09.2016.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ApplicationProperties} from "../config/config";
import {Photo} from "../models/photo";

@Injectable()
export class PhotoService {

    properties: ApplicationProperties = new ApplicationProperties();

    constructor(private http: Http) {
    }

    getByNewest() {
        return this.http.get(this.properties.newestPhotosUrl, {headers: this.properties.authHeader});
    }

    add(photo: Photo) {
        return this.http.post(this.properties.addPhotoUrl, photo, {headers: this.properties.authHeader});
    }

    deleteImage(fileName: string) {
        return this.http.delete(this.properties.deleteImageUrl.concat('/' + fileName), {headers: this.properties.authHeader});
    }
}