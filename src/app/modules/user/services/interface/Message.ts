import {Users} from "./Users";

export interface Message {
    id: number;
    content: string;
    user: Users;
    // user: any;
    timeStamp: string | Date;
    chatId: number;
}


