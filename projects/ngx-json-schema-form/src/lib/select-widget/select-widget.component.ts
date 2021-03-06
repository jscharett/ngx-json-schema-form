import {
    Component, ComponentFactoryResolver, ComponentRef,
    OnChanges, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

import { ElementDataStorageService } from '../core/services/element-data-storage.service';
import { WidgetLibraryService } from '../core/services/widget-library.service';
import { AbstractWidget } from '../core/widget/widget';

import { JsonSchemaFormService } from '../form/services/json-schema-form.service';

/**
 * Dynamically creates a widget component based on a layout node.
 * Changes in @Input attributes will be passed onto the created widget.
 */
@Component({
    selector: 'jsf-select-widget',
    styleUrls: ['./select-widget.component.css'],
    templateUrl: './select-widget.component.html'
})
export class SelectWidgetComponent extends AbstractWidget implements OnChanges, OnInit {
    private newComponent: ComponentRef<any>;

    /** Placeholder for injecting widget */
    @ViewChild('widgetContainer', { read: ViewContainerRef }) widgetContainer: ViewContainerRef;

    constructor(private readonly componentFactory: ComponentFactoryResolver,
        private readonly widgetLibraryService: WidgetLibraryService,
        jsf: JsonSchemaFormService,
        elementDataStorage: ElementDataStorageService) {
            super(jsf, elementDataStorage);
    }

    ngOnChanges() {
        this.updateComponent();
    }

    ngOnInit() {
        this.updateComponent();
    }

    private updateComponent(): void {
        this.createComponent();
        if (this.newComponent) {
            for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
                this.newComponent.instance[input] = this[input];
            }
        }
    }

    /**
     * @todo Handle case of layoutNode change
     */
    private createComponent(): void {
        if (!this.newComponent && this.layoutNode && this.layoutNode.type) {
            this.newComponent = this.widgetContainer.createComponent(
                this.componentFactory.resolveComponentFactory(
                    this.widgetLibraryService.getWidget(this.layoutNode.type) as any
                ),
                undefined,
                undefined,
                this.generateNgContent()
            );
        }
    }

    private generateNgContent(): Array<Array<any>> {
        if (this.layoutNode.template) {
            return [ [ this.jsf.compileTemplate(this.layoutNode.template, this.layoutNode.options) ] ];
        }
    }
}
