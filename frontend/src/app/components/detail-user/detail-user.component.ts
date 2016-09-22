/**
 * Created on 14.09.2016.
 */

import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user";
import {Photo} from "../../models/photo";
import {PhotoService} from "../../services/photo.service";
import {Title} from "@angular/platform-browser";
import {ApplicationProperties} from "../../config/config";
import {PhotoCommentService} from "../../services/photo-comment.service";
import {FindUsernameInListPipe} from "../../pipes/find-username-in-list.pipe";

@Component({
  selector: 'detail-user',
  providers: [PhotoCommentService, PhotoService],
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  private sub: Subscription;
  private user: User = new User();
  private loggedUser: User = new User();
  private photos: Photo[] = null;

  private properties = new ApplicationProperties();

  constructor(private userService: UserService, private photoService: PhotoService, private route: ActivatedRoute, private title: Title) {
  }

  receiveLoggedUser() {
    if (this.userService.isLoggedIn)
      this.userService.getUserByUsername(this.properties.usernameFromLocalStorage).subscribe(receivedUser => {
        this.loggedUser = receivedUser;
      });
  }

  receivePhotosByUsername(name: string) {
    this.title.setTitle(name + ' profile');
    this.userService.getUserByUsername(name).subscribe(user => {
      this.user = user;
      this.photoService.getByUser(this.user).subscribe(photos => {
        this.photos = photos;
        for (let i = 0; i < this.photos.length; i++)
          this.photos[i].liked = new FindUsernameInListPipe().transform(this.photos[i].likedByUsers, this.properties.usernameFromLocalStorage);
      });
    });
  }

  ngOnInit(): void {
    this.receiveLoggedUser();
    this.sub = this.route.params.subscribe(params => {
      let name = params['name'];
      this.receivePhotosByUsername(name);
    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
