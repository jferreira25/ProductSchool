import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  public title: string;

  constructor(
    private dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public messages: string[]
  ) { }

  ngOnInit() {
    this.title = this.messages.length > 1 ? 'Ocorreram os seguintes erros' : 'Ocorreu o seguinte erro';
    if (!this.messages)
      this.messages = []
  }

  public close(): void {
    this.dialogRef.close();
  }
}
