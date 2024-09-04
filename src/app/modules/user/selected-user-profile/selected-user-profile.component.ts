import {Component, Inject, OnInit} from '@angular/core';
import {Users} from "../services/interface/Users";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'selected-user-profile',
    template: `
        <div class="container mx-auto max-w-screen-lg p-4">
            <div class="bg-neutral-800 h-20 relative rounded-t-lg  shadow-lg">
                <div class="absolute bottom-0 left-6 transform translate-y-1/2">
                    <div class="w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg">
                        <img [src]="user.profilePic" alt="User Profile Picture" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
            <div class="bg-gray-950 rounded-b-lg shadow-lg border-t border-neutral-700 p-6">
                <div class="text-center mt-16">
                    <div class="flex flex-col items-center">
                        <p class="text-white text-3xl font-bold">{{ user.name }}</p>
                        <p class="text-md text-neutral-500">{{ user.email }}</p>
                    </div>
                    <div class="mt-4">
                        <p class="text-white text-sm">{{ user.bio }}</p>
                    </div>
                    <div class="mt-6 flex justify-center space-x-4">
                        <button
                            [ngClass]="{'bg-blue-500 hover:bg-blue-600': !isConnected,'bg-green-500 hover:bg-green-600': isConnected}"
                            class="text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            (click)="toggleConnection()">
                            {{ isConnected ? 'Connected' : 'Connect' }}
                        </button>
                        <!--                <button class="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg">-->
                        <!--                    Message-->
                        <!--                </button>-->
                    </div>
                </div>
            </div>

        </div>
    `
})
export class SelectedUserProfileComponent implements OnInit {

    user: Users;

    isConnected: boolean = false;

    constructor(public dialogRef: MatDialogRef<SelectedUserProfileComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Users) {
        this.user = data;
    }

    ngOnInit(): void {
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    toggleConnection() {
        this.isConnected = !this.isConnected;
    }

}
