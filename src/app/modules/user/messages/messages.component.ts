import { Component } from '@angular/core';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent {

    userImage!: string;
    defaultImage = 'assets/images/user.png';

}
