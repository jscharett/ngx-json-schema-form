import {
    ComponentFactoryResolver, ComponentRef, Directive, Input,
    OnChanges, OnInit, ViewContainerRef
} from '@angular/core';

import { LayoutNode } from '../../core/models/layout-node';
import { WidgetLibraryService } from '../../core/services/widget-library.service';

import { JsonSchemaFormService } from '../../form/services/json-schema-form.service';

@Directive({
    selector: '[jsfLayout]'
})
export class SelectWidgetsDirective implements OnChanges, OnInit {
    @Input('jsfLayout') layout: Array<LayoutNode> = [];

    constructor(private readonly componentFactory: ComponentFactoryResolver,
        private readonly widgetContainer: ViewContainerRef,
        private readonly widgetLibraryService: WidgetLibraryService,
        private readonly jsf: JsonSchemaFormService) {}

    ngOnChanges() {
        this.refreshWidgets();
    }

    ngOnInit() {
        this.refreshWidgets();
    }

    private refreshWidgets(): void {
        this.widgetContainer.clear();
        this.createWidgets();
    }

    private createWidgets(): void {
        this.layout.forEach((layoutNode: LayoutNode) => {
            this.createComponent(layoutNode).instance.layoutNode = layoutNode;
        });
    }

    private createComponent(layoutNode: LayoutNode): ComponentRef<any> {
        return this.widgetContainer.createComponent(
            this.componentFactory.resolveComponentFactory(
                this.widgetLibraryService.getWidget(layoutNode.type) as any
            ),
            undefined,
            undefined,
            this.generateNgContent(layoutNode)
        );
    }

    private generateNgContent(layoutNode: LayoutNode): Array<Array<any>> {
        if (layoutNode.template) {
            return [ [ this.jsf.compileTemplate(layoutNode.template, layoutNode.options) ] ];
        }
    }

}
