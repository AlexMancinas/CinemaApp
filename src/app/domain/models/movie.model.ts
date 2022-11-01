import { timestamp } from '../utils/timestamp.interface';

export interface IMovie {
  movieId: string;
  name: string;
  ticketCost: number;
  category: string;
  coverPicture: string;
  duration: number;
  language: string;
  genre: string;
  available: boolean;
  startDate: timestamp;
  endDate: timestamp;
  disabled: boolean;
}
