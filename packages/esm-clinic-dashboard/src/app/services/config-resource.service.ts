import { Injectable } from '@angular/core';

import { ConfigObject, getConfigStore } from '@openmrs/esm-framework';
import { FormEntryConfig } from '../types';

@Injectable()
export class ConfigResourceService {
  public getConfig() {
    let formEntryConfig: ConfigObject = getConfigStore('@ampath/esm-clinic-dashboard').getState()?.config;
    getConfigStore('@ampath/esm-clinic-dashboard').subscribe((store) => {
      if (store.loaded && store) {
        formEntryConfig = store.config;
      }
    });

    return formEntryConfig as FormEntryConfig;
  }
}
