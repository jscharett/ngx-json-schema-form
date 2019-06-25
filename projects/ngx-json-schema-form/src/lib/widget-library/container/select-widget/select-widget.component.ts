import {
    Component, ComponentFactoryResolver, ComponentRef,
    OnChanges, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { Widget } from '../../widget';
import { WidgetLibraryService } from '../../widget-library.service';

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
        if (!this.newComponent && this.layoutNode && this.layoutNode.widget) {
            this.newComponent = this.widgetContainer.createComponent(
                this.componentFactory.resolveComponentFactory(this.widgetLibraryService.getWidget(this.layoutNode.widget) as any)
            );
        }
    }

}
