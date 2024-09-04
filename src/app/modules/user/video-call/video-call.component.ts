import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {PeerService} from "../services/peer/peer.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {StorageService} from "../../../auth/components/services/storage/storage.service";
import {Users} from "../services/interface/Users";
import {data} from "autoprefixer";
import Peer from "peerjs";

@Component({
  selector: 'video-call',
  templateUrl: './video-call.component.html',
})
export class VideoCallComponent implements OnInit {
    @ViewChild('localVideo') localVideo!: ElementRef;
    @ViewChild('remoteVideo') remoteVideo!: ElementRef;
    localStream!: MediaStream;
    peerId!: string;

    selectedUser: Users;


    constructor(private peerService: PeerService,
                @Inject(MAT_DIALOG_DATA)
                public data: { selectedUser: Users}) {
        this.selectedUser = data.selectedUser;
        console.log('data', data.selectedUser);
    }




    ngOnInit(): void {
        this.peerService.incomingStream$.subscribe((stream) => {
            if (stream) {
                this.remoteVideo.nativeElement.srcObject = stream;
            }
        });
        console.log(this.selectedUser);

    }

    startVideoCall() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            this.localStream = stream;
            this.localVideo.nativeElement.srcObject = stream;
            this.peerService.makeCall(this.peerId, stream);
        });
    }

    endCall() {
        this.peerService.endCall();
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
        }
    }

    getCurrentUserId():number{
        return StorageService.getUserId();
    }

}
