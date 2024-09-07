import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./shared/common/header.component";
import {FollowBarComponent} from "./shared/follow-bar/follow-bar.component";
import {AvatarComponent} from "./shared/common/avatar.component";
import {ButtonComponent} from "./shared/common/button.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserInterceptor} from "./services/core/user-auth-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {SidebarComponent} from "./shared/sidebar/sidebar.component";
import {PostsComponent} from './posts/posts.component';
import {DemoAngularMaterialModule} from "../../DemoAngularMaterialModule";
import {NotificationComponent} from './notification/notification.component';
import {AddPostComponent} from './add-post/add-post.component';
import {LogoutComponent} from './shared/common/logout.component';
import {SearchComponent} from './shared/search/search.component';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from "@angular/platform-browser";
import {UserPostListingComponent} from './user-post-listing/user-post-listing.component';
import {ViewPostComponent} from './view-post/view-post.component';
import {UserListModalComponent} from './user-list-modal/user-list-modal.component';
import {SavedPostComponent} from './saved-post/saved-post.component';
import {SelectedUserProfileComponent} from './selected-user-profile/selected-user-profile.component';
import {CustomLoaderComponent} from './shared/loader/custom-loader.component';
import {SettingsComponent} from './settings/settings.component';
import {VideoCallComponent} from "./video-call/video-call.component";
import {MessagesComponent} from "./messages/messages.component";
import {EditPostComponent} from "./edit-post/edit-post.component";
import {MatIconModule} from "@angular/material/icon";
import {ImageCropperComponent} from "ngx-image-cropper";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FollowBarComponent,
        AvatarComponent,
        ButtonComponent,
        UserProfileComponent,
        EditUserComponent,
        SidebarComponent,
        PostsComponent,
        NotificationComponent,
        AddPostComponent,
        LogoutComponent,
        SearchComponent,
        UserPostListingComponent,
        ViewPostComponent,
        UserListModalComponent,
        SavedPostComponent,
        SelectedUserProfileComponent,
        CustomLoaderComponent,
        SettingsComponent,
        VideoCallComponent,
        MessagesComponent,
        EditPostComponent
    ],

    imports: [
        CommonModule,
        UserRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        DemoAngularMaterialModule,
        FormsModule,
        MatIconModule,
        ImageCropperComponent,
        HammerModule,
        InfiniteScrollModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UserInterceptor,
            multi: true
        },
        {provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig}

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class UserModule {
}
