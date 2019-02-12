import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJsonSchemaFormComponent } from './ngx-json-schema-form.component';

describe('NgxJsonSchemaFormComponent', () => {
  let component: NgxJsonSchemaFormComponent;
  let fixture: ComponentFixture<NgxJsonSchemaFormComponent>;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [ NgxJsonSchemaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxJsonSchemaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
