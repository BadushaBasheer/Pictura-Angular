import {Component, OnInit} from '@angular/core';
import {Posts} from "../services/interface/Posts";
import {PostService} from "../services/controller/post.service";
import {StorageService} from "../../../auth/components/services/storage/storage.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

    posts: Posts[] = [];

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
        this.fetchPosts();
    }

    fetchPosts(): void {
        this.postService.findAllPosts().subscribe((posts: Posts[]) => {
            this.posts = posts;
        });
    }


    likePost(postId: number): void {
        const userId = StorageService.getUserId();
        if (userId) {
            this.postService.likePostById(postId, userId).subscribe({
                next: (updatedPost: Posts) => {
                    const index = this.posts.findIndex(post => post.id === postId);
                    if (index !== -1) {
                        this.posts[index] = updatedPost;
                    }
                },
                error: (error) => {
                    console.error('Error liking post:', error);
                }
            });
        } else {
            console.error('User is not logged in or user ID is not available');
        }
    }


}
