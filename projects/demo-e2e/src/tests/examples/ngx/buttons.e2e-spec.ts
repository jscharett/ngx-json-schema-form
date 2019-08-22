import { AppPage, ButtonsForm } from '@demo-e2e';

describe('buttons example', () => {
    let page: AppPage;
    let form: ButtonsForm;

    const verifyButton = (name: string, type: string, title: string, tabindex: string, accesskey: string,
        clazz: string, additionalTests: Function): () => any => {
        return async (): Promise<void> => {
            const tabIndex = await form.getControlAttribute(name, 'tabindex');
            if (tabindex === undefined) {
                expect(tabIndex).toBeNull();
            } else {
                expect(tabIndex).toEqual(tabindex);
            }
            expect(await form.getControlAttribute(name, 'type')).toEqual(type);
            expect(await form.getControlAttribute(name, 'title')).toEqual(title);
            expect(await form.getControlAttribute(name, 'accesskey')).toEqual(accesskey);
            expect(await form.getControlClasses(name)).toContain(clazz);

            return additionalTests();
        };
    };

    beforeEach(async () => {
        page = new AppPage();
        await page.navigateTo();
        form = await page.selectExample('Buttons') as ButtonsForm;
    });

    it('should have 8 buttons', async () => {
        const buttonCount = 8;
        await expect(form.getControlCount()).toEqual(buttonCount);
    });

    it('should have button input', verifyButton('Button', 'button', `This is an input[type='button']`, '1', 'b', 'btn', async () => {
        expect(await form.getControlValue('Button')).toEqual('Button');
        expect(await form.getControlText('Button')).toEqual('');

        // form.clickControl('Button');

        // console.log(await page.getLogs());
    }));

    it('should have reset input', verifyButton('Reset', 'reset', `This is an input[type='reset']`, '0', 'r', 'btn', async () => {
        expect(await form.getControlValue('Reset')).toEqual('Reset');
        expect(await form.getControlText('Reset')).toEqual('');

        // form.clickControl('Reset');

        // console.log(await page.getLogs());
    }));

    it('should have submit input', verifyButton('Submit', 'submit', `This is an input[type='submit']`, '3', 's', 'btn', async () => {
        expect(await form.getControlValue('Submit')).toEqual('Submit');
        expect(await form.getControlText('Submit')).toEqual('');
        // no click test
        // form.clickControl('Submit');

        // console.log(await page.getLogs());
    }));

    it('should have image input', verifyButton('Image', 'image', `This is an input[type='image']`, '2', 'i', 'btn', async () => {
        expect(await form.getControlValue('Image')).toEqual('Image');
        expect(await form.getControlText('Image')).toEqual('');
        // verify icon
        // no click test
        // form.clickControl('Image');

        // console.log(await page.getLogs());
    }));

    it('should have submit btn', verifyButton('Submit2', 'submit', `This is an button[type='submit']`, undefined, 'x', 'btn', async () => {
        expect(await form.getControlValue('Submit2')).toEqual('');
        expect(await form.getControlText('Submit2')).toEqual(`Submit`);
        // no click test
        // form.clickControl('Submit2');

        // console.log(await page.getLogs());
    }));

    it('should have reset btn', verifyButton('Reset2', 'reset', `This is an button[type='reset']`, undefined, 'y', 'btn', async () => {
        expect(await form.getControlValue('Reset2')).toEqual('');
        expect(await form.getControlText('Reset2')).toEqual(`Reset`);

        // form.clickControl('Reset2');

        // console.log(await page.getLogs());
    }));

    it('should have button btn', verifyButton('Button2', 'button', `This is an button[type='button']`, undefined, 'z', 'btn', async () => {
        expect(await form.getControlValue('Button2')).toEqual('');
        expect(await form.getControlText('Button2')).toEqual(`Button`);

        // form.clickControl('Button2');

        // console.log(await page.getLogs());
    }));

    it('should have button btn with special click handler',
    verifyButton('Button3', 'button', `This is an button[type='button'] with click handling`, undefined, 'w', 'btn', async () => {
        expect(await form.getControlValue('Button3')).toEqual(`Click me`);
        expect(await form.getControlText('Button3')).toEqual('');

        // form.clickControl('Button');

        // console.log(await page.getLogs());
    }));
});
