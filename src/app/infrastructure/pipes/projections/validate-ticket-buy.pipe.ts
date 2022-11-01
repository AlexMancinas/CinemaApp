import { Pipe, PipeTransform } from '@angular/core';

export type TTicketBuyValidationMessage = "You must select at least one seat" | "Check the user information data" | null;

export type TTicketBuyValidationError = {
  valid: boolean;
  error: TTicketBuyValidationMessage;
}

@Pipe({
  name: 'validateTicketBuy'
})
export class ValidateTicketBuyPipe implements PipeTransform {

  transform(isFormValid: boolean, selectedRows: number, touched: boolean): TTicketBuyValidationError {

    if (touched) {
      const ticketValidationContext: TTicketBuyValidationError = { valid: false, error: null }
      if (!isFormValid) {
        ticketValidationContext.error = "Check the user information data";
        return ticketValidationContext;
      } else if (!(selectedRows >= 1)) {
        ticketValidationContext.error = "You must select at least one seat";
        return ticketValidationContext;
      } else {
        return {
          valid: true,
          error: null
        };
      }
    }
    return {
      valid: true,
      error: null
    };
  }

}
