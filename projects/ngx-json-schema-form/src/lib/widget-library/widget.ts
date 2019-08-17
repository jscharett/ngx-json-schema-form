import { AfterViewInit, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ElementDataStorageService } from '../core/services/element-data-storage.service';
import { JsonSchemaFormService } from '../json-schema-form.service';
import { LayoutNode } from '../layout-node';

/** Widget */
export abstract class Widget implements OnChanges, OnInit, AfterViewInit {
    /** Flag to disable the control */
    controlDisabled = false;
    /** Name for the control */
    controlName: string;
    /** Value of the control */
    controlValue: any;
    /** Associated FormControl for widget */
    formControl: AbstractControl;
    /** Options for the control */
    options: any;

    /** Layout Node describing the control */
    @Input() layoutNode: LayoutNode;
    /** Index of the layout in the Layout array */
    @Input() layoutIndex: Array<number>;
    /** Index of the data in data array */
    @Input() dataIndex: Array<number>;

    /** Reference to the underlying control. Look to replace using FormControl */
    @ViewChild('control', {read: ElementRef}) private readonly control: ElementRef;

    /** constructor */
    constructor(protected jsf: JsonSchemaFormService, protected elementDataStorage: ElementDataStorageService) {}

    /** Propagate layoutNode changes to the ElementDataStorage */
    ngOnChanges(changes: SimpleChanges) {
        if (changes.layoutNode) {
            this.updateData();
        }
    }
    /**
     * Initialize the control and populate the options
     */
    ngOnInit() {
        this.jsf.initializeControl(this);
        this.options = this.layoutNode.options || {};
    }

    /** Set the initial layout in the ElementDataStorage */
    ngAfterViewInit() {
        this.updateData();
    }

    /** Update the ElementDataStorage */
    private updateData(): void {
        if (this.control) {
            this.elementDataStorage.set(this.control.nativeElement, 'layout', this.layoutNode.layoutDefinition);
        }
    }

    /**
     * Update the value of the control
     * @param event - Change event
     */
    updateValue(event: Event) {
        this.jsf.updateValue(this, (<HTMLInputElement>event.target).value);
    }
}
