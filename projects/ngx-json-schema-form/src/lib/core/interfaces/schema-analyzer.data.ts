import { JSONSchema7Definition } from 'json-schema';

/** Defines properties and methods for working with a json schema */
export interface SchemaAnalyzer {
    /** Map of json data pointers and their corresponding schema */
    readonly dataPointerMap: Map<string, JSONSchema7Definition>;
}
