/**
 * Created on 15.09.2016.
 */

import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../models/user";
@Pipe({
  name: 'findUsername'
})
export class FindUsernameInListPipe implements PipeTransform {
  transform(likedUsers: User[], username: string): boolean {
    if (likedUsers == null)
      return false;

    return likedUsers.filter(user => user.username === username).length !== 0;

  }

}
