import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import Peer from 'peerjs';

@Injectable({
    providedIn: 'root'
})
// export class PeerService {
//     private peer: any;
//     private myPeerId = StorageService.getUserId();
//     private peerConnectionSubject = new Subject<any>();
//
//
//
//     constructor() {
//         this.peer = new Peer({ host: 'localhost', port: 8080, path: '/' });
//
//         this.peer.on('open', (id: number) => {
//             this.myPeerId = id;
//             console.log('My peer ID is: ' + this.myPeerId);
//         });
//
//         this.peer.on('connection', (conn: any) => {
//             conn.on('data', (data: any) => {
//                 console.log('Received data:', data);
//             });
//         });
//
//         this.peer.on('call', (call: any) => {
//             navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//                 .then((stream) => {
//                     call.answer(stream);
//                     call.on('stream', (remoteStream: MediaStream) => {
//                         this.peerConnectionSubject.next(remoteStream);
//                     });
//                 })
//                 .catch((err: any) => console.error('Failed to get stream', err));
//         });
//     }
//
//     // Getter for myPeerId as a string
//     get peerId(): number {
//         return this.myPeerId;
//     }
//
//     // Corrected connectToPeer method to use string IDs
//     connectToPeer(peerId: number) {
//         const conn = this.peer.connect(peerId);
//         conn.on('open', () => {
//             conn.send('Message from that id');
//             console.log('Connected to peer:', peerId);
//         });
//
//         conn.on('data', (data: any) => {
//             console.log('Data received from peer:', data);
//         });
//     }
//
//     // Corrected callPeer method to use string IDs and handle video streaming
//     callPeer(peerId: number, videoElement: HTMLVideoElement) {
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then((stream) => {
//                 const call = this.peer.call(peerId, stream);
//                 call.on('stream', (remoteStream: MediaStream) => {
//                     videoElement.srcObject = remoteStream;
//                     videoElement.play();
//                 });
//             })
//             .catch((err: any) => console.error('Failed to get stream', err));
//     }
//
//     onRemoteStream() {
//         return this.peerConnectionSubject.asObservable();
//     }
// }
export class PeerService {
    private peer: Peer;
    private peerId!: string;
    private currentCall: any;
    public incomingStream$: BehaviorSubject<MediaStream | null> = new BehaviorSubject<MediaStream | null>(null);

    constructor() {
        this.peer = new Peer();
        this.peer.on('open', (id) => {
            this.peerId = id;
            console.log('Peer ID: ', this.peerId);
        });

        this.peer.on('call', (call) => {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
                .then((stream) => {
                    call.answer(stream);
                    call.on('stream', (remoteStream) => {
                        this.incomingStream$.next(remoteStream);
                    });
                })
                .catch((error) => {
                    console.error('Error accessing media devices.', error);
                });
        });
    }

    getPeerId(): string {
        return this.peerId;
    }

    makeCall(peerId: string, localStream: MediaStream) {
        this.currentCall = this.peer.call(peerId, localStream);
        if (this.currentCall) {
            this.currentCall.on('stream', (remoteStream: MediaStream) => {
                this.incomingStream$.next(remoteStream);
            });
        }
    }


    endCall() {
        if (this.currentCall) {
            this.currentCall.close();
        }
    }

}
