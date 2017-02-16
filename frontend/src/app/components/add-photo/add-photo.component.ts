/**
 * Created on 10.09.2016.
 */
import {Component, OnInit, NgZone, Inject} from "@angular/core";
import {ApplicationProperties} from "../../config/config";
import {Photo} from "../../models/photo";
import {PhotoService} from "../../services/photo.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Title} from "@angular/platform-browser";
import {NgUploaderOptions} from "ngx-uploader";

@Component({
  selector: 'add-photo',
  providers: [PhotoService],
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  private basicOptions: NgUploaderOptions;
  private progress: number = 0;
  private previewData: any;
  private imageSelected: boolean = false;
  private fileName: string;
  private photo: Photo = new Photo();
  private input: any;
  private response: any;

  private properties: ApplicationProperties = new ApplicationProperties();
  private sizeLimit: number = 7000000;


  constructor(@Inject(NgZone) private zone: NgZone, private userService: UserService, private photoService: PhotoService, private router: Router, private title: Title) {
    this.title.setTitle("Add photo");
  }

  ngOnInit(): void {
    this.basicOptions = new NgUploaderOptions({
      url: this.properties.uploadImageUrl,
      filterExtensions: true,
      allowedExtensions: ['jpg', 'png'],
      previewUrl: true,
      autoUpload: true
    });
  }

  handleUpload(data: any): void {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.fileName = data.response;
          console.log(this.fileName);
          this.imageSelected = true;
          this.progress = data.progress.percent;
          this.photo.fileName = this.fileName;
        }
      });
    });
  }

  beforeUpload(data: any): void {
    if (data.size > this.sizeLimit) {
      data.setAbort();
      alert('File is too large, max size = 7 MB');
    }
  }

  handlePreviewData(data: any) {
    this.previewData = data;
  }

  onSubmit() {
    this.userService.getUserByUsername(this.properties.usernameFromLocalStorage).subscribe(user => {
      this.photo.user = user;
      this.photoService.add(this.photo).subscribe(() => {
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
      this.input = null;
    });
  }
}
