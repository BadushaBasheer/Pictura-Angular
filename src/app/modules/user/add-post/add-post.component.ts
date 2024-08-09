import {Component} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {PostService} from "../services/controller/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
})
export class AddPostComponent {

    imageChangedEvent: Event | null = null;
    croppedImage: SafeUrl = '';
    croppedBlob: Blob | null | undefined = null;
    caption: string = '';

    constructor(private sanitizer: DomSanitizer, private postService: PostService, private snackBar: MatSnackBar) {}

    fileChangeEvent(event: Event): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent): void {
        if (event.objectUrl) {
            this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
        }
        this.croppedBlob = event.blob; // Save the cropped blob
    }

    imageLoaded(): void {
        // this.snackBar.open("Image Uploaded successfully",'Close', {duration: 50000})
    }

    cropperReady(): void {
        // this.snackBar.open("Cropper is ready",'Close', {duration: 500})
    }

    loadImageFailed(): void {
        // this.snackBar.open("Failed to load Image",'Close', {duration: 500})
    }

    uploadImage(): void {
        if (this.croppedBlob && this.caption) {
            const file = new File([this.croppedBlob], 'cropped-image.png', { type: 'image/png' });
            this.postService.createPost(file, this.caption).subscribe({
                next: (response) => {
                    console.log('Image uploaded successfully:', response);
                    this.snackBar.open("Image uploaded successfully",'Close', {duration: 5000})
                },
                error: (error) => {
                    console.error('Error uploading image:', error);
                    this.snackBar.open("An error occur uploading image",'Close', {duration: 5000})
                }
            });
        } else {
            console.error('Cropped image or caption is missing');
            this.snackBar.open("Cropped image or caption is missing",'Close', {duration: 5000})
        }
    }

}
