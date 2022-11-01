import { ISeatRowConfig } from './seat-config.model';

export interface ICinemaHall {
  name: string;
  hallId: string;
  seatSet: ISeatRowConfig[];
  deleted: boolean;
}
