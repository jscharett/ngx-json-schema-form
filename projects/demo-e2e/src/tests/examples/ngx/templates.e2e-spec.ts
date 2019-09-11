import { AppPage, Form } from '@demo-e2e';
import { by } from 'protractor';

describe('templates example', () => {
    let page: AppPage;

    beforeEach(async () => {
        page = new AppPage();
        await page.navigateTo();
    });

    /** @todo getting tempalte text is not very accurate.  Revisit if dynamic tempalte come into play */
    it('should have 1 control', async () => {
        const form: Form = await page.selectExample('Templates');
        await expect(form.getControlCount()).toEqual(0);
        await expect(form.getTemplateText(by.css('div'))).toBe('Hello world');
    });
});
