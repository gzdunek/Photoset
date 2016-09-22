/**
 * Created on 19.09.2016.
 */

import {Component, Input} from "@angular/core";
import {Photo} from "../../models/photo";
import {UserService} from "../../services/user.service";
import {PhotoComment} from "../../models/photo-comment";
import {PhotoService} from "../../services/photo.service";
import {PhotoCommentService} from "../../services/photo-comment.service";
import {Router} from "@angular/router";
import {ApplicationProperties} from "../../config/config";
import {User} from "../../models/user";
@Component({
  selector: 'photo-card',
  providers: [PhotoCommentService, PhotoService],
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css']
})
export class PhotoCardComponent {
  @Input()
  photo: Photo;

  /**
   * We need logged user to write comment and give likes to photo
   */
  @Input()
  loggedUser: User;

  private properties = new ApplicationProperties();

  constructor(private photoService: PhotoService, private userService: UserService, private commentService: PhotoCommentService, private router: Router) {
  }

  navigateToUserByUsername(username: string) {
    this.router.navigate(['/user', username]);
  }


  likePhoto(photo: Photo) {
    if (this.userService.isLoggedIn) {
      if (!photo.liked) {
        photo.liked = true;
        photo.likesCount += 1;
        this.photoService.giveLikeToPhoto(photo, this.loggedUser).subscribe();
      } else {
        photo.liked = false;
        photo.likesCount -= 1;
        this.photoService.takeLikeFromPhoto(photo, this.loggedUser).subscribe();
      }
    } else {
      alert("Please log in first");
    }
  }

  sendComment(photo: Photo, content: string) {
    let comment = new PhotoComment();
    comment.username = this.properties.usernameFromLocalStorage;
    comment.content = content;
    comment.photo = photo;

    if (content.length != 0)
      this.commentService.add(comment).subscribe(() => {
        this.commentService.getByPhotoId(photo.id).subscribe(comments => {
          this.photo.photoComments = comments;
        });
      });
  }
}
