import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

// tslint:disable:no-import-side-effect
import 'brace';
import 'brace/mode/json';
import 'brace/theme/sqlserver';

declare var ace: any;

@Directive({
    selector: '[appAceEditor]'
})
export class AceEditorDirective {
    private _options: any = {};
    private _readOnly = false;
    private _theme = 'sqlserver';
    private _mode = 'json';
    private _autoUpdateContent = true;
    private readonly _showGutter = false;
    private readonly _highlightActiveLine = false;

    editor: any;
    oldText: any;

    @Output() readonly textChanged: EventEmitter<string> = new EventEmitter<string>();

    constructor(elementRef: ElementRef) {
        const el = elementRef.nativeElement;
        ace.config.set('basePath', '/node_modules/brace');
        this.editor = ace.edit(el);
        this.init();
        this.initEvents();
    }

    init() {
        this.editor.getSession().setUseWorker(false);
        this.editor.setOptions(this._options);
        this.editor.setTheme(`ace/theme/${this._theme}`);
        this.editor.getSession().setMode(`ace/mode/${this._mode}`);
        this.editor.setHighlightActiveLine(this._highlightActiveLine);
        this.editor.renderer.setShowGutter(this._showGutter);
        this.editor.setReadOnly(this._readOnly);
        this.editor.$blockScrolling = Infinity;
    }

    initEvents() {
        this.editor.on('change', () => {
            const newVal = this.editor.getValue();
            if (newVal === this.oldText) { return; }
            if (typeof this.oldText !== 'undefined') {
                this.textChanged.emit(newVal);
            }
            this.oldText = newVal;
        });
    }

    @Input() set options(options: any) {
        this._options = options;
        this.editor.setOptions(options || {});
    }

    @Input() set readOnly(readOnly: any) {
        this._readOnly = readOnly;
        this.editor.setReadOnly(readOnly);
    }

    @Input() set theme(theme: any) {
        this._theme = theme;
        this.editor.setTheme(`ace/theme/${theme}`);
    }

    @Input() set mode(mode: any) {
        this._mode = mode;
        this.editor.getSession().setMode(`ace/mode/${mode}`);
    }

    @Input() set text(text: any) {
        if (this._autoUpdateContent) {
            this.editor.setValue(text || '');
            this.editor.clearSelection();
            this.editor.focus();
            this.editor.moveCursorTo(0, 0);
        }
    }

    @Input() set autoUpdateContent(status: boolean) {
        this._autoUpdateContent = status;
    }
}
