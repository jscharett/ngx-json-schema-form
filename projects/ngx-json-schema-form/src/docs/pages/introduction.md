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
    "style": {
        "color": "#333"
    },
    "tabindex": 2,
    "title": "Name"
}]
```

</div>
</div>
<div class="col-md-2">
<div class="links">

* [JSON Schema](#json-schema "JSON Schema")
* [Layout](#layout "Layout")
* [Form Options](#form-options "Form Options")
* [Widgets](#widgets "Widgets")
   * [Options](#options)

</div>
</div>
</div>
