import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Angulartics2Module } from 'angulartics2';
import { DataListsModule } from '../shared/data-lists/data-lists.module';
import { NgamrsSharedModule } from '../shared/ngamrs-shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { CalendarModule } from 'angular-calendar';
import { DataAnalyticsDashboardGuard } from './data-analytics-guard';
import { ClinicDashboardCacheService } from '../clinic-dashboard-services/clinic-dashboard-cache.service';
import { HivClinicFlowResourceService } from '../etl-api/hiv-clinic-flow-resource.service';
import { DataAnalyticsDashboardService } from './services/data-analytics-dashboard.services';
import { SelectDepartmentService } from './../shared/services/select-department.service';
import { DataAnalyticsHivModule } from './hiv/data-analytics-hiv.module';
import { DataAnalyticsOncologyModule } from './oncology/data-analytics-oncology.module';
import { DataAnalyticsCdmModule } from './cdm/data-analytics-cdm.module';
import { dataAnalyticsDashboardRouting } from './data-analytics-dashboard-routes';
import { DataEntryStatisticsModule } from '../data-entry-statistics/data-entry-statistics.module';
import { AnalyticsPatientReferralProgramModule } from './referral/referral-program.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PocHttpInteceptor } from '../shared/services/poc-http-interceptor';
import { ClinicRoutesFactory } from '../navigation/side-navigation/clinic-side-nav/clinic-side-nav-routes.factory';
import { DataAnalyticsDashboardComponent } from './data-analytics.component';
import { DataAnalyticsHtsModule } from './hts/data-analytics-hts.module';

@NgModule({
  imports: [
    dataAnalyticsDashboardRouting,
    CommonModule,
    FormsModule,
    DataListsModule,
    HttpClientModule,
    Angulartics2Module,
    NgamrsSharedModule,
    DataAnalyticsHivModule,
    DataAnalyticsOncologyModule,
    AnalyticsPatientReferralProgramModule,
    CalendarModule,
    AgGridModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    DataEntryStatisticsModule,
    DataAnalyticsCdmModule,
    DataAnalyticsHtsModule,
  ],
  declarations: [DataAnalyticsDashboardComponent],
  providers: [
    DataAnalyticsDashboardGuard,
    ClinicDashboardCacheService,
    DataAnalyticsDashboardService,
    SelectDepartmentService,
    {
      provide: 'ClinicFlowResource',
      useExisting: HivClinicFlowResourceService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PocHttpInteceptor,
      multi: true,
    },
    ClinicRoutesFactory,
  ],
  exports: [DataAnalyticsDashboardComponent],
})
export class DataAnalyticsModule { }
