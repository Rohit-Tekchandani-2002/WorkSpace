import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent {
  responce = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {},
  private dialogRef: MatDialogRef<DeleteItemComponent>
) { }
confirmSubmit(){
  this.responce = true;
  this.closeDialog();
}
closeDialog() {
  this.dialogRef.close(this.responce);
}
}