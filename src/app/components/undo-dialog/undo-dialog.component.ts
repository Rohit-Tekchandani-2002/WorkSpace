import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-undo-dialog',
  templateUrl: './undo-dialog.component.html',
  styleUrls: ['./undo-dialog.component.css']
})
export class UndoDialogComponent {
  responce = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {},
    private dialogRef: MatDialogRef<UndoDialogComponent>
  ) { }
  confirmSubmit() {
    this.responce = true;
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close(this.responce);
  }
}