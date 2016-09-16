/**
 * Created on 15.09.2016.
 */

import {Injectable} from "@angular/core";
import {ApplicationProperties} from "../config/config";
import {Http} from "@angular/http";
import {PhotoComment} from "../models/photo-comment";

@Injectable()
export class PhotoCommentService {
    private properties = new ApplicationProperties();

    constructor(private http: Http) {
    }

    add(comment: PhotoComment) {
        return this.http.post(this.properties.addCommentUrl, comment, {headers: this.properties.authHeader});
    }

    getByPhotoId(id: number) {
        return this.http.get(this.properties.getCommentsByPhotoIdUrl.concat('/' + id), {headers: this.properties.jsonHeader});
    }

}