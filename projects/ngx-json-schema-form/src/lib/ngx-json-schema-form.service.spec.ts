import { TestBed } from '@angular/core/testing';

import { NgxJsonSchemaFormService } from './ngx-json-schema-form.service';

describe('NgxJsonSchemaFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxJsonSchemaFormService = TestBed.get(NgxJsonSchemaFormService);
    expect(service).toBeTruthy();
  });
});
