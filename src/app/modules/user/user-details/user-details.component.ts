import {Component, OnInit} from '@angular/core';
import {Users} from "../services/interface/Users";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/controller/user.service";

@Component({
  selector: 'user-details',
  template: `
      <div *ngIf="user">
          <h2>{{ user.name }}</h2>
          <p>{{ user.email }}</p>
          <!-- Add more fields as necessary -->
      </div>
      <div *ngIf="!user">
          <p>Loading...</p>
      </div>
  `,
  styles: [
  ]
})
export class UserDetailsComponent implements OnInit {
    user: Users | null = null;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const userId = +params['id']; // Get the user ID from the route
            this.userService.getUserById(userId).subscribe(user => {
                this.user = user;
            });
        });
    }
}
