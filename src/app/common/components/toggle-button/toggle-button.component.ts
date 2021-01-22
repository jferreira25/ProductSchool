import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validator';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() option: string;

  constructor() { }

  public getErrors(): string[] {
    return CustomValidator.getFormControlErrors(this.control);
  }
}
