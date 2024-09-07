import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {PostService} from '../services/controller/post.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'edit-post',
    templateUrl: './edit-post.component.html',
})
export class EditPostComponent implements OnInit {

    imageChangedEvent: Event | null = null;
    croppedImage: SafeUrl = '';
    croppedBlob: Blob | null | undefined = null;
    caption: string = '';
    existingImageUrl: SafeUrl = '';
    imageSelected: boolean = false;
    loading: boolean = false;
    postId: number = 0;

    constructor(
        private sanitizer: DomSanitizer,
        private postService: PostService,
        private snackBar: MatSnackBar,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: { postId: number }) {
    }

    ngOnInit(): void {
        console.log("Edit post id =>", this.data.postId)
        this.postId = this.data.postId;
        this.loadPostData();
    }

    loadPostData(): void {
        this.postService.findPostById(this.postId).subscribe({
            next: (post) => {
                this.caption = post.caption;
                this.existingImageUrl = this.sanitizer.bypassSecurityTrustUrl(post.image.url);
            },
            error: (error) => {
                console.error('Error loading post data:', error);
                this.snackBar.open('An error occurred while loading the post', 'Close', {duration: 5000});
            }
        });
    }

    fileChangeEvent(event: Event): void {
        this.imageChangedEvent = event;
        this.imageSelected = true;
        this.existingImageUrl = '';
    }

    imageCropped(event: ImageCroppedEvent): void {
        if (event.objectUrl) {
            this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
        }
        this.croppedBlob = event.blob;
    }

    updatePost(): void {
        if (!this.caption.trim()) {
            this.snackBar.open('Caption cannot be empty', 'Close', {duration: 5000});
            return;
        }
        this.loading = true;
        const file = this.croppedBlob ? new File([this.croppedBlob], 'cropped-image.png', {type: 'image/png'}) : null;
        this.postService.editPost(this.postId, file, this.caption).subscribe({
            next: (response: any) => {
                console.log('Post updated successfully:', response);
                this.snackBar.open('Post updated successfully', 'Close', {duration: 5000});
                this.router.navigate([this.router.url]).then(() => {
                    window.location.reload();
                });
            },
            error: (error: any) => {
                console.error('Error updating post:', error);
                this.snackBar.open('An error occurred while updating the post', 'Close', {duration: 5000});
            },
            complete: () => {
                this.loading = false;

            }
        });
    }

    // resetForm(): void {
    //     this.imageChangedEvent = null;
    //     this.croppedImage = '';
    //     this.croppedBlob = null;
    //     this.caption = '';
    //     this.loadPostData();
    // }

    resetForm(): void {
        this.imageChangedEvent = null;
        this.croppedImage = '';
        this.croppedBlob = null;
        this.imageSelected = false;
        this.loadPostData();
    }

    triggerFileUpload(): void {
        const uploadInput = document.getElementById('uploadNewImage') as HTMLInputElement;
        if (uploadInput) {
            uploadInput.click();
        }
    }


}
