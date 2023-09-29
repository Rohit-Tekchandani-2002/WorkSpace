import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { newsAndUpdatesResponce } from 'src/app/models/dashboard-model';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.css']
})
export class NewsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedNews: newsAndUpdatesResponce },
    private dialogRef: MatDialogRef<NewsDialogComponent>
  ) { }
  closeDialog() {
    this.dialogRef.close();
  }
}
