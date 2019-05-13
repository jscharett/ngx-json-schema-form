import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonSchemaFormService } from '.';

import { JsonSchemaFormComponent } from './json-schema-form.component';

describe('JsonSchemaFormComponent', () => {
  let component: JsonSchemaFormComponent;
  let fixture: ComponentFixture<JsonSchemaFormComponent>;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [ JsonSchemaFormComponent ],
      providers: [{
          provide: JsonSchemaFormService,
          useValue: {}
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonSchemaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
