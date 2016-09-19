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
import {DetailUserComponent} from "./components/detail-user/detail-user.component";
import {FindUsernameInListPipe} from "./pipes/find-username-in-list.pipe";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {SearchComponent} from "./components/search/search.component";
import {PhotoCardComponent} from "./components/photo-card/photo-card.component";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
@NgModule({
    imports: [BrowserModule, routing, HttpModule, FormsModule, AutoCompleteModule, InfiniteScrollModule],
    providers: [UserService, LoggedInGuard, Title],
    declarations: [AppComponent, NavbarComponent, HomeComponent, AddPhotoComponent, UPLOAD_DIRECTIVES, RegisterUserComponent,
        AsyncEmailValidator, EqualValidator, AsyncUsernameValidator, LoginUserComponent, DetailUserComponent,
        FindUsernameInListPipe, SearchComponent, PhotoCardComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}