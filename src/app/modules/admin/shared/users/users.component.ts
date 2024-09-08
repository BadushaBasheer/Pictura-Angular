// import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { AdminService } from "../../services/admin.service";
// import { Users } from "../../services/users";
// import { MatTableDataSource } from "@angular/material/table";
// import { MatPaginator } from "@angular/material/paginator";
// import { MatSort } from "@angular/material/sort";
// import { MatSnackBar } from "@angular/material/snack-bar";
// import {catchError, Observable, of, Subscription} from "rxjs";
// import {map} from "rxjs/operators";
//
// @Component({
//     selector: 'users',
//     templateUrl: './users.component.html',
// })
// export class UsersComponent implements OnInit, AfterViewInit {
//
//     dataSource: MatTableDataSource<Users> = new MatTableDataSource<Users>();
//     displayedColumns: string[] = ["id", "name", "email", "createdDate", "blocked"];
//
//     @ViewChild(MatPaginator) paginator!: MatPaginator;
//     @ViewChild(MatSort) sort!: MatSort;
//
//     constructor(
//         private adminService: AdminService,
//         private changeDetector: ChangeDetectorRef,
//         private snackBar: MatSnackBar
//     ) {}
//
//     ngOnInit(): void {
//         this.loadUsers();
//     }
//
//     ngAfterViewInit() {
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//     }
//
//     applyFilter(event: Event): void {
//         const filterValue = (event.target as HTMLInputElement).value;
//         this.dataSource.filter = filterValue.trim().toLowerCase();
//
//         if (this.dataSource.paginator) {
//             this.dataSource.paginator.firstPage();
//         }
//     }
//
//     private loadUsers(): void {
//         this.adminService.getAllUsers().pipe(
//             catchError(error => {
//                 console.error(error);
//                 this.snackBar.open('Failed to load users', 'Close', {
//                     duration: 3000,
//                 });
//                 return of([]); // Return an empty array in case of error
//             })
//         ).subscribe((res: Users[]) => {
//             this.dataSource.data = res;
//             this.dataSource.paginator = this.paginator;
//             this.dataSource.sort = this.sort;
//             this.changeDetector.detectChanges();
//         });
//     }
//
//     // blockUser(id: number, element: any) {
//     //     this.adminService.blockUserByAdmin(id).subscribe({
//     //         next: () => {
//     //             this.snackBar.open('Blocked successfully', 'Close', { duration: 1000 });
//     //             console.log(`User ${id} blocked successfully.`);
//     //             element.is_blocked_by_admin = false;
//     //             },
//     //         error: (err) => {
//     //             console.error('Error blocking user:', err);
//     //         }
//     //     });
//     // }
//
//     // blockUser(blockedId: number) {
//     //     this.adminService.blockUser(blockedId).pipe(
//     //         map((response: any) => {
//     //             if (response.status) {
//     //                 console.log('User blocked successfully:', response.status);
//     //             } else {
//     //                 console.error('Failed to block user:', response.status);
//     //             }
//     //             return response;
//     //         }),
//     //         catchError(error => {
//     //             console.error('Error occurred:', error);
//     //             return of(null);
//     //         })
//     //     ).subscribe();
//     // }
//     //
//     //
//     //
//     // // unblockUser(id: number, element: any) {
//     // //     this.adminService.unblockUserByAdmin(id).subscribe({
//     // //         next: () => {
//     // //             this.snackBar.open('Unblocked successfully', 'Close', { duration: 1000 });
//     // //             console.log(`User ${id} unblocked successfully.`);
//     // //             element.is_blocked_by_admin = true;
//     // //             this.changeDetector.markForCheck(); // Trigger change detection
//     // //         },
//     // //         error: (err) => {
//     // //             console.error('Error unblocking user:', err);
//     // //         }
//     // //     });
//     // // }
//     //
//     // unblockUser(blockedId: number) {
//     //     this.adminService.unblockUser(blockedId).pipe(
//     //         map((response: any) => {
//     //             if (response.status) {
//     //                 console.log('User unblocked successfully:', response.status);
//     //             } else {
//     //                 console.error('Failed to unblock user:', response.status);
//     //             }
//     //             return response;
//     //         }),
//     //         catchError(error => {
//     //             console.error('Error occurred:', error);
//     //             return of(null);
//     //         })
//     //     ).subscribe();
//     // }
//
//
//     blockUser(blockedId: number) {
//         this.adminService.blockUser(blockedId).pipe(
//             catchError((error) => {
//                 console.error('Error blocking user:', error);
//                 this.snackBar.open('Error occurred while blocking. Please try again.', 'Close', { duration: 2000 });
//                 return of(false); // Return false if error occurs
//             })
//         ).subscribe((response: boolean) => {
//             if (response) {
//                 console.log('User blocked successfully');
//                 this.snackBar.open('Blocked successfully', 'Close', { duration: 1000 });
//             } else {
//                 console.error('Failed to block user');
//             }
//         });
//     }
//     unblockUser(blockedId: number) {
//         this.adminService.unblockUser(blockedId).pipe(
//             catchError((error) => {
//                 console.error('Error unblocking user:', error);
//                 this.snackBar.open('Error occurred while unblocking. Please try again.', 'Close', { duration: 2000 });
//                 return of({ success: false }); // Return a failure response
//             })
//         ).subscribe((response) => {
//             if (response.success) {
//                 console.log("User unblocked status", response.success)
//                 console.log('User unblocked successfully');
//                 this.snackBar.open('Unblocked successfully', 'Close', { duration: 1000 });
//             } else {
//                 console.error('Failed to unblock user');
//             }
//         });
//     }
//
//
//     onToggleChange(row: any) {
//         const newState = !row.is_blocked_by_admin;
//         row.is_blocked_by_admin = newState;
//
//         if (newState) {
//             this.unblockUser(row.id);
//         } else {
//             this.blockUser(row.id);
//         }
//     }
//
//
//
// }
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Users} from "../../services/interfaces/users";
import {AdminService} from "../../services/admin.service";

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, AfterViewInit {

    status!: string;
    isBlocked: boolean = false;

    dataSource: MatTableDataSource<Users> = new MatTableDataSource<Users>();
    displayedColumns: string[] = ["id", "name", "email", "createdDate", "blocked"];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private adminService: AdminService,
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

    //  loadUsers(): void {
    //     this.adminService.getAllUsers().pipe(
    //         catchError(error => {
    //             console.error(error);
    //             this.snackBar.open('Failed to load users', 'Close', {
    //                 duration: 3000,
    //             });
    //             return of([]); // Return an empty array in case of error
    //         })
    //     ).subscribe((res: Users[]) => {
    //         this.dataSource.data = res;
    //         console.log("data get",this.dataSource.data);
    //     });
    // }

    loadUsers(): void {
        this.adminService.getAllUsers().subscribe({
            next: (response: Users[]) => {
                try {
                    response.forEach(user => {
                        user.isBlocked = user.isBlockedByAdmin;
                    });
                    this.dataSource.data = response;
                } catch (error) {
                    console.error('Failed to parse response:', error, response);
                    this.snackBar.open('Invalid response format from server', 'Close', {
                        duration: 5000,
                    });
                }
            },
            error: (error) => {
                console.error('Error fetching details:', error);
                this.snackBar.open('Error fetching user details', 'Close', {
                    duration: 5000,
                });
            }
        });
    }


    // blockUser(blockedId: number) {
    //     this.adminService.blockUserByAdmin(blockedId).pipe(
    //         catchError((error) => {
    //             console.error('Error blocking user:', error);
    //             this.snackBar.open('Error occurred while blocking. Please try again.', 'Close', { duration: 2000 });
    //             return of(false); // Return a fallback value
    //         })
    //     ).subscribe({
    //         next: () => {
    //             this.snackBar.open('User blocked successfully', 'Close', { duration: 2000 });
    //         },
    //         error: (error) => {
    //             console.error('Unexpected error blocking user:', error);
    //         }
    //     });
    // }
    //
    // // Method to unblock a user
    // unblockUser(blockedId: number) {
    //     this.adminService.unblockUserByAdmin(blockedId).pipe(
    //         catchError((error) => {
    //             console.error('Error unblocking user:', error);
    //             this.snackBar.open('Error occurred while unblocking. Please try again.', 'Close', { duration: 2000 });
    //             return of(false);
    //         })
    //     ).subscribe({
    //         next: () => {
    //             this.snackBar.open('User unblocked successfully', 'Close', { duration: 2000 });
    //         },
    //         error: (error) => {
    //             console.error('Unexpected error unblocking user:', error);
    //         }
    //     });
    // }


    blockUser(userId: number) {
        this.adminService.blockUserByAdmin(userId).subscribe({
            next: (response: string) => {
                console.log('Response from server:', response);
                if (response.includes('User has been blocked by admin.')) {
                    this.snackBar.open('User blocked successfully', 'Close', {
                        duration: 3000,
                    });
                } else {
                    this.snackBar.open('Unexpected response from server', 'Close', {
                        duration: 3000,
                    });
                }
            },
            error: (error) => {
                console.error('Error occurred:', error);
                this.snackBar.open('Error occurred while blocking user', 'Close', {
                    duration: 5000,
                });
            }
        });
    }

    unblockUser(userId: number) {
        this.adminService.unblockUserByAdmin(userId).subscribe({
            next: (response: string) => {
                console.log('Response from server:', response);
                if (response.includes('User has been unblocked by admin.')) {
                    this.snackBar.open('User unblocked successfully', 'Close', {
                        duration: 3000,
                    });
                } else {
                    this.snackBar.open('Unexpected response from server', 'Close', {
                        duration: 3000,
                    });
                }
            },
            error: (error) => {
                console.error('Error occurred:', error);
                this.snackBar.open('Error occurred while unblocking user', 'Close', {
                    duration: 5000,
                });
            }
        });
    }


    onToggleChange(user: Users, isChecked: boolean) {
        if (isChecked) {
            this.unblockUser(user.id);
            user.isBlockedByAdmin = false;
        } else {
            this.blockUser(user.id);
            user.isBlockedByAdmin = true;
        }
    }

}



// blockUser(blockedId: number) {
//      this.adminService.blockUserByAdmin(blockedId).pipe(
//         catchError((error) => {
//             console.error('Error blocking user:', error);
//             this.snackBar.open('Error occurred while blocking. Please try again.', 'Close', { duration: 2000 });
//             return of(false);
//         })
//     );
// }
//
// unblockUser(blockedId: number){
//      this.adminService.unblockUserByAdmin(blockedId).pipe(
//         catchError((error) => {
//             console.error('Error unblocking user:', error);
//             this.snackBar.open('Error occurred while unblocking. Please try again.', 'Close', { duration: 2000 });
//             return of({ success: false });
//         })
//     );
// }

// onToggleChange(row: any): void {
//     const newState = !row.is_blocked_by_admin;
//
//     if (newState) {
//         this.unblockUser(row.id).subscribe((response: { success: boolean }) => {
//             if (response.success) {
//                 row.is_blocked_by_admin = false;
//                 console.log("Unblock user status:", response);
//                 this.snackBar.open('Unblock user successfully', 'Close', { duration: 2000 });
//
//             } else {
//                 this.snackBar.open('Failed to unblock user', 'Close', { duration: 2000 });
//             }
//         });
//     } else {
//         this.blockUser(row.id).subscribe((response: boolean) => {
//             if (response) {
//                 row.is_blocked_by_admin = true;
//                 console.log("Block user status:", response);
//                 this.snackBar.open('Block user successfully', 'Close', { duration: 2000 });
//
//             } else {
//                 this.snackBar.open('Failed to block user', 'Close', { duration: 2000 });
//             }
//         });
//     }
// }
