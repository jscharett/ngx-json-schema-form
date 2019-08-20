import { AppPage, Form } from '@demo-e2e';

describe('hidden example', () => {
    let page: AppPage;

    beforeEach(async () => {
        page = new AppPage();
        await page.navigateTo();
    });

    it('should have 1 control', async () => {
        const form: Form = await page.selectExample('Hidden') as Form;
        expect(await form.getControlCount()).toEqual(1);
        expect(await form.getControlType('apikey')).toEqual('hidden');
        // expect(await form.getControlValue('apikey')).toEqual('supercalifragilisticexpialidocious');
    });
});
