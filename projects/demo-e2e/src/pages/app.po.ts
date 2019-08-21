import { browser, by, element, until } from 'protractor';
import { ButtonsForm } from './examples/buttons-form.po';
import { Form } from './form.po';

export class AppPage {
    private readonly root = '/';
    private readonly titleSelector = by.css('.demo-page-header > mat-toolbar span');
    private readonly menuButtonSelector = by.css('.header-content > button');
    private readonly menuSelector = by.css('.mat-menu-content');
    private readonly form = by.css('jsf-json-schema-form');

    private readonly forms: Map<string, typeof Form> = new Map<string, typeof Form>([
        ['Hidden', Form],
        ['Buttons', ButtonsForm]
    ]);

    async navigateTo(): Promise<any> {
        return browser.get(this.root);
    }

    async getTitleText(): Promise<string> {
        return element(this.titleSelector).getText();
    }

    async selectExample(example: string): Promise<Form> {
        await element(this.menuButtonSelector).click();
        await element(this.menuSelector).element(by.partialButtonText(example)).click();

        return browser.wait(until.elementLocated(this.form)).then(() => {
            return new (this.forms.get(example))();
        });
    }
}
