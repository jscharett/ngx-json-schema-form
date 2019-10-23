import { join, normalize, Path, strings } from '@angular-devkit/core';
import { DirEntry, Rule, SchematicsException, Tree } from '@angular-devkit/schematics';

import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

import { findNodes, insertAfterLastOccurrence } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange, NoopChange } from '@schematics/angular/utility/change';
import { getWorkspace } from '@schematics/angular/utility/config';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

function findIndexFromOptions(tree: Tree, options: WidgetOptions): Path {
    const pathToCheck = `${(options.path || '')}/${options.name}`;

    return normalize(findIndex(tree, pathToCheck));
}

function findIndex(tree: Tree, generateDir: string): Path {
    let dir: DirEntry | null = tree.getDir(`/${generateDir}`);

    while (dir) {
        const allMatches = dir.subfiles.filter((p) => p === 'index.ts');
        // console.log(dir.subfiles);
        if (allMatches.length === 1) {
            return join(dir.path, allMatches[0]);
        }

        dir = dir.parent;
    }

    const errorMsg = 'Could not find an Barrel Roll.'; // Use the skip-import option to skip importing in NgModule.';

    throw new Error(errorMsg);
}

function buildRelativeIndexPath(options: any, indexPath: string): string {
    const dasherizedName = strings.dasherize('index');
    const importIndexPath = normalize(`/${options.path}/${(options.flat ? '' : `${dasherizedName}/`)}${dasherizedName}.module`);

    return buildRelativePath(indexPath, importIndexPath);
}

/**
 * Add Export `export { symbolName } from fileName` if the export doesn't exit
 * already. Assumes fileToEdit can be resolved and accessed.
 * @param fileToEdit (file we want to add export to)
 * @param symbolName (item to export)
 * @param fileName (path to the file)
 * @param isDefault (if true, export follows style for exporting default exports)
 * @return Change
 */
function insertExport(source: ts.SourceFile, fileToEdit: string, symbolName: string,
    fileName: string, isDefault = false): Change {
    const rootNode = source;
    const allExports = findNodes(rootNode, ts.SyntaxKind.ExportDeclaration);

    // get nodes that map to import statements from the file fileName
    const relevantExports = allExports.filter((node) => {
        // StringLiteral of the ExportDeclaration is the import file (fileName in this case).
        const exportFiles = node.getChildren()
            .filter((child) => child.kind === ts.SyntaxKind.StringLiteral)
            .map((n) => (n as ts.StringLiteral).text);

        return exportFiles.filter((file) => file === fileName).length === 1;
    });
    let fallbackPos = 0;

    if (relevantExports.length > 0) {
        let exportsAsterisk = false;
        // exports from import file
        const exports: Array<ts.Node> = [];
        relevantExports.forEach((n) => {
            Array.prototype.push.apply(exports, findNodes(n, ts.SyntaxKind.Identifier));
            if (findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                exportsAsterisk = true;
            }
        });

        // if exports * from fileName, don't add symbolName
        if (exportsAsterisk) {
            return new NoopChange();
        }

        const exportTextNodes = exports.filter((n) => (n as ts.Identifier).text === symbolName);

        // insert export if it's not there
        if (exportTextNodes.length === 0) {
            fallbackPos =
                findNodes(relevantExports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                findNodes(relevantExports[0], ts.SyntaxKind.FromKeyword)[0].getStart();

            return insertAfterLastOccurrence(exports, `, ${symbolName}`, fileToEdit, fallbackPos);
        }

        return new NoopChange();
    }

    // no such export declaration exists
    const useStrict = findNodes(rootNode, ts.SyntaxKind.StringLiteral)
        .filter((n: ts.StringLiteral) => n.text === 'use strict');
    if (useStrict.length > 0) {
        fallbackPos = useStrict[0].end;
    }
    const [open, close] = isDefault ? ['', ''] : ['{ ', ' }'];
    // if there are no exports or 'use strict' statement, insert iexport at beginning of file
    const insertAtBeginning = allExports.length === 0 && useStrict.length === 0;
    const separator = insertAtBeginning ? '' : ';\n';
    const toInsert = `${separator}export ${open}${symbolName}${close}` +
        ` from '${fileName}'${insertAtBeginning ? ';\n' : ''}`;

    return insertAfterLastOccurrence(
        allExports,
        toInsert,
        fileToEdit,
        fallbackPos,
        ts.SyntaxKind.StringLiteral
    );
}

export interface WidgetOptions {
    // The name of the widget.
    name: string;

    // The declaring NgModule.
    module?: string;

    // The path to create the widget.
    path?: string;

    // The name of the project.
    project?: string;
}

export function getWidgetOptions(tree: Tree, options: WidgetOptions): WidgetOptions {
    const workspace = getWorkspace(tree);
    const opts: WidgetOptions = {...options};

    if (!opts.project) {
        opts.project = workspace.defaultProject;
    }

    const project = <WorkspaceProject>workspace.projects[opts.project as string];
    if (opts.path === undefined) {
        opts.path = buildDefaultPath(project);
    }

    // throws error if run twice. First run modifies module to include path
    if (!opts.module) {
        opts.module = findModuleFromOptions(tree, opts);
    }

    const parsedPath = parseName(opts.path, opts.name);
    opts.name = parsedPath.name;
    opts.path = parsedPath.path;

    return opts;
}

export function addExportToIndex(options: WidgetOptions): Rule {
    return (tree: Tree) => {
        const indexPath = findIndexFromOptions(tree, options);

        const text = tree.read(indexPath);
        if (text === null) {
            throw new SchematicsException(`File ${indexPath} does not exist.`);
        }
        const sourceText = text.toString();
        const source = ts.createSourceFile(indexPath, sourceText, ts.ScriptTarget.Latest, true);

        const relativePath = buildRelativeIndexPath(options, indexPath);
        // const changes = addExportToIndexFile(source, indexPath, '*', relativePath);
        const changes = [insertExport(source, indexPath, '*', relativePath, true)];
        // const changes = addImportToModule(
        //     source,
        //     indexPath,
        //     strings.classify(`${options.name}Module`),
        //     relativePath);

        const recorder = tree.beginUpdate(indexPath);
        for (const change of changes) {
            if (change instanceof InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        tree.commitUpdate(recorder);

        return tree;
    };
}
