/**
 * Created on 09.09.2016.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ApplicationProperties} from "../config/config";

@Injectable()
export class PhotoService {

    properties: ApplicationProperties = new ApplicationProperties();

    constructor(private http: Http) {
    }

    getByNewest() {
        return this.http.get(this.properties.newestPhotosUrl, {headers: this.properties.jsonHeader});
    }
}