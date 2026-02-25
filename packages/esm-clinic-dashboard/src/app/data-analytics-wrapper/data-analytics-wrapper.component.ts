import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-data-analytics-wrapper',
  template: `
    <div class="data-analytics-container">
      <h2>Data Analytics Dashboard</h2>
      <p>The data analytics module is being migrated.</p>
    </div>
  `,
  styles: [`
    .data-analytics-container {
      padding: 1rem;
      font-family: 'IBM Plex Sans', sans-serif;
    }
    h2 {
      margin-bottom: 0.5rem;
      color: #161616;
    }
  `],
})
export class DataAnalyticsWrapperComponent { }
