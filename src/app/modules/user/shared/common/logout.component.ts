import {Component, Inject} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../auth/components/services/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'logout',
  template: `
      <ng-container>
          <div class="bg-black p-4 rounded-2xl flex flex-col justify-between h-auto border border-white">
              <h2 class="text-gray-500 font-bold mb-4 font-mono">Are you sure, do you want to logout ?</h2>
              <div class="flex justify-between w-full">
                  <button (click)="onLogout()"  mat-button color="warn" >Yes</button>
                  <button (click)="onCancel()" mat-button color="primary">No</button>
              </div>
          </div>
      </ng-container>
  `
})
export class LogoutComponent {

    private currentUrl: string;


    constructor(private router: Router,
                public auth: AuthService,
                private snackBar: MatSnackBar,
                private dialogRef: MatDialogRef<LogoutComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.currentUrl = this.router.url;
        console.log("current url is : ",this.currentUrl);
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.currentUrl = event.url;
            }
        });
    }

    onLogout() {
        this.snackBar.open("Logout successful", "Close", {duration: 500})
        this.auth.logout();
        this.dialogRef.close();
        this.router.navigate(['/login']); // Navigate to login page after logout
    }

    onCancel() {
        this.dialogRef.close();
        this.router.navigate([this.currentUrl]);
    }

}
