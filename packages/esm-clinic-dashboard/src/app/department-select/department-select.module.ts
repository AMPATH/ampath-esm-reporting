import { NgModule } from '@angular/core';
import { DepartmentSelectComponent } from '../department-select/department-select.component';

@NgModule({
  imports: [DepartmentSelectComponent],
  exports: [DepartmentSelectComponent],
  providers: []
})
export class DepartSelectModule { }
