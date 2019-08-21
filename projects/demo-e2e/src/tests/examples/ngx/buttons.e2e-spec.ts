import { AppPage, ButtonsForm } from '@demo-e2e';

describe('buttons example', () => {
    let page: AppPage;

    beforeEach(async () => {
        page = new AppPage();
        await page.navigateTo();
    });

    it('should have 8 buttons', async () => {
        const form: ButtonsForm = await page.selectExample('Buttons') as ButtonsForm;
        const buttonCount = 8;
        await expect(form.getControlCount()).toEqual(buttonCount);
    });
});
