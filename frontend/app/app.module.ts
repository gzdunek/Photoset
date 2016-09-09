import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {routing} from "./app.routing";
import {HomeComponent} from "./components/home/home.component";
import {HttpModule} from "@angular/http";
@NgModule({
    imports: [BrowserModule, routing, HttpModule],
    declarations: [AppComponent, NavbarComponent, HomeComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}