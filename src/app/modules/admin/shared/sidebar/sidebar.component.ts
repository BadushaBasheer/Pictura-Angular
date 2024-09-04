import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../auth/components/services/auth/auth.service";
import {SideBarItems} from "../../services/interfaces/SideBarItems";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

    items: Array<SideBarItems> = [
        {
            label: 'Dashboard',
            route: '/admin/dashboard',
            icon: 'assessment',

        },
        {
            label: 'Users',
            route: '/admin/users',
            icon: 'person'
        },
        {
            label: 'Reports',
            route: '/admin/reports',
            icon: 'report'
        },
    ]

    constructor(private router: Router,
                private snackBar: MatSnackBar,
                private auth: AuthService,
                private location: Location,) { }

    onLogout() {
        this.snackBar.open("Logout successful", "Close", {duration: 500})

        this.auth.logout();
        this.location.replaceState('/login');
        this.router.navigate(['/login']);
    }
}
