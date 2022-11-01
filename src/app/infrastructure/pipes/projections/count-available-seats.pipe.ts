import { Pipe, PipeTransform } from '@angular/core';
import { ISeatRowConfig } from 'src/app/domain/models/seat-config.model';
import { filterAvailableSeats } from '../../functions/filter-available-seats';

@Pipe({
  name: 'countAvailableSeats'
})
export class CountAvailableSeatsPipe implements PipeTransform {

  transform(seatRow: ISeatRowConfig[]): number {
    return filterAvailableSeats(seatRow);
  }

}
