import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActionBottomSheet } from '../../models/action-bottom-sheet';

@Component({
  selector: 'app-action-bottom-sheet',
  templateUrl: './action-bottom-sheet.component.html',
  styleUrls: ['./action-bottom-sheet.component.css']
})
export class ActionBottomSheetComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ActionBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ActionBottomSheet[]
  ) { }

  ngOnInit() { }

  public chooseOption(selected: any, event: MouseEvent): void {
    event.preventDefault();
    this._bottomSheetRef.dismiss(selected);
  }
}
