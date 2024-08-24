import { Component, Input, OnInit } from '@angular/core';
import {UserService} from "../services/controller/user.service";
import {Users} from "../services/interface/Users";
import {catchError, of} from "rxjs";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html'
})
// export class EditUserComponent implements OnInit {
//
//     user: any = {
//         username: '',
//         bio: '',
//         profilePic: '',
//         backgroundImage: '',
//     };
//
//     constructor(private userService: UserService) {}
//
//     ngOnInit(): void {
//     }
//
//     onFileSelected(event: any, type: string): void {
//         // const file: File = event.target.files[0];
//         // if (file) {
//         //     // Upload file to Cloudinary and get the URL
//         //     this.userService.updateUser(this.user).subscribe((response) => {
//         //         if (type === 'profile') {
//         //             this.user.profilePic = response.secure_url; // Assuming Cloudinary returns secure_url
//         //         } else if (type === 'cover') {
//         //             this.user.backgroundImage = response.secure_url;
//         //         }
//         //     });
//         // }
//     }
//
//     onSubmit(): void {
//         this.userService.updateUser(this.user).subscribe(
//             (response) => {
//                 // Handle successful update
//                 console.log('User updated successfully', response);
//             },
//             (error) => {
//                 // Handle error
//                 console.error('Error updating user', error);
//             }
//         );
//     }
// }

export class EditUserComponent implements OnInit {

    user: any = {
        username: '',
        bio: '',
        profilePic: '',
        backgroundImage: '',
    };

    selectedProfileFile: File | null = null;
    selectedCoverFile: File | null = null;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUserData();
    }

    loadUserData(): void {
        this.userService.getAuthenticatedUser().pipe(
            catchError((error) => {
                console.error('Error loading user data', error);
                return of(null);
            })
        ).subscribe(
            (response: Users | null) => {
                if (response) {
                    this.user = response;
                }
            }
        );
    }

    onFileSelected(event: any, type: string): void {
        const file: File = event.target.files[0];
        if (type === 'profile') {
            this.selectedProfileFile = file;
        } else if (type === 'cover') {
            this.selectedCoverFile = file;
        }
    }

    onSubmit(): void {
        const formData = new FormData();
        formData.append('name', this.user.username);
        formData.append('bio', this.user.bio);

        if (this.selectedProfileFile) {
            formData.append('profilePic', this.selectedProfileFile);
        }

        if (this.selectedCoverFile) {
            formData.append('backgroundImage', this.selectedCoverFile);
        }

        this.userService.updateUser(formData).subscribe(
            (response) => {
                console.log('User updated successfully', response);
            },
            (error) => {
                console.error('Error updating user', error);
            }
        );
    }
}

// export class EditUserComponent implements OnInit {
//
//     user: any = {
//         username: '',
//         bio: '',
//         profilePic: '',
//         backgroundImage: '',
//     };
//
//     selectedProfileFile: File | null = null;
//     selectedCoverFile: File | null = null;
//     imageChangedEvent: any = '';
//     croppedImage: any = '';
//
//     showProfileCropper = false;
//     showCoverCropper = false;
//
//     constructor(private userService: UserService) {}
//
//     ngOnInit(): void {
//         this.loadUserData();
//     }
//
//     loadUserData(): void {
//         this.userService.getAuthenticatedUser().pipe(
//             catchError((error) => {
//                 console.error('Error loading user data', error);
//                 return of(null);
//             })
//         ).subscribe(
//             (response: any) => {
//                 if (response) {
//                     this.user = response;
//                 }
//             }
//         );
//     }
//
//     onFileSelected(event: any, type: string): void {
//         const file: File = event.target.files[0];
//         this.imageChangedEvent = event;
//
//         if (type === 'profile') {
//             this.selectedProfileFile = file;
//             this.showProfileCropper = true;
//         } else if (type === 'cover') {
//             this.selectedCoverFile = file;
//             this.showCoverCropper = true;
//         }
//     }
//
//     imageCropped(event: ImageCroppedEvent, type: string): void {
//         this.croppedImage = event.base64;
//
//         if (type === 'profile') {
//             this.user.profilePic = this.croppedImage;
//         } else if (type === 'cover') {
//             this.user.backgroundImage = this.croppedImage;
//         }
//     }
//
//     cropImage(type: string): void {
//         if (type === 'profile') {
//             this.showProfileCropper = false;
//         } else if (type === 'cover') {
//             this.showCoverCropper = false;
//         }
//     }
//
//     cancelCrop(type: string): void {
//         if (type === 'profile') {
//             this.showProfileCropper = false;
//         } else if (type === 'cover') {
//             this.showCoverCropper = false;
//         }
//     }
//
//     imageLoaded(): void {
//         // Show cropper when image is loaded
//     }
//
//     cropperReady(): void {
//         // Cropper ready
//     }
//
//     loadImageFailed(): void {
//         console.error('Load image failed');
//     }
//
//     onSubmit(): void {
//         const formData = new FormData();
//         formData.append('name', this.user.username);
//         formData.append('bio', this.user.bio);
//
//         if (this.selectedProfileFile) {
//             formData.append('profilePic', this.dataURLtoFile(this.user.profilePic, 'profilePic.png'));
//         }
//
//         if (this.selectedCoverFile) {
//             formData.append('backgroundImage', this.dataURLtoFile(this.user.backgroundImage, 'backgroundImage.png'));
//         }
//
//         this.userService.updateUser(formData).subscribe(
//             (response) => {
//                 console.log('User updated successfully', response);
//             },
//             (error) => {
//                 console.error('Error updating user', error);
//             }
//         );
//     }
//
//     private dataURLtoFile(dataUrl: string, filename: string): File {
//         const arr = dataUrl.split(',');
//         const mimeMatch = arr[0].match(/:(.*?);/);
//
//         if (!mimeMatch) {
//             throw new Error('Invalid data URL'); // or handle the error as needed
//         }
//
//         const mime = mimeMatch[1];
//         const bstr = atob(arr[1]);
//         let n = bstr.length;
//         const u8arr = new Uint8Array(n);
//         while (n--) {
//             u8arr[n] = bstr.charCodeAt(n);
//         }
//         return new File([u8arr], filename, { type: mime });
//     }
//
// }


// export class EditUserComponent implements OnInit {
//
//     user: any = {
//         username: '',
//         bio: '',
//         profilePic: '',
//         backgroundImage: '',
//     };
//
//     selectedProfileFile: File | null = null;
//     selectedCoverFile: File | null = null;
//     imageChangedEvent: any = '';
//     showProfileCropper: boolean = false;
//     showCoverCropper: boolean = false;
//     croppedProfileImage: any = '';
//     croppedCoverImage: any = '';
//
//     constructor(private userService: UserService) {}
//
//     ngOnInit(): void {
//         this.loadUserData();
//     }
//
//     loadUserData(): void {
//         this.userService.getAuthenticatedUser().pipe(
//             catchError((error) => {
//                 console.error('Error loading user data', error);
//                 return of(null);
//             })
//         ).subscribe(
//             (response: Users | null) => {
//                 if (response) {
//                     this.user = response;
//                 }
//             }
//         );
//     }
//
//     onFileSelected(event: any, type: string): void {
//         this.imageChangedEvent = event;
//
//         if (type === 'profile') {
//             this.showProfileCropper = true;
//             this.showCoverCropper = false;
//         } else if (type === 'cover') {
//             this.showCoverCropper = true;
//             this.showProfileCropper = false;
//         }
//     }
//
//     imageCropped(event: ImageCroppedEvent, type: string): void {
//         if (type === 'profile') {
//             this.croppedProfileImage = event.base64; // Save cropped profile image
//         } else if (type === 'cover') {
//             this.croppedCoverImage = event.base64; // Save cropped cover image
//         }
//     }
//
//     imageLoaded(): void {
//         // Image loaded in the cropper
//         console.log('Image loaded in the cropper');
//     }
//
//     cropperReady(): void {
//         // Cropper ready
//         console.log('Cropper is ready');
//     }
//
//     loadImageFailed(): void {
//         // Handle image load failure
//         console.error('Failed to load image');
//     }
//
//     onSubmit(): void {
//         const formData = new FormData();
//         formData.append('name', this.user.username);
//         formData.append('bio', this.user.bio);
//
//         if (this.croppedProfileImage) {
//             const blob = this.dataURItoBlob(this.croppedProfileImage);
//             formData.append('profilePic', blob, 'profile.png');
//         }
//
//         if (this.croppedCoverImage) {
//             const blob = this.dataURItoBlob(this.croppedCoverImage);
//             formData.append('backgroundImage', blob, 'cover.png');
//         }
//
//         this.userService.updateUser(formData).subscribe(
//             (response) => {
//                 console.log('User updated successfully', response);
//             },
//             (error) => {
//                 console.error('Error updating user', error);
//             }
//         );
//     }
//
//     dataURItoBlob(dataURI: string): Blob {
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
