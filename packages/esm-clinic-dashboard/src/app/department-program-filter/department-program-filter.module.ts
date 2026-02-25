import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentProgramFilterComponent } from './department-program-filter.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { AppFeatureAnalytics } from '../shared/app-analytics/app-feature-analytics.service';
import { DepartmentProgramsConfigService } from './../etl-api/department-programs-config.service';
import { DataCacheService } from '../shared/services/data-cache.service';
@NgModule({
  imports: [
    CommonModule,
    AngularMultiSelectModule
  , FormsModule],
  exports: [DepartmentProgramFilterComponent],
  declarations: [DepartmentProgramFilterComponent],
  providers: [DepartmentProgramsConfigService, DataCacheService]
})
export class DepartmentProgramFilterModule { }
