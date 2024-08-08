import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/controller/user.service';
import {Users} from "../services/interface/Users";

@Component({
    selector: 'search-bar',
    template: `
        <div class="mt-5 ml-5 mr-5 mb-5 text-white">
            <div class="search-box bg-gray-700 border-2 border-gray-600 shadow-lg relative rounded-full flex items-center">
        <span class="icon-container w-auto flex justify-center items-center px-4">
          <mat-icon>search</mat-icon>
        </span>
                <input
                    [(ngModel)]="searchTerm"
                    (input)="onSearch()"
                    class="search-input bg-transparent w-full rounded-full p-2 text-white focus:outline-none"
                    type="text"
                    placeholder="Search...."/>
            </div>
        </div>
        <div *ngIf="searchResults.length > 0">
            <div class="mt-10 ml-5 mr-5">
                <div class="w-auto bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-700">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li *ngFor="let user of searchResults" class="py-3">
                            <div class="flex items-center space-x-6">
                                <div class="flex-shrink-0">
<!--                                    <img [src]="user.profileImage || 'assets/images/user.png'" class="ml-5 w-12 rounded-full border-none"/>-->
                                    <img src="assets/images/user.png" class="ml-5 w-12 rounded-full border-none"/>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-lg font-semibold text-gray-900 truncate dark:text-white">
                                        {{ user.name }}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `
})
export class SearchComponent implements OnInit {
    searchTerm: string = '';
    searchResults: Users[] = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {}

    onSearch(): void {
        if (this.searchTerm.trim()) {
            this.userService.searchUser(this.searchTerm).subscribe((results: Users[]) => {
                this.searchResults = results;
            });
        } else {
            this.searchResults = [];
        }
    }
}
