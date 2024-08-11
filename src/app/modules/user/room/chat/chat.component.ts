import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VideoCallComponent} from "../../video-call/video-call.component";
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../shared.service";
import {Users} from "../../services/interface/Users";

@Component({
    selector: 'user-chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
    userData: string = '';
    user?: Users;
    message: string = '';
    showEmojiPicker: boolean = false;

    constructor(private dialog: MatDialog, private route: ActivatedRoute, private sharedService: SharedService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.fetchUser();
        this.sharedService.sendData(this.userData)
    }

    fetchUser() {
        const userId = Number(this.route.snapshot.paramMap.get('id'));

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
