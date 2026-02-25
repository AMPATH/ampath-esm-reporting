import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EtlApi } from '../../etl-api/etl-api.module';
import { DataListsModule } from '../../shared/data-lists/data-lists.module';
import { analyticsPatientReferralProgramRouting } from './referral-program.routes';
import { NgamrsSharedModule } from '../../shared/ngamrs-shared.module';

@NgModule({
  imports: [
    analyticsPatientReferralProgramRouting,
    EtlApi,
    DataListsModule,
    CommonModule,
    FormsModule,
    NgamrsSharedModule
  ],
  exports: [],
  declarations: [],
  providers: []
})
export class AnalyticsPatientReferralProgramModule { }
