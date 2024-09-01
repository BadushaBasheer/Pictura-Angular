import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserBlock} from "../../services/interfaces/user-block";
import {AdminService} from "../../services/admin.service";

@Component({
    selector: 'app-user-reports',
    templateUrl: './user-reports.component.html'
})
export class UserReportsComponent implements OnInit {
    displayedColumns: string[] = ['blocker', 'blocked', 'blockedDate'];
    dataSource!: MatTableDataSource<UserBlock>;
    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.loadAllUserBlocks();

    }

    loadAllUserBlocks(): void {
        this.adminService.getAllUserBlocks().subscribe(
            (userBlocks: UserBlock[]) => {
                console.log(userBlocks);
                this.dataSource = new MatTableDataSource(userBlocks);
            },
            (error) => {
                console.error('Error fetching user blocks', error);
            }
        );
    }
}
