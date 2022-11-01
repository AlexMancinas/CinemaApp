import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'passwordErrors',
})
export class PasswordErrorsPipe implements PipeTransform {
  transform(
    passwordErrors: ValidationErrors | null,
    touched: boolean
  ): string | null {
    if (passwordErrors && touched) {
      const { minlength, required } = passwordErrors;
      if (required) {
        return 'The password is required';
      } else if (minlength) {
        return `The password requires ${minlength.requiredLength} chars, and yours has ${minlength.actualLength}`;
      }
    }
    return null;
  }
}
