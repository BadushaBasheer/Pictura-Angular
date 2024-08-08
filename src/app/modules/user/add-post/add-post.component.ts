// import {Component} from '@angular/core';
// import {MatDialogRef} from "@angular/material/dialog";
//
// @Component({
//     selector: 'app-add-post',
//     templateUrl: './add-post.component.html',
// })
// export class AddPostComponent {
//     imagePreviewUrl: string | ArrayBuffer | null = null;
//
//     constructor(public dialogRef: MatDialogRef<AddPostComponent>) { }
//
//     onClose(): void { this.dialogRef.close(); }
//
//     onFileSelected(event: Event): void {
//         const input = event.target as HTMLInputElement;
//         if (input.files && input.files[0]) {
//             const file = input.files[0];
//             const reader = new FileReader();
//
//             reader.onload = (e: ProgressEvent<FileReader>) => {
//                 // Check if e.target?.result is not undefined
//                 this.imagePreviewUrl = e.target?.result ?? null;
//             };
//
//             reader.readAsDataURL(file);
//         }
//     }
//
//     openFilePicker(): void {
//         const fileInput = document.getElementById('fileInput') as HTMLInputElement;
//         fileInput.click();
//     }
//
//
// }

// import {Component} from '@angular/core';
// import {MatDialogRef} from '@angular/material/dialog';
// import {ImageCroppedEvent, LoadedImage} from 'ngx-image-cropper';
// import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
//
// @Component({
//     selector: 'app-add-post',
//     templateUrl: './add-post.component.html',
// })
// export class AddPostComponent {
//     imagePreviewUrl: SafeUrl | null = null;
//     imageChangedEvent: Event | null = null;
//     croppedTempImage: SafeUrl | null = null;
//     croppedImage: SafeUrl | null = null;
//
//     constructor(
//         public dialogRef: MatDialogRef<AddPostComponent>,
//         private sanitizer: DomSanitizer
//     ) {
//     }
//
//     onClose(): void {
//         this.dialogRef.close();
//     }
//
//     onFileSelected(event: Event): void {
//         this.imageChangedEvent = event;
//         const input = event.target as HTMLInputElement;
//         if (input.files && input.files[0]) {
//             const file = input.files[0];
//             const reader = new FileReader();
//
//             reader.onload = (e: ProgressEvent<FileReader>) => {
//                 this.imagePreviewUrl = e.target?.result ?? null;
//             };
//
//             reader.readAsDataURL(file);
//         }
//     }
//
//     imageCropped(event: ImageCroppedEvent): void {
//         const objectUrl = event.objectUrl;
//         if (objectUrl) {
//             this.croppedTempImage = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
//         } else {
//             console.error('Object URL is undefined or null');
//         }
//     }
//
//     confirmCrop(): void {
//         this.croppedImage = this.croppedTempImage;
//     }
//
//     imageLoaded(image: LoadedImage): void {
//         this.croppedTempImage = image;
//     }
//
//     cropperReady(): void {
//         // Cropper ready
//     }
//
//     loadImageFailed(): void {
//         // Show message
//     }
//
//     openFilePicker(): void {
//         const fileInput = document.getElementById('fileInput') as HTMLInputElement;
//         fileInput.click();
//     }
// }

//
// import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import {PostService} from "../shared/services/post.service";
// import {Posts} from "../interface/Posts";
//
// @Component({
//     selector: 'app-add-post',
//     templateUrl: './add-post.component.html',
// })
// export class AddPostComponent {
//     imageChangedEvent: any = '';
//     croppedImage: any = '';
//     imagePreviewUrl: string | ArrayBuffer | null = null;
//     postContent: string = '';
//     selectedFile: File | null = null;
//
//     constructor(private postService: PostService, private sanitizer: DomSanitizer) {}
//
//     onFileSelected(event: any): void {
//         this.imageChangedEvent = event;
//         const file = event.target.files[0];
//         this.selectedFile = file;
//         const reader = new FileReader();
//         reader.onload = (e) => this.imagePreviewUrl = reader.result;
//         reader.readAsDataURL(file);
//     }
//
//     imageCropped(event: ImageCroppedEvent) {
//         this.croppedImage = event.base64;
//     }
//
//     confirmCrop() {
//         // Handle the confirmation logic for cropping if needed
//     }
//
//     createPost() {
//         if (!this.selectedFile || !this.croppedImage) {
//             console.error('No image selected or cropped');
//             return;
//         }
//
//         const postData = {
//             content: this.postContent
//         };
//
//         const postJson = JSON.stringify(postData);
//         const fileBlob = this.dataURItoBlob(this.croppedImage);
//         const file = new File([fileBlob], this.selectedFile.name, { type: 'image/png' });
//
//         this.postService.createPost(postJson, file).subscribe((response: Posts) => {
//             console.log('Post created successfully', response);
//             // Handle the response, maybe close the dialog or reset the form
//             this.resetForm();
//         }, error => {
//             console.error('Error creating post', error);
//             // Handle the error
//         });
//     }
//
//     openFilePicker() {
//         document.getElementById('fileInput')?.click();
//     }
//
//     onClose() {
//         // Handle the close dialog logic
//     }
//
//     resetForm() {
//         this.imageChangedEvent = '';
//         this.croppedImage = '';
//         this.imagePreviewUrl = null;
//         this.postContent = '';
//         this.selectedFile = null;
//     }
//
//     private dataURItoBlob(dataURI: string): Blob {
//         const byteString = atob(dataURI.split(',')[1]);
//         const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     }
//
//     imageLoaded($event: LoadedImage) {
//
//     }
//
//     cropperReady() {
//
//     }
//
//     loadImageFailed() {
//
//     }
// }

// import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import {PostService} from "../services/controller/post.service";
//
// @Component({
//     selector: 'app-add-post',
//     templateUrl: './add-post.component.html',
// })
// export class AddPostComponent {
//     imagePreviewUrl: SafeUrl | null = null;
//     imageChangedEvent: Event | null = null;
//     croppedTempImage: SafeUrl | null = null;
//     croppedImage: SafeUrl | null = null;
//     postContent: string = '';
//
//     constructor(
//         public dialogRef: MatDialogRef<AddPostComponent>,
//         private sanitizer: DomSanitizer,
//         private postService: PostService
//     ) {}
//
//     onClose(): void {
//         this.dialogRef.close();
//     }
//
//     onFileSelected(event: Event): void {
//         this.imageChangedEvent = event;
//         const input = event.target as HTMLInputElement;
//         if (input.files && input.files[0]) {
//             const file = input.files[0];
//             const reader = new FileReader();
//
//             reader.onload = (e: ProgressEvent<FileReader>) => {
//                 this.imagePreviewUrl = e.target?.result ?? null;
//             };
//
//             reader.readAsDataURL(file);
//         }
//     }
//
//     imageCropped(event: ImageCroppedEvent): void {
//         const objectUrl = event.objectUrl;
//         if (objectUrl) {
//             this.croppedTempImage = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
//         } else {
//             console.error('Object URL is undefined or null');
//         }
//     }
//
//     confirmCrop(): void {
//         this.croppedImage = this.croppedTempImage;
//     }
//
//     imageLoaded(image: LoadedImage): void {
//         this.croppedTempImage = image;
//     }
//
//     cropperReady(): void {
//         // Cropper ready
//     }
//
//     loadImageFailed(): void {
//         // Show message
//     }
//
//     openFilePicker(): void {
//         const fileInput = document.getElementById('fileInput') as HTMLInputElement;
//         fileInput.click();
//     }
//
//     createPost(): void {
//         if (this.postContent && this.croppedImage) {
//             // Convert cropped image to Blob
//             fetch(this.croppedImage as string)
//                 .then(res => res.blob())
//                 .then(blob => {
//                     const file = new File([blob], 'cropped-image.jpg', { type: blob.type });
//                     this.postService.createPost(this.postContent, file).subscribe((response: any) => {
//                         console.log('Post created successfully:', response);
//                         this.dialogRef.close();
//                     }, (error: any) => {
//                         console.error('Error creating post:', error);
//                     });
//                 });
//         } else {
//             console.error('Post content or cropped image is missing');
//         }
//     }
// }

// ^ The above code is the html code with cropping ^

