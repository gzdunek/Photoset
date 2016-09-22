/**
 * Created on 16.09.2016.
 */

import {Injectable} from "@angular/core";
import {ApplicationProperties} from "../config/config";
import {Http} from "@angular/http";
@Injectable()
export class SearchService {

  private properties = new ApplicationProperties();

  constructor(private http: Http) {
  }

  searchUser(term: string) {
    return this.http.get(this.properties.searchUserUrl.concat("/" + term), {headers: this.properties.jsonHeader}).map(res => res.json());
  }
}
