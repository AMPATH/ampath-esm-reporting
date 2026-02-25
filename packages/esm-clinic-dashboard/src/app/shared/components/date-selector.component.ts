import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';

import dayjs from 'dayjs';
import { DatePipe } from '@angular/common';
@Component({
  standalone: false,
  selector: 'date-selector',
  templateUrl: 'date-selector.component.html'
})
export class DateSelectorComponent implements OnInit, OnDestroy {
  public selectedDate: any;
  // @Input() default: any;

  @Input()
  public get default(): any {
    return this._default;
  }
  public set default(v: any) {
    this._default = v;

    if (dayjs(v).isValid()) {
      this.selectedDate = this._datePipe.transform(new Date(this.default), 'yyyy-MM-dd');
    }
  }

  @Input() public hideDatePicker = false;
  @Output() public dateSelected = new EventEmitter();
  private _datePipe: DatePipe;
  private _default: any;

  constructor() {
    this._datePipe = new DatePipe('en-US');
  }

  public ngOnInit() {
    if (this.default) {
      this.selectedDate = this._datePipe.transform(new Date(this.default), 'yyyy-MM-dd');
    } else {
      this.selectedDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
    }

    this.dateSelected.emit(this.selectedDate);
  }

  public ngOnDestroy() { }

  public navigateDay(value) {
    if (value) {
      const m = dayjs(new Date(this.selectedDate));
      const revisedDate = m.add(value, 'd');

      this.selectedDate = this._datePipe.transform(revisedDate.toDate(), 'yyyy-MM-dd');
      this.dateSelected.emit(this.selectedDate);
    }
  }

  public onDateChanged(event: any): void {
    if (event) {
      this.selectedDate = event;
      this.dateSelected.emit(this.selectedDate);
    }
  }
}
