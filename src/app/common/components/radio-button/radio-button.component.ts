import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validator';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent {

  @Input() selectItems: any[] = [];
  @Input() control: FormControl;
  @Input() label: string;
  @Input() labelName: string;
  @Input() valueName: string;

  constructor() { }

  public getErrors(): string[] {
    return CustomValidator.getFormControlErrors(this.control);
  }
}
