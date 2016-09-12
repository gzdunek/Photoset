import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {routing} from "./app.routing";
import {HomeComponent} from "./components/home/home.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AddPhotoComponent} from "./components/add-photo/add-photo.component";
import {UPLOAD_DIRECTIVES} from "ng2-uploader/ng2-uploader";
@NgModule({
    imports: [BrowserModule, routing, HttpModule, FormsModule],
    declarations: [AppComponent, NavbarComponent, HomeComponent, AddPhotoComponent, UPLOAD_DIRECTIVES],
    bootstrap: [AppComponent]
})
export class AppModule {
}