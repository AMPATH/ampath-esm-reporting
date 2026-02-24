import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { DataAnalyticsDashboardService } from './../../../data-analytics-dashboard/services/data-analytics-dashboard.services';
import * as _ from 'lodash';
import dayjs from 'dayjs';

@Component({
  standalone: false,
  selector: 'app-gains-and-losses-report-filters',
  templateUrl: './patient-gains-and-losses-filter.component.html',
  styleUrls: ['./patient-gains-and-losses-filter.component.css']
})
export class PatientGainsFiltersComponent implements OnInit, OnChanges {
  public title = 'Patient Gains Report Filters';
  public selectedIndicators = [];
  @Input() public startDate: Date = dayjs()
    .subtract(2, 'months')
    .endOf('month')
    .toDate();
  @Input() public reportType = '';
  @Input() public dashboardType = '';
  @Input() public params: any;
  @Output() public filterSet = new EventEmitter();
  @Output() public filteReset = new EventEmitter();
  @Output() public locationsSet = new EventEmitter();
  @Output() public isAggregateSet = new EventEmitter();
  public selectedGender: any = [];
  public locationUuids: Array<string>;
  public selectedlocationUuids: Array<string>;
  public isLoadingReport = false;
  public reportName = 'gains-and-losses-report';
  public errorObj = {
    isError: false,
    message: ''
  };
  public validParams = true;
  public monthString = dayjs(this.startDate).format('YYYY-MM');

  constructor(
    public dataAnalyticsDashboardService: DataAnalyticsDashboardService
  ) {}

  public ngOnInit() {
    this.initializeParams();
  }

  public ngOnChanges(change: SimpleChanges) {
    if (
      change.startDate &&
      typeof change.startDate.previousValue !== 'undefined'
    ) {
      this.monthString = dayjs(change.startDate.currentValue).format(
        'YYYY-MM'
      );
    }
  }

  public initializeParams() {
    this.monthString = dayjs(this.startDate).format('YYYY-MM');
  }

  public setFilter() {
    const isFilterValid = this.validateFiltersSelected();
    this.filteReset.emit(true);
    if (isFilterValid) {
      this.setParams();
      this.emitFilterParams();
    }
  }
  public setParams() {
    this.params = {
      endingMonth: dayjs(this.monthString)
        .add(1, 'months')
        .endOf('month')
        .format('YYYY-MM-DD'),
      startingMonth: dayjs(this.monthString)
        .endOf('month')
        .format('YYYY-MM-DD'),
      locationUuids: '',
      isAggregated: false
    };
  }

  public emitFilterParams() {
    this.filterSet.emit(this.params);
  }
  public resetFilter() {
    this.monthString = dayjs()
      .subtract(2, 'months')
      .endOf('month')
      .format('YYYY-MM');
    this.filteReset.emit(true);
  }

  public resetErrorObj() {
    this.errorObj = {
      isError: false,
      message: ''
    };
  }
  public validateFiltersSelected(): Boolean {
    let isValid = true;
    this.resetErrorObj();
    const currentEndMonth = dayjs().endOf('month');
    const filterEndMonth = dayjs(this.monthString)
      .add(1, 'months')
      .endOf('month');
    if (filterEndMonth.isAfter(currentEndMonth)) {
      isValid = false;
      this.errorObj = {
        isError: true,
        message:
          'For draft report, the end date should not be after the current month.'
      };
    }
    return isValid;
  }
  public onLocationsSelected($event: any) {
    this.selectedlocationUuids = $event.locations.map((l: any) => {
      return l.value;
    });

    this.locationsSet.emit(this.selectedlocationUuids);
  }

  public onAggregateChange(value) {
    this.isAggregateSet.emit(value.isAggregated);
  }
}
