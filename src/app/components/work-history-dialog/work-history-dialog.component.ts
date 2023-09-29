import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkLog } from 'src/app/models/project-model';

@Component({
  selector: 'app-work-history-dialog',
  templateUrl: './work-history-dialog.component.html',
  styleUrls: ['./work-history-dialog.component.css']
})
export class WorkHistoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { workLogs: WorkLog[] },
    private dialogRef: MatDialogRef<WorkHistoryDialogComponent>
  ) { }
  closeDialog() {
    this.dialogRef.close();
  }
  
}
