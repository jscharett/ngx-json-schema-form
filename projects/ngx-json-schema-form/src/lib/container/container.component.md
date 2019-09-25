<div class="row">
<div class="col-md-10">

## Containers

There are 4 different types of containers; `div`, `fieldset`, `details`, and `tabs`.  Each allows you to wrap form elements inside a specific elements, allowing you to create various form structures.  When dealing with contianers, the layout requires you to specify an array of `items` which can be rendered inside the container.

### Div

The `div` is the simplest contianer.  It allow you to create a div in which you can style as you wish.

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">layout.json</div>

```json
[{
    "type": "div",
    "items": [{
        "type": "text",
        "title": "Text 1"
    }, {
        "type": "text",
        "title": "Text 2"
    }, {
        "type": "text",
        "title": "Text 3"
    }]
}]
```

</div>



### Fieldset

A `fieldset` container acts much the same as div, except it uses a `<fieldset>` element instead of a `<div>`.  This has the added benefit that you can easily disable all form elements inside the fieldset simply by marking the container as disabled.

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">layout.json</div>

```json
[{
    "type": "fieldset",
    "items": [...],
    "disabled": true
}]
```

</div>

### Details

A `details` container uses a `<details>` element allowing you to expand/collapse a set of form elements.

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">layout.json</div>

```json
[{
    "type": "details",
    "items": [...]
}]
```

</div>

### Tabs

With a `tabs` container, you supply a list of LayoutItems of type `tab`.  Each tab should have a `title` which is used to display the tab text.  By default, the first tab will be selected.  You can optional specify which tab to select by adding `selectedIndex` to the `tabs` options.

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">layout.json</div>

```json
[{
    "type": "tabs",
    "selectedIndex": 1,
    "items": [{
        "type": "tab",
        "title": "Tab 1",
        "items": [...]
    }, {
        "type": "tab",
        "title": "Tab 2",
        "items": [...]
    }, {
        "type": "tab",
        "title": "Tab 3",
        "items": [...]
    }]
}]
```

</div>

The above layout will render a container with 3 tabs; 'Tab 1', 'Tab 2', and 'Tab 3'.  'Tab 2' will be selected by default.

</div>
<div class="col-md-2">
<div class="links">

</div>
</div>
</div>
