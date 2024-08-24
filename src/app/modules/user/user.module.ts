import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./shared/header.component";
import {FollowBarComponent} from "./shared/follow-bar.component";
import {AvatarComponent} from "./shared/avatar.component";
import {ButtonComponent} from "./shared/button.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {LoaderComponent} from "./shared/loader.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserInterceptor} from "./services/core/user-auth-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {SidebarComponent} from "./shared/sidebar/sidebar.component";
import { PostsComponent } from './posts/posts.component';
import {DemoAngularMaterialModule} from "../../DemoAngularMaterialModule";
import { NotificationComponent } from './notification/notification.component';
import { AddPostComponent } from './add-post/add-post.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { LogoutComponent } from './shared/logout.component';
import { SearchComponent } from './shared/search.component';
import {ImageCropperComponent} from "ngx-image-cropper";
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from "@angular/platform-browser";
import { UserPostListingComponent } from './user-post-listing/user-post-listing.component';
import {MessagesComponent} from "./messages/messages.component";

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FollowBarComponent,
        AvatarComponent,
        ButtonComponent,
        UserProfileComponent,
        LoaderComponent,
        EditUserComponent,
        SidebarComponent,
        PostsComponent,
        NotificationComponent,
        AddPostComponent,
        VideoCallComponent,
        LogoutComponent,
        SearchComponent,
        UserPostListingComponent,
        MessagesComponent
    ],

    imports: [
        CommonModule,
        UserRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        DemoAngularMaterialModule,
        FormsModule,
        ImageCropperComponent,
        HammerModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UserInterceptor,
            multi: true
        },
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig }

    ]
})
export class UserModule { }
