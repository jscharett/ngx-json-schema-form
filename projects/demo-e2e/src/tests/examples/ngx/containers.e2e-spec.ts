import { AppPage, Form } from '@demo-e2e';

import { by } from 'protractor';

import { verifyElementAttributes } from '../../../utils';

describe('container example', () => {
    let page: AppPage;

    beforeEach(async () => {
        page = new AppPage();
        await page.navigateTo();
    });

    it('should have 3 widgets and 0 controls', async () => {
        const form: Form = await page.selectExample('Containers');
        const numWidgets = 7; // 1 div, 1 fieldset, 1 details, 1 tabs, 3 tab
        await expect(form.getWidgetCount()).toEqual(numWidgets);
        await expect(form.getControlCount()).toEqual(0);
    });

    it('should have a div', async () => {
        const form: Form = await page.selectExample('Containers');
        await Promise.all([
            expect(form.getContainerAttribute('div', 'id')).toBeDefined(),
            verifyElementAttributes(form.getContainer('div'), {
                accesskey: 'd',
                class: ['div'],
                style: 'color: red;',
                tabindex: 3,
                title: 'This is a div container'
            })
        ]);
    });

    /**
     * @todo Verify disabled and form properties
     */
    it('should have a fieldset/legend', async () => {
        const form: Form = await page.selectExample('Containers');
        await Promise.all([
            expect(form.getContainerAttribute('fieldset', 'id')).toBeDefined(),
            expect(form.getContainer('fieldset').element(by.tagName('legend')).getText()).toBe('Fields'),
            verifyElementAttributes(form.getContainer('fieldset'), {
                accesskey: 'f',
                class: ['fieldset'],
                name: 'fields',
                style: 'color: green;',
                tabindex: 2,
                title: 'This is a fieldset container'
            })
        ]);
    });

    it('should have a details/summary', async () => {
        const form: Form = await page.selectExample('Containers');
        await Promise.all([
            expect(form.getContainerAttribute('details', 'id')).toBeDefined(),
            expect(form.getContainerAttribute('details', 'open')).toBeDefined(),
            expect(form.getContainer('details').element(by.tagName('summary')).getText()).toBe('Details'),
            verifyElementAttributes(form.getContainer('details'), {
                accesskey: 's',
                class: ['details'],
                style: 'color: blue;',
                tabindex: 1,
                title: 'This is a details container'
            })
        ]);
    });

    it('should have tabs', async () => {
        const form: Form = await page.selectExample('Containers');
        const numTabs = 3;
        await Promise.all([
            expect(form.getContainerAttribute('[role="tablist"]', 'id')).toBeDefined(),
            expect(form.getContainer('[role="tablist"]').all(by.tagName('[role="tab"]')).count()).toBe(numTabs),
            verifyElementAttributes(form.getContainer('[role="tablist"]'), {
                accesskey: 't',
                class: ['tabs'],
                style: 'background-color: pink;',
                tabindex: 4,
                title: 'This is a tabs container'
            }),
            verifyElementAttributes(form.getContainer('[role="tablist"]').element(by.css('[role="tab"]:nth-child(1)')), {
                accesskey: 'z',
                class: ['tab'],
                style: 'color: yellow;',
                tabindex: 6,
                title: 'This is a tab container'
            }),
            verifyElementAttributes(form.getContainer('[role="tablist"]').element(by.css('[role="tab"]:nth-child(2)')), {
                accesskey: 'x',
                class: ['tab'],
                style: 'color: orange;',
                tabindex: 7,
                title: 'This is a tab container'
            }),
            verifyElementAttributes(form.getContainer('[role="tablist"]').element(by.css('[role="tab"]:nth-child(3)')), {
                accesskey: 'c',
                class: ['tab'],
                style: 'color: brown;',
                tabindex: 5,
                title: 'This is a tab container'
            })
        ]);
    });
});
