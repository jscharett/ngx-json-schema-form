import { LayoutItem } from '../interfaces/layout-item.data';
import { SchemaAnalyzer } from '../interfaces/schema-analyzer.data';

import { LayoutNode } from './layout-node';

describe('LayoutNode', () => {
    describe('creation', () => {
        let service: SchemaAnalyzer;

        beforeEach(() => {
            service = Object.create({}, {
                dataPointerMap: {
                    enumerable: true,
                    get: jasmine.createSpy('get').and.returnValue(new Map<string, any>([
                        ['/a', {type: 'object'}]
                    ]))
                }
            });
        });

        it('should create an instance', () => {
            expect(new LayoutNode({type: 'section'})).toBeTruthy();
            expect(LayoutNode.create({type: 'section'}, service, undefined)).toBeTruthy();
            expect(LayoutNode.create('a', service, [])).toBeTruthy();
        });

        it('should throw error', () => {
            expect(() => new LayoutNode({key: 'a'})).toThrowError();
            expect(() => LayoutNode.create({key: 'b'}, service, undefined)).toThrowError();
            expect(() => LayoutNode.create('b', service, [])).toThrowError();
        });

        it('should have an uniquie id', () => {
            const node1 = new LayoutNode({type: 'section'});
            const node2 = new LayoutNode({type: 'section'});

            expect(node1.id).toBeDefined();
            expect(node2.id).toBeDefined();
            expect(node1.id).not.toEqual(node2.id);
        });
    });

    describe('layoutDefinition', () => {
        it('should return copy of layoutitem from creation', () => {
            const item: LayoutItem = {type: 'string'};
            const node: LayoutNode = new LayoutNode(item);

            expect(node.layoutDefinition).toEqual(item);
            expect(node.layoutDefinition).not.toBe(item);
        });
    });

    describe('type', () => {
        it('should be set from layout', () => {
            expect((new LayoutNode({type: 'text'}, {type: 'string'})).type).toBe('text');
            expect((new LayoutNode({type: 'section'})).type).toBe('section');
        });

        it('should be set from schema', () => {
            expect((new LayoutNode({key: 'a'}, {type: 'string'})).type).toBe('string');
        });
    });

    describe('name', () => {
        it('should be set from layout.name', () => {
            expect((new LayoutNode({type: 'string', name: 'a'})).name).toBe('a');
        });

        it('should be set from layout.key', () => {
            expect((new LayoutNode({key: 'b'}, {type: 'string'})).name).toBe('b');
        });

        it('should be empty', () => {
            expect((new LayoutNode({type: 'section'})).name).toBe('');
        });
    });

    describe('template', () => {
        it('should be undefined when not set', () => {
            expect((new LayoutNode({type: 'section'})).template).toBeUndefined();
        });

        it('should be defined when set', () => {
            expect((new LayoutNode({type: 'section', template: '<span>hi</span>'})).template).toBe('<span>hi</span>');
        });

        it('should be undefined if not a string', () => {
            expect((new LayoutNode(<any>{type: 'section', template: true})).template).toBeUndefined();
            expect((new LayoutNode(<any>{type: 'section', template: 1})).template).toBeUndefined();
            expect((new LayoutNode(<any>{type: 'section', template: ['hi']})).template).toBeUndefined();
            expect((new LayoutNode(<any>{type: 'section', template: {}})).template).toBeUndefined();
            expect((new LayoutNode(<any>{type: 'section', template: undefined})).template).toBeUndefined();
        });
    });

    describe('dataPointer', () => {
        it('should be set from layout.key object path', () => {
            expect((new LayoutNode({key: 'a.b.c'}, {type: 'string'})).dataPointer).toBe('/a/b/c');
        });

        it('should be set from layout.key json path', () => {
            expect((new LayoutNode({key: '/b/c/a'}, {type: 'string'})).dataPointer).toBe('/b/c/a');
        });

        it('should be /', () => {
            expect((new LayoutNode({type: 'section'})).dataPointer).toBe('/');
        });
    });

    describe('options', () => {
        it('should move unknown props to options', () => {
            expect((new LayoutNode({type: 'section', cat: 1})).options).toEqual({
                cat: 1
            });
        });

        it('should not move known props to options', () => {
            // 'key, type', 'name', 'options', 'template', 'items'
            expect((new LayoutNode({type: 'a', name: 'b', key: 'c', options: {}, template: '', items: []})).options).toEqual({});
        });

        it('should preserve existing options', () => {
            expect((new LayoutNode({type: 'section', options: {title: 'hi'}})).options).toEqual({
                title: 'hi'
            });
        });

        it('should favor existing options over unknown props', () => {
            expect((new LayoutNode({type: 'section', options: {title: 'hi'}, title: 'bye'})).options).toEqual({
                title: 'hi'
            });
        });

        it('should set props from schema', () => {
            expect((new LayoutNode({type: 'section'}, {
                description: 'hi',
                readOnly: true,
                title: 'bye'
            })).options).toEqual({
                description: 'hi',
                readonly: true,
                title: 'bye'
            });
        });

        it('should favor layout over schema', () => {
            expect((new LayoutNode({
                options: {description: 'hi', readonly: false, title: 'hi'},
                type: 'section'
            }, {
                description: 'bye',
                readOnly: true,
                title: 'bye'
            })).options).toEqual({
                description: 'hi',
                readonly: false,
                title: 'hi'
            });
        });
    });

    describe('items', () => {
        it('should return children', () => {
            const childNode: LayoutNode = new LayoutNode({type: 'hidden'});
            expect((new LayoutNode({type: 'container'}, undefined, [childNode])).items).toEqual([childNode]);
        });

        it('should return undefined', () => {
            expect((new LayoutNode({type: 'hidden'})).items).toBeUndefined();
        });
    });

});
