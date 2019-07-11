<style>
   .panel pre[class*="language-"] {
        margin: 0;
        border-radius: 0;
    }
    .panel.docs {
        margin: 20px 0;
    }
</style>

# Examples

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
></jsf-jsf-json-schema-form>`,
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
></jsf-jsf-json-schema-form>`,
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
