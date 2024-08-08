import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from "../../services/admin.service";
import { Users } from "../../services/users";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, of } from "rxjs";

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, AfterViewInit {

    dataSource: MatTableDataSource<Users> = new MatTableDataSource<Users>();
    displayedColumns: string[] = ["id", "name", "email", "createdDate", "blocked"];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private adminService: AdminService,
        private changeDetector: ChangeDetectorRef,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    private loadUsers(): void {
        this.adminService.getAllUsers().pipe(
            catchError(error => {
                console.error(error);
                this.snackBar.open('Failed to load users', 'Close', {
                    duration: 3000,
                });
                return of([]); // Return an empty array in case of error
            })
        ).subscribe((res: Users[]) => {
            this.dataSource.data = res;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.changeDetector.detectChanges();
        });
    }

    blockUser(id: number, element: any) {
        this.adminService.blockUserByAdmin(id).subscribe({
            next: () => {
                this.snackBar.open('Blocked successfully', 'Close', { duration: 1000 });
                console.log(`User ${id} blocked successfully.`);
                element.is_blocked_by_admin = false;
                },
            error: (err) => {
                console.error('Error blocking user:', err);
            }
        });
    }

    unblockUser(id: number, element: any) {
        this.adminService.unblockUserByAdmin(id).subscribe({
            next: () => {
                this.snackBar.open('Unblocked successfully', 'Close', { duration: 1000 });
                console.log(`User ${id} unblocked successfully.`);
                element.is_blocked_by_admin = true;
                this.changeDetector.markForCheck(); // Trigger change detection
            },
            error: (err) => {
                console.error('Error unblocking user:', err);
            }
        });
    }
}
