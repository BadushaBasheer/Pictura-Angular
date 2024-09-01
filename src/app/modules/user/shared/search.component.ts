import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UserService } from '../services/controller/user.service';
import {Users} from "../services/interface/Users";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, of, switchMap} from "rxjs";

@Component({
    selector: 'search-bar',
    template: `
        <div class="mt-5 ml-5 mr-5 mb-5 text-white">
            <div class="search-box bg-gray-900 border-2 border-gray-600 shadow-lg relative rounded-full flex items-center">
        <span class="icon-container w-auto flex justify-center items-center px-4">
            <mat-icon>search</mat-icon>
        </span>
                <input
                    [formControl]="searchControl"
                    class="search-input bg-transparent w-full rounded-full p-2 text-white focus:outline-none"
                    type="text"
                    placeholder="Search...."/>
            </div>
        </div>

        <!-- Show search results if there is a search term and results are found -->
        <div *ngIf="searchControl.value && searchResults.length > 0">
            <div class="mt-10 ml-5 mr-5">
                <div class="w-auto bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-950 dark:border-gray-700">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li *ngFor="let user of searchResults" class="py-3" >
                            <div class="flex items-center space-x-6" (click)="onSelectedUser(user)">
                                <div class="flex-shrink-0">
                                    <img [src]="user.profilePic || 'assets/images/user.png'" class="ml-5 w-12 rounded-full border-none"/>
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

        <div *ngIf="showNoResultsMessage" class="mt-5 ml-5 mr-5 text-center text-white">
            No results found.
        </div>

    `
})
export class SearchComponent implements OnInit {
    searchControl = new FormControl('');
    searchResults: Users[] = [];
    showNoResultsMessage = false;

    private noResultsTimeout: any;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: any) => {
                clearTimeout(this.noResultsTimeout);
                this.showNoResultsMessage = false;
                if (term.trim()) {
                    return this.userService.searchUser(term);
                } else {
                    return of([]);
                }
            })
        ).subscribe({
            next: (results: Users[]) => {
                this.searchResults = results;
                if (this.searchResults.length === 0 && this.searchControl.value) {
                    this.noResultsTimeout = setTimeout(() => {
                        this.showNoResultsMessage = true;
                    }, 350);
                }
            },
            error: (error) => {
                console.error('Search failed', error);
                this.searchResults = [];
                this.showNoResultsMessage = false;
            },
            complete: () => {
                console.log('Search completed');
            }
        });
    }

    onSelectedUser(user: Users) {
        console.log("Selected user id is", user.id)
    }
}
