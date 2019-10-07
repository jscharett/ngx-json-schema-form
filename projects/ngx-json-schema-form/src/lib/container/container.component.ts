import { Component, DoCheck, HostBinding, KeyValueChangeRecord, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';

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
export class ContainerComponent extends AbstractWidget implements OnInit, DoCheck {
    @HostBinding('hidden') isHidden = false;
    private hiddenDiffer: KeyValueDiffer<string, any>;

    constructor(jsf: JsonSchemaFormService, elementDataStorage: ElementDataStorageService,
        private readonly differs: KeyValueDiffers) {
        super(jsf, elementDataStorage);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.layoutNode.type === 'tabs') {
            const activeLayout: LayoutNode = this.layoutNode.items.find((layoutNode: LayoutNode) => {
                return !!layoutNode.options.active;
            }) || this.layoutNode.items[0];
            this.layoutNode.items.forEach((layoutNode: LayoutNode) => {
                layoutNode.options.active = layoutNode === activeLayout;
            });
        } else if (this.layoutNode.type === 'tab') {
            this.isHidden = !this.layoutNode.options.active;
            this.hiddenDiffer = this.differs.find(this.layoutNode.options).create();
        }
    }

    ngDoCheck(): void {
        if (this.layoutNode.type === 'tab') {
            const changes = this.hiddenDiffer.diff(this.layoutNode.options);
            if (changes) {
                changes.forEachChangedItem((item: KeyValueChangeRecord<string, any>) => {
                    if (item.key === 'active') {
                        this.isHidden = !this.layoutNode.options.active;
                    }
                });
            }
        }
    }

    trackByFn(index) {
        return index;
    }

    onTabClick(layout: LayoutNode): void {
        this.layoutNode.items.forEach((layoutNode: LayoutNode) => {
            layoutNode.options.active = false;
        });
        layout.options.active = true;
    }
}
