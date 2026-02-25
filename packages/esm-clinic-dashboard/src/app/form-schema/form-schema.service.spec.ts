import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormResourceService } from '../openmrs-api/form-resource.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TranslateModule } from '@ngx-translate/core';


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        LocalStorageService,
        FormResourceService,
      ],
      imports: [TranslateModule.forRoot()],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

    expect(formSchemaService).toBeTruthy();
  });

  it('should have getFormSchemaByUuid method defined', () => {
    expect(formSchemaService.getFormSchemaByUuid).toBeTruthy();
  });
});
