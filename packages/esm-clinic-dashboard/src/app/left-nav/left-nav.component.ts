import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  to: string;
  title: string;
  children?: NavItem[];
  expanded?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-left-nav',
  template: `
    <nav class="left-nav">
      <ul class="nav-list">
        <ng-container *ngFor="let item of navItems">
          <!-- Simple link -->
          <li *ngIf="!item.children" class="nav-item">
            <a [routerLink]="getSegments(item.to)"
               routerLinkActive="active"
               class="nav-link">
              {{ item.title }}
            </a>
          </li>
          <!-- Expandable section -->
          <li *ngIf="item.children" class="nav-item nav-section">
            <button class="nav-link nav-toggle"
                    [class.expanded]="item.expanded"
                    (click)="item.expanded = !item.expanded">
              {{ item.title }}
              <span class="chevron" [class.rotated]="item.expanded">&#9656;</span>
            </button>
            <ul class="nav-children" *ngIf="item.expanded">
              <li *ngFor="let child of item.children" class="nav-item">
                <a [routerLink]="getSegments(item.to, child.to)"
                   routerLinkActive="active"
                   class="nav-link nav-child-link">
                  {{ child.title }}
                </a>
              </li>
            </ul>
          </li>
        </ng-container>
      </ul>
    </nav>
  `,
  styles: [`
    .left-nav {
      height: 100%;
      overflow-y: auto;
      background: #ffffff;
      font-family: 'IBM Plex Sans', -apple-system, sans-serif;
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0.5rem 0;
    }

    .nav-item {
      margin: 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      color: #525252;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.125rem;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-left: 3px solid transparent;
      transition: background-color 0.15s, color 0.15s, border-color 0.15s;
    }

    .nav-link:hover {
      background-color: #e8e8e8;
      color: #161616;
    }

    .nav-link.active {
      color: #161616;
      font-weight: 600;
      background-color: #e0e0e0;
      border-left-color: #0f62fe;
    }

    .nav-toggle {
      font-weight: 600;
      color: #393939;
    }

    .nav-toggle.expanded {
      background-color: #f4f4f4;
    }

    .chevron {
      font-size: 0.75rem;
      transition: transform 0.2s ease;
      display: inline-block;
    }

    .chevron.rotated {
      transform: rotate(90deg);
    }

    .nav-children {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-child-link {
      padding-left: 2rem;
      font-size: 0.8125rem;
    }
  `]
})
export class LeftNavComponent implements OnInit {
  navItems: NavItem[] = [
    { to: 'hiv/hiv-comparative-chart-analytics', title: 'Clinic Overview' },
    { to: 'hiv/clinic-flow', title: 'Clinic Flow' },
    { to: 'hiv/moh-731-report', title: 'MOH 731 Report' },
    { to: 'hiv/report-moh-731', title: 'MOH 731 (New)' },
    {
      to: 'hiv/monthly-report',
      title: 'Monthly Reports',
      expanded: false,
      children: [
        { to: 'prep-report', title: 'PrEP Report' },
        { to: 'prep-monthly-report', title: 'PrEP Monthly' },
        { to: 'moh-412-report', title: 'MOH 412' },
        { to: 'ipt-report', title: 'IPT Report' },
        { to: 'patient-gains-and-losses', title: 'Gains & Losses' },
        { to: 'plhiv-ncd-v2-monthly-report', title: 'PLHIV NCD v2' },
        { to: 'ahd-monthly-report', title: 'AHD Monthly' },
      ],
    },
    {
      to: 'hiv/datim-report',
      title: 'DATIM Reports',
      expanded: false,
      children: [
        { to: 'tx-ml-report', title: 'TX_ML' },
        { to: 'tx-new-report', title: 'TX_NEW' },
        { to: 'tx-curr-report', title: 'TX_CURR' },
        { to: 'tx-mmd-report', title: 'TX_MMD' },
        { to: 'tx-rtt-report', title: 'TX_RTT' },
      ],
    },
    { to: 'hiv/surge', title: 'Surge Report' },
    { to: 'hiv/dqa', title: 'DQA Reports' },
    { to: 'hiv/family-testing', title: 'Family Testing' },
    { to: 'hiv/registers', title: 'Registers' },
    { to: 'hiv/hiv-summary-indicator-report', title: 'HIV Summary Indicators' },
    { to: 'hiv/data-entry-statistics', title: 'Data Entry Statistics' },
    { to: 'hiv/program-enrollment', title: 'Program Enrollment' },
    { to: 'hiv/select-department', title: 'Change Department' },
  ];

  constructor(private router: Router) { }

  getSegments(...paths: string[]): string[] {
    return ['/data-analytics', ...paths.flatMap(p => p.split('/'))];
  }

  ngOnInit(): void {
    // Auto-expand section that matches current route
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.navItems.forEach(item => {
          if (item.children && e.url.includes(item.to)) {
            item.expanded = true;
          }
        });
      });

    // Expand on initial load
    const currentUrl = this.router.url;
    this.navItems.forEach(item => {
      if (item.children && currentUrl.includes(item.to)) {
        item.expanded = true;
      }
    });
  }
}
