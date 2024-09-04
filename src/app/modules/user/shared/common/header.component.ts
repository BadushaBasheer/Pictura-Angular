import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    template: `
        <div [ngClass]="isSelected ? 'border-b-[1px] border-gray-500 p-5 w-[65.5rem]' : 'border-b-[1px] border-gray-500 p-5'">
            <div class="flex flex-row items-center gap-2">
                <h1 class="text-white text-xl font-semibold">
                    {{ title }}
                </h1>
            </div>
        </div>
    `,
})
export class HeaderComponent implements OnInit {
    title: string = '';

    isSelected: boolean = false;


    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.updateTitle();
        });

        // Also update title on initial load
        this.updateTitle();
    }

    private updateTitle(): void {
        // Get the active route
        let childRoute = this.activatedRoute.root;

        while (childRoute.firstChild) {
            childRoute = childRoute.firstChild;
        }
        this.title = childRoute.snapshot.data['title'] || 'Default Title';

        const componentName = childRoute.snapshot.routeConfig?.component?.name;
        this.isSelected = componentName === 'MessagesComponent';
    }
}
