import {
    Component /*, ComponentFactoryResolver, ComponentRef,*/
    // OnChanges, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

import { Widget } from '../core/decorators/widget.decorator';
import { ElementDataStorageService } from '../core/services/element-data-storage.service';
import { AbstractWidget } from '../core/widget/widget';

import { JsonSchemaFormService } from '../form/services/json-schema-form.service';

/**
 * Component for rendering dynamic component templates
 * @todo As of Angular 5, it appears that dynamic components are not possible when
 * using AOT compilation.  There appears to eb some hope with the new IVY rendering
 * engine that dynamic component will again be possible with AOT enable.  Need to revist
 * this component in the future @see{https://github.com/angular/angular/issues/20875}
 */
@Widget({
    types: ['template']
})
@Component({
    selector: 'jsf-template',
    styleUrls: ['./template.component.scss'],
    templateUrl: './template.component.html'
})
export class TemplateComponent extends AbstractWidget /*implements OnInit, OnChanges*/ {
    // private newComponent: ComponentRef<any>;

    // /** Placeholder for injecting widget */
    // @ViewChild('templateContainer', { read: ViewContainerRef }) templateContainer: ViewContainerRef;

    constructor(
        // private readonly componentFactory: ComponentFactoryResolver,
        jsf: JsonSchemaFormService, elementDataStorage: ElementDataStorageService) {
        super(jsf, elementDataStorage);
    }

    // ngOnInit() {
    //     this.updateComponent();
    // }

    // ngOnChanges() {
    //     this.updateComponent();
    // }

    // private updateComponent() {
    //     this.createComponent();
    //     if (this.newComponent) {
    //         for (const input of ['layoutNode', 'layoutIndex', 'dataIndex']) {
    //             this.newComponent.instance[input] = this[input];
    //         }
    //     }
    // }

    // private createComponent(): void {
    //     if (!this.newComponent && this.options.template) {
    //         this.newComponent = this.templateContainer.createComponent(
    //             this.componentFactory.resolveComponentFactory(this.options.template)
    //         );
    //     }
    // }

}
