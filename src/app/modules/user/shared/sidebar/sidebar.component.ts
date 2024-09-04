import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../auth/components/services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Users} from "../../services/interface/Users";
import {UserService} from "../../services/controller/user.service";
import {LogoutComponent} from "../common/logout.component";
import {StorageService} from "../../../../auth/components/services/storage/storage.service";
import {MiniSideBarItems} from "../../services/interface/MiniSideBarItems";
import {SideBarItems} from "../../services/interface/SideBarItems";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

    profilePic!: string;
    userName!: string;

    userProfileAvailable: boolean = false;


    ngOnInit(): void {
        this.userService.getAuthenticatedUser().subscribe((data: Users) => {
            this.profilePic = data.profilePic;
            this.userName = data.name;
            this.userProfileAvailable = !!data;

        });
    }

    selectedRoute: string = '/user';

    items: Array<SideBarItems> = [
        {
            label: 'Home',
            route: '/user',
            icon: 'home',
        },
        {
            label: 'Search',
            route: 'search',
            icon: 'search'
        },
        {
            label: 'Messages',
            route: 'messages',
            icon: 'message'
        },
        {
            label: 'Notifications',
            route: 'notification',
            icon: 'notifications',
        },
        {
            label: 'Saved',
            route: 'saved-post',
            icon: 'bookmark_border'
        }

    ]

    miniSideBarItems: Array<MiniSideBarItems> =[
        {
            label: 'Setting',
            route: 'settings',
            icon: 'settings',
        },
        {
            label: 'Logout',
            route: '/logout',
            icon: 'logout',

        },
    ]

    constructor(
        public auth: AuthService,
        private dialog: MatDialog,
        private userService: UserService) {
    }

    selectRoute(route: any): void {
        this.selectedRoute = route;
    }


    logoutConfirmModal() {
        const modal = this.dialog.open(LogoutComponent)
        modal.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    protected readonly StorageService = StorageService;
}
