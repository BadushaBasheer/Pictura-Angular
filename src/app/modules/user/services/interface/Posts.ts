import {Users} from "./Users";

export interface Posts {
    id: number;
    caption: string;
    user: Users;
    image: Image;
    comments?: Comment[];
    liked: Users[];
    createdAt: string;
}

export interface Image {
    id: number;
    fileName: string;
    fileType: string;
    url: string;
    publicId: string; // Cloudinary public ID
}


export interface ApiResponse {
    message: string;
    success: boolean;
}



export interface Comment{

    id: number;
    postId: number;
    userId: number;
    username: string;
    text: string;
    parentCommentId: number | null;
    replies: Comment[];
    createdAt: string;
}
