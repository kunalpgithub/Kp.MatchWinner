import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ScheduleDto, ScheduleService } from '@proxy/schedules';
import { ConfigStateService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  schedules: ScheduleDto[];
  constructor(
    private http: HttpClient,
    private config: ConfigStateService,
    private scheduleService: ScheduleService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {}

  public uploadFile = files => {
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    formData.append('file', files[0], files[0].name);
    this.http
      .post(this.config.getApiUrl() + `/api/app/schedule/upload`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = Math.round((100 * event.loaded) / event.total);
          console.log(progress);
          this.toaster.info(`{progress} uploaded`, 'File upload progress');
        } else if (event.type === HttpEventType.Response) {
          this.toaster.info(`File upload competed.`, 'File upload progress');
          console.log('Finished uploading data');
          console.log(event);
          this.schedules = event.body as ScheduleDto[];
        }
      });
    // this.UploadSchedule(files);
    // this.scheduleService.create(files[0]).subscribe(response => {
    //   this.schedule = response;
    //   console.log('Finished uploading data');
    // });
  };
  saveSchedule() {
    this.scheduleService.createScheduleBySchedules(this.schedules).subscribe(response => {
      console.log('Saved successfully');
      this.toaster.success('Schedule saved successfully.', 'Save Schedule');
    });
  }

  // UploadSchedule(files) {
  //   const formData = new FormData();
  //   formData.append('file', files[0], files[0].name);

  //   this.rest.request<FormData, ScheduleDto[]>({
  //     method: 'POST',
  //     url: `/api/app/schedule`,
  //     body: formData,
  //   });
  // }
}
