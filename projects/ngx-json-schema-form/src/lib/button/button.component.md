<div class="row">
<div class="col-md-10">

## Buttons

There are 4 types of buttons that jsf supports, `button`, `image`, `reset` and `submit`.  By default, these will all use the `<input>` tag for display.  However, with the exception of `image`, you can specify custom html via the `template` option.  This will result in the `<button>` being used for display and the `template` being inserted.  Content can contain simple bindings so that you can bind to various properties of the layout.  For example:

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">button-layout.json</div>

```json
[{
    "type": "submit",
    "title": "Submit",
    "template": "<img src='{{ options.icon.src }}' width='{{ options.icon.width }}' height='{{ options.icon.height }}' alt='{{ options.icon.alt }}'/><span class='small'>{{ options.title }}</span>",
    "icon": {
        "src": "/assets/submit.png",
        "width": 30,
        "height": 30,
        "alt": "Checkmark"
    }
}]
```

</div>

will result in

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">button.html</div>

```html
<button type="submit">
    <img src="/assets/submit.png" width="30" height="30" alt="Checkmark"/>
    <span class="small">Submit</span>
</button>
```

</div>

Here you can see we are specifying that the button should contain an image via the `template` options.  The template binds to the properties of the `icon` option which results in an image tag being rendered.  The `icon` option is also used when redering a simple button of type `image`.

<div class="alert alert-warning">
Note: due to current limitation of Angular AOT compilation, use of the angular compile to transpile `template` strings into HTML DOM is not possible.  Recent Angular changes have restricted the inclusion of the compiler in favor of reducing the file size and load time when in AOT mode.  Therefore, Handlebars is currently being imported to handle the compilation of `template` string to HTML DOM.
</div>

We can also respond to events such as a `click`.  To do this, we must first bind an event handler to the jsf component


<div class="panel panel-primary docs">
<div class="panel-heading panel-title">form.component.html</div>

```html
<jsf-json-schema-form
    [layout]="layout"
    (click.data.layout)="onClick($event)"
    ...
></jsf-json-schema-form>
```

</div>

Then we add a layout with a couple of buttons.  The first button will run an internal command where as the second will run a command specified by layout.onClick.

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">buttons-layout.json</div>

```json
[{
    "type": "button",
    "id": "button1",
    "title": "Open dialog"
}, {
    "type": "button",
    "id": "button2",
    "title": "Open Google",
    "onClick": "window.open('http://www.google.com/');"
}]
```

</div>

Lastly, we specify our onClick handler in our component.

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">form.component.ts</div>

```typescript
import layout from './buttons-layout.json';
import { DataEvent } from 'ngx-json-schema-form';

@Component({
    templateUrl: './form.component.html',
    ...
})
export class LayoutComponent {
    layout: Array<any> = layout;

    onClick(event: DataEvent<MouseEvent>): void {
        if (event.data.id === 'button1') {
            openDialog(event);
        } else if (event.data.id === 'button2') {
            // Run some external code
            const fn = new Function('event', event.data.onClick);
            fn(event);
        }
    }
    ...
}
```

</div>

When a button is clicked, the event will bubble up to the jsf form component to which we bound our onClick handler.  Using event metadata (`click.data.layout`), we can specify that only events in which a target that has an associated data property of `layout` will trigger the event.  This association is handled internally when a widget is created and acts similarly to jQuery's $.data.  When the event handler is triggered, the layout is passed down with the event via `event.data` , allowing us to inspect which layout item triggered the event and act accordingly.  In the case of "button1", we run and internal method `openDialog` in order to open an angular dialog component.  With "button2" however, we run the external javascript passed in via the `onClick` property in the layout in order to open a popup dialog to Google.

Note: running external javascript is usually not a good choice, therefore the jsf library does not internally run the onClick handler.  You will need to handle the conversion from text to javascript yourself and run the code.

</div>
<div class="col-md-2">
<div class="links">

</div>
</div>
</div>
