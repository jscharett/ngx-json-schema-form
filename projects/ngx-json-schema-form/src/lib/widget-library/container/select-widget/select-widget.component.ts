import {
    Component, ComponentFactoryResolver, ComponentRef,
    OnChanges, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

import { ElementDataStorageService } from '../../../element-data-storage.service';
import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { Widget } from '../../widget';
import { WidgetLibraryService } from '../../widget-library.service';

/**
 * Dynamically creates a widget component based on a layout node.
 * Changes in @Input attributes will be passed onto the created widget.
 */
@Component({
    selector: 'jsf-select-widget',
    styleUrls: ['./select-widget.component.css'],
    templateUrl: './select-widget.component.html'
})
export class SelectWidgetComponent extends Widget implements OnInit, OnChanges {
    private newComponent: ComponentRef<any>;

    /** Placeholder for injecting widget */
    @ViewChild('widgetContainer', { read: ViewContainerRef }) widgetContainer: ViewContainerRef;

    constructor(private readonly componentFactory: ComponentFactoryResolver,
        private readonly widgetLibraryService: WidgetLibraryService,
        jsf: JsonSchemaFormService,
        elementDataStorage: ElementDataStorageService) {
            super(jsf, elementDataStorage);
    }

    ngOnInit() {
        this.updateComponent();
    }

    ngOnChanges() {
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

    private createComponent(): void {
        // TODO: What if layoutNode were to change?  The form would be incorrect.
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
        if (this.layoutNode.content) {
            return [ [ this.jsf.compileTemplate(this.layoutNode.content, this.layoutNode.options) ] ];
        }
    }
}
