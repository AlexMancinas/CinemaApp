import { ISeatRowConfig } from "src/app/domain/models/seat-config.model";

export const filterAvailableSeats = (seatRow:ISeatRowConfig[]) => seatRow.map(({ seats }) => seats).flat().filter(({ aparted }) => !aparted).length;