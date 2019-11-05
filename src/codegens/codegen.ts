import { Schema } from "@open-rpc/meta-schema";
import { capitalize, languageSafeName } from "../utils";

export interface TypeIntermediateRepresentation {
  macros?: string;
  prefix: string;
  typing: string;
  documentationComment?: string;
}

/**
 * Base class for all code generators.
 */
export abstract class CodeGen {
  constructor(protected schema: Schema) { }

  /**
   * Given a schema, it will generate code for both the schema and the schemas in its definitions section
   */
  public transpile() {
    const rootSchemaTypes = this.generate(this.schema, this.toIR(this.schema));
    const defsSchemaTypes: string[] = [];

    if (this.schema.definitions) {
      Object
        .entries(this.schema.definitions)
        .forEach(([n, schema]: [string, any]) => defsSchemaTypes.push(this.generate(schema, this.toIR(schema))));
    }

    return [
      rootSchemaTypes,
      ...defsSchemaTypes,
    ].join("\n").trim();
  }

  /**
   * Generic title transform that gives a title without special characters or spaces. It may be overriden if
   * this implementation does not suffice.
   */
  public getSafeTitle(title: string): string {
    return languageSafeName(title);
  }

  public abstract getCodePrefix(): string;

  protected abstract generate(s: Schema, ir: TypeIntermediateRepresentation): string;

  protected abstract handleBoolean(schema: Schema): TypeIntermediateRepresentation;
  protected abstract handleNull(schema: Schema): TypeIntermediateRepresentation;

  protected abstract handleNumber(schema: Schema): TypeIntermediateRepresentation;
  protected abstract handleInteger(schema: Schema): TypeIntermediateRepresentation;
  protected abstract handleNumericalEnum(s: Schema): TypeIntermediateRepresentation;

  protected abstract handleString(schema: Schema): TypeIntermediateRepresentation;
  protected abstract handleStringEnum(s: Schema): TypeIntermediateRepresentation;

  protected abstract handleOrderedArray(schema: Schema): TypeIntermediateRepresentation;
  protected abstract handleUnorderedArray(schema: Schema): TypeIntermediateRepresentation;
  protected abstract handleUntypedArray(schema: Schema): TypeIntermediateRepresentation;

  protected abstract handleObject(schema: Schema): TypeIntermediateRepresentation;
  protected abstract handleUntypedObject(schema: Schema): TypeIntermediateRepresentation;

  protected abstract handleAnyOf(schema: Schema): TypeIntermediateRepresentation;
  protected abstract handleAllOf(schema: Schema): TypeIntermediateRepresentation;
  protected abstract handleOneOf(schema: Schema): TypeIntermediateRepresentation;

  protected abstract handleUntyped(s: Schema): TypeIntermediateRepresentation;

  protected refToTitle(schema: Schema) {
    if (schema.$ref === undefined) {
      throw new Error("the Subschemas of the schema must use $ref. Inline subschemas are not allowed.");
    }
    return schema.$ref.replace("#/definitions/", "");
  }

  protected getJoinedSafeTitles(schemas: Schema[], seperator = ", ") {
    return schemas.map(this.refToTitle).map(this.getSafeTitle.bind(this)).join(seperator);
  }

  private toIR(s: Schema): TypeIntermediateRepresentation {
    switch (s.type) {
      case "boolean": return this.handleBoolean(s);

      case "null": return this.handleNull(s);

      case "number":
        if (s.enum) { return this.handleNumericalEnum(s); }
        return this.handleNumber(s);

      case "integer":
        if (s.enum) { return this.handleNumericalEnum(s); }
        return this.handleInteger(s);

      case "string":
        if (s.enum) { return this.handleStringEnum(s); }
        return this.handleString(s);

      case "array":
        if (s.items instanceof Array) { return this.handleOrderedArray(s); }
        if (s.items !== undefined) { return this.handleUnorderedArray(s); }
        return this.handleUntypedArray(s);

      case "object":
        if (s.properties === undefined) { return this.handleUntypedObject(s); }
        return this.handleObject(s);

      default:
        if (s.anyOf) { return this.handleAnyOf(s); }
        if (s.oneOf) { return this.handleOneOf(s); }
        if (s.allOf) { return this.handleAllOf(s); }
        return this.handleUntyped(s);
    }
  }

}
