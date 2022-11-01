import { Pipe, PipeTransform } from '@angular/core';
import { ISeatRowConfig } from 'src/app/domain/models/seat-config.model';

export type HasMatch = {
  match: boolean;
}

@Pipe({
  name: 'matchSelection',
  pure: false,
})
export class MatchSelectionPipe implements PipeTransform {
  transform(selectedSeats: ISeatRowConfig[], rowName: string, seat: number): HasMatch {
    const rowToCheck: ISeatRowConfig | undefined = selectedSeats.find(({ name }) => name === rowName);
    if (!rowToCheck) {
      return {
        match: false
      };
    }
    return rowToCheck.seats.find(({ number }) => number === seat) ? { match: true } : { match: false };
  }

}
