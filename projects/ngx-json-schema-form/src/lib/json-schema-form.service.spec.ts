import { TestBed } from '@angular/core/testing';

import { JsonSchemaFormService } from './json-schema-form.service';

describe('JsonSchemaFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonSchemaFormService = TestBed.get(JsonSchemaFormService);
    expect(service).toBeTruthy();
  });
});
