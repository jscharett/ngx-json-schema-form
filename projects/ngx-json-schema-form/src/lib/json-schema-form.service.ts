// import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
// import {
//     Compiler, Component, ComponentRef, Injectable, Injector,
//     ModuleWithComponentFactories, NgModule, NgModuleRef
// } from '@angular/core';

import Handlebars from 'handlebars/dist/cjs/handlebars';

import { AbstractWidget } from './core/widget/widget';

/* tslint:disable: max-classes-per-file */
/** Helper service */
@Injectable()
export class JsonSchemaFormService {
    private x = false;

    /** Creates a component with passed in template and associated context */
    // private static createComponent(template: string, context: {[key: string]: any}): any {
    //     return Component({
    //         selector: `runtime-component-sample`,
    //         template
    //     })(class RuntimeComponent {
    //         options: any = context;
    //     });
    // }

    /** Create a module for use with the RuntimeComponent */
    // private static createModule(component: any, compiler: Compiler): ModuleWithComponentFactories<any> {
    //     @NgModule({ imports: [CommonModule], declarations: [component] })
    //     class RuntimeComponentModule { }

    //     return compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    // }

    /** Get a components innerHTML as a document Fragment */
    // private static getDocumentFragment(componentRef: ComponentRef<any>): DocumentFragment {
    //     const template = document.createElement('template');
    //     template.innerHTML = (<HTMLElement>componentRef.location.nativeElement).innerHTML;

    //     return template.content;
    // }

    // constructor(private readonly compiler: Compiler,private readonly injector: Injector, private readonly moduleRef: NgModuleRef<any>) {}

    /** Sets a widgets properties upon widget creation */
    initializeControl(control: AbstractWidget, bind = true): void {
        // Do we even need to do this?  seems silly
        control.controlName = control.layoutNode.name;
    }

    /**
     * @todo Implement updateValue or remove if unnecessary
     * Manually update value
     */
    updateValue(ctx: any, value: any): void {
        this.x = !this.x;
    }

    /**
     * Compiles an HTML tempalte and data into a document fragment
     * @param template - HTML template to render
     * @param context - options to use when rendering the template
     */
    compileTemplate(template: string, context: {[key: string]: any} = {}): DocumentFragment {
        const templateTag = document.createElement('template');
        templateTag.innerHTML = Handlebars.compile(template)({options: context});

        return templateTag.content;
    }

    // /**
    //  * Compiles an HTML tempalte and data into a document fragment
    //  * @param template - HTML template to render
    //  * @param context - options to use when rendering the template
    //  */
    // compileTemplate(template: string, context: {[key: string]: any} = {}): DocumentFragment {
    //     const component: any = JsonSchemaFormService.createComponent(template, context);
    //     const module = JsonSchemaFormService.createModule(component, this.compiler);
    //     const factory = module.componentFactories.find((f) => f.componentType === component);
    //     const componentRef: ComponentRef<any> = factory.create(this.injector, undefined, undefined, this.moduleRef);

    //     componentRef.hostView.detectChanges();
    //     const fragment = JsonSchemaFormService.getDocumentFragment(componentRef);
    //     componentRef.destroy();

    //     return fragment;
    // }
}
