
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { extendLayoutNode, extendModuleDef } from './index';

import { LayoutNode } from '../models/layout-node';

import { JsonSchemaFormService } from '../../form/services/json-schema-form.service';

describe('testing', () => {
    describe('extendLayoutNode', () => {
        it('should have default props', () => {
            expect(extendLayoutNode({type: 'cat'})).toEqual({
                id: '0',
                options: {},
                type: 'cat'
            } as any as LayoutNode);
        });

        it('should preserve existing', () => {
            expect(extendLayoutNode({id: '1', options: {max: 5}})).toEqual({
                id: '1',
                options: {max: 5}
            } as any as LayoutNode);
        });
    });

    describe('extendModuleDef', () => {
        it('should add no errors schema if missing', () => {
            expect(extendModuleDef()).toEqual(jasmine.objectContaining({
                schemas: [NO_ERRORS_SCHEMA]
            }));

            expect(extendModuleDef({})).toEqual(jasmine.objectContaining({
                schemas: [NO_ERRORS_SCHEMA]
            }));

            expect(extendModuleDef({schemas: [CUSTOM_ELEMENTS_SCHEMA]})).toEqual(jasmine.objectContaining({
                schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
            }));

            expect(extendModuleDef({schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]})).toEqual(jasmine.objectContaining({
                schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
            }));
        });

        it('should add JSONSchemaFormService if missing', () => {
            expect(extendModuleDef()).toEqual(jasmine.objectContaining({
                providers: jasmine.arrayContaining([
                    jasmine.objectContaining({
                        provide: JsonSchemaFormService
                    })
                ])
            }));

            expect(extendModuleDef({})).toEqual(jasmine.objectContaining({
                providers: jasmine.arrayContaining([
                    jasmine.objectContaining({
                        provide: JsonSchemaFormService
                    })
                ])
            }));

            const provider: {provide: any; useValue: any} = {
                provide: 10,
                useValue: 1
            };

            expect(extendModuleDef({providers: [provider]})).toEqual(jasmine.objectContaining({
                providers: jasmine.arrayContaining([
                    provider,
                    jasmine.objectContaining({
                        provide: JsonSchemaFormService
                    })
                ])
            }));

            provider.provide = JsonSchemaFormService;
            expect(extendModuleDef({providers: [provider]})).toEqual(jasmine.objectContaining({
                providers: jasmine.arrayContaining([
                    provider
                ])
            }));
        });
    });
});
