import { Timestamp } from 'firebase/firestore';

export interface IBlog {
  author: string;
  id: string;
  content: string;
  overview: string;
  image: string;
  title: string;
  timeToRead: string;
  dateCreated: Timestamp;
}
