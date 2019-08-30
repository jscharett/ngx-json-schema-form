import { inject, TestBed } from '@angular/core/testing';

import basicJSONLayout from '../../../assests/example-layouts/jsf-layout-basic.json';

import { LayoutNode } from '../../core/models/layout-node';

import { LayoutService } from './layout.service';
import { SchemaService } from './schema.service';

describe('LayoutService', () => {
    const getExpectedLayout = (props: Array<string>): Array<LayoutNode> => {
        return props.reduce((layout: Array<LayoutNode>, prop: string) => {
            return layout.concat(<any>jasmine.objectContaining({
                dataPointer: `/${prop}`,
                id: <any>jasmine.any(String),
                options: <any>jasmine.any(Object),
                type: <any>jasmine.any(String)
            }));
        }, []);
    };

    beforeEach(() => {
        const schemaService: SchemaService = Object.create({}, {
            dataPointerMap: {
                enumerable: true,
                get: jasmine.createSpy('get')
            }
        });

        TestBed.configureTestingModule({
            providers: [
                LayoutService,
                {provide: SchemaService, useValue: schemaService}
            ]
        });
    });

    beforeEach(inject([SchemaService], (service: SchemaService) => {
        (<jasmine.Spy>Object.getOwnPropertyDescriptor(service, 'dataPointerMap').get).and.returnValue(new Map<string, any>([
            ['/a', {type: 'object'}],
            ['/a/b', {type: 'string'}],
            ['/a/d', {type: 'array'}],
            ['/b', {type: 'boolean'}],
            ['/c', {type: 'number'}],
            ['/d', {type: 'integer'}],
            ['/e', {type: 'null'}],
            ['/attributes/comment', {type: 'string'}]
        ]));
    }));

    it('should be created', () => {
        const service: LayoutService = TestBed.get(LayoutService);
        expect(service).toBeTruthy();
    });

    it('should augment layout with derived props', inject([LayoutService], (service: LayoutService) => {
        service.setLayout(basicJSONLayout);
        const layoutNode: LayoutNode = service.layout[0];
        expect(layoutNode.dataPointer).toEqual(`/${basicJSONLayout[0].key}`);
        expect(layoutNode.type).toEqual(basicJSONLayout[0].type);
        expect(layoutNode.name).toEqual(basicJSONLayout[0].name);
    }));

    describe('should be able to build partial layout from schema', () => {
        beforeEach(inject([SchemaService], (service: SchemaService) => {
            (<jasmine.Spy>Object.getOwnPropertyDescriptor(service, 'dataPointerMap').get).and.returnValue(new Map<string, any>([
                ['/a', {type: 'string'}],
                ['/b', {type: 'boolean'}],
                ['/c', {type: 'number'}],
                ['/d', {type: 'integer'}],
                ['/e', {type: 'null'}]
            ]));
        }));

        it('should allow pointers to follow *', inject([LayoutService], (service: LayoutService) => {
            service.setLayout(['*', 'b', 'a']);
            expect(service.layout).toEqual(getExpectedLayout(['c', 'd', 'e', 'b', 'a']));
        }));

        it('should allow pointers to precede *', inject([LayoutService], (service: LayoutService) => {
            service.setLayout(['d', 'e', '*']);
            expect(service.layout).toEqual(getExpectedLayout(['d', 'e', 'a', 'b', 'c']));
        }));

        it('should allow pointers to surround *', inject([LayoutService], (service: LayoutService) => {
            service.setLayout(['d', '*', 'b']);
            expect(service.layout).toEqual(getExpectedLayout(['d', 'a', 'c', 'e', 'b']));
        }));
    });

    describe('layout.dataPointer', () => {
        describe('object path layouts', () => {
            it('should handle object.path only layouts', inject([LayoutService], (service: LayoutService) => {
                service.setLayout(['attributes.comment']);
                expect(<any>service.layout).toEqual([jasmine.objectContaining({
                    dataPointer: '/attributes/comment'
                })]);
            }));

            it('should handle json/pointer only layouts', inject([LayoutService], (service: LayoutService) => {
                service.setLayout(['/attributes/comment']);
                expect(<any>service.layout).toEqual([jasmine.objectContaining({
                    dataPointer: '/attributes/comment'
                })]);
            }));

            it('should handle object.path layouts', inject([LayoutService], (service: LayoutService) => {
                service.setLayout([{key: 'attributes.comment'}]);
                expect(<any>service.layout).toEqual([jasmine.objectContaining({
                    dataPointer: '/attributes/comment'
                })]);
            }));

            it('should handle json/pointer layouts', inject([LayoutService], (service: LayoutService) => {
                service.setLayout([{key: '/attributes/comment'}]);
                expect(<any>service.layout).toEqual([jasmine.objectContaining({
                    dataPointer: '/attributes/comment'
                })]);
            }));

            it('should drop unknown layout and display console error', inject([LayoutService], (service: LayoutService) => {
                spyOn(console, 'error');
                service.setLayout(['a.b', <any>['a.c'], 'a.d']);
                expect(service.layout).toEqual(getExpectedLayout(['a/b', 'a/d']));
                expect(console.error).toHaveBeenCalledTimes(1 + 1);
                expect(console.error).toHaveBeenCalledWith(['a.c']);
            }));

            it('should be able to build layout from schema', inject([LayoutService, SchemaService],
                (service: LayoutService, schemaService: SchemaService) => {
                (<jasmine.Spy>Object.getOwnPropertyDescriptor(schemaService, 'dataPointerMap').get).and.returnValue(new Map<string, any>([
                    ['/a', {type: 'string'}],
                    ['/b', {type: 'boolean'}]
                ]));
                service.setLayout(['*']);
                expect(service.layout).toEqual(getExpectedLayout(['a', 'b']));
            }));
        });
    });

    describe('layout.type', () => {
        beforeEach(inject([SchemaService], (service: SchemaService) => {
            (<jasmine.Spy>Object.getOwnPropertyDescriptor(service, 'dataPointerMap').get).and.returnValue(new Map<string, any>([
                ['/a', {type: 'string'}],
                ['/b', {type: 'boolean'}]
            ]));
        }));

        it('should set missing types using schema', inject([LayoutService], (service: LayoutService) => {
            service.setLayout(['a', {key: 'b'}]);
            expect(<any>service.layout).toEqual([jasmine.objectContaining({
                type: 'string'
            }), jasmine.objectContaining({
                type: 'boolean'
            })]);
        }));

        it('should defer to user defined type', inject([LayoutService], (service: LayoutService) => {
            service.setLayout([{key: 'b', type: 'checkbox'}]);
            expect(<any>service.layout).toEqual([jasmine.objectContaining({
                type: 'checkbox'
            })]);
        }));

        it('should remove layouts with no type', inject([LayoutService], (service: LayoutService) => {
            spyOn(console, 'error');
            service.setLayout([{name: 'remove'}, {key: 'b', type: 'checkbox'}]);
            expect(<any>service.layout).toEqual([jasmine.objectContaining({
                type: 'checkbox'
            })]);
        }));
    });
});
