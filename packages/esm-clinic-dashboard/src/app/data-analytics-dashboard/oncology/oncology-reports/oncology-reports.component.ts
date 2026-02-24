import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';
import * as _ from 'lodash';
import dayjs from 'dayjs';

import { OncologyReportService } from '../../../etl-api/oncology-reports.service';

@Component({
  standalone: false,
  selector: 'oncology-reports',
  templateUrl: './oncology-reports.component.html',
  styleUrls: ['./oncology-reports.component.css']
})
export class OncologyReportsComponent implements OnInit {
  public title = 'Oncology Reports';
  public oncologyReports: any;
  public specificOncologyReport: any;
  public startDate: string = dayjs().startOf('year').format('YYYY-MM-DD');
  public endDate: string = dayjs().endOf('month').format('YYYY-MM-DD');

  constructor(
    private oncologyReportService: OncologyReportService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.getOncologyReports();
  }

  public getOncologyReports() {
    this.oncologyReportService
      .getOncologyReports()
      .pipe(take(1))
      .subscribe((result) => {
        this.oncologyReports = result;
      });
  }

  public navigateToReport(
    report: any,
    oncologyReport: any,
    reportIndex: number
  ) {
    const queryParams = this.route.snapshot.params;
    const reportParams = report.reportDefaults;
    const params = {
      type: report.type,
      report: report.name
    };
    this.router.navigate(['./' + report.type + ''], {
      relativeTo: this.route,
      queryParams: params
    });
  }
}
