'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">NGX JSOLN Schema Form</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/introduction.html" data-type="entity-link" data-context-id="additional">Introduction</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/buttons.html" data-type="entity-link" data-context-id="additional">Buttons</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/containers.html" data-type="entity-link" data-context-id="additional">Containers</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/hidden-inputs.html" data-type="entity-link" data-context-id="additional">Hidden Inputs</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/templates.html" data-type="entity-link" data-context-id="additional">Templates</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ButtonModule.html" data-type="entity-link">ButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ButtonModule-4a4b7570607fba8d1148434f62c1e72c"' : 'data-target="#xs-components-links-module-ButtonModule-4a4b7570607fba8d1148434f62c1e72c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ButtonModule-4a4b7570607fba8d1148434f62c1e72c"' :
                                            'id="xs-components-links-module-ButtonModule-4a4b7570607fba8d1148434f62c1e72c"' }>
                                            <li class="link">
                                                <a href="components/ButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContainerModule.html" data-type="entity-link">ContainerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContainerModule-a6948c9708338475b1690a057eac79f6"' : 'data-target="#xs-components-links-module-ContainerModule-a6948c9708338475b1690a057eac79f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContainerModule-a6948c9708338475b1690a057eac79f6"' :
                                            'id="xs-components-links-module-ContainerModule-a6948c9708338475b1690a057eac79f6"' }>
                                            <li class="link">
                                                <a href="components/ContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FormModule.html" data-type="entity-link">FormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormModule-1c703465d5036ceed88e4e79905dcf75"' : 'data-target="#xs-components-links-module-FormModule-1c703465d5036ceed88e4e79905dcf75"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormModule-1c703465d5036ceed88e4e79905dcf75"' :
                                            'id="xs-components-links-module-FormModule-1c703465d5036ceed88e4e79905dcf75"' }>
                                            <li class="link">
                                                <a href="components/JsonSchemaFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JsonSchemaFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HiddenModule.html" data-type="entity-link">HiddenModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HiddenModule-76f3d83b4d4f85a4522b16e7978fd0c2"' : 'data-target="#xs-components-links-module-HiddenModule-76f3d83b4d4f85a4522b16e7978fd0c2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HiddenModule-76f3d83b4d4f85a4522b16e7978fd0c2"' :
                                            'id="xs-components-links-module-HiddenModule-76f3d83b4d4f85a4522b16e7978fd0c2"' }>
                                            <li class="link">
                                                <a href="components/HiddenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HiddenComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JsonSchemaFormModule.html" data-type="entity-link">JsonSchemaFormModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SelectWidgetModule.html" data-type="entity-link">SelectWidgetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SelectWidgetModule-10addbbd8cf46d9b77a5fd1a6f0c738a"' : 'data-target="#xs-components-links-module-SelectWidgetModule-10addbbd8cf46d9b77a5fd1a6f0c738a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SelectWidgetModule-10addbbd8cf46d9b77a5fd1a6f0c738a"' :
                                            'id="xs-components-links-module-SelectWidgetModule-10addbbd8cf46d9b77a5fd1a6f0c738a"' }>
                                            <li class="link">
                                                <a href="components/SelectWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectWidgetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplateModule.html" data-type="entity-link">TemplateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TemplateModule-efade22bde60dda53bb133498af543c4"' : 'data-target="#xs-components-links-module-TemplateModule-efade22bde60dda53bb133498af543c4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplateModule-efade22bde60dda53bb133498af543c4"' :
                                            'id="xs-components-links-module-TemplateModule-efade22bde60dda53bb133498af543c4"' }>
                                            <li class="link">
                                                <a href="components/TemplateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AbstractWidget.html" data-type="entity-link">AbstractWidget</a>
                            </li>
                            <li class="link">
                                <a href="classes/LayoutNode.html" data-type="entity-link">LayoutNode</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataEventPluginService.html" data-type="entity-link">DataEventPluginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ElementDataStorageService.html" data-type="entity-link">ElementDataStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JsonSchemaFormService.html" data-type="entity-link">JsonSchemaFormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link">LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchemaService.html" data-type="entity-link">SchemaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WidgetLibraryService.html" data-type="entity-link">WidgetLibraryService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Data.html" data-type="entity-link">Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayoutItem.html" data-type="entity-link">LayoutItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayoutOptions.html" data-type="entity-link">LayoutOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SchemaAnalyzer.html" data-type="entity-link">SchemaAnalyzer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WidgetDecorator.html" data-type="entity-link">WidgetDecorator</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});