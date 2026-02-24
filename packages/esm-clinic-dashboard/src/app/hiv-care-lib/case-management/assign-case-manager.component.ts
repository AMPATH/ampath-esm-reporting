import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { CaseManagementResourceService } from './../../etl-api/case-management-resource.service';

@Component({
  standalone: false,
  selector: 'assign-case-manager',
  templateUrl: './assign-case-manager.component.html',
  styleUrls: ['./assign-case-manager.component.css']
})
export class AssignCaseManagerComponent implements OnInit {
  @Input() public assignCaseManager: boolean;

  constructor(
    private caseManagementResourceService: CaseManagementResourceService
  ) {}

  public ngOnInit() {}
}
