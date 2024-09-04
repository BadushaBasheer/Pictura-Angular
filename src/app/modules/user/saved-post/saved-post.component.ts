import {Component, OnInit} from '@angular/core';
import {Posts} from "../services/interface/Posts";
import {PostService} from "../services/controller/post.service";
import {MatDialog} from "@angular/material/dialog";
import {ViewPostComponent} from "../view-post/view-post.component";

@Component({
  selector: 'saved-post',
  templateUrl: './saved-post.component.html'
})
export class SavedPostComponent  implements OnInit {

    posts: Posts[] = [];

    constructor(private postsService: PostService, private dialog: MatDialog) {}


    ngOnInit(): void {
        this.postsService.findAllSavedPosts().subscribe(posts => {
            this.posts = posts;
        });
    }

    openPostDetail(post: any) {
        this.dialog.open(ViewPostComponent,{
            data: post,
        });
    }
}

