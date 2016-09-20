/**
 * Created on 13.09.2016.
 */

import {Component, NgZone} from "@angular/core";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ApplicationProperties} from "../../config/config";
import {PhotoService} from "../../services/photo.service";

@Component({
    selector: 'register-user',
    providers: [PhotoService],
    templateUrl: './app/components/register-user/register-user.component.html',
    styleUrls: ['styles.css', 'app/components/register-user/styles.css']
})
export class RegisterUserComponent {
    private zone: NgZone;
    private basicOptions: Object;
    private progress: number = 0;
    private previewData: any;
    private imageSelected: boolean = false;
    private fileName: string;
    private user: User = new User();
    private input: any;

    private properties: ApplicationProperties = new ApplicationProperties();

    constructor(private userService: UserService, private title: Title, private router: Router, private photoService: PhotoService) {
        this.title.setTitle("Register");
    }

    onSubmit() {
        this.userService.register(this.user).subscribe(() => {
            this.router.navigate(['']);
        });
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
            this.progress = data.progress.percent;
            this.fileName = data.response;
            this.user.avatarFileName = this.fileName;
        });
    }

    handlePreviewData(data: any) {
        this.previewData = data;
    }

    deleteImage() {
        this.photoService.deleteImage(this.fileName).subscribe(() => {
            this.user.avatarFileName = "";
            this.progress = 0;
            this.imageSelected = false;
            this.previewData = null;
            this.input = null;
        });
    }
}