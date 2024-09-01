import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {UserService} from "../services/controller/user.service";
import {Users} from "../services/interface/Users";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../auth/components/services/auth/auth.service";
import {StorageService} from "../../../auth/components/services/storage/storage.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {

    isFollowed: boolean = false;
    followingCount?: number;
    followersCount?: number;
    userName: String | undefined;
    email: String | undefined;
    profileImage: String = '';
    backgroundImage: String = '';
    isUser: boolean = true;
    bio: String | undefined;

    privacyToggle = new FormControl(false); // Default is public (false)
    accountStatus: string = 'Public';

    onToggleChange(isPrivate: boolean): void {
        this.accountStatus = isPrivate ? 'Private' : 'Public';
        this.updateAccountPrivacy(isPrivate);
    }

    updateAccountPrivacy(isPrivate: boolean): void {
        // This function should contain the logic to send the updated privacy
        // status to the backend via a service call.
        console.log('Account privacy updated:', isPrivate ? 'Private' : 'Public');
        // Example: call a service to update user settings
        // this.userService.updatePrivacy(isPrivate).subscribe(response => {
        //   // handle response
        // });
    }

    constructor(private dialog: MatDialog,
                private userService: UserService,
                private formBuilder: FormBuilder
              ) {
    }

    ngOnInit(): void {
        this.getCurrentUserProfileInfo();


    }

    toggleFollow(): void {
        if (StorageService.isUserLoggedIn()) {
            this.isUser = true;  // If user is logged in, they should see "Edit Profile" button.
        } else {
            this.isFollowed = !this.isFollowed;  // Only toggle follow status if it's not the user's profile.
        }
    }


    edit() {
        const modal = this.dialog.open(EditUserComponent)
        modal.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    getCurrentUserProfileInfo(): void {
        this.userService.getMyDetails().subscribe((data: Users) => {
            console.log("image", data.profilePic)
            this.userName = data.name;
            this.email = data.email;
            this.profileImage = data.profilePic;
            this.backgroundImage = data.backgroundImage;
            this.bio = data.bio;
            this.followingCount = data.following.length;
            this.followersCount = data.followers ? data.followers.length : 0;
        });
    }


    showFollowers() {

    }

    showFollowing() {

    }
}
