import { Timestamp } from "firebase/firestore";

export interface IBlog {
    author: string;
    id: string;
    content: string;
    title: string;
    timeToRead: string;
    dateCreated: Timestamp;
}