import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constants } from 'src/app/config/constants';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-add-attachments',
  templateUrl: './add-attachments.component.html',
  styleUrls: ['./add-attachments.component.css']
})
export class AddAttachmentsComponent implements OnInit {
  progress: number = 0;
  fileName = '';
  responce: string | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dialogRef: MatDialogRef<AddAttachmentsComponent>,
    private api: FileUploadService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }
  attchfileForm = this.formBuilder.group({
    description: new FormControl<string | null>(null)
  });
  upload(files: any) {
    var description = this.attchfileForm.value.description;
    if (files.length === 0)
      return;

    const formData = new FormData();
    formData.append('projectWorkId', this.data.id);
    if (description != null) {
      formData.append('description', description);
    }

    for (const file of files) {
      formData.append(file.name, file);
      this.fileName += file.name + " ";
    }

    var api_key = localStorage.getItem("token");
    var api_endpoint = Constants.API_ENDPOINT;
    const uploadReq = new HttpRequest('POST', api_endpoint + 'api/Project/AddWorkItemAttachment', formData, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + api_key }),
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / (event.total ?? 1));
      }
      else if (event.type === HttpEventType.Response) {
        let response: any = event.body; // This will contain the response data
        if(response.isError == false)
        {
          this.responce = response.responce;
          this.closeDialog();
        }
      }
    });

    // this.api.uploadFile(formData).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress) {
    //     this.progress = Math.round(100 * event.loaded / (event.total ?? 1));
    //   } else if (event.type === HttpEventType.Response) {
    //     // // Handle the response here
    //     // const response = event.body; // This will contain the response data
    //     // console.log('Response:', response);
    //   }
    // });


  }

  closeDialog() {
    this.dialogRef.close(this.responce);
  }
}
