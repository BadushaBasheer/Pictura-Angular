import {ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Posts} from "../services/interface/Posts";
import {PostService} from "../services/controller/post.service";
import {StorageService} from "../../../auth/components/services/storage/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../services/controller/user.service";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

    selectedUserProfile: any;

    posts: Posts[] = [];

    isBookmarked: boolean = false;

    isLiked: boolean = false;

    protected readonly loggedInUserId = StorageService.getUserId()


    constructor(private postService: PostService,
                private cdr: ChangeDetectorRef,
                private snackBar: MatSnackBar,
                private userService: UserService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.fetchPosts();
        this.cdr.detectChanges();
    }

    fetchPosts(): void {
        this.postService.findAllPosts().subscribe((posts: Posts[]) => {
            this.posts = posts;
        });
    }

    // toggleBookmark() {
    //     this.isBookmarked = !this.isBookmarked;
    // }


    // likePost(postId: number): void {
    //     const userId = StorageService.getUserId();
    //     if (userId) {
    //         this.postService.likePostById(postId, userId).subscribe({
    //             next: (updatedPost: Posts) => {
    //                 console.log("came herer........")
    //                 const index = this.posts.findIndex(post => post.id === postId);
    //                 if (index !== -1) {
    //                     this.posts[index] = updatedPost;
    //                     this.isLiked = this.isPostLikedByUser(userId);
    //                     console.log("Button clicked",this.isLiked )
    //                 }
    //             },
    //             error: (error) => {
    //                 console.error('Error liking post:', error);
    //             }
    //         });
    //     } else {
    //         console.error('User is not logged in or user ID is not available');
    //     }
    // }
    //
    // isPostLikedByUser(post: Posts): boolean {
    //     const userId = StorageService.getUserId();
    //     return Array.isArray(post.liked) && post.liked.some(user => user.id === userId);
    // }

    // likePost(postId: number): void {
    //     this.postService.likePostById(postId).subscribe({
    //         next: (updatedPost: Posts) => {
    //             const index = this.posts.findIndex(post => post.id === postId);
    //             if (index !== -1) {
    //                 this.posts[index] = updatedPost;
    //                 this.isLiked = this.isPostLikedByUser(updatedPost);
    //                 console.log("Post liked status updated:", this.isLiked);
    //             }
    //         },
    //         error: (error) => {
    //             console.error('Error liking post:', error);
    //         }
    //     });
    // }
    //
    // isPostLikedByUser(post: Posts): boolean {
    //     const userId = StorageService.getUserId(); // Local check to verify if the post is liked
    //     return Array.isArray(post.liked) && post.liked.some(user => user.id === userId);
    // }

    likePost(postId: number): void {
        this.postService.likePostById(postId).subscribe({
            next: (updatedPost: Posts) => {
                const index = this.posts.findIndex(post => post.id === postId);
                if (index !== -1) {
                    this.posts[index] = updatedPost;
                    this.isLiked = this.isPostLikedByUser(updatedPost);
                    this.cdr.detectChanges();
                    console.log("Post updated:", updatedPost);
                }
            },
            error: (error) => {
                console.error('Error liking post:', error);
            }
        });
    }

    isPostLikedByUser(post: Posts): boolean {
        const userId = StorageService.getUserId();
        return Array.isArray(post.liked) && post.liked.some(user => user.id === userId);
    }



    onDeletePost(postId: number): void {
        const userId = StorageService.getUserId();
        const post = this.posts.find(post => post.id === postId);

        if (post && post.user.id === userId) {
            this.postService.deletePost(postId).pipe(
                catchError(error => {
                    this.snackBar.open("Error deleting post", "Close", {duration: 5000})
                    console.error('Error deleting post:', error);
                    return of(void 0);
                })
            ).subscribe(() => {
                this.posts = this.posts.filter(post => post.id !== postId);
                this.snackBar.open("Post deleted successfully", "Close", {duration: 5000})
                this.dialog.closeAll();
                console.log('Post deleted successfully');
            });
        } else {
            this.snackBar.open("User is not authorized to delete this post", "Close", {duration: 5000})
            console.error('User is not authorized to delete this post');
        }
    }


    openDialog(templateRef: TemplateRef<any>) {
        let dialogRef = this.dialog.open(templateRef, {
            width: '300px'
        });
    }

    onCancel(): void {
        this.dialog.closeAll();
    }

    postOwnerProfile(id: number) {
        // this.userService.getUserById(id).pipe((response) => {
        //     console.log(response);
        //     this.selectedUserProfile = response;
        // }, (error) => {
        //     console.error('Error fetching user profile:', error);
        // });
    }


    private destroy$ = new Subject<void>();

    toggleBookmark(postId: number) {
        this.isBookmarked = !this.isBookmarked;
        if (this.isBookmarked) {
            this.savePost(postId);
        } else {
            this.snackBar.open("Unsaved", "Close", { duration: 5000 });
        }
    }

    savePost(postId: number) {
        console.log("Post id is:", postId)
        this.postService.savePostById(postId).pipe(
            catchError(error => {
                this.snackBar.open("Error saving post", "Close", { duration: 5000 });
                console.error('Error saving post:', error);
                return of(null); // Handle error scenario
            })
        ).subscribe(response => {
            if (response) {
                this.snackBar.open("Post saved successfully", "Close", { duration: 5000 });
                console.log(response);
            }
        });
    }

    reportUser(id: number) {
        this.userService.blockUser(id).pipe(
            catchError((error) => {
                console.error('Error blocking user:', error);
                this.snackBar.open("Failed to block user. Please try again.", "close", { duration: 5000 });
                return of(null);
            })
        ).subscribe((response) => {
            if (response) {
                this.snackBar.open("User blocked successfully", "close", { duration: 5000 });
                console.log(response);
            }
        });
    }

}
