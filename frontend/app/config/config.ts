/**
 * Created on 09.09.2016.
 */

import {Headers} from "@angular/http";

export class ApplicationProperties {
    public jsonHeader: Headers = new Headers({'Content-Type': 'application/json'});
    public newestPhotosUrl: string = "http://localhost:8080/photo/getByNewest";
    public uploadImageUrl: string = "http://localhost:8080/photo/upload";
    public deleteImageUrl: string = "http://localhost:8080/photo/delete";
    public addPhotoUrl: string = "http://localhost:8080/photo/add";
}