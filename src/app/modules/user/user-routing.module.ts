import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {NotificationComponent} from "./notification/notification.component";
import {PostsComponent} from "./posts/posts.component";
import {MessagesComponent} from "./messages/messages.component";
import {roleGuard} from "../../auth/components/services/guard/role.guard";
import {SearchComponent} from "./shared/search.component";
import {FollowBarComponent} from "./shared/follow-bar.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [roleGuard], data: {roles: ['USER']},
        children: [
            {path: '', component: PostsComponent, data: {title: 'Home'}},
            {path: 'profile', component: UserProfileComponent, data: {title: 'Profile'}},
            {path: 'search', component: SearchComponent, data: {title: 'Search'}},
            { path: 'follow-bar', component: FollowBarComponent },
            {path: 'user/:id', component: UserProfileComponent},
            {path: 'notification', component: NotificationComponent, data: {title: 'Notification'}},
            {path: 'messages', component: MessagesComponent, data: {title: 'Messages'}},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
