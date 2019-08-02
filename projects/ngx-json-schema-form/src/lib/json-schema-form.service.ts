import { CommonModule } from '@angular/common';
import {
    Compiler, Component, ComponentRef, Injectable, Injector,
    ModuleWithComponentFactories, NgModule, NgModuleRef
} from '@angular/core';

import { Subject } from 'rxjs';

import { LayoutItem } from './layout-item.data';
import { LayoutNode } from './layout-node';
import { Widget } from './widget-library';

/* tslint:disable: max-classes-per-file */
/** TODO */
@Injectable()
export class JsonSchemaFormService {
    private x = false;

    private readonly eventFiredSource: Subject<{event: Event; layout: LayoutItem}> = new Subject<{event: Event; layout: LayoutItem}>();

    /** Observable triggered when an input event is fired */
    readonly eventFired$ = this.eventFiredSource.asObservable();

    /** Creates a component with passed in template and associated context */
    private static createComponent(template: string, context: {[key: string]: any}): any {
        return Component({
            selector: `runtime-component-sample`,
            template
        })(class RuntimeComponent {
            options: any = context;
        });
    }

    /** Create a module for use with the RuntimeComponent */
    private static createModule(component: any, compiler: Compiler): ModuleWithComponentFactories<any> {
        @NgModule({ imports: [CommonModule], declarations: [component] })
        class RuntimeComponentModule { }

        return compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    }

    /** Get a components innerHTML as a document Fragment */
    private static getDocumentFragment(componentRef: ComponentRef<any>): DocumentFragment {
        const template = document.createElement('template');
        template.innerHTML = (<HTMLElement>componentRef.location.nativeElement).innerHTML;

        return template.content;
    }

    constructor(private readonly compiler: Compiler, private readonly injector: Injector, private readonly moduleRef: NgModuleRef<any>) {}

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

    /** Fires the event observable */
    fireEvent(event: Event, layoutNode: LayoutNode): void {
        this.eventFiredSource.next({
            event,
            layout: layoutNode.layoutDefinition
        });
    }

    /**
     * Compiles an HTML tempalte and data into a document fragment
     * @param template - HTML template to render
     * @param context - options to use when rendering the template
     */
    compileTemplate(template: string, context: {[key: string]: any} = {}): DocumentFragment {
        const component: any = JsonSchemaFormService.createComponent(template, context);
        const module = JsonSchemaFormService.createModule(component, this.compiler);
        const factory = module.componentFactories.find((f) => f.componentType === component);
        const componentRef: ComponentRef<any> = factory.create(this.injector, undefined, undefined, this.moduleRef);

        componentRef.hostView.detectChanges();
        const fragment = JsonSchemaFormService.getDocumentFragment(componentRef);
        componentRef.destroy();

        return fragment;
    }
}
