import { AppPage } from './pages/app.po';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', async () => {
        await page.navigateTo();

        return expect(await page.getTitleText()).toEqual('NGX Angular JSON Schema Form — Demonstration Playground');
    });

    it('should show current example', async () => {
        await page.navigateTo();

        return expect(await page.getSelectedExampleText()).toEqual('Simple Array');
    });

    // it('should load new example', async () => {
    //     await page.navigateTo();
    //     await page.selectExample('Buttons');

    //     return expect(true).toBeTruthy();
    // });
});
