import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { singleSpaPropsSubject } from '../single-spa-props';

@Component({
  standalone: false,
  selector: 'clinic-dashboard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'openmrs-esm-clinic-dashboard';
  view: string;
  sub: Subscription;
  isDataAnalytics = false;
  isClinicDashboard = false;

  constructor() { }

  ngOnInit(): void {
    const path = window.location.pathname;
    this.isDataAnalytics = path.includes('/data-analytics');
    this.isClinicDashboard = path.includes('/clinic-dashboard');

    this.sub = singleSpaPropsSubject.subscribe({
      next: (prop) => {
        this.view = prop.view;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
