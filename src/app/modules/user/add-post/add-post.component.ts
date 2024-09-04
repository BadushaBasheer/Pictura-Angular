import { Component} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {PostService} from "../services/controller/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
})
export class AddPostComponent {

    imageChangedEvent: Event | null = null;
    croppedImage: SafeUrl = '';
    croppedBlob: Blob | null | undefined = null;
    caption: string = '';
    imageSelected: boolean = false;
    loading: boolean = false;

    constructor(private sanitizer: DomSanitizer,
                private postService: PostService,
                private snackBar: MatSnackBar,
                private router: Router) {}

    fileChangeEvent(event: Event): void {
        this.imageChangedEvent = event;
        this.imageSelected = true;
    }

    imageCropped(event: ImageCroppedEvent): void {
        if (event.objectUrl) {
            this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
        }
        this.croppedBlob = event.blob;// Save the cropped blob
    }

    uploadImage(): void {
        this.loading = true;
        if (this.croppedBlob && this.caption) {
            const file = new File([this.croppedBlob], 'cropped-image.png', { type: 'image/png' });
            this.postService.createPost(file, this.caption).subscribe({
                next: (response) => {
                    console.log('Image uploaded successfully:', response);
                    this.snackBar.open("Image uploaded successfully", 'Close', { duration: 5000 });
                    this.router.navigate([this.router.url]).then(() => {
                        window.location.reload();
                    });
                },
                error: (error) => {
                    console.error('Error uploading image:', error);
                    this.snackBar.open("An error occurred while uploading the image", 'Close', { duration: 5000 });
                },
                complete: () => {
                    this.loading = false;
                }
            });
        } else {
            console.error('Cropped image or caption is missing');
            this.snackBar.open("Cropped image or caption is missing", 'Close', { duration: 5000 });
            this.loading = false;
        }
    }


    resetForm(): void {
        this.imageChangedEvent = null;
        this.croppedImage = '';
        this.croppedBlob = null;
        this.caption = '';
    }

}
