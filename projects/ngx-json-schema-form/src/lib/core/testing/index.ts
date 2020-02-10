import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';

import { LayoutNode } from '../models/layout-node';

import { JsonSchemaFormService } from '../../form/services/json-schema-form.service';

export function extendModuleDef(moduleDef: TestModuleMetadata = {}): TestModuleMetadata {
    const j = jasmine;
    const def: TestModuleMetadata = {schemas: [], providers: [], ...moduleDef};
    if (!def.schemas.includes(NO_ERRORS_SCHEMA)) {
        def.schemas.push(NO_ERRORS_SCHEMA);
    }
    if (!def.providers.find((provider: any) => {
        return provider.provide === JsonSchemaFormService;
    })) {
        const mockFormService: JsonSchemaFormService = j.createSpyObj('JsonSchemaFormService', {
            initializeControl: true,
            updateValue: undefined
        });

        (<jasmine.Spy>mockFormService.initializeControl).and.callFake((comp) => {
            comp.options = comp.layoutNode.options;
        });
        def.providers.push({
            provide: JsonSchemaFormService,
            useValue: mockFormService
        });
    }

    return def;
}

export function extendLayoutNode(layoutNode: any | LayoutNode): LayoutNode {
    return {id: '0', options: {}, ...layoutNode};
}
