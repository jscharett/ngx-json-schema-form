(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../ngx-json-schema-form/src/lib/json-schema-form.component.ts":
/*!*********************************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/json-schema-form.component.ts ***!
  \*********************************************************************/
/*! exports provided: JsonSchemaFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonSchemaFormComponent", function() { return JsonSchemaFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _json_schema_form_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./json-schema-form.service */ "../ngx-json-schema-form/src/lib/json-schema-form.service.ts");
/* harmony import */ var _layout_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout.service */ "../ngx-json-schema-form/src/lib/layout.service.ts");
/* harmony import */ var _schema_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schema.service */ "../ngx-json-schema-form/src/lib/schema.service.ts");






var JsonSchemaFormComponent = /** @class */ (function () {
    function JsonSchemaFormComponent(
    // private readonly jsf: JsonSchemaFormService,
    schemaService, layoutService) {
        this.schemaService = schemaService;
        this.layoutService = layoutService;
        this.formInitialized = false;
    }
    JsonSchemaFormComponent.prototype.ngOnInit = function () {
        this.updateForm();
    };
    JsonSchemaFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('schema')) {
            this.formInitialized = false;
        }
        this.updateForm();
    };
    JsonSchemaFormComponent.prototype.updateForm = function () {
        if (!this.formInitialized) {
            this.initializeForm();
        }
    };
    JsonSchemaFormComponent.prototype.initializeForm = function () {
        this.initializeSchema();
        this.initializeLayout();
        this.formInitialized = true;
    };
    JsonSchemaFormComponent.prototype.initializeLayout = function () {
        this.layoutService.layout = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(this.layout || []);
    };
    JsonSchemaFormComponent.prototype.initializeSchema = function () {
        if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(this.schema)) {
            this.schemaService.schema = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(this.schema);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], JsonSchemaFormComponent.prototype, "schema", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], JsonSchemaFormComponent.prototype, "layout", void 0);
    JsonSchemaFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            providers: [
                _json_schema_form_service__WEBPACK_IMPORTED_MODULE_3__["JsonSchemaFormService"],
                _layout_service__WEBPACK_IMPORTED_MODULE_4__["LayoutService"],
                _schema_service__WEBPACK_IMPORTED_MODULE_5__["SchemaService"]
            ],
            selector: 'jsf-json-schema-form',
            template: "\n        <form></form>\n    "
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_schema_service__WEBPACK_IMPORTED_MODULE_5__["SchemaService"],
            _layout_service__WEBPACK_IMPORTED_MODULE_4__["LayoutService"]])
    ], JsonSchemaFormComponent);
    return JsonSchemaFormComponent;
}());



/***/ }),

/***/ "../ngx-json-schema-form/src/lib/json-schema-form.module.ts":
/*!******************************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/json-schema-form.module.ts ***!
  \******************************************************************/
/*! exports provided: JsonSchemaFormModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonSchemaFormModule", function() { return JsonSchemaFormModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _widget_library_widget_library_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widget-library/widget-library.module */ "../ngx-json-schema-form/src/lib/widget-library/widget-library.module.ts");
/* harmony import */ var _json_schema_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./json-schema-form.component */ "../ngx-json-schema-form/src/lib/json-schema-form.component.ts");




var JsonSchemaFormModule = /** @class */ (function () {
    function JsonSchemaFormModule() {
    }
    JsonSchemaFormModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_json_schema_form_component__WEBPACK_IMPORTED_MODULE_3__["JsonSchemaFormComponent"]],
            exports: [_json_schema_form_component__WEBPACK_IMPORTED_MODULE_3__["JsonSchemaFormComponent"], _widget_library_widget_library_module__WEBPACK_IMPORTED_MODULE_2__["WidgetLibraryModule"]],
            imports: [_widget_library_widget_library_module__WEBPACK_IMPORTED_MODULE_2__["WidgetLibraryModule"]]
        })
    ], JsonSchemaFormModule);
    return JsonSchemaFormModule;
}());



/***/ }),

/***/ "../ngx-json-schema-form/src/lib/json-schema-form.service.ts":
/*!*******************************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/json-schema-form.service.ts ***!
  \*******************************************************************/
/*! exports provided: JsonSchemaFormService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonSchemaFormService", function() { return JsonSchemaFormService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var JsonSchemaFormService = /** @class */ (function () {
    function JsonSchemaFormService() {
        this.x = false;
    }
    JsonSchemaFormService.prototype.initializeControl = function (ctx, bind) {
        // TODO
        if (bind === void 0) { bind = true; }
        return this.x;
    };
    JsonSchemaFormService.prototype.updateValue = function (ctx, value) {
        // TODO
        this.x = value;
    };
    JsonSchemaFormService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], JsonSchemaFormService);
    return JsonSchemaFormService;
}());



/***/ }),

/***/ "../ngx-json-schema-form/src/lib/layout.service.ts":
/*!*********************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/layout.service.ts ***!
  \*********************************************************/
/*! exports provided: LayoutService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutService", function() { return LayoutService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



var LayoutService = /** @class */ (function () {
    function LayoutService() {
        this._layout = [];
    }
    LayoutService_1 = LayoutService;
    Object.defineProperty(LayoutService.prototype, "layout", {
        get: function () {
            return this._layout;
        },
        set: function (value) {
            this._layout = LayoutService_1.buildLayout(value);
        },
        enumerable: true,
        configurable: true
    });
    LayoutService.buildLayout = function (layout) {
        // let hasSubmitButton = !JsonPointer.get(jsf, '/formOptions/addSubmit');
        var formLayout = LayoutService_1.mapLayout(layout, function (layoutItem, index, layoutPointer) {
            var newNode = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ id: Object(lodash__WEBPACK_IMPORTED_MODULE_2__["uniqueId"])(), options: {} }, Object(lodash__WEBPACK_IMPORTED_MODULE_2__["pick"])(layoutItem, ['key', 'type']));
            // Dropped code to push invalid props into options
            // Dropped code to convert widget to type
            // Dropped code to convert options.legend to options.title
            return newNode;
            // if (isObject(layoutItem)) {
            //   if (!hasOwn(newNode.options, 'validationMessages')) {
            //     if (hasOwn(newNode.options, 'errorMessages')) {
            //       newNode.options.validationMessages = newNode.options.errorMessages;
            //       delete newNode.options.errorMessages;
            //     // Convert Angular Schema Form (AngularJS) 'validationMessage' to
            //     // Angular JSON Schema Form 'validationMessages'
            //     // TV4 codes from https://github.com/geraintluff/tv4/blob/master/source/api.js
            //     } else if (hasOwn(newNode.options, 'validationMessage')) {
            //       if (typeof newNode.options.validationMessage === 'string') {
            //         newNode.options.validationMessages = newNode.options.validationMessage;
            //       } else {
            //         newNode.options.validationMessages = {};
            //         Object.keys(newNode.options.validationMessage).forEach(key => {
            //           const code = key + '';
            //           const newKey =
            //             code ===  '0'  ? 'type' :
            //             code ===  '1'  ? 'enum' :
            //             code === '100' ? 'multipleOf' :
            //             code === '101' ? 'minimum' :
            //             code === '102' ? 'exclusiveMinimum' :
            //             code === '103' ? 'maximum' :
            //             code === '104' ? 'exclusiveMaximum' :
            //             code === '200' ? 'minLength' :
            //             code === '201' ? 'maxLength' :
            //             code === '202' ? 'pattern' :
            //             code === '300' ? 'minProperties' :
            //             code === '301' ? 'maxProperties' :
            //             code === '302' ? 'required' :
            //             code === '304' ? 'dependencies' :
            //             code === '400' ? 'minItems' :
            //             code === '401' ? 'maxItems' :
            //             code === '402' ? 'uniqueItems' :
            //             code === '500' ? 'format' : code + '';
            //           newNode.options.validationMessages[newKey] = newNode.options.validationMessage[key];
            //         });
            //       }
            //       delete newNode.options.validationMessage;
            //     }
            //   }
            // } else if (JsonPointer.isJsonPointer(layoutItem)) {
            //   newNode.dataPointer = layoutItem;
            // } else if (isString(layoutItem)) {
            //   newNode.key = layoutItem;
            // } else {
            //   console.error('buildLayout error: Form layout element not recognized:');
            //   console.error(layoutItem);
            //   return null;
            // }
        });
        return formLayout;
    };
    /**
     * 'mapLayout' function
     *
     * Creates a new layout by running each element in an existing layout through
     * an iteratee. Recursively maps within array elements 'items' and 'tabs'.
     * The iteratee is invoked with four arguments: (value, index, layout, path)
     *
     * The returned layout may be longer (or shorter) then the source layout.
     *
     * If an item from the source layout returns multiple items (as '*' usually will),
     * this function will keep all returned items in-line with the surrounding items.
     *
     * If an item from the source layout causes an error and returns null, it is
     * skipped without error, and the function will still return all non-null items.
     *
     * @param  layout - the layout to map
     * @param  function - the funciton to invoke on each element
     * @param  layoutPointer - the layoutPointer to layout, inside rootLayout
     * @param  rootLayout - the root layout, which conatins layout
     * @return the mapped layout
     */
    LayoutService.mapLayout = function (layout, fn, layoutPointer, rootLayout) {
        if (layoutPointer === void 0) { layoutPointer = ''; }
        if (rootLayout === void 0) { rootLayout = layout; }
        var indexPad = 0;
        return layout.reduce(function (mappedLayout, item, index) {
            var realIndex = +index + indexPad;
            var newLayoutPointer = layoutPointer + "/" + realIndex;
            var newNode = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["clone"])(item);
            var newLayout = mappedLayout;
            // Note: removed logic to convert tabs to items and items to [items]
            // if (item.items) {
            //     newNode.items = LayoutService.mapLayout(item.items, fn, `${newLayoutPointer}/items`, rootLayout);
            // }
            newNode = fn(newNode, realIndex, newLayoutPointer, rootLayout);
            // if (isNil(newNode)) {
            //     indexPad -= 1;
            // } else {
            //     if (Array.isArray(newNode)) { indexPad += newNode.length - 1; }
            newLayout = mappedLayout.concat(newNode);
            // }
            return newLayout;
        }, []);
    };
    var LayoutService_1;
    LayoutService = LayoutService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], LayoutService);
    return LayoutService;
}());



/***/ }),

/***/ "../ngx-json-schema-form/src/lib/schema.service.ts":
/*!*********************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/schema.service.ts ***!
  \*********************************************************/
/*! exports provided: SchemaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchemaService", function() { return SchemaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ajv */ "../../node_modules/ajv/lib/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_2__);



var SchemaService = /** @class */ (function () {
    function SchemaService() {
        // TODO: Setter function to automatically upgrade schema version?
        this._schema = {};
        this.ajv = new ajv__WEBPACK_IMPORTED_MODULE_2___default.a({ allErrors: true, jsonPointers: true, unknownFormats: 'ignore' });
    }
    Object.defineProperty(SchemaService.prototype, "schema", {
        get: function () {
            return this._schema;
        },
        set: function (value) {
            this._schema = value;
            this.compileSchema();
        },
        enumerable: true,
        configurable: true
    });
    SchemaService.prototype.validate = function (data) {
        return this.validator(data);
    };
    SchemaService.prototype.compileSchema = function () {
        this.ajv.removeSchema(this.schema);
        this.validator = this.ajv.compile(this.schema);
    };
    SchemaService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], SchemaService);
    return SchemaService;
}());



/***/ }),

/***/ "../ngx-json-schema-form/src/lib/widget-library/button/button.component.html":
/*!***********************************************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/widget-library/button/button.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button\n    [attr.readonly]=\"options?.readonly ? 'readonly' : null\"\n    [attr.aria-describedby]=\"'control' + layoutNode?._id + 'Status'\"\n    [class]=\"options?.htmlClass || ''\"\n    [disabled]=\"controlDisabled\"\n    [name]=\"controlName\"\n    [type]=\"layoutNode?.type\"\n    [value]=\"controlValue\"\n    (click)=\"updateValue($event)\">\n    <span *ngIf=\"options?.icon || options?.title\"\n        [class]=\"options?.icon\">{{ options?.title }}</span>\n</button>\n"

/***/ }),

/***/ "../ngx-json-schema-form/src/lib/widget-library/button/button.component.scss":
/*!***********************************************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/widget-library/button/button.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9uZ3gtanNvbi1zY2hlbWEtZm9ybS9zcmMvbGliL3dpZGdldC1saWJyYXJ5L2J1dHRvbi9idXR0b24uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "../ngx-json-schema-form/src/lib/widget-library/button/button.component.ts":
/*!*********************************************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/widget-library/button/button.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonComponent", function() { return ButtonComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _json_schema_form_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../json-schema-form.service */ "../ngx-json-schema-form/src/lib/json-schema-form.service.ts");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widget */ "../ngx-json-schema-form/src/lib/widget-library/widget.ts");




var ButtonComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ButtonComponent, _super);
    function ButtonComponent(jsf) {
        return _super.call(this, jsf) || this;
    }
    ButtonComponent.prototype.updateValue = function (event) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
        else {
            _super.prototype.updateValue.call(this, event);
        }
    };
    ButtonComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'jsf-button',
            template: __webpack_require__(/*! ./button.component.html */ "../ngx-json-schema-form/src/lib/widget-library/button/button.component.html"),
            styles: [__webpack_require__(/*! ./button.component.scss */ "../ngx-json-schema-form/src/lib/widget-library/button/button.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_json_schema_form_service__WEBPACK_IMPORTED_MODULE_2__["JsonSchemaFormService"]])
    ], ButtonComponent);
    return ButtonComponent;
}(_widget__WEBPACK_IMPORTED_MODULE_3__["Widget"]));



/***/ }),

/***/ "../ngx-json-schema-form/src/lib/widget-library/index.ts":
/*!***************************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/widget-library/index.ts ***!
  \***************************************************************/
/*! exports provided: BASIC_WIDGETS, Widget, ButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASIC_WIDGETS", function() { return BASIC_WIDGETS; });
/* harmony import */ var _button_button_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button/button.component */ "../ngx-json-schema-form/src/lib/widget-library/button/button.component.ts");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget */ "../ngx-json-schema-form/src/lib/widget-library/widget.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Widget", function() { return _widget__WEBPACK_IMPORTED_MODULE_1__["Widget"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonComponent", function() { return _button_button_component__WEBPACK_IMPORTED_MODULE_0__["ButtonComponent"]; });


var BASIC_WIDGETS = [
    _button_button_component__WEBPACK_IMPORTED_MODULE_0__["ButtonComponent"]
];




/***/ }),

/***/ "../ngx-json-schema-form/src/lib/widget-library/widget-library.module.ts":
/*!*******************************************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/widget-library/widget-library.module.ts ***!
  \*******************************************************************************/
/*! exports provided: WidgetLibraryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetLibraryModule", function() { return WidgetLibraryModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! . */ "../ngx-json-schema-form/src/lib/widget-library/index.ts");




var WidgetLibraryModule = /** @class */ (function () {
    function WidgetLibraryModule() {
    }
    WidgetLibraryModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: ___WEBPACK_IMPORTED_MODULE_3__["BASIC_WIDGETS"].slice(),
            entryComponents: ___WEBPACK_IMPORTED_MODULE_3__["BASIC_WIDGETS"].slice(),
            exports: ___WEBPACK_IMPORTED_MODULE_3__["BASIC_WIDGETS"].slice(),
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]
        })
    ], WidgetLibraryModule);
    return WidgetLibraryModule;
}());



/***/ }),

/***/ "../ngx-json-schema-form/src/lib/widget-library/widget.ts":
/*!****************************************************************!*\
  !*** ../ngx-json-schema-form/src/lib/widget-library/widget.ts ***!
  \****************************************************************/
/*! exports provided: Widget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Widget", function() { return Widget; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var Widget = /** @class */ (function () {
    function Widget(jsf) {
        this.jsf = jsf;
        this.boundControl = false;
        this.controlDisabled = false;
    }
    Widget.prototype.ngOnInit = function () {
        this.jsf.initializeControl(this);
        this.options = this.layoutNode.options || {};
    };
    Widget.prototype.updateValue = function (event) {
        this.jsf.updateValue(this, event.target.value);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], Widget.prototype, "layoutNode", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], Widget.prototype, "layoutIndex", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], Widget.prototype, "dataIndex", void 0);
    return Widget;
}());



/***/ }),

/***/ "../ngx-json-schema-form/src/public-api.ts":
/*!*************************************************!*\
  !*** ../ngx-json-schema-form/src/public-api.ts ***!
  \*************************************************/
/*! exports provided: JsonSchemaFormService, JsonSchemaFormComponent, JsonSchemaFormModule, BASIC_WIDGETS, Widget, ButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_json_schema_form_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/json-schema-form.service */ "../ngx-json-schema-form/src/lib/json-schema-form.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonSchemaFormService", function() { return _lib_json_schema_form_service__WEBPACK_IMPORTED_MODULE_0__["JsonSchemaFormService"]; });

/* harmony import */ var _lib_json_schema_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/json-schema-form.component */ "../ngx-json-schema-form/src/lib/json-schema-form.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonSchemaFormComponent", function() { return _lib_json_schema_form_component__WEBPACK_IMPORTED_MODULE_1__["JsonSchemaFormComponent"]; });

/* harmony import */ var _lib_json_schema_form_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/json-schema-form.module */ "../ngx-json-schema-form/src/lib/json-schema-form.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonSchemaFormModule", function() { return _lib_json_schema_form_module__WEBPACK_IMPORTED_MODULE_2__["JsonSchemaFormModule"]; });

/* harmony import */ var _lib_widget_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/widget-library */ "../ngx-json-schema-form/src/lib/widget-library/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BASIC_WIDGETS", function() { return _lib_widget_library__WEBPACK_IMPORTED_MODULE_3__["BASIC_WIDGETS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Widget", function() { return _lib_widget_library__WEBPACK_IMPORTED_MODULE_3__["Widget"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonComponent", function() { return _lib_widget_library__WEBPACK_IMPORTED_MODULE_3__["ButtonComponent"]; });

/*
 * Public API Surface of json-schema-form
 */






/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"demo-page-header\">\n    <mat-toolbar class=\"mat-elevation-z4 mat-medium\" color=\"primary\">\n        NGX Angular JSON Schema Form — Demonstration Playground\n    </mat-toolbar>\n    <div class=\"header-content\">\n        An Angular <a href=\"http://json-schema.org/\">JSON Schema</a> Form builder\n        <!-- for Angular 7, similar to, and mostly API compatible with,\n        <span class=\"avoidwrap\">\n            <!- JSON Schema Form's Angular Schema Form ->\n            <!- https://github.com/json-schema-form ->\n            <!- http://schemaform.io ->\n            <a href=\"http://schemaform.io/examples/bootstrap-example.html\">Angular Schema Form</a>,\n            <!- Mozilla's React JSON Schema Form ->\n            <!- https://github.com/mozilla-services/react-jsonschema-form ->\n            <a href=\"https://mozilla-services.github.io/react-jsonschema-form/\">React JSON Schema Form</a>,\n            and\n            <!- Joshfire's JSON Form ->\n            <!- http://factory.joshfire.com/ ->\n            <!- http://github.com/joshfire/jsonform/wiki ->\n            <a href=\"http://ulion.github.io/jsonform/playground/\">JSON Form</a>.\n        </span><br> -->\n        Choose an example, or create your own, and check out the generated form.<br><br>\n        <span class=\"menu-label\">Current example:</span>\n        <button mat-raised-button color=\"primary\" [matMenuTriggerFor]=\"exampleMenu\">\n            <mat-icon>menu</mat-icon> {{ selectedSetName }} {{ selectedExampleName }}\n        </button>\n        <mat-menu #exampleMenu=\"matMenu\" class=\"example-menu\">\n            <ng-container *ngFor=\"let group of examplesObservable | async; trackBy: trackByFn\">\n                <ng-container *ngIf=\"group.set === 'ngx'; then flat; else nested\"></ng-container>\n                <ng-template #flat>\n                    <button mat-menu-item class=\"mat-medium\"\n                        *ngFor=\"let example of group.examples; trackBy: trackByFn\"\n                        (click)=\"loadSelectedExample(group.set, '', example.file, example.name)\">\n                        {{ example.name }}\n                    </button>\n                </ng-template>\n                <ng-template #nested>\n                    <button mat-menu-item class=\"mat-medium\" [matMenuTriggerFor]=\"sub_menu\">\n                        <span>{{ group.name }}</span>\n                    </button>\n                    <mat-menu #sub_menu=\"matMenu\" class=\"example-menu\">\n                        <button mat-menu-item class=\"mat-medium\"\n                            *ngFor=\"let example of group.examples; trackBy: trackByFn\"\n                            (click)=\"loadSelectedExample(group.set, group.label, example.file, example.name)\">\n                            {{ example.name }}\n                        </button>\n                    </mat-menu>\n                </ng-template>\n            </ng-container>\n            <!-- <button mat-menu-item class=\"mat-medium\" [matMenuTriggerFor]=\"asfMenu\">\n                <span>Angular Schema Form (AngularJS) examples</span>\n            </button>\n            <mat-menu #asfMenu=\"matMenu\" class=\"example-menu\">\n                <button mat-menu-item class=\"mat-medium\"\n                    *ngFor=\"let example of examples.asf.schemas\"\n                    (click)=\"loadSelectedExample('asf', 'Angular Schema Form:', example.file, example.name)\">\n                    {{example.name}}\n                </button>\n            </mat-menu>\n            <button mat-menu-item class=\"mat-medium\" [matMenuTriggerFor]=\"rjsfMenu\">\n                <span>React JSON Schema Form examples</span>\n            </button>\n            <mat-menu #rjsfMenu=\"matMenu\" class=\"example-menu\">\n                <button mat-menu-item class=\"mat-medium\"\n                    *ngFor=\"let example of examples.rjsf.schemas\"\n                    (click)=\"loadSelectedExample('rjsf', 'React JSON Schema Form:', example.file, example.name)\">\n                    {{example.name}}\n                </button>\n            </mat-menu>\n            <button mat-menu-item class=\"mat-medium\" [matMenuTriggerFor]=\"jsfMenu\">\n                <span>JSONForm (jQuery) examples</span>\n            </button>\n            <mat-menu #jsfMenu=\"matMenu\" class=\"example-menu\">\n                <button mat-menu-item class=\"mat-medium\"\n                    *ngFor=\"let example of examples.jsf.schemas\"\n                    (click)=\"loadSelectedExample('jsf', 'JSONForm:', example.file, example.name)\">\n                    {{example.name}}\n                </button>\n            </mat-menu> -->\n        </mat-menu>\n    </div>\n</div>\n<div fxLayout=\"row\" fxLayoutAlign=\"space-around start\"\n    fxLayout.lt-sm=\"column\" fxLayoutAlign.lt-sm=\"flex-start center\">\n    <mat-card fxFlex=\"0 0 calc(50% - 12px)\">\n        <!-- <h4 class=\"default-cursor\" (click)=\"toggleVisible('options')\">\n            {{visible.options ? '▼' : '▶'}} Selected Framework and Options\n        </h4>\n        <div *ngIf=\"visible.options\" fxLayout=\"column\" [@expandSection]=\"true\">\n            <mat-form-field>\n                <mat-select\n                    [(ngModel)]=\"selectedFramework\"\n                    name=\"framework\"\n                    placeholder=\"Framework\">\n                    <mat-option\n                        *ngFor=\"let framework of frameworkList\"\n                        [value]=\"framework\">\n                        {{frameworks[framework]}}\n                    </mat-option>\n                </mat-select>\n            </mat-form-field>\n            <mat-form-field>\n                <mat-select\n                    [(ngModel)]=\"selectedLanguage\"\n                    (change)=\"loadSelectedLanguage()\"\n                    name=\"language\"\n                    placeholder=\"Language\">\n                    <mat-option\n                        *ngFor=\"let language of languageList\"\n                        [value]=\"language\">\n                        {{languages[language]}}\n                    </mat-option>\n                </mat-select>\n            </mat-form-field>\n            <div class=\"check-row\">\n                <mat-checkbox color=\"primary\" [(ngModel)]=\"jsonFormOptions.returnEmptyFields\">\n                    Return empty fields?\n                </mat-checkbox>\n                (default = true)\n            </div>\n            <div class=\"check-row\">\n                <mat-checkbox color=\"primary\" [(ngModel)]=\"jsonFormOptions.addSubmit\">\n                    Add submit button?\n                </mat-checkbox>\n                (default = only add if no layout is defined)\n            </div>\n            <div class=\"check-row\">\n                <mat-checkbox color=\"primary\" [(ngModel)]=\"jsonFormOptions.defaultWidgetOptions.feedback\">\n                    Show inline fedback?\n                </mat-checkbox>\n                (default = false)\n            </div>\n            <div class=\"check-row\">\n                <mat-checkbox color=\"primary\" [(ngModel)]=\"jsonFormOptions.debug\">\n                    Show debuging information?\n                </mat-checkbox>\n                (default = false)\n            </div>\n        </div> -->\n        <hr>\n        <details open>\n            <summary>Input JSON Schema and Form Layout</summary>\n            <ace-editor\n                [mode]=\"'json'\"\n                [autoUpdateContent]=\"true\"\n                [options]=\"aceEditorOptions\"\n                [readOnly]=\"false\"\n                [text]=\"jsonFormSchema\"\n                (textChanged)=\"generateForm($event)\">\n                (loading form specification...)\n            </ace-editor>\n        </details>\n    </mat-card>\n    <mat-card fxFlex=\"0 0 calc(50% - 12px)\">\n        <details open>\n            <summary>Generated Form</summary>\n            <div class=\"json-schema-form\">\n                <ng-container *ngIf=\"formActive; then showForm; else showMessage\"></ng-container>\n                <ng-template #showForm>\n                    <jsf-json-schema-form></jsf-json-schema-form>\n                        <!-- loadExternalAssets=\"true\"\n                        [form]=\"jsonFormObject\"\n                        [options]=\"jsonFormOptions\"\n                        [framework]=\"selectedFramework\"\n                        [language]=\"selectedLanguage\"\n                        (onChanges)=\"onChanges($event)\"\n                        (onSubmit)=\"onSubmit($event)\"\n                        (isValid)=\"isValid($event)\"\n                        (validationErrors)=\"validationErrors($event)\" -->\n                </ng-template>\n                <ng-template #showMessage>\n                    <div>{{ jsonFormStatusMessage }}</div>\n                </ng-template>\n            </div>\n        </details>\n        <!-- <hr>\n        <h4 class=\"default-cursor\" (click)=\"toggleVisible('output')\">\n            {{visible.output ? '▼' : '▶'}} Form Output\n        </h4>\n        <div *ngIf=\"visible.output\" fxLayout=\"column\" [@expandSection]=\"true\">\n            <div>\n                Valid?:\n                <strong *ngIf=\"formIsValid || prettyValidationErrors\"\n                    [class.text-success]=\"formIsValid\"\n                    [class.text-danger]=\"!formIsValid\">\n                    {{formIsValid ? 'Yes' : 'No'}}\n                </strong>\n                <span *ngIf=\"!formIsValid && !prettyValidationErrors\">n/a</span>\n                <span *ngIf=\"prettyValidationErrors\">— errors from validationErrors():</span>\n                <div *ngIf=\"prettyValidationErrors\"\n                class=\"data-bad\"\n                [innerHTML]=\"prettyValidationErrors\"></div>\n            </div><br>\n            <div>\n                Live data — from onChanges():\n                <pre\n                [class.data-good]=\"!prettyValidationErrors && prettyLiveFormData !== '{}'\"\n                [class.data-bad]=\"prettyValidationErrors\">{{prettyLiveFormData}}</pre>\n            </div><br>\n            <div>\n                Submitted data — from onSubmit():\n                <pre [class.data-good]=\"prettySubmittedFormData !== 'null'\">{{prettySubmittedFormData}}</pre>\n            </div>\n        </div> -->\n    </mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9kZW1vL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "../../node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _json_loader_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./json-loader.service */ "./src/app/json-loader.service.ts");






var sets = {
    // asf: 'Angular Schema Form:',
    // jsf: 'JSONForm:',
    ngx: ''
    // rsf: 'React Schema Form:'
};
var AppComponent = /** @class */ (function () {
    function AppComponent(route, router, jsonLoader) {
        this.route = route;
        this.router = router;
        this.jsonLoader = jsonLoader;
        // examples: any = {ngx: {}};
        // languageList: any = ['en', 'fr'];
        // languages: any = {
        //     'en': 'English',
        //     'fr': 'French',
        // };
        // frameworkList: any = ['material-design', 'bootstrap-3', 'bootstrap-4', 'no-framework'];
        // frameworks: any = {
        //     'material-design': 'Material Design',
        //     'bootstrap-3': 'Bootstrap 3',
        //     'bootstrap-4': 'Bootstrap 4',
        //     'no-framework': 'None (plain HTML)',
        // };
        this.selectedSet = '';
        this.selectedSetName = '';
        this.selectedExample = '';
        this.selectedExampleName = '';
        // selectedFramework = 'material-design';
        // selectedLanguage = 'en';
        this.formActive = false;
        this.jsonFormValid = false;
        this.jsonFormStatusMessage = 'Loading form...';
        // jsonFormOptions: any = {
        //     addSubmit: true, // Add a submit button if layout does not have one
        //     debug: false, // Don't show inline debugging information
        //     loadExternalAssets: true, // Load external css and JavaScript for frameworks
        //     returnEmptyFields: false, // Don't return values for empty input fields
        //     setSchemaDefaults: true, // Always use schema defaults for empty fields
        //     defaultWidgetOptions: { feedback: true }, // Show inline feedback icons
        // };
        // liveFormData: any = {};
        // formValidationErrors: any;
        // formIsValid = null;
        // submittedFormData: any = null;
        this.aceEditorOptions = {
            autoScrollEditorIntoView: true,
            highlightActiveLine: true,
            maxLines: 1000,
            printMargin: false
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.examplesObservable = this.jsonLoader.examples;
        this.selectedSet = 'ngx';
        this.selectedExample = 'simple-array';
        this.selectedExampleName = 'Simple Array';
        this.route.queryParams.subscribe(function (params) {
            if (params.set) {
                _this.selectedSet = params.set;
                _this.selectedSetName = sets[_this.selectedSet];
            }
            if (params.example) {
                _this.selectedExample = params.example;
                _this.jsonLoader.examples.subscribe(function (examples) {
                    _this.selectedExampleName = examples
                        .find(function (data) { return data.set === [_this.selectedSet]; })
                        .find(function (data) { return data.file === _this.selectedExample; }).name;
                });
            }
            // if (params['framework']) {
            //     this.selectedFramework = params['framework'];
            // }
            // if (params['language']) {
            //     this.selectedLanguage = params['language'];
            // }
            _this.loadSelectedExample();
        });
    };
    AppComponent.prototype.trackByFn = function (index) {
        return index;
    };
    // onSubmit(data: any) {
    //     this.submittedFormData = data;
    // }
    // get prettySubmittedFormData() {
    //     return JSON.stringify(this.submittedFormData, null, 2);
    // }
    // onChanges(data: any) {
    //     this.liveFormData = data;
    // }
    // get prettyLiveFormData() {
    //     return JSON.stringify(this.liveFormData, null, 2);
    // }
    // isValid(isValid: boolean): void {
    //     this.formIsValid = isValid;
    // }
    // validationErrors(data: any): void {
    //     this.formValidationErrors = data;
    // }
    // get prettyValidationErrors() {
    //     if (!this.formValidationErrors) { return null; }
    //     let errorArray = [];
    //     for (let error of this.formValidationErrors) {
    //     let message = error.message;
    //     let dataPathArray = JsonPointer.parse(error.dataPath);
    //     if (dataPathArray.length) {
    //         let field = dataPathArray[0];
    //         for (let i = 1; i < dataPathArray.length; i++) {
    //         const key = dataPathArray[i];
    //         field += /^\d+$/.test(key) ? `[${key}]` : `.${key}`;
    //         }
    //         errorArray.push(`${field}: ${message}`);
    //     } else {
    //         errorArray.push(message);
    //     }
    //     }
    //     return errorArray.join('<br>');
    // }
    AppComponent.prototype.loadSelectedExample = function (selectedSet, selectedSetName, selectedExample, selectedExampleName) {
        var _this = this;
        if (selectedSet === void 0) { selectedSet = this.selectedSet; }
        if (selectedSetName === void 0) { selectedSetName = this.selectedSetName; }
        if (selectedExample === void 0) { selectedExample = this.selectedExample; }
        if (selectedExampleName === void 0) { selectedExampleName = this.selectedExampleName; }
        if (this.menuTrigger && this.menuTrigger.menuOpen) {
            this.menuTrigger.closeMenu();
        }
        if (selectedExample !== this.selectedExample) {
            this.formActive = false;
            this.selectedSet = selectedSet;
            this.selectedSetName = selectedSetName;
            this.selectedExample = selectedExample;
            this.selectedExampleName = selectedExampleName;
            this.router.navigateByUrl("/                ?set=" + selectedSet + "                &example=" + selectedExample + "            ").catch(function (reason) {
                console.warn(reason);
            });
            // &framework=${this.selectedFramework}\
            // &language=${this.selectedLanguage}\
            // this.liveFormData = {};
            // this.submittedFormData = null;
            // this.formIsValid = null;
            // this.formValidationErrors = null;
        }
        else {
            this.jsonLoader.getExample(this.selectedSet, this.selectedExample)
                .subscribe(function (schema) {
                _this.jsonFormSchema = schema;
                _this.generateForm(_this.jsonFormSchema);
            });
        }
    };
    // loadSelectedLanguage() {
    //     window.location.href =
    //     '/?set=' + this.selectedSet +
    //     '&example=' + this.selectedExample +
    //     '&framework=' + this.selectedFramework +
    //     '&language=' + this.selectedLanguage;
    // }
    // Display the form entered by the user
    // (runs whenever the user changes the jsonform object in the ACE input field)
    AppComponent.prototype.generateForm = function (newFormString) {
        if (!newFormString) {
            return;
        }
        this.jsonFormStatusMessage = 'Loading form...';
        this.formActive = false;
        // this.liveFormData = {};
        // this.submittedFormData = null;
        // Most examples should be written in pure JSON,
        // but if an example schema includes a function,
        // it will be compiled it as Javascript instead
        // try {
        // // Parse entered content as JSON
        // this.jsonFormObject = JSON.parse(newFormString);
        // this.jsonFormValid = true;
        // } catch (jsonError) {
        //     try {
        //         // If entered content is not valid JSON,
        //         // parse as JavaScript instead to include functions
        //         let newFormObject: any = null;
        //         /* tslint:disable */
        //         eval('newFormObject = ' + newFormString);
        //         /* tslint:enable */
        //         this.jsonFormObject = newFormObject;
        //         this.jsonFormValid = true;
        //     } catch (javascriptError) {
        //         // If entered content is not valid JSON or JavaScript, show error
        //         this.jsonFormValid = false;
        //         this.jsonFormStatusMessage =
        //         'Entered content is not currently a valid JSON Form object.\n' +
        //         'As soon as it is, you will see your form here. So keep typing. :-)\n\n' +
        //         'JavaScript parser returned:\n\n' + jsonError;
        //         return;
        //     }
        // }
        this.formActive = true;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenuTrigger"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatMenuTrigger"])
    ], AppComponent.prototype, "menuTrigger", void 0);
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('expandSection', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ height: '*' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])(':enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ height: 0 }), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('100ms')
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])(':leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ height: '*' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('100ms', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ height: 0 }))
                    ])
                ])
            ],
            selector: 'app-demo',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _json_loader_service__WEBPACK_IMPORTED_MODULE_5__["JsonLoaderService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "../../node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ng2_ace_editor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-ace-editor */ "../../node_modules/ng2-ace-editor/index.js");
/* harmony import */ var _ngx_json_schema_form_src_public_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../ngx-json-schema-form/src/public-api */ "../ngx-json-schema-form/src/public-api.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var _root_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./root.component */ "./src/app/root.component.ts");














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            bootstrap: [_root_component__WEBPACK_IMPORTED_MODULE_13__["RootComponent"]],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"],
                _root_component__WEBPACK_IMPORTED_MODULE_13__["RootComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatMenuModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forRoot(_app_routes__WEBPACK_IMPORTED_MODULE_12__["routes"]),
                ng2_ace_editor__WEBPACK_IMPORTED_MODULE_9__["AceEditorModule"],
                _ngx_json_schema_form_src_public_api__WEBPACK_IMPORTED_MODULE_10__["JsonSchemaFormModule"]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");

var routes = [
    { path: '', component: _app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"] },
    { path: '**', component: _app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"] }
];


/***/ }),

/***/ "./src/app/json-loader.service.ts":
/*!****************************************!*\
  !*** ./src/app/json-loader.service.ts ***!
  \****************************************/
/*! exports provided: JsonLoaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonLoaderService", function() { return JsonLoaderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");



var JsonLoaderService = /** @class */ (function () {
    function JsonLoaderService(httpClient) {
        this.httpClient = httpClient;
        this.examplesURL = 'assets/examples/examples.json';
    }
    Object.defineProperty(JsonLoaderService.prototype, "examples", {
        get: function () {
            return this.httpClient.get(this.examplesURL);
        },
        enumerable: true,
        configurable: true
    });
    JsonLoaderService.prototype.getExample = function (set, example) {
        var exampleURL = "assets/examples/" + set + "/" + example + ".json";
        return this.httpClient.get(exampleURL, { responseType: 'text' });
    };
    JsonLoaderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], JsonLoaderService);
    return JsonLoaderService;
}());



/***/ }),

/***/ "./src/app/root.component.ts":
/*!***********************************!*\
  !*** ./src/app/root.component.ts ***!
  \***********************************/
/*! exports provided: RootComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootComponent", function() { return RootComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var RootComponent = /** @class */ (function () {
    function RootComponent() {
    }
    RootComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: "<router-outlet></router-outlet>"
        })
    ], RootComponent);
    return RootComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var brace_mode_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! brace/mode/json */ "../../node_modules/brace/mode/json.js");
/* harmony import */ var brace_mode_json__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(brace_mode_json__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) {
    console.error(err);
});


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\jds44\workspace\ngx-json-schema-form\projects\demo\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map