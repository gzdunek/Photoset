/**
 * Created on 09.09.2016.
 */

import {User} from "./user";

export class Photo {
    id: number;
    fileName: string;
    title: string;
    description: string;
    likesCount: number;
    creationTimestamp: Date;
    user: User;
    liked: boolean = false;
    likedByUsers: User[];
}