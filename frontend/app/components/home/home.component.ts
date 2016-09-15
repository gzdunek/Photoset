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

@Component({
    selector: 'home',
    providers: [PhotoService],
    templateUrl: './app/components/home/home.component.html',
    styleUrls: ['styles.css', 'app/components/home/styles.css']
})
export class HomeComponent implements OnInit {
    photos: Photo[] = null;
    private user = new User();

    private properties = new ApplicationProperties();

    constructor(private photoService: PhotoService, private userService: UserService, private title: Title, private router: Router) {
        this.title.setTitle("photo{set}");
    }

    ngOnInit(): void {
        this.receiveUser();
        this.receivePhotosData();
    }

    receiveUser() {
        this.userService.getUserByUsername(this.properties.usernameFromLocalStorage).subscribe(receivedUser => {
            this.user = JSON.parse(JSON.parse(JSON.stringify(receivedUser))._body);
        })
    }

    receivePhotosData() {
        this.photoService.getByNewest().subscribe(photos => {
            this.photos = JSON.parse(JSON.parse(JSON.stringify(photos))._body);

            // Check if our username is on the list of users who liked the photo, we check in this way every image on page
            for (let i = 0; i < this.photos.length; i++)
                this.photos[i].liked = new FindUsernameInListPipe().transform(this.photos[i].likedByUsers, this.properties.usernameFromLocalStorage);
        });

    }

    onSelect(user: User) {
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
}