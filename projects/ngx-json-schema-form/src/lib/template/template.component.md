<div class="row">
<div class="col-md-10">

## Templates

The template widget is used to render custom html inside your form.  For example, you may need to render a table of data

<div class="panel panel-primary docs">
<div class="panel-heading panel-title">layout.json</div>

```json
[{
    "type": "template",
    "content": "<table>
        <thead><tr>...</tr></thead>
        <tbody>
        ...
        </tbody>
        </table>"
}]
```

</div>

Note: As of Angular 5, dynamic angular components cannot be used in AOT mode.  Due to this limitation, the
template widget does not support angular components.  Hopefully the Angular team will resolve this limitation.  In the meantime, Handlebars is used to allow some mimial templating.

</div>
<div class="col-md-2">
<div class="links">

</div>
</div>
</div>
