export interface ISeatRowConfig {
  name: string;
  seats: ISeat[];
}

export interface ISeat {
  number: number;
  aparted: boolean;
  userId: string;
}
