import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadWindowComponent } from './upload-window/upload-window.component';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

const denoise_url = 'http://localhost:5002/denoise';
const clear_url = 'http://localhost:5002/clear';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('downloadLink', { static: false }) downloadLink: ElementRef;

  denoising = false;
  fileName = '';

  constructor(public dialog: MatDialog,
              private http: HttpClient) { }

  ngOnInit() {
  }

  clearUploadedFiles() {
    this.http.get(clear_url).subscribe(res => { });
  }

  denoise(filesList: string[], index: number, len: number) {
    this.fileName = filesList[index];

    const data: any = {
      'fileName': this.fileName
    };

    const httpOptions: any = {
      'responseType': 'arraybuffer'
    };

    this.http.post(denoise_url, data, httpOptions)
      .subscribe(response => {
        var blob = new Blob([response], {type: 'image/*'});
        saveAs(blob, data['fileName']);
        if (index != len - 1) {
          this.denoise(filesList, index + 1, len);
        } else {
          this.denoising = false;
          this.clearUploadedFiles();
        }
      });
  }

  startDenoising(filesList: string[]) {
    this.denoising = true;
    this.denoise(filesList, 0, filesList.length);
  }

  public openUploadWindow() {
    let dialogRef = this.dialog.open(UploadWindowComponent, {
      width: '50%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.uploadDone) {
        this.startDenoising(data.filesList);
      }
    });
  }

}
