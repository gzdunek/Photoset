/**
 * Created on 09.09.2016.
 */

import {Component, OnInit} from "@angular/core";
import {PhotoService} from "../../services/photo.service";
import {Photo} from "../../models/photo";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'home',
    providers: [PhotoService],
    templateUrl: './app/components/home/home.component.html',
    styleUrls: ['app/components/home/styles.css']
})
export class HomeComponent implements OnInit {
    photos: Photo[];

    constructor(private photoService: PhotoService, private title: Title) {
        this.title.setTitle("photo{set}");
    }

    ngOnInit(): void {
        this.receivePhotosData();
    }

    receivePhotosData() {
        this.photoService.getByNewest().subscribe(photos => {
            this.photos = JSON.parse(JSON.parse(JSON.stringify(photos))._body);
        });
    }
}