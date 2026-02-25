import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgamrsSharedModule } from '../shared/ngamrs-shared.module';
import { EtlApi } from '../etl-api/etl-api.module';
import { ReportFilterComponent } from './report-filter/report-filter.component';
import { ReportViewComponent } from './report-view/report-view.component';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgamrsSharedModule,
    FormsModule,
    ReactiveFormsModule,
    EtlApi,
    AngularMultiSelectModule
  ],
  declarations: [ReportFilterComponent, ReportViewComponent],
  providers: [],
  exports: [ReportFilterComponent, ReportViewComponent]
})
export class ReportingUtilitiesModule { }
