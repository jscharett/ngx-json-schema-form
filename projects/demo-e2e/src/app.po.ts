import { browser, by, element } from 'protractor';

export class AppPage {
  private readonly root = '/';
  private readonly titleSelector = by.css('app-root h1');

  async navigateTo() {
    return browser.get(this.root) as Promise<any>;
  }

  async getTitleText() {
    return element(this.titleSelector).getText() as Promise<string>;
  }
}
