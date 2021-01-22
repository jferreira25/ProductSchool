import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validator';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {

  @Input() label: string;
  @Input() type: string;
  @Input() control: FormControl;

  constructor() { }

  public getErrors(): string[] {
    return CustomValidator.getFormControlErrors(this.control);
  }
}
