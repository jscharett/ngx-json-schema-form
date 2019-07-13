import { LayoutNode } from './layout-node';

describe('LayoutNode', () => {
    it('should create an instance', () => {
        expect(new LayoutNode({type: 'section'})).toBeTruthy();
        // expect(LayoutNode.create()).toBeTruthy();
    });

    it('should throw error', () => {
        expect(() => new LayoutNode({key: 'a'})).toThrowError();
        // expect(LayoutNode.create()).toThrowError();
    });

    it('should have an uniquie id', () => {
        const node1 = new LayoutNode({type: 'section'});
        const node2 = new LayoutNode({type: 'section'});

        expect(node1.id).toBeDefined();
        expect(node2.id).toBeDefined();
        expect(node1.id).not.toEqual(node2.id);
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
            expect((new LayoutNode({type: 'section', cat: 1}).options)).toEqual(jasmine.objectContaining({
                cat: 1
            }));
        });
    });

});
