<div class="row">
<div class="col-md-10">

## Json Schema

The only requirement to using the component is to supply a valid JSON Schema.  The component will parse the schema and display all properties in the order they
are presented within the schema.

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">schema.json</div>

```json
{
    "$id": "https://example.com/person.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Person",
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string",
            "description": "The person's first name."
        },
        "lastName": {
            "type": "string",
            "description": "The person's last name."
        },
        "age": {
            "description": "Age in years which must be equal to or greater than zero.",
            "type": "integer",
            "minimum": 0
        }
    }
}
```

</div>

In this example, the form will display 3 fields; `firstName`, `lastName` and `age`.  The order is determined by the order of the fields in the schema.  Once you have your schema set, all you need to do is pass it to the component

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">basic.component.ts</div>

```typescript
import { JSONSchema7 } from 'json-schema';
import schema from './schema.json';

@Component({
    template: `<jsf-json-schema-form
    [schema]="schema"
></jsf-json-schema-form>`,
    ...
})
export class BasicComponent {
    schema: JSONSchema7 = schema as JSONSchema7;
    ...
}
```

</div>

Here we import the schema json and set it as a property on our component.  Then you wire up the schema in the template and

## Layout

The deault layout is simply `['*']`.  This translates to display everything in the the schema.  The `*` key is a special command that tells the component to display everything that has not specifically been laid out.  This can become useful when you only care about a few fields and their location.  For example:

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">schema.json</div>

```json
{
    "$id": "https://example.com/person.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Person",
    "type": "object",
    "properties": {
        "question1": {
            "type": "boolean"
        },
        "age": {
            "description": "Are you 18 or older?",
            "type": "boolean"
        },
        "question2": {
            "type": "boolean"
        }
    }
}
```

</div>
<div class="panel panel-primary docs">
<div class="panel-heading panel-title">layout.json</div>

```json
[
    "age",
    '*'
]
```

</div>
<div class="panel panel-primary docs">
<div class="panel-heading panel-title">layout.component.ts</div>

```typescript
import { JSONSchema7 } from 'json-schema';
import schema from './schema.json';
import layout from './layout.json';

@Component({
    template: `<jsf-json-schema-form
    [schema]="schema"
    [layout]="layout"
></jsf-json-schema-form>`,
    ...
})
export class LayoutComponent {
    schema: JSONSchema7 = schema as JSONSchema7;
    layout: Array<any> = layout;
    ...
}
```

</div>

As you can see, we only care that `age` is presented first.  All the other properties in the schema are shown after `age`.

## Form Options

Just like a native form, you can set the standard form attributes (`action`, `autocomplete`, `enctype`, `method`, `target`) on the jsf component.  Most of the time you will not need to set these, but there may be instances in which you need your form to do an actual submit and need these set. For more info on these see [Form Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#Attributes).

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">login.component.html</div>

```html
<jsf-json-schema-form
    "action"="/login.asp"
    "autocomplete"="on"
    "enctype"="text/plain"
    "method"="post"
    "target"="_blank"
    ...
></jsf-json-schema-form>
```

</div>

## Widgets

### Options

There are numerous attributes that can be set on a widget which are set via the layout.  The following are currently supported

* `accesskey`
* `dirname`
* `disabled`
* `htmlClass`
* `name`
* `readonly`
* `style`
* `tabindex`
* `title`

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">layout.json</div>

```json
[{
    "type": "text",
    "accesskey": "n",
    "dirname": true,
    "disabled": false,
    "htmlClass": "input-sm",
    "name": "name",
    "readonly": true,
    "style": "color: #333;",
    "tabindex": 2,
    "title": "Name"
}]
```

</div>

### Button

There are 4 types of buttons that jsf supports, `button`, `image`, `reset` and `submit`.  By default, these will all use the `<input>` tag for display.  However, with the exception of `image`, you can specify custom html via the `content` option.  This will result in the `<button>` being used for display and the content being inserted.  Content can contain simple bindings so that you can bind to various properties of the layout.  For example:

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">button-layout.json</div>

```json
[{
    "type": "submit",
    "title": "Submit",
    "content": "<img src='{{ options.icon.src }}' width='{{ options.icon.width }}' height='{{ options.icon.height }}' alt='{{ options.icon.alt }}'/><span class='small'>{{ options.title }}</span>",
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

Here you can see we are specifying that the button should contain an image via the `content` options.  The template binds to the properties of the `icon` option which results in an image tag being rendered.  The `icon` option is also used when redering a simple button of type `image`.

<div class="alert alert-warning">
Note: due to current limitation of Angular AOT compilation, use of the angular compile to transpile content strings into HTML DOM is not possible.  Recent Angular changes have restricted the inclusion of the compiler in favor of reducing the file size and load time when in AOT mode.  Therefore, Handlebars is currently being imported to handle the compilation of content string to HTML DOM.
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

### Hidden

Hidden widgets are as you expect, then render an `<input type="hidden">`.  This is the default for any layout item that can't be propley matched.  For the most part, hidden widgets wont be needed as you simply don't need to render them, their data never changes.  However, in the event that you need to do an actual form submittal, hidden inputs may be necessary and are therfore included.


</div>
<div class="col-md-2">
<div class="links">

* [JSON Schema](#json-schema "JSON Schema")
* [Layout](#layout "Layout")
* [Form Options](#form-options "Form Options")
* [Widgets](#widgets "Widgets")
   * [Options](#options)
   * [Button](#button)
   * [Hidden](#hidden)

</div>
</div>
</div>
