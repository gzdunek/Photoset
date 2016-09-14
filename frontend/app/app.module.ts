import {NgModule} from "@angular/core";
import {BrowserModule, Title} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {routing} from "./app.routing";
import {HomeComponent} from "./components/home/home.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AddPhotoComponent} from "./components/add-photo/add-photo.component";
import {UPLOAD_DIRECTIVES} from "ng2-uploader/ng2-uploader";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {AsyncEmailValidator} from "./validators/async-email.validator";
import {AsyncUsernameValidator} from "./validators/async-username.validator";
import {LoginUserComponent} from "./components/login-user/login-user.component";
import {UserService} from "./services/user.service";
import {LoggedInGuard} from "./guards/logged-in.guard";
import {EqualValidator} from "./validators/equal.validator";
@NgModule({
    imports: [BrowserModule, routing, HttpModule, FormsModule],
    providers: [UserService, LoggedInGuard, Title],
    declarations: [AppComponent, NavbarComponent, HomeComponent, AddPhotoComponent, UPLOAD_DIRECTIVES, RegisterUserComponent,
        AsyncEmailValidator, EqualValidator, AsyncUsernameValidator, LoginUserComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}