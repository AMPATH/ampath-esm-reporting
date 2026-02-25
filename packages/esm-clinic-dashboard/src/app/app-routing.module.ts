import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes: Routes = [{ path: '**', component: EmptyRouteComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: () => {
        // Extract the base path up to and including /spa/
        // so the Angular router sees paths like "data-analytics/hiv/..."
        const match = window.location.pathname.match(/^(.*\/spa\/)/);
        return match ? match[1] : '/openmrs/spa/';
      },
    },
  ],
})
export class AppRoutingModule { }
