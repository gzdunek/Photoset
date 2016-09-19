/**
 * Created on 09.09.2016.
 */

import {Component, OnInit} from "@angular/core";
import {PhotoService} from "../../services/photo.service";
import {Photo} from "../../models/photo";
import {Title} from "@angular/platform-browser";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {ApplicationProperties} from "../../config/config";
import {FindUsernameInListPipe} from "../../pipes/find-username-in-list.pipe";
import {PhotoCommentService} from "../../services/photo-comment.service";

@Component({
    selector: 'home',
    providers: [PhotoService, PhotoCommentService],
    templateUrl: './app/components/home/home.component.html',
    styleUrls: ['styles.css', 'app/components/home/styles.css']
})
export class HomeComponent implements OnInit {
    photos: Photo[] = null;
    private loggedUser = new User();

    private properties = new ApplicationProperties();
    private infiniteScrollDisabled: boolean;

    constructor(private photoService: PhotoService, private userService: UserService, private title: Title) {
        this.title.setTitle("photo{set}");
    }

    ngOnInit(): void {
        this.receiveLoggedUser();
        this.receivePhotosData();
    }

    receiveLoggedUser() {
        if (this.userService.isLoggedIn)
            this.userService.getUserByUsername(this.properties.usernameFromLocalStorage).subscribe(receivedUser => {
                this.loggedUser = receivedUser;
            });
    }

    receivePhotosData() {
        this.photoService.getByNewest(3).subscribe(photos => {
            this.photos = photos;

            // Check if our username is on the list of users who liked the photo, we check in this way every image on page
            for (let i = 0; i < this.photos.length; i++)
                this.photos[i].liked = new FindUsernameInListPipe().transform(this.photos[i].likedByUsers, this.properties.usernameFromLocalStorage);
        });

    }

    scrolledDown() {
        let index = this.photos.length - 1;

        this.photoService.getPhotosByIdOfFirst(this.photos[index].id, 3).subscribe(receivedPhotos => {
            if (receivedPhotos.length == 0)
                this.infiniteScrollDisabled = true;
            else {
                receivedPhotos.forEach(photo => this.photos.push(photo));
                for (let i = 0; i < this.photos.length; i++)
                    this.photos[i].liked = new FindUsernameInListPipe().transform(this.photos[i].likedByUsers, this.properties.usernameFromLocalStorage);
            }
        });
    }
}