import {Component, OnInit} from '@angular/core';
import {Posts} from "../services/interface/Posts";
import {PostService} from "../services/controller/post.service";
import {UserService} from "../services/controller/user.service";

@Component({
  selector: 'user-post-listing',
  templateUrl: './user-post-listing.component.html'
})
export class UserPostListingComponent implements OnInit {
    posts: Posts[] = [];

    constructor(private postsService: PostService, private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getAuthenticatedUser().subscribe(user => {
            this.postsService.findUsersPost(user.id).subscribe(posts => {
                this.posts = posts;
            });
        });
    }
}
