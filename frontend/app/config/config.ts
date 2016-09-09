/**
 * Created on 09.09.2016.
 */

import {Headers} from "@angular/http";

export class ApplicationProperties {
    public jsonHeader: Headers = new Headers({'Content-Type': 'application/json'});
    public newestPhotosUrl: string = "http://localhost:8080/photo/getByNewest";
}