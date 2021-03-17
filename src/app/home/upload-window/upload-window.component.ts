import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UploadService } from '../../services/upload.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-upload-window',
  templateUrl: './upload-window.component.html',
  styleUrls: ['./upload-window.component.css']
})
export class UploadWindowComponent implements OnInit {
  @ViewChild('file', { static: false }) file;

  public files: Set<File> = new Set();
  public fileNames: string[] = [];

  progress;
  canBeClosed = true;
  filesAdded = false;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessfull = false;
  showTypeMsg = false;

  constructor(public dialogRef: MatDialogRef<UploadWindowComponent>, public uploadService: UploadService) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        var mimeType = files[key].type;
        if (mimeType.match(/image\/*/) != null) {
          this.files.add(files[key]);
          this.fileNames.push(files[key].name);
        } else {
          this.showTypeMsg = true;
        }
      }
    }
    if (this.files.size > 0) {
      this.filesAdded = true;
    }
  }

  hideDialog() {
    this.dialogRef.close({ uploadDone: false, filesList: null });
  }

  closeDialog() {
    if (this.uploadSuccessfull) {
      return this.dialogRef.close({uploadDone: true, filesList: this.fileNames});
    }

    this.uploading = true;

    this.progress = this.uploadService.upload(this.files);
    console.log(this.progress);
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }
    this.primaryButtonText = 'Start Denoising';

    this.canBeClosed = false;

    this.showCancelButton = false;

    forkJoin(allProgressObservables).subscribe(end => {
      this.canBeClosed = true;
      // this.dialogRef.disableClose = false;
      this.uploadSuccessfull = true;
      this.uploading = false;
    });
  }

}
