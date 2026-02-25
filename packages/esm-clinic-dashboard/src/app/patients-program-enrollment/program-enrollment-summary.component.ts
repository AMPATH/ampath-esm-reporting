import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';

@Component({
  standalone: false,
  selector: 'program-enrollment-summary',
  templateUrl: './program-enrollment-summary.component.html'
})
export class ProgramEnrollmentSummaryComponent implements OnInit {
  public params: any;

  @Input() public enrolledSummary: any = [];
  @Input() public hide: boolean;
  @Input() public locationSelected: any = [];
  @Input() public startDate = '';
  @Input() public endDate = '';
  @Input() public filterParams: any = [];
  @Output() public programSelected: EventEmitter<any> = new EventEmitter();

  public gridApi: any;

  public summaryGridOptions: GridOptions = {
    // // enableColResize: true, // Deprecated in ag-grid v30+
    // // Default in newer ag-grid versions, or column property
    // // Default in newer ag-grid versions, or column property
    // // Deprecated
    groupDefaultExpanded: -1,
    onGridReady: (params) => {
      this.gridApi = params.api;
      (params.api as any)?.sizeColumnsToFit();
    },
    onGridSizeChanged: (params: any) => {
      if (params.api) {
        (params.api as any)?.sizeColumnsToFit();
      }
    },
    getRowStyle: (params) => {
      return { 'font-size': '14px', cursor: 'pointer' };
    }
  };
  public enrollmentSummaryColdef: any = [
    { headerName: 'Department', field: 'dept', rowGroup: true, hide: true },
    { headerName: 'Program', field: 'program' },
    {
      headerName: '#Enrolled',
      field: 'enrolled',
      cellRenderer: (params: any) => {
        if (typeof params.value !== 'undefined') {
          return (
            '<a href="javascript:void(0);" title="Identifiers">' +
            params.value +
            '</a>'
          );
        } else {
          return '';
        }
      },
      onCellClicked: (column: any) => {
        if (column.data.dept === 'Total') {
          this.params = this.filterParams;
        } else {
          this.params = {
            startDate: this.startDate,
            endDate: this.endDate,
            locationUuids: this.locationSelected,
            programType: column.data.programUuid
          };
        }
        this.programSelected.emit(this.params);
      }
    }
  ];
  public style = {
    marginTop: '20px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  };
  constructor(private _router: Router) { }

  public ngOnInit() { }

  public exportPatientListToCsv() {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv();
    }
  }
  public redirectTopatientInfo(patientUuid) {
    if (patientUuid === undefined || patientUuid === null) {
      return;
    } else {
      this._router.navigate([
        '/openmrs/spa/patient/' +
        patientUuid +
        '/chart'
      ]);
    }
  }
}
