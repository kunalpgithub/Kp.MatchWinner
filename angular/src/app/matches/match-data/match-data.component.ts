import { HttpClient, HttpEventType } from '@angular/common/http';
import { ConfigStateService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-data',
  templateUrl: './match-data.component.html',
  styleUrls: ['./match-data.component.scss'],
})
export class MatchDataComponent implements OnInit {
  selectedFile: File;
  constructor(
    private http: HttpClient,
    private config: ConfigStateService,
    private toaster: ToasterService
  ) {}
  ngOnInit(): void {}

  selectFile(files) {
    if (files.length === 0) {
      return;
    }
    this.selectedFile = files[0];
    console.log('file selected.');
  }

  saveMatch() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectFile.name);
    this.http
      .post(this.config.getApiUrl() + `/api/app/match/upload`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = Math.round((100 * event.loaded) / event.total);
          this.toaster.info(`${progress}% file uploaded`, 'File upload progress');
        } else if (event.type === HttpEventType.Response) {
          this.toaster.info(`File upload competed.`, 'File upload progress');
        }
      });
  }
}
