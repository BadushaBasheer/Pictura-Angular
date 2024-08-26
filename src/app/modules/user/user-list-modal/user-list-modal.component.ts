import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-list-modal',
  template: `
      <div class="modal-backdrop" (click)="closeModal()"></div>
      <div class="modal-content">
          <div class="modal-header">
              <h3>{{ modalTitle }}</h3>
              <button (click)="closeModal()">Close</button>
          </div>
          <div class="modal-body">
              <ul>
                  <li *ngFor="let user of userList">
                      {{ user.name }}
                  </li>
              </ul>
          </div>
      </div>

  `,
})
export class UserListModalComponent {

    @Input() modalTitle: string = '';
    @Input() userList: Array<{ name: string }> = [];


    closeModal() {
        // Logic to close the modal
    }
}
