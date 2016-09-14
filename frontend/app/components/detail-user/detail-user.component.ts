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

@Component({
    selector: 'detail-user',
    providers: [PhotoService],
    templateUrl: './app/components/detail-user/detail-user.component.html',
    styleUrls: ['styles.css', 'app/components/detail-user/styles.css']
})
export class DetailUserComponent implements OnInit {
    private sub: Subscription;
    private user: User = new User();
    private photos: Photo[];

    constructor(private userService: UserService, private photoService: PhotoService, private route: ActivatedRoute, private title: Title) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            let name = params['name'];
            this.title.setTitle(name + ' profile');
            this.userService.getUserByUsername(name).subscribe(user => {
                this.user = JSON.parse(JSON.parse(JSON.stringify(user))._body);
                this.photoService.getByUser(this.user).subscribe(photos => {
                    this.photos = JSON.parse(JSON.parse(JSON.stringify(photos))._body);
                });
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}