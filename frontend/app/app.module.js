"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./components/navbar/navbar.component");
var app_routing_1 = require("./app.routing");
var home_component_1 = require("./components/home/home.component");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var add_photo_component_1 = require("./components/add-photo/add-photo.component");
var ng2_uploader_1 = require("ng2-uploader/ng2-uploader");
var register_user_component_1 = require("./components/register-user/register-user.component");
var async_email_validator_1 = require("./validators/async-email.validator");
var async_username_validator_1 = require("./validators/async-username.validator");
var login_user_component_1 = require("./components/login-user/login-user.component");
var user_service_1 = require("./services/user.service");
var logged_in_guard_1 = require("./guards/logged-in.guard");
var equal_validator_1 = require("./validators/equal.validator");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, forms_1.FormsModule],
            providers: [user_service_1.UserService, logged_in_guard_1.LoggedInGuard],
            declarations: [app_component_1.AppComponent, navbar_component_1.NavbarComponent, home_component_1.HomeComponent, add_photo_component_1.AddPhotoComponent, ng2_uploader_1.UPLOAD_DIRECTIVES, register_user_component_1.RegisterUserComponent,
                async_email_validator_1.AsyncEmailValidator, equal_validator_1.EqualValidator, async_username_validator_1.AsyncUsernameValidator, login_user_component_1.LoginUserComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map