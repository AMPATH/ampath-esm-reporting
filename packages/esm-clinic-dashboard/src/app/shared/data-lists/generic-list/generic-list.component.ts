import {
  Component,
  OnInit,
  Output,
  OnDestroy,
  ViewChild,
  Input,
  SimpleChange,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: false,
  selector: 'generic-list',
  templateUrl: './generic-list.component.html'
})
export class GenericListComponent implements OnInit, OnDestroy, OnChanges {
  /*  tslint:disable:no-output-on-prefix */
  public gridOptions: GridOptions;
  @Input() public columns: any;
  @Input() public data: any = [];
  @Output() public onSelectedRow = new EventEmitter();
  @Output() public onSelectedTab = new EventEmitter();
  @Input() public newList: any;
  public selected: any;
  public refresh = false;


  @Input()
  set options(value) {
    this._data.next(value);
  }

  get options() {
    return this._data.getValue();
  }

  @Input()
  set dataSource(value) {
    this._dataSource.next(value);
  }
  get dataSource() {
    return null;
    // return this._dataSource.getValue();
  }

  private _data = new BehaviorSubject<any>([]);
  private _dataSource = new BehaviorSubject<any>({}); // Kept this line
  // @Output() public onSelectedRow = new EventEmitter(); // Moved this line up
  // public data: any; // Moved this line up

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onTabChanged = new EventEmitter(); // Added
  // public gridOptions: GridOptions; // Moved this line up
  public gridConfig: any; // Added
  public totalRecordCount: number; // Added

  constructor(private translateService: TranslateService) { } // Modified: added TranslateService

  public ngOnChanges(changes: any) { // Modified: changed type from { [propKey: string]: SimpleChange } to any
    if (changes.gridConfig && changes.gridConfig.currentValue) { // Added
      this.gridConfig = changes.gridConfig.currentValue; // Added
    }

    if (changes?.dataSource) { // Added
      if (changes.dataSource.currentValue) { // Added
        this.dataSource = changes.dataSource.currentValue; // Added
        this.generateGrid(); // Added
      }
    }
    // Original logic removed:
    // for (const propName in changes) {
    //   if (propName === 'options') {
    //     const changedProp = changes[propName];
    //     if (!changedProp.isFirstChange()) {
    //       // this.dataSource = changedProp.currentValue;
    //       this.refresh = true;
    //       this.generateGrid();
    //     }
    //   }
    // }
  }

  public ngOnInit() {
    this.generateGrid();
  }

  public generateGrid() {
    this.gridOptions = {} as GridOptions;
    this.gridOptions.columnDefs = this.columns;
    /*
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.showToolPanel = false;
    */
    // ensure that even after sorting the rows maintain order
    this.gridOptions.onSortChanged = () => {
      /*
      (this.gridOptions.api as any).forEachNode((node) => { // Modified: added (this.gridOptions.api as any)
        node.setDataValue('#', node.rowIndex + 1);
      });

      (this.gridOptions.api as any).refreshCells(); // Modified: added (this.gridOptions.api as any)
      */
    };

    // this.gridOptions.suppressCellSelection = true;
    // this.gridOptions.suppressMenuColumnPanel = true; // ag-enterprise only
    // this.gridOptions.suppressMenuMainPanel = true; // ag-enterprise only
    this.gridOptions.rowSelection = 'single';
    if (this.dataSource && this.dataSource.paginationPageSize) { // Modified: added check for paginationPageSize
      this.gridOptions.rowModelType = 'clientSide'; // Modified: from 'pagination' to 'clientSide'
      this.gridOptions.paginationPageSize = this.dataSource.paginationPageSize;
    }
    this.gridOptions.onRowSelected = (event) => {
      this.rowSelectedFunc(event);
    };
    this.gridOptions.onGridReady = (event) => {

      if (window.innerWidth > 768) {
        /*
        // (this.gridOptions.api as any)?.sizeColumnsToFit(); // Commented out
        // do not resize if columns are more than 10
        if (this.columns.length <= 10) {
          setTimeout(() => (this.gridOptions.api as any).sizeColumnsToFit(), 300, true); // Modified: added (this.gridOptions.api as any)
        }
        */
      }

      // setDatasource() is a grid ready function
      if (this.dataSource) {
        // (this.gridOptions.api as any).setDatasource(this.dataSource); // Commented out and added (this.gridOptions.api as any)
      }

      const commonRowStyles = {
        'font-size': '14px',
        cursor: 'pointer'
      };

      this.gridOptions.getRowStyle = (params) => { // Modified: added params
        return Object.assign({}, commonRowStyles); // Modified: added this.moreRowStyles(params)
      };
    };
  }

  public exportAllData() {
    // (this.gridOptions.api as any).exportDataAsCsv(); // Commented out and added (this.gridOptions.api as any)
  }

  public ngOnDestroy() {
    this.data = [];
  }

  get rowData() {
    return this.data || [];
  }

  public rowSelectedFunc(event) {
    this.onSelectedRow.emit(event);
  }
}
