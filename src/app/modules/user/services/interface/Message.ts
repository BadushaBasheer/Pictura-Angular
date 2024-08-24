import {Users} from "./Users";

export interface Message {
    id: number;
    content: string;
    user: Users;
    timeStamp: string | Date;
    chatId: number;
}


