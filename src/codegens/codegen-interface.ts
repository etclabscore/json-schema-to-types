import { Schema } from "@open-rpc/meta-schema";

export abstract class CodeGen {
  constructor(protected schema: Schema) { }

  public getTypesForSchema(schema: Schema): string {
    throw new Error("must be implemented by subclass");
  }

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
