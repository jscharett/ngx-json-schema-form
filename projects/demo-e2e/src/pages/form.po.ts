import { by, element, ElementFinder } from 'protractor';

export class Form {
    private readonly formSelector = by.css('jsf-json-schema-form');
    private readonly widgetSelector = by.css('jsf-select-widget > *:first-child');
    /** @todo target the formControl attribute if possible once implemented */
    private readonly controlSelector = by.css('input, button[name], textarea, select');
    private readonly templateSelector = by.css('jsf-template');

    async getWidgetCount(): Promise<number> {
        return element(this.formSelector).all(this.widgetSelector).count();
    }

    async getControlCount(): Promise<number> {
        return element(this.formSelector).all(this.controlSelector).count();
    }

    async getControlAttribute(controlName: string, attribute: string): Promise<string> {
        return this.getControl(controlName).getAttribute(attribute);
    }

    async getControlValue(controlName: string): Promise<any> {
        return this.getControlAttribute(controlName, 'value');
    }

    async getControlType(controlName: string): Promise<string> {
        return this.getControlAttribute(controlName, 'type');
    }

    async getControlClasses(controlName: string): Promise<Array<string>> {
        return (await this.getControlAttribute(controlName, 'class')).split(' ');
    }

    async clickControl(controlName: string): Promise<void> {
        return this.getControl(controlName).click();
    }

    async getControlText(controlName: string): Promise<string> {
        return this.getControl(controlName).getText();
    }

    async getContainerAttribute(containerType: string, attribute: string): Promise<string> {
        return this.getContainer(containerType).getAttribute(attribute);
    }

    async getTemplateText(selector: any): Promise<string> {
        return element(this.formSelector).element(this.templateSelector).element(selector).getText();
    }

    getContainer(containerType: string): ElementFinder {
        return element(this.formSelector).element(by.css(`jsf-container > ${ containerType }`));
    }

    private getControl(controlName: string): ElementFinder {
        return element(this.formSelector).element(by.name(controlName));
    }
}
