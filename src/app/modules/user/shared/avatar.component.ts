import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../services/controller/user.service";
import {Users} from "../services/interface/Users";
import {catchError, Observable, of} from "rxjs";

@Component({
    selector: 'Avatar',
    template: `
        <div [ngClass]="{'border-4 border-black': hasBorder, 'h-32 w-32': isLarge, 'h-10 w-10': !isLarge}"
            class=" rounded-full hover:opacity-90 hover:cursor-pointer transform transition-transform duration-300 hover:scale-110">
            <ng-container *ngIf="user | async as user">
                <img [src]="user.profilePic" class="object-cover rounded-full" alt="">
            </ng-container>
        </div>
    `
})
export class AvatarComponent implements OnInit{
    @Input() userId: string = '';
    @Input() isLarge: boolean = false;
    @Input() hasBorder: boolean = false;
    user: Observable<Users> | undefined;
    @Input() src!: any;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.user = this.userService.getAuthenticatedUser()
            .pipe(
            catchError(error => {
                console.error('Error fetching authenticated user data:', error);
                return of({ profilePic : '/assets/images/user.png' } as Users); // Fallback user object
            })
        );
        console.log(this.user);
    }
}
