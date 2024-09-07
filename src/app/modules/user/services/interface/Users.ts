import {Follower} from "./Follower";
import {Following} from "./Following";
import {Posts} from "./Posts";

export interface Users {
    id: number;
    name: string;
    email: string;
    password: string;
    createdDate: string;
    modifiedDate: string | null;
    accountLocked: boolean;
    accountType: string;
    bio: string;
    profilePic: string;
    backgroundImage: string;
    enabled: boolean;
    isBlockedByAdmin: boolean;
    isGoogleSignIn: boolean;
    followers: Follower[];
    following: Following[];
    savedPost: Posts[];
}
