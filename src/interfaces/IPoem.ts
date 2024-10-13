import { Timestamp } from "firebase/firestore";

export interface IPoem {
  author: string;
  id: string;
  image: string;
  content: string;
  title: string;
  timeToRead: string;
  dateCreated: Timestamp;
}
