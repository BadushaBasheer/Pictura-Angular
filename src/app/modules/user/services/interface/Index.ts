import {Users} from "./Users";

export interface SideBarItems{
    label: string;
    route?: string;
    icon?: string;
    isActive?: boolean;
}



export interface Comment {
    id: number;
    text: string;
    createdAt: Date;
    user: Users;
    postId: number;
}

export interface ApiResponse {
    message: string;
    success: boolean;
}
