import {CanActivateFn, Router} from '@angular/router';
import {StorageService} from "../storage/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {inject} from "@angular/core";

export const roleGuard: CanActivateFn = (route, state) => {

    const expectedRoles: string[] = route.data['roles'] || [];
    const userRole: string | null = StorageService.getUserRole();

    console.log("User role is : " + userRole);
    const snackBar = inject(MatSnackBar);
    const router = inject(Router);


    if (userRole && expectedRoles.includes(userRole)) {
        return true;
    } else {
        router.navigateByUrl('/login');
        snackBar.open("Unauthorized access!", "Close", {duration: 500})
        return false;
    }
};

