import {
    Component, ComponentFactoryResolver, ComponentRef,
    OnChanges, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { Widget } from '../../widget';
import { WidgetLibraryService } from '../../widget-library.service';

/**
 * SelectWidgetComponent
 * Dynamically creates a component based on a layout node.
 */
@Component({
    selector: 'jsf-select-widget',
    styleUrls: ['./select-widget.component.css'],
    templateUrl: './select-widget.component.html'
})
export class SelectWidgetComponent extends Widget implements OnInit, OnChanges {
    private newComponent: ComponentRef<any>;
    @ViewChild('widgetContainer', { read: ViewContainerRef }) widgetContainer: ViewContainerRef;

    constructor(private readonly componentFactory: ComponentFactoryResolver,
        private readonly widgetLibraryService: WidgetLibraryService,
        jsf: JsonSchemaFormService) {
            super(jsf);
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

    private createComponent() {
        // TODO: What if layoutNode were to change?  The form would be incorrect.
        if (!this.newComponent && this.layoutNode && this.layoutNode.type) {
            this.newComponent = this.widgetContainer.createComponent(
                this.componentFactory.resolveComponentFactory(this.widgetLibraryService.getWidget(this.layoutNode.type) as any)
            );
        }
    }

}
