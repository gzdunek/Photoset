/**
 * Created on 15.09.2016.
 */

import {Photo} from "./photo";

export class PhotoComment {
  id: number;
  username: string;
  content: string;
  photo: Photo;
}
