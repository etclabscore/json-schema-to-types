import { Schema } from "@open-rpc/meta-schema";

export interface TypeIntermediateRepresentation {
  macros: string;
  prefix: string;
  typing: string;
}

export abstract class CodeGen {
  constructor(protected schema: Schema) { }

  public toIR(s: Schema): TypeIntermediateRepresentation {
    switch (s.type) {
      case "boolean": return this.handleBoolean(s);

      case "null": return this.handleNull(s);

      case "number":
        if (s.enum) return this.handleNumericalEnum(s);
        return this.handleNumber(s);

      case "integer":
        if (s.enum) return this.handleNumericalEnum(s);
        return this.handleInteger(s);

      case "string":
        if (s.enum) return this.handleStringEnum(s);
        return this.handleString(s);

      case "array":
        if (s.items instanceof Array) return this.handleOrderedArray(s);
        if (s.items !== undefined) return this.handleUnorderedArray(s);
        return this.handleUntypedArray(s);

      case "object":
        if (s.properties === undefined) return this.handleUntypedObject(s);
        return this.handleObject(s);

      default:
        if (s.anyOf) return this.handleAllOf(s);
        if (s.oneOf) return this.handleOneOf(s);
        if (s.allOf) return this.handleAllOf(s);
        return this.handleUntyped(s);
    }
  }

  public abstract getCodePrefix(schema: Schema): string;

  public abstract handleBoolean(schema: Schema): TypeIntermediateRepresentation;
  public abstract handleNull(schema: Schema): TypeIntermediateRepresentation;

  public abstract handleNumber(schema: Schema): TypeIntermediateRepresentation;
  public abstract handleInteger(schema: Schema): TypeIntermediateRepresentation;
  public abstract handleNumericalEnum(s: Schema): TypeIntermediateRepresentation;

  public abstract handleString(schema: Schema): TypeIntermediateRepresentation;
  public abstract handleStringEnum(s: Schema): TypeIntermediateRepresentation;

  public abstract handleOrderedArray(schema: Schema): TypeIntermediateRepresentation;
  public abstract handleUnorderedArray(schema: Schema): TypeIntermediateRepresentation;
  public abstract handleUntypedArray(schema: Schema): TypeIntermediateRepresentation;

  public abstract handleObject(schema: Schema): TypeIntermediateRepresentation;
  public abstract handleUntypedObject(schema: Schema): TypeIntermediateRepresentation;

  public abstract handleAnyOf(schema: Schema): TypeIntermediateRepresentation;
  public abstract handleAllOf(schema: Schema): TypeIntermediateRepresentation;
  public abstract handleOneOf(schema: Schema): TypeIntermediateRepresentation;

  public abstract handleUntyped(s: Schema): TypeIntermediateRepresentation;

  public getTypes() {
    return [
      this.getTypesForRootSchema(),
      this.getTypesForDefinitions(),
    ].join("\n").trim();
  }

  public getTypesForRootSchema() {
    return this.getTypesForSchema(this.schema);
  }

  public getTypesForDefinitions() {
    if (!this.schema.definitions) { return ""; }

    const allTypes: string[] = [];

    Object.entries(this.schema.definitions)
      .forEach(([name, schema]: [string, any]) => allTypes.push(this.getTypesForSchema(schema)));

    return allTypes.join("\n").trim();
  }

  protected refToName(schema: Schema) {
    if (schema.$ref === undefined) {
      throw new Error("the Subschemas of the schema must use $ref. Inline subschemas are not allowed.");
    }
    return schema.$ref.replace("#/definitions/", "");
  }

  protected getJoinedTitles(schemas: Schema[], seperator = ", ") {
    return schemas.map(this.refToName).join(seperator);
  }
}
