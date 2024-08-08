import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddPostComponent} from "../add-post/add-post.component";
import {VideoCallComponent} from "../video-call/video-call.component";

@Component({
    selector: 'user-chat',
    templateUrl: './chat.component.html',
})
export class ChatComponent {

    message: string = '';
    showEmojiPicker: boolean = false;

    constructor(private dialog: MatDialog,
    ) {
    }

    toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
    }


    sendMessage() {
        console.log(this.message);
    }

    onFocus() {
        this.showEmojiPicker = false;
    }

    openVideoCall() {
        const dialogRef = this.dialog.open(VideoCallComponent, {
            width: '600px',
        });
    }
}
