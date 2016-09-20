/**
 * Created on 09.09.2016.
 */
import {Photo} from "./photo";


export class User {
    id: number;
    email: string;
    username: string;
    password: string;
    avatarFileName: string;
    creationTimestamp: Date;
    photos: Photo[];
}