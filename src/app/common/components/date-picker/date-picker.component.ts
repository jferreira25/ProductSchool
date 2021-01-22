import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validator';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {

  @Input() label: string;
  @Input() control: FormControl;

  constructor() { }

  public getErrors(): string[] {
    return CustomValidator.getFormControlErrors(this.control);
  }

  public clearControl(): void {
    this.control.setValue('');
    this.control.updateValueAndValidity();
  }
}
