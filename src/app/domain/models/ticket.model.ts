import { timestamp } from '../utils/timestamp.interface';
import { IClientData } from './client-data.model';
import { ISeatRowConfig } from './seat-config.model';

export interface ITicket {
  ticketId: string;
  sellerId: string;
  hallId: string;
  movieId: string;
  projectionId: string;
  purchaseDate: timestamp;
  seats: ISeatRowConfig[];
  clientData: IClientData;
}
