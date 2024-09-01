import {Users} from "./users";

// export interface UserBlock {
//     id: number;
//     blocker: Users;
//     blocked: Users;
//     blockedDate: string | Date;
// }

export interface UserBlock {
    id: number;
    blockerName: string;
    blockerEmail: string;
    blockedName: string;
    blockedEmail: string;
    blockedDate: string | Date;
}
