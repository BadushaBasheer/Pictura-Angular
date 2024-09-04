import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UserService } from '../../services/controller/user.service';
import {Users} from "../../services/interface/Users";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, of, switchMap} from "rxjs";

@Component({
    selector: 'search-bar',
    templateUrl:'search.component.html'
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
