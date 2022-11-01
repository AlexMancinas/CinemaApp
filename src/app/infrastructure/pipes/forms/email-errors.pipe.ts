import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'emailErrors',
})
export class EmailErrorsPipe implements PipeTransform {
  transform(
    emailErrors: ValidationErrors | null,
    touched: boolean
  ): string | null {
    if (emailErrors && touched) {
      const { email, required } = emailErrors;
      if (required) {
        return 'The email is required';
      } else if (email) {
        return "This doesn't look like an email";
      }
    }
    return null;
  }
}
