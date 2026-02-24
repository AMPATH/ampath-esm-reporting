import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { Angulartics2Module } from 'angulartics2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DisplayErrorComponent } from './display-error/display-error.component';
import { DateSelectorComponent } from './components/date-selector.component';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { Ng2FilterPipe } from './pipes/ng2-filter.pipe';
import { OpenmrsApi } from '../openmrs-api/openmrs-api.module';
import { OnlineTrackerComponent } from '../online-tracker';
import { BuildVersionComponent } from '../build-version';
import { RoutesProviderService } from './dynamic-route/route-config-provider.service';
import { AuthenticationService } from '../openmrs-api/authentication.service';
import { SessionService } from '../openmrs-api/session.service';
import { SessionStorageService } from '../utils/session-storage.service';
import { UserDefaultPropertiesService } from '../user-default-properties/user-default-properties.service';
import { LocationFilterComponent } from './locations/location-filter/location-filter.component';
import { EtlApi } from '../etl-api/etl-api.module';
import { BusyComponent } from './busy-loader/busy.component';
import { ReportFiltersComponent } from './report-filters/report-filters.component';
import { ZeroVlPipe } from './pipes/zero-vl-pipe';
import { DataListsModule } from './data-lists/data-lists.module';
import { AppModalComponent } from './modal/app-modal.component';
import { PocHttpInteceptor } from './services/poc-http-interceptor';
import { SelectDepartmentService } from './services/select-department.service';
import { RisonService } from './services/rison-service';
import { KibanaVizHostComponent } from './kibana-viz-host/kibana-viz-host.component';
import { KibanaVizComponent } from './kibana-viz/kibana-viz.component';
import { SnakeCaseToTitlePipe } from './pipes/snake-case-to-title.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OpenmrsApi,
    EtlApi,
    Angulartics2Module,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatExpansionModule,
    NgSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    DataListsModule,
    AgGridModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatTooltipModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  exports: [
    NgSelectModule,
    DisplayErrorComponent,
    AppModalComponent,
    AgGridModule,
    MatCardModule,
    StringToDatePipe,
    Ng2FilterPipe,
    OnlineTrackerComponent,
    BuildVersionComponent,
    ReportFiltersComponent,
    ZeroVlPipe,
    DateSelectorComponent,
    OpenmrsApi,
    EtlApi,
    ModalModule,
    BsDropdownModule,
    TooltipModule,
    LocationFilterComponent,
    Angulartics2Module,
    MatSnackBarModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    SnakeCaseToTitlePipe,
    KibanaVizComponent,
    KibanaVizHostComponent,
  ],
  declarations: [
    DisplayErrorComponent,
    StringToDatePipe,
    ZeroVlPipe,
    Ng2FilterPipe,
    ReportFiltersComponent,
    OnlineTrackerComponent,
    AppModalComponent,
    KibanaVizHostComponent,
    KibanaVizComponent,
    BuildVersionComponent,
    DateSelectorComponent,
    SnakeCaseToTitlePipe,
    LocationFilterComponent,
    BusyComponent,
  ],
  providers: [
    Ng2FilterPipe,
    StringToDatePipe,
    ZeroVlPipe,
    RoutesProviderService,
    RisonService,
    SelectDepartmentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PocHttpInteceptor,
      multi: true,
    },
    SnakeCaseToTitlePipe,
  ],
})
export class NgamrsSharedModule {
  public static forRoot(): ModuleWithProviders<NgamrsSharedModule> {
    return {
      ngModule: NgamrsSharedModule,
      providers: [
        AuthenticationService,
        SessionService,
        SessionStorageService,
        UserDefaultPropertiesService,
      ],
    };
  }
}
