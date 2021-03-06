import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { JSONSchema7 } from 'json-schema';

import { LayoutItem } from 'ngx-json-schema-form';

import { JsonLoaderService } from '../json-loader.service';

const sets = {
    // asf: 'Angular Schema Form:',
    // jsf: 'JSONForm:',
    ngx: ''
    // rsf: 'React Schema Form:'
};

@Component({
    animations: [
        trigger('expandSection', [
            state('in', style({ height: '*' })),
            transition(':enter', [
                style({ height: 0 }), animate('100ms')
            ]),
            transition(':leave', [
                style({ height: '*' }),
                animate('100ms', style({ height: 0 }))
            ])
        ])
    ],
    selector: 'app-demo',
    styleUrls: ['./demo.component.scss'],
    templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {
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
    example: string;
    selectedSet = '';
    selectedSetName = '';
    selectedExample = '';
    selectedExampleName = '';
    // selectedFramework = 'material-design';
    // selectedLanguage = 'en';

    formActive = false;
    jsonFormValid = false;
    jsonFormSchema: JSONSchema7;
    jsonFormLayout: Array<any>;
    jsonFormStatusMessage = 'Loading form...';
    // jsonFormObject: any;
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
    aceEditorOptions: any = {
        autoScrollEditorIntoView: true,
        highlightActiveLine: true,
        maxLines: 1000,
        printMargin: false
    };

    options = {
        action: undefined,
        autocomplete: undefined,
        enctype: undefined,
        method: undefined,
        target: undefined
    };

    @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

    public examplesObservable: Observable<Array<any>>;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly jsonLoader: JsonLoaderService
    ) { }

    ngOnInit() {
        this.examplesObservable = this.jsonLoader.examples;
        this.selectedSet = 'ngx';
        this.selectedExample = 'simple-array';
        this.selectedExampleName = 'Simple Array';
        this.route.queryParams.subscribe((params: Params) => {
            if (params.set) {
                this.selectedSet = params.set;
                this.selectedSetName = sets[this.selectedSet];
            }
            if (params.example) {
                this.selectedExample = params.example;
                this.jsonLoader.examples.subscribe((examples: Array<{set: string; examples: Array<{name: string}>}>) => {
                    this.selectedExampleName = examples
                        .find((data: any) => data.set === this.selectedSet)
                        .examples
                        .find((data: any) => data.file === this.selectedExample).name;
                });
            }
            // if (params['framework']) {
            //     this.selectedFramework = params['framework'];
            // }
            // if (params['language']) {
            //     this.selectedLanguage = params['language'];
            // }
            this.loadSelectedExample();
        });
    }

    trackByFn(index) {
        return index;
    }

    /** Handle click events from form inputs */
    onClick(data: LayoutItem | Event): void {
        console.warn(data);
        if (data.hasOwnProperty('onClick')) {
            const layout = data as LayoutItem;
            const fn = new Function('layout', layout.onClick);
            fn(layout);
        }
    }

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

    loadSelectedExample(
        selectedSet: string = this.selectedSet,
        selectedSetName: string = this.selectedSetName,
        selectedExample: string = this.selectedExample,
        selectedExampleName: string = this.selectedExampleName
    ): void {
        if (this.menuTrigger && this.menuTrigger.menuOpen) { this.menuTrigger.closeMenu(); }
        if (selectedExample !== this.selectedExample) {
            this.formActive = false;
            this.selectedSet = selectedSet;
            this.selectedSetName = selectedSetName;
            this.selectedExample = selectedExample;
            this.selectedExampleName = selectedExampleName;
            // https://github.com/declandewet/common-tags#stripindent
            this.router.navigateByUrl(`/?set=${selectedSet}&example=${selectedExample}`)
            .catch((reason) => {
                console.warn(reason);
            });
                // &framework=${this.selectedFramework}\
                // &language=${this.selectedLanguage}\
            // this.liveFormData = {};
            // this.submittedFormData = null;
            // this.formIsValid = null;
            // this.formValidationErrors = null;
        } else {
            this.jsonLoader.getExample(this.selectedSet, this.selectedExample)
                .subscribe((example: string) => {
                    this.generateForm(example);
                });
        }
    }

    // loadSelectedLanguage() {
    //     window.location.href =
    //     '/?set=' + this.selectedSet +
    //     '&example=' + this.selectedExample +
    //     '&framework=' + this.selectedFramework +
    //     '&language=' + this.selectedLanguage;
    // }

    // Display the form entered by the user
    // (runs whenever the user changes the jsonform object in the ACE input field)
    generateForm(newFormString: string): void {
        if (!newFormString) { return; }
        this.example = newFormString;
        this.jsonFormStatusMessage = 'Loading form...';
        this.formActive = false;
        // this.liveFormData = {};
        // this.submittedFormData = null;

        // Most examples should be written in pure JSON,
        // but if an example schema includes a function,
        // it will be compiled it as Javascript instead
        try {
            // Parse entered content as JSON
            const jsonFormObject = JSON.parse(newFormString);
            this.jsonFormSchema = jsonFormObject.schema;
            this.jsonFormLayout = jsonFormObject.layout;
            this.jsonFormValid = true;
            this.formActive = true;
        } catch (jsonError) {
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
            this.jsonFormStatusMessage = `Entered content is not currently a valid JSON Form object.
                As soon as it is, you will see your form here. So keep typing. :-)

                JavaScript parser returned:

                ${jsonError}`;
        //         return;
        //     }
        }
    }

    // toggleFormOption(option: string) {
    //     if (option === 'feedback') {
    //     this.jsonFormOptions.defaultWidgetOptions.feedback =
    //         !this.jsonFormOptions.defaultWidgetOptions.feedback;
    //     } else {
    //     this.jsonFormOptions[option] = !this.jsonFormOptions[option];
    //     }
    //     this.generateForm(this.jsonFormSchema);
    // }
}
