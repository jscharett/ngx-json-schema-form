import {
    Component, ComponentFactoryResolver, ComponentRef, Input,
    OnChanges, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

import { LayoutItem } from '../../../layout-item.data';

/**
 * SelectWidgetComponent
 * Dynamically creates a component based on a layout node.
 */
@Component({
    selector: 'jsf-select-widget',
    styleUrls: ['./select-widget.component.css'],
    templateUrl: './select-widget.component.html'
})
export class SelectWidgetComponent implements OnInit, OnChanges {
    @Input() layoutNode: LayoutItem;

    private newComponent: ComponentRef<any>;
    @ViewChild('widgetContainer', { read: ViewContainerRef }) widgetContainer: ViewContainerRef;

    constructor(private readonly componentFactory: ComponentFactoryResolver) { }

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
                this.componentFactory.resolveComponentFactory(this.layoutNode.widget as any)
            );
        }
    }

}
