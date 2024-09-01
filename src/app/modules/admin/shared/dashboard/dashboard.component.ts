import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {AdminService} from "../../services/admin.service";

declare const google: any;

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    isSmallScreen!: boolean;
    userCount: number | undefined;
    postsCount: number | undefined;
    blockedAccountsCount: number | undefined;


    constructor(private breakpointObserver: BreakpointObserver,
                private adminService: AdminService) {
        this.breakpointObserver.observe([
            Breakpoints.Handset
        ]).subscribe(result => {
            this.isSmallScreen = result.matches;
        });
    }

    loadUserCount(): void {
        this.adminService.getAllUserCount().subscribe(
            (count: number) => {
                console.log("Count",count)
                this.userCount = count;
            },
            (error) => {
                console.error('Error fetching user count:', error);
            }
        );
    }


    loadPostCount(): void {
        this.adminService.getAllPostsCount().subscribe(
            (count: number) => {
                this.postsCount = count;
            },
            (error) => {
                console.error('Error fetching posts count:', error);
            }
        );
    }

    loadBlockedCount(): void {
        this.adminService.getAllBlockedAccountsCount().subscribe(
            (count: number) => {
                this.blockedAccountsCount = count;
            },
            (error) => {
                console.error('Error fetching blocked accounts count:', error);
            }
        );
    }

    ngOnInit() {
        this.loadUserCount();
        this.loadBlockedCount();
        this.loadPostCount()
    }


}
