import { AppPage, ButtonsForm } from '@demo-e2e';

import buttonsJSON from '@demo/assets/examples/ngx/buttons.json';

describe('buttons example', () => {
    let page: AppPage;
    let form: ButtonsForm;
    const buttonLayouts: Array<any> = Object.create(buttonsJSON).layout;
    const [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8] = buttonLayouts;

    const verifyButton = (buttonLayout: {
        name: string;
        type: string;
        description: string;
        htmlClass: string;
        accesskey: string;
        tabindex: number;
    }, additionalTests: Function): () => any => {
        return async (): Promise<void> => {
            const tabIndex = await form.getControlAttribute(buttonLayout.name, 'tabindex');
            const expectationPromise = buttonLayout.tabindex === undefined
                ? expect(tabIndex).toBeNull()
                : expect(tabIndex).toEqual(buttonLayout.tabindex.toString());

            await Promise.all([
                expectationPromise,
                expect(await form.getControlAttribute(buttonLayout.name, 'style')).toEqual('color: dimgray;'),
                expect(await form.getControlAttribute(buttonLayout.name, 'type')).toEqual(buttonLayout.type),
                expect(await form.getControlAttribute(buttonLayout.name, 'title')).toEqual(buttonLayout.description),
                expect(await form.getControlAttribute(buttonLayout.name, 'accesskey')).toEqual(buttonLayout.accesskey),
                expect(await form.getControlClasses(buttonLayout.name)).toContain(buttonLayout.htmlClass),
                additionalTests(buttonLayout)
            ]);
        };
    };

    const verifyButtonClick = async (buttonLayout, performClick = true) => {
        if (performClick) {
            await form.clickControl(buttonLayout.name);
        }
        const logs: Array<any> = await page.getLogs();
        const logCount = 2;

        await Promise.all([
            expect(logs.length).toBe(logCount),
            expect(logs).toContain(jasmine.objectContaining({
                data: jasmine.objectContaining(buttonLayout),
                isTrusted: true
            })),
            expect(logs).toContain(jasmine.objectContaining(buttonLayout))
        ]);
    };

    beforeEach(async () => {
        page = new AppPage();
        await page.navigateTo();
        form = await page.selectExample('Buttons') as ButtonsForm;
    });

    it('should have 8 buttons', async () => {
        await expect(await form.getControlCount()).toEqual(buttonLayouts.length);
    });

    it('should have button input', verifyButton(btn1, async (buttonLayout) => {
        await Promise.all([
            expect(await form.getControlValue(buttonLayout.name)).toEqual(buttonLayout.title),
            expect(await form.getControlText(buttonLayout.name)).toEqual(''),
            verifyButtonClick(buttonLayout)
        ]);
    }));

    it('should have reset input', verifyButton(btn2, async (buttonLayout) => {
        await Promise.all([
            expect(await form.getControlValue(buttonLayout.name)).toEqual(buttonLayout.title),
            expect(await form.getControlText(buttonLayout.name)).toEqual(''),
            verifyButtonClick(buttonLayout)
        ]);
    }));

    it('should have submit input', verifyButton(btn3, async (buttonLayout) => {
        await Promise.all([
            expect(await form.getControlValue(buttonLayout.name)).toEqual(buttonLayout.title),
            expect(await form.getControlText(buttonLayout.name)).toEqual('')
            // no click test - submit reloads page
            // await verifyButtonClick(buttonLayout);
        ]);
    }));

    it('should have image input', verifyButton(btn4, async (buttonLayout) => {
        await Promise.all([
            expect(await form.getControlValue(buttonLayout.name)).toEqual(buttonLayout.title),
            expect(await form.getControlText(buttonLayout.name)).toEqual(''),
            expect(await form.getControlAttribute(buttonLayout.name, 'src')).toContain(buttonLayout.icon.src),
            expect(await form.getControlAttribute(buttonLayout.name, 'alt')).toEqual(buttonLayout.icon.alt),
            expect(await form.getControlAttribute(buttonLayout.name, 'width')).toEqual(buttonLayout.icon.width.toString()),
            expect(await form.getControlAttribute(buttonLayout.name, 'height')).toEqual(buttonLayout.icon.height.toString())
            // no click test - submit reloads page
            // await verifyButtonClick(buttonLayout);
        ]);
    }));

    it('should have submit btn', verifyButton(btn5, async (buttonLayout) => {
        await Promise.all([
            expect(await form.getControlValue(buttonLayout.name)).toEqual(''),
            expect(await form.getControlText(buttonLayout.name)).toEqual(buttonLayout.title)
            // no click test - submit reloads page
            // await verifyButtonClick(buttonLayout);
        ]);
    }));

    it('should have reset btn', verifyButton(btn6, async (buttonLayout) => {
        await Promise.all([
            expect(await form.getControlValue(buttonLayout.name)).toEqual(''),
            expect(await form.getControlText(buttonLayout.name)).toEqual(buttonLayout.title),
            verifyButtonClick(buttonLayout)
        ]);
    }));

    it('should have button btn', verifyButton(btn7, async (buttonLayout) => {
        await Promise.all([
            expect(await form.getControlValue(buttonLayout.name)).toEqual(''),
            expect(await form.getControlText(buttonLayout.name)).toEqual(buttonLayout.title),
            verifyButtonClick(buttonLayout)
        ]);
    }));

    it('should have button btn with special click handler', verifyButton(btn8, async (buttonLayout) => {
        await form.clickControl(buttonLayout.name);
        await Promise.all([
            expect(await page.getAlert()).toBeDefined(),
            verifyButtonClick(buttonLayout, false),
            expect(await form.getControlValue(buttonLayout.name)).toEqual(buttonLayout.title),
            expect(await form.getControlText(buttonLayout.name)).toEqual('')
        ]);
    }));
});
