/**
 * Created on 09.09.2016.
 */

import {Component, OnInit} from "@angular/core";
import {PhotoService} from "../../services/photo.service";
import {Photo} from "../../models/photo";
import {Title} from "@angular/platform-browser";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ApplicationProperties} from "../../config/config";
import {FindUsernameInListPipe} from "../../pipes/find-username-in-list.pipe";
import {PhotoCommentService} from "../../services/photo-comment.service";
import {PhotoComment} from "../../models/photo-comment";

@Component({
    selector: 'home',
    providers: [PhotoService, PhotoCommentService],
    templateUrl: './app/components/home/home.component.html',
    styleUrls: ['styles.css', 'app/components/home/styles.css']
})
export class HomeComponent implements OnInit {
    photos: Photo[] = null;
    private user = new User();


    private properties = new ApplicationProperties();

    constructor(private photoService: PhotoService, private userService: UserService, private commentService: PhotoCommentService,
                private title: Title, private router: Router) {
        this.title.setTitle("photo{set}");

    }

    ngOnInit(): void {
        this.receiveUser();
        this.receivePhotosData();
    }

    receiveUser() {
        if (this.userService.isLoggedIn)
            this.userService.getUserByUsername(this.properties.usernameFromLocalStorage).subscribe(receivedUser => {
                this.user = JSON.parse(JSON.parse(JSON.stringify(receivedUser))._body);
            });
    }

    receivePhotosData() {
        this.photoService.getByNewest().subscribe(photos => {
            this.photos = JSON.parse(JSON.parse(JSON.stringify(photos))._body);

            // Check if our username is on the list of users who liked the photo, we check in this way every image on page
            for (let i = 0; i < this.photos.length; i++)
                this.photos[i].liked = new FindUsernameInListPipe().transform(this.photos[i].likedByUsers, this.properties.usernameFromLocalStorage);
        });

    }

    navigateToUserByUsername(username: string) {
        this.router.navigate(['/user', username]);
    }

    navigateToUser(user: User) {
        this.router.navigate(['/user', user.username]);
    }

    likePhoto(photo: Photo) {
        if (this.userService.isLoggedIn) {
            if (!photo.liked) {
                photo.liked = true;
                photo.likesCount += 1;
                this.photoService.giveLikeToPhoto(photo, this.user).subscribe();
            } else {
                photo.liked = false;
                photo.likesCount -= 1;
                this.photoService.takeLikeFromPhoto(photo, this.user).subscribe();
            }
        } else {
            alert("Please log in first");
        }
    }

    sendComment(photo: Photo, content: string) {
        let comment1 = new PhotoComment();
        comment1.username = this.properties.usernameFromLocalStorage;
        comment1.content = content;
        comment1.photo = photo;

        if (content.length != 0)
            this.commentService.add(comment1).subscribe(() => {
                this.commentService.getByPhotoId(photo.id).subscribe(comments => {
                    this.photos.find(photography => photography.id === photo.id).photoComments = JSON.parse(JSON.parse(JSON.stringify(comments))._body);
                });
            });
    }
}