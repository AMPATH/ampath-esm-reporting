import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

import { OpenmrsApiModule } from './openmrs-api/openmrs-api.module';
import { LocalStorageService } from './local-storage/local-storage.service';
import { MonthlyScheduleResourceService } from './services/monthly-scheduled-resource.service';
import { ConfigResourceService } from './services/config-resource.service';
import { LoaderComponent } from './loader/loader.component';
import { SingleSpaPropsService } from './single-spa-props/single-spa-props.service';
import { JsonLoader } from './loaders/json-loader';
import { ProgramResourceService } from './openmrs-api/program-resource.service';
import { DataAnalyticsWrapperComponent } from './data-analytics-wrapper/data-analytics-wrapper.component';
import { DataAnalyticsModule } from './data-analytics-dashboard/data-analytics.module';
import { AppRoutingModule } from './app-routing.module';
import { LeftNavComponent } from './left-nav/left-nav.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      isolate: false,
      loader: {
        provide: TranslateLoader,
        useClass: JsonLoader,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OpenmrsApiModule,
    DataAnalyticsModule,
    AppRoutingModule,
    LeftNavComponent,
  ],
  providers: [
    LocalStorageService,
    MonthlyScheduleResourceService,
    ConfigResourceService,
    SingleSpaPropsService,
    TranslateService,
    TranslateStore,
    {
      provide: LOCALE_ID,
      useValue: (window as any).i18next.language.toLowerCase() ? (window as any).i18next.language.toLowerCase() : 'en',
    },
    ProgramResourceService,
  ],
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    LoaderComponent,
    DataAnalyticsWrapperComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
