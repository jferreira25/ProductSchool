import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validator';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() label: string;
  @Input() selectItems: any[] = [];
  @Input() control: FormControl;
  @Input() labelName: string;
  @Input() valueName: string;

  public selectItemsFilter: Observable<any[]>;

  constructor() { }

  ngOnInit() {
    this.selectItemsFilter = Observable.create(ob => ob.next(this.selectItems));
    this.buildAutoCompleteFilter();
  }

  public getErrors(): string[] {
    return CustomValidator.getFormControlErrors(this.control);
  }

  public getOptionText(option: any): string {
    return option ? option[this.labelName] : '';
  }

  private buildAutoCompleteFilter(): void {
    this.selectItemsFilter = this.control.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? value : ''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.selectItems.slice())
      );
  }

  private _filter(label: string): any[] {
    const filterValue = label.toLowerCase().trim();
    return this.selectItems.filter(item => item[this.labelName].toLowerCase().includes(filterValue));
  }
}
