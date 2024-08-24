import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Posts} from "../services/interface/Posts";
import {PostService} from "../services/controller/post.service";
import {StorageService} from "../../../auth/components/services/storage/storage.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

    posts: Posts[] = [];

    isBookmarked: boolean = false;

    isLiked: boolean = false;

    constructor(private postService: PostService, private cdr: ChangeDetectorRef) { }


    ngOnInit(): void {
        this.fetchPosts();
        this.cdr.detectChanges();
    }

    fetchPosts(): void {
        this.postService.findAllPosts().subscribe((posts: Posts[]) => {
            this.posts = posts;
        });
    }

    toggleBookmark() {
        this.isBookmarked = !this.isBookmarked;
    }

    likePost(postId: number): void {
        const userId = StorageService.getUserId();
        if (userId) {
            this.postService.likePostById(postId, userId).subscribe({
                next: (updatedPost: Posts) => {
                    const index = this.posts.findIndex(post => post.id === postId);
                    if (index !== -1) {
                        this.posts[index] = updatedPost;
                        this.isLiked = this.isPostLikedByUser(userId);
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

    isPostLikedByUser(post: Posts): boolean {
        const userId = StorageService.getUserId();
        return post.liked.includes(userId);
    }



}
