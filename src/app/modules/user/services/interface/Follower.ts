import {Users} from "./Users";

export interface Follower {
    id: number;
    user: Users;
    followerId: number;
}
