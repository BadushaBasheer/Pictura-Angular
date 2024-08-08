import {Users} from "./Users";

export interface Following {
    id: number;
    user: Users;
    followingId: number;
}
