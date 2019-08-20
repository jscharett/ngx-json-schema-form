import { by, element } from 'protractor';

export class Form {
    private readonly formSelector = by.css('jsf-json-schema-form');
    private readonly widgetSelector = by.css('jsf-select-widget:first-child');
    private readonly controlSelector = by.css('input, button, textarea, select');

    async getWidgetCount(): Promise<number> {
        return element(this.formSelector).all(this.widgetSelector).count();
    }

    async getControlCount(): Promise<number> {
        return element(this.formSelector).all(this.controlSelector).count();
    }

    async getControlAttribute(controlName: string, attribute: string): Promise<string> {
        return element(this.formSelector).element(by.name(controlName)).getAttribute(attribute);
    }

    async getControlValue(controlName: string): Promise<any> {
        return this.getControlAttribute(controlName, 'value');
    }

    async getControlType(controlName: string): Promise<string> {
        return this.getControlAttribute(controlName, 'type');
    }
}
