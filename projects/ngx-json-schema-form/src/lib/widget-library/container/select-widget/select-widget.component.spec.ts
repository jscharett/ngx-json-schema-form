import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { WidgetLibraryService } from '../../widget-library.service';

import { SelectWidgetComponent } from './select-widget.component';

describe('SelectWidgetComponent', () => {
    let component: SelectWidgetComponent;
    let fixture: ComponentFixture<SelectWidgetComponent>;

    beforeEach(async () => {
        const mockFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            initializeControl: true
        });
        const mockWidgetService: WidgetLibraryService = jasmine.createSpyObj('WidgetLibraryService', {
            getWidget: class A {}
        });

        return TestBed.configureTestingModule({
            declarations: [ SelectWidgetComponent ],
            providers: [{
                provide: JsonSchemaFormService,
                useValue: mockFormService
            }, {
                provide: WidgetLibraryService,
                useValue: mockWidgetService
            }]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectWidgetComponent);
        component = fixture.componentInstance;
        component.layoutNode = {id: '0', options: {}};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
