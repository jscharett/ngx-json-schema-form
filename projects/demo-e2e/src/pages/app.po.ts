import { browser, by, element, ExpectedConditions, until } from 'protractor';
import { ButtonsForm } from './examples/buttons-form.po';
import { Form } from './form.po';

export class AppPage {
    private readonly root = '/';
    private readonly titleSelector = by.css('.demo-page-header > mat-toolbar span');
    private readonly docLinkSelector = by.css('.demo-page-header > mat-toolbar a');
    private readonly selectedExampleSelector = by.css('.demo-page-header > .header-content > button > span > span');
    private readonly menuButtonSelector = by.css('.header-content > button');
    private readonly menuSelector = by.css('.mat-menu-content');
    private readonly form = by.css('jsf-json-schema-form');

    private readonly forms: Map<string, typeof Form> = new Map<string, typeof Form>([
        ['Hidden', Form],
        ['Buttons', ButtonsForm],
        ['Containers', Form]
    ]);

    private static async insertConsoleTracing(): Promise<void> {
        return browser.executeScriptWithDescription(`
            window.warnings = window.warnings || [];
            window.console.warn = function(...rest) {
                window.warnings.push(rest.map((item) => {
                    return JSON.stringify(item);
                }));
            };
        `, 'Override console.warn for testing purposes');
    }

    async navigateTo(): Promise<any> {
        await browser.get(this.root);

        return AppPage.insertConsoleTracing();
    }

    async getLogs(): Promise<any> {
        // return browser.manage().logs().get('browser');
        return browser.executeScriptWithDescription(`
            return window.warnings;
        `, 'Fetch logs').then((logs: Array<string>) => {
            return logs.map((log) => {
                return JSON.parse(log);
            });
        });
    }

    async getAlert(): Promise<string> {
        const timeout = 1000;
        await browser.wait(ExpectedConditions.alertIsPresent(), timeout);

        const alertDialog = browser.switchTo().alert();
        const alertText = alertDialog.getText();
        await alertDialog.dismiss();

        return alertText;
    }

    async getTitleText(): Promise<string> {
        return element(this.titleSelector).getText();
    }

    async clickDocumentationLink(): Promise<void> {
        return element(this.docLinkSelector).click();
    }

    async getSelectedExampleText(): Promise<string> {
        return element(this.selectedExampleSelector).getText();
    }

    async selectExample(example: string): Promise<Form> {
        await element(this.menuButtonSelector).click();
        await element(this.menuSelector).element(by.partialButtonText(example)).click();

        return browser.wait(until.elementLocated(this.form)).then(() => {
            return new (this.forms.get(example))();
        });
    }
}
