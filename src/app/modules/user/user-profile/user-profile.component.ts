import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {UserService} from "../services/controller/user.service";
import {Users} from "../services/interface/Users";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit{


    followingCount: number | undefined;
    followersCount: number | undefined;
    userName: String | undefined;
    email: String | undefined;
    profileImage: String = '';

    constructor(private dialog: MatDialog, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getAuthenticatedUser().subscribe((data: Users)=>{
            console.log("image", data.profilePic)
            this.userName = data.name;
            this.email = data.email;
            this.profileImage = data.profilePic;
            this.followingCount = data.following.length;
            this.followersCount = data.followers.length;
        })
    }

    toggleFollow() {

    }

    edit() {
        const modal = this.dialog.open(EditUserComponent)
        modal.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}
