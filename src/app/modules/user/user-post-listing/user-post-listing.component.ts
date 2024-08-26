import {Component, OnInit} from '@angular/core';
import {Posts} from "../services/interface/Posts";
import {PostService} from "../services/controller/post.service";
import {UserService} from "../services/controller/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ViewPostComponent} from "../view-post/view-post.component";

@Component({
  selector: 'user-post-listing',
  templateUrl: './user-post-listing.component.html'
})
export class UserPostListingComponent implements OnInit {
    posts: Posts[] = [];

    constructor(private postsService: PostService, private dialog: MatDialog) {}


    ngOnInit(): void {
            this.postsService.findAuthenticatedUserPosts().subscribe(posts => {
                this.posts = posts;
            });
    }

    openPostDetail(post: any) {
        this.dialog.open(ViewPostComponent,{
            data: post,
        });
    }

}
