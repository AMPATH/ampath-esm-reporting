import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataAnalyticsDashboardGuard } from './data-analytics-guard';
import { DataAnalyticsHivModule } from './hiv/data-analytics-hiv.module';
import { DataAnalyticsDashboardComponent } from './data-analytics.component';
export const routes: Routes = [
  {
    path: '',
    component: DataAnalyticsDashboardComponent,
    canActivate: [DataAnalyticsDashboardGuard],
    children: [
      {
        path: 'hiv',
        loadChildren: () => import('./hiv/data-analytics-hiv.module').then((m) => m.DataAnalyticsHivModule)
      },
      {
        path: 'hemato-oncology',
        loadChildren: () => import('./oncology/data-analytics-oncology.module').then((m) => m.DataAnalyticsOncologyModule)
      },
      {
        path: 'referral',
        loadChildren: () => import('./referral/referral-program.module').then((m) => m.AnalyticsPatientReferralProgramModule)
      },
      {
        path: 'cdm',
        loadChildren: () => import('./cdm/data-analytics-cdm.module').then((m) => m.DataAnalyticsCdmModule)
      },
      {
        path: 'hts',
        loadChildren: () => import('./hts/data-analytics-hts.module').then((m) => m.DataAnalyticsHtsModule)
      }
    ]
  }
];

export const dataAnalyticsDashboardRouting: ModuleWithProviders<any> = RouterModule.forChild(
  routes
);
