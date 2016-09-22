/**
 * Created on 09.09.2016.
 */

import {User} from "./user";
import {PhotoComment} from "./photo-comment";

export class Photo {
  id: number;
  fileName: string;
  title: string;
  description: string;
  likesCount: number;
  creationTimestamp: Date;
  user: User;
  liked: boolean = false;
  likedByUsers: User[];
  photoComments: PhotoComment[];
}
