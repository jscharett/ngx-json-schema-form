import { ElementFinder } from 'protractor';

export async function verifyElementAttributes(elementFinder: ElementFinder, expectedAttributes: {
    accesskey: string;
    description: string;
    htmlClass: string;
    style: string;
    tabindex: number;
}): Promise<void> {
    const tabIndex = await elementFinder.getAttribute('tabindex');
    const expectationPromise = expectedAttributes.tabindex === undefined
        ? expect(tabIndex).toBeNull()
        : expect(tabIndex).toEqual(expectedAttributes.tabindex.toString());

    await Promise.all([
        expectationPromise,
        expect(await elementFinder.getAttribute('style')).toEqual(expectedAttributes.style),
        expect(await elementFinder.getAttribute('title')).toEqual(expectedAttributes.description),
        expect(await elementFinder.getAttribute('accesskey')).toEqual(expectedAttributes.accesskey),
        expect((await elementFinder.getAttribute('class')).split(' ')).toContain(expectedAttributes.htmlClass)
    ]);
}
