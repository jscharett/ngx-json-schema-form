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
                description: 'This is a div container',
                htmlClass: 'div',
                style: 'color: red;',
                tabindex: 3
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
            expect(form.getContainerAttribute('fieldset', 'name')).toBe('fields'),
            expect(form.getContainer('fieldset').element(by.tagName('legend')).getText()).toBe('Fields'),
            verifyElementAttributes(form.getContainer('fieldset'), {
                accesskey: 'f',
                description: 'This is a fieldset container',
                htmlClass: 'fieldset',
                style: 'color: green;',
                tabindex: 2
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
                description: 'This is a details container',
                htmlClass: 'details',
                style: 'color: blue;',
                tabindex: 1
            })
        ]);
    });
});
