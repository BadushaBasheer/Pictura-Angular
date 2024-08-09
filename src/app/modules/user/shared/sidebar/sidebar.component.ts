import {Component, OnInit} from '@angular/core';
import {SideBarItems} from "../../services/interface";
import {AuthService} from "../../../../auth/components/services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Users} from "../../services/interface/Users";
import {UserService} from "../../services/controller/user.service";
import {LogoutComponent} from "../logout.component";
import {StorageService} from "../../../../auth/components/services/storage/storage.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

    userName: string | undefined;

    userProfileAvailable: boolean = false;


    ngOnInit(): void {
        this.userService.getAuthenticatedUser().subscribe((data: Users) => {
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
            label: 'Search',
            route: 'search',
            icon: 'search'
        }
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
