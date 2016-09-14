/**
 * Created on 10.09.2016.
 */
import {Component, OnInit, NgZone} from "@angular/core";
import {ApplicationProperties} from "../../config/config";
import {Photo} from "../../models/photo";
import {PhotoService} from "../../services/photo.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'add-photo',
    providers: [PhotoService],
    templateUrl: './app/components/add-photo/add-photo.component.html',
    styleUrls: ['styles.css', 'app/components/add-photo/styles.css']
})
export class AddPhotoComponent implements OnInit {
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    // private response: any = {};
    private previewData: any;
    private imageSelected: boolean = false;
    private fileName: string;
    private photo: Photo = new Photo();

    private properties: ApplicationProperties = new ApplicationProperties();


    constructor(private userService: UserService, private photoService: PhotoService, private router: Router, private title: Title) {
        this.title.setTitle("Add photo");
    }

    ngOnInit(): void {
        this.zone = new NgZone({enableLongStackTrace: false});
        this.basicOptions = {
            url: this.properties.uploadImageUrl,
            allowedExtensions: ['image/jpg'],
            previewUrl: true
        };
    }

    handleUpload(data: any): void {
        this.zone.run(()=> {
            this.imageSelected = true;
            // this.response = data;
            this.progress = data.progress.percent;
            this.fileName = data.response;
            this.photo.fileName = this.fileName;
        });
    }

    handlePreviewData(data: any) {
        this.previewData = data;
    }

    onSubmit() {
        this.userService.getUserByUsername(this.properties.usernameFromLocalStorage).subscribe(user => {
            this.photo.user = JSON.parse(JSON.parse(JSON.stringify(user))._body);
            this.photoService.add(this.photo).subscribe(() => {
                alert("Added!");
                this.router.navigate(['']);
            });
        });

    }

    deleteImage() {
        this.photoService.deleteImage(this.photo.fileName).subscribe(() => {
            this.photo.fileName = "";
            this.progress = 0;
            this.imageSelected = false;
            this.previewData = null;
        });
    }
}