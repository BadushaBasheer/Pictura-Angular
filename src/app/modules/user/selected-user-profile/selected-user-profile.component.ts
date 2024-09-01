import {Component, inject, OnInit} from '@angular/core';
import {Users} from "../services/interface/Users";
import {UserService} from "../services/controller/user.service";
import {tap} from "rxjs/operators";
import {SharedService} from "../services/shared-service/shared.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-selected-user-profile',
  templateUrl: './selected-user-profile.component.html'
})
export class SelectedUserProfileComponent implements OnInit{

    // selectedUser: Users | null = null;
    //
    // userService = inject(UserService)
    //
    // ngOnInit() {
    //     this.userService.OnUserDetailsClicked.subscribe((data: Users)=>{
    //         this.selectedUser = data;
    //         console.log("Response", data)
    //     })
    // }
    //

    userId: number | null = null;
    user: any = null;

    constructor(private route: ActivatedRoute, private userService: UserService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.userId = Number(params.get('userId'));
            console.log(this.userId)
            if (this.userId) {
                this.userService.getUserById(this.userId).subscribe(user => {
                    this.user = user;
                });
            }
        });
    }

    // constructor(private sharedService: SharedService,
    //             private userService: UserService) { }



    // ngOnInit(): void {
    //     this.selectedUser = this.sharedService.getSelectedUser();
    //     console.log('Selected user details:', this.selectedUser);
    // }
        // const userId = this.sharedService.getSelectedUser();
        // console.log("This is from my selected user",userId)
        // this.sharedService.selectedUser.subscribe({
        //     next: user => {
        //         if (user) {
        //             console.log('Received user:', user);
        //             console.log('User ID:', user.id);
        //             this.selectedUser = user;
        //             this.loadSelectedUserDetails(user.id);
        //         }
        //     },
        //     error: err => {
        //         console.error('Error subscribing to user details', err);
        //     }
        // });

    // }


    // loadSelectedUserDetails(userId: number) {
    //     console.log(`Loading details for user ID: ${userId}`);
    //     this.userService.getUserById(userId).pipe(
    //         tap(response => {
    //             console.log('User details response:', response);
    //         })
    //     ).subscribe({
    //         error: err => {
    //             console.error('Error loading user details', err);
    //         }
    //     });
    // }



}
