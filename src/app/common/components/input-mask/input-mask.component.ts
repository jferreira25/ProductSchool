import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validator';

@Component({
  selector: 'app-input-mask',
  templateUrl: './input-mask.component.html',
  styleUrls: ['./input-mask.component.css'],
})
export class InputMaskComponent {

  @Input() label: string;
  @Input() type: string;
  @Input() mask: string;
  @Input() control: FormControl;

  constructor() { }

  public getErrors(): string[] {
    return CustomValidator.getFormControlErrors(this.control);
  }
}