// import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { ImageCroppedEvent } from 'ngx-image-cropper';
// import {PostService} from "../shared/services/post.service";
//
// @Component({
//     selector: 'app-add-post',
//     templateUrl: './add-post.component.html',
// })
// export class AddPostComponent {
//     imagePreviewUrl: SafeUrl | null = null;
//     imageChangedEvent: Event | null = null;
//     croppedTempImage: SafeUrl | null = null;
//     croppedImage: SafeUrl | null = null;
//     postContent: string = ''; // Field for post content
//
//     constructor(
//         public dialogRef: MatDialogRef<AddPostComponent>,
//         private sanitizer: DomSanitizer,
//         private postService: PostService
//     ) {}
//
//     onClose(): void {
//         this.dialogRef.close();
//     }
//
//     onFileSelected(event: Event): void {
//         this.imageChangedEvent = event;
//         const input = event.target as HTMLInputElement;
//         if (input.files && input.files[0]) {
//             const file = input.files[0];
//             const reader = new FileReader();
//
//             reader.onload = (e: ProgressEvent<FileReader>) => {
//                 this.imagePreviewUrl = e.target?.result ?? null;
//             };
//
//             reader.readAsDataURL(file);
//         }
//     }
//
//     imageCropped(event: ImageCroppedEvent): void {
//         const base64 = event.base64;
//         if (base64) {
//             this.croppedTempImage = this.sanitizer.bypassSecurityTrustUrl(base64);
//         } else {
//             console.error('Base64 data is undefined or null');
//         }
//     }
//
//     confirmCrop(): void {
//         this.croppedImage = this.croppedTempImage;
//     }
//
//     imageLoaded(): void {
//         // Image loaded successfully
//     }
//
//     cropperReady(): void {
//         // Cropper ready
//     }
//
//     loadImageFailed(): void {
//         // Show message
//     }
//
//     openFilePicker(): void {
//         const fileInput = document.getElementById('fileInput') as HTMLInputElement;
//         fileInput.click();
//     }
//
//     createPost(): void {
//         if (this.postContent && this.croppedImage) {
//             // Convert base64 data to Blob
//             const base64Data = this.croppedImage.changingThisBreaksApplicationSecurity as string;
//             const blob = this.base64ToBlob(base64Data.split(',')[1], 'image/jpeg');
//
//             const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
//             const formData = new FormData();
//             formData.append('content', this.postContent);
//             formData.append('image', file);
//
//             this.postService.createPost(formData).subscribe(
//                 (response: any) => {
//                     console.log('Post created successfully:', response);
//                     this.dialogRef.close();
//                 },
//                 (error: any) => {
//                     console.error('Error creating post:', error);
//                 }
//             );
//         } else {
//             console.error('Post content or cropped image is missing');
//         }
//     }
//
//     base64ToBlob(base64: string, mime: string): Blob {
//         const byteString = atob(base64);
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mime });
//     }
// }

// import { Component } from '@angular/core';
// import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
// import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
// import { Observable } from 'rxjs';
// import {Posts} from "../services/interface/Posts";
// import {PostService} from "../services/controller/post.service";
// import {MatSnackBar} from "@angular/material/snack-bar";
//
// @Component({
//     selector: 'app-add-post',
//     templateUrl: './add-post.component.html',
// })
// export class AddPostComponent{
//     imageChangedEvent: any = '';
//     croppedImage: any = '';
//     imagePreviewUrl: string | ArrayBuffer | null = null;
//     postContent: string = '';
//     selectedFile: File | null = null;
//     croppedTempImage: SafeUrl | null = null;
//
//     constructor(private postService: PostService, private sanitizer: DomSanitizer,
//                 private snackbar: MatSnackBar) {}
//
//     onFileSelected(event: any): void {
//         this.imageChangedEvent = event;
//         const file = event.target.files[0];
//         if (file) {
//             this.selectedFile = file;
//             const reader = new FileReader();
//             reader.onload = (e) => this.imagePreviewUrl = reader.result;
//             reader.readAsDataURL(file);
//         }
//     }
//
//     imageCropped(event: ImageCroppedEvent) {
//         this.croppedImage = event.base64;
//     }
//
//     imageLoaded(image: LoadedImage) {
//         console.log('Image loaded:', image);
//     }
//
//     cropperReady() {
//         console.log('Cropper ready');
//     }
//
//     loadImageFailed() {
//         console.error('Load image failed');
//     }
//
//     confirmCrop() {
//         this.snackbar.open("Image cropped successfully", 'close',{duration: 300});
//         this.croppedImage = this.croppedTempImage;
//
//     }
//
//     createPost() {
//         if (!this.selectedFile || !this.croppedImage) {
//             console.error('No image selected or cropped');
//             return;
//         }
//
//         const postData = {
//             content: this.postContent
//         };
//
//         const postJson = JSON.stringify(postData);
//         const fileBlob = this.dataURItoBlob(this.croppedImage);
//         const file = new File([fileBlob], this.selectedFile.name, { type: 'image/png' });
//
//         this.postService.createPost(postJson, file).subscribe((response: Posts) => {
//             console.log('Post created successfully', response);
//             this.resetForm();
//         }, (error: any) => {
//             console.error('Error creating post', error);
//         });
//     }
//
//     openFilePicker() {
//         document.getElementById('fileInput')?.click();
//     }
//
//     onClose() {
//         // Handle the close dialog logic
//     }
//
//     resetForm() {
//         this.imageChangedEvent = '';
//         this.croppedImage = '';
//         this.imagePreviewUrl = null;
//         this.postContent = '';
//         this.selectedFile = null;
//     }
//
//     private dataURItoBlob(dataURI: string): Blob {
//         const byteString = atob(dataURI.split(',')[1]);
//         const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     }
// }


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
