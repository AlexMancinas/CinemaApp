import { IRoles } from './roles.model';

export interface IUser {
  name: string;
  email: string;
  roles: IRoles;
  uid: string;
}
