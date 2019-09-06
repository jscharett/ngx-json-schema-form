import { ElementFinder } from 'protractor';

export async function verifyElementAttributes(elementFinder: ElementFinder, expectedAttributes: {
    accesskey?: string;
    class?: Array<string>;
    id?: string;
    name?: string;
    style?: string;
    tabindex?: number;
    title?: string;
}): Promise<void> {
    const attributePromises: Array<Promise<string>> = Object.keys(expectedAttributes).reduce((attributes: any, key: string) => {
        attributes.push(elementFinder.getAttribute(key));

        return attributes;
    }, []);

    await Promise.all(attributePromises).then((values: Array<string>) => {
        return Object.keys(expectedAttributes).reduce((expectations: Array<Promise<any>>, key: string, index: number) => {
            const actualAttribute: string = values[index];
            const expectedAttribute: any = expectedAttributes[key];
            const expectationPromise = expectedAttribute === undefined
                ? expect(actualAttribute).toBeNull()
                : Array.isArray(expectedAttribute)
                    ? expect(actualAttribute.split(' ')).toEqual(jasmine.arrayContaining(<Array<string>>expectedAttribute))
                    : expect(actualAttribute).toEqual(expectedAttribute.toString());

            expectations.push(expectationPromise);

            return expectations;
        }, []);
    });
}
