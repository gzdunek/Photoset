/**
 * Created on 09.09.2016.
 */

import {User} from "./user";

export class Photo {
    id: number;
    title: string;
    description: string;
    creationTimestamp: Date;
    user: User;
}