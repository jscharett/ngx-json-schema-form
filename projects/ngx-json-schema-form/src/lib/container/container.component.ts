import { Component, OnInit } from '@angular/core';

import { Widget } from '../core/decorators/widget.decorator';
import { LayoutNode } from '../core/models/layout-node';
import { ElementDataStorageService } from '../core/services/element-data-storage.service';
import { AbstractWidget } from '../core/widget/widget';

import { JsonSchemaFormService } from '../form/services/json-schema-form.service';

/** Displays a div, fieldset, details or tabs/tab element and renders children inside it */
@Widget({
    types: ['div', 'fieldset', 'details', 'tabs', 'tab']
})
@Component({
    selector: 'jsf-container',
    styleUrls: ['./container.component.scss'],
    templateUrl: './container.component.html'
})
export class ContainerComponent extends AbstractWidget implements OnInit {
    public selectedLayout: LayoutNode;

    constructor(jsf: JsonSchemaFormService, elementDataStorage: ElementDataStorageService) {
        super(jsf, elementDataStorage);
    }

    ngOnInit() {
        super.ngOnInit();
        this.selectedLayout = this.layoutNode.type === 'tabs'
            ? this.layoutNode.items[this.getSelectedIndex()]
            : undefined;
    }

    trackByFn(index) {
        return index;
    }

    onTabClick(layout: LayoutNode): void {
        this.selectedLayout = layout;
    }

    private getSelectedIndex(): number {
        const index = Number.isInteger(this.layoutNode.options.selectedIndex)
            ? this.layoutNode.options.selectedIndex
            : 0;

        return Math.min(Math.max(index, 0), this.layoutNode.items.length - 1);
    }

}
