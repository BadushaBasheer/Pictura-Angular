import {Component, OnInit} from '@angular/core';
import {filter, map} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
    selector: 'app-layout',
    template: `
        <!--        <div class="h-full bg-black ">-->
        <!--            <div class="container h-full mx-auto xl:px-30 max-w-6xl">-->
        <!--                <div class="grid grid-cols-4 h-full">-->
        <!--                    &lt;!&ndash; Sidebar &ndash;&gt;-->
        <!--                    <app-sidebar class="sticky top-0 h-screen"/>-->
        <!--                    <div class="col-span-3 lg:col-span-2 border-x-[1px] border-gray-500">-->
        <!--                        <app-header/>-->
        <!--                        <router-outlet/>-->
        <!--                    </div>-->
        <!--                    &lt;!&ndash; Follow Bar &ndash;&gt;-->
        <!--                    <div *ngIf="(showFollowBar | async)">-->
        <!--                        <app-follow-bar class="sticky top-0 h-screen"/>-->
        <!--                    </div>-->
        <!--                    <div *ngIf="!(showFollowBar | async)">-->
        <!--                        <chat-room class="sticky top-0 h-screen"/>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <div class="h-full bg-black ">
            <div class="container h-full mx-auto xl:px-30 max-w-6xl">
                <div class="grid grid-cols-4 h-full">
                    <!-- Sidebar -->
                    <app-sidebar class="sticky top-0 h-screen"></app-sidebar>

                    <div [ngClass]="{
                'col-span-3 lg:col-span-2 border-x-[1px] border-gray-500': (showFollowBar | async),
                'col-span-3 lg:col-span-3 border-l-[1px] border-gray-500': !(showFollowBar | async)
                }"
                    >
                        <app-header></app-header>
                        <router-outlet></router-outlet>
                    </div>

                    <!-- Follow Bar -->
                    <div *ngIf="(showFollowBar | async)">
                        <app-follow-bar class="sticky top-0 h-screen"></app-follow-bar>
                    </div>
                </div>
            </div>
        </div>

    `,
})
export class HomeComponent implements OnInit {

    private showFollowBarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    showFollowBar: Observable<boolean> = this.showFollowBarSubject.asObservable();

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.router.url.includes('messages'))
        ).subscribe(showFollowBar => {
            this.showFollowBarSubject.next(!showFollowBar);
        });

        // Initial check on load
        if (this.router.url.includes('messages')) {
            this.showFollowBarSubject.next(false);
        }
    }
}
