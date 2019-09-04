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
        const numWidgets = 3;
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
});
