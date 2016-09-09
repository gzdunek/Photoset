/**
 * Created on 09.09.2016.
 */
import {Photo} from "./photo";


export class User {
    id: number;
    username: string;
    password: string;
    photos: Photo[];
}