import { CommonModule } from '@angular/common';
import {
    Compiler, Component, ComponentRef, Injectable, Injector,
    ModuleWithComponentFactories, NgModule, NgModuleRef
} from '@angular/core';

import { Widget } from './widget-library';

/* tslint:disable: max-classes-per-file */
/** TODO */
@Injectable()
export class JsonSchemaFormService {
    private x = false;

    constructor(private readonly compiler: Compiler, private readonly injector: Injector, private moduleRef: NgModuleRef<any>) {}

    /** Sets a widgets properties upon Widget creation */
    initializeControl(control: Widget, bind = true): void {
        // Do we even need to do this?  seems silly
        control.controlName = control.layoutNode.name;
    }

    /** TODO */
    updateValue(ctx: any, value: any): void {
        // TODO
        this.x = !this.x;
    }

    // Take a look ad Dynamic component Loading
    // https://angular.io/guide/dynamic-component-loader
    // Think about adding an ng-template to a container component
    // The component can then dynamically create a component with user template
    // and have it injected into the template.  The component can wrap the user
    // template in a template itself, and then publically expose it on a prop.
    // The conainter then "should" have access to the template and be able
    // to pass that inject that.  Would allow for ijecting the whole component
    // and letting angular control it, however, will need to look out
    // for memory leaks and such.
    // <button><ng-container *ngTemplateOutlet="custom; context:options"></ng-container></button>
    // <ng-template>
    //    <custom-component>
    //         <ng-template #custom>
    //             ...user content...
    compileTemplate(template: string, context: {[key: string]: any}): DocumentFragment {
        const component: any = this.createComponent(template, context);
        const module = this.createModule(component);
        const factory = module.componentFactories.find((f) => f.componentType === component);
        const componentRef: ComponentRef<any> = factory.create(this.injector, undefined, undefined, this.moduleRef);

        componentRef.hostView.detectChanges();
        const fragment = this.getDocumentFragment(componentRef);
        componentRef.destroy();

        return fragment;
    }

    createComponent(template: string, context: {[key: string]: any}): any {
        return Component({
            selector: `runtime-component-sample`,
            template
        })(class RuntimeComponent {
            options: any = context;
        });
    }

    createModule(component: any): ModuleWithComponentFactories<any> {
        @NgModule({ imports: [CommonModule], declarations: [component] })
        class RuntimeComponentModule { }

        return this.compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    }

    getDocumentFragment(componentRef: ComponentRef<any>): DocumentFragment {
        const template = document.createElement('template');
        template.innerHTML = (<HTMLElement>componentRef.location.nativeElement).innerHTML;

        return template.content;
    }

}
