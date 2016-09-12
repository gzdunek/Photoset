/**
 * Created on 10.09.2016.
 */
import {Component, OnInit, NgZone} from "@angular/core";
import {ApplicationProperties} from "../../config/config";
import {Photo} from "../../models/photo";
import {PhotoService} from "../../services/photo.service";

@Component({
    selector: 'add-photo',
    providers: [PhotoService],
    templateUrl: './app/components/add-photo/add-photo.component.html',
    styleUrls: ['app/components/add-photo/styles.css']
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


    constructor(private photoService: PhotoService) {
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
        this.photoService.add(this.photo).subscribe(() => {
            alert("Added!");
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