import { Schema } from "@open-rpc/meta-schema";

export abstract class CodeGen {
  constructor(protected schema: Schema) { }

  public getTypes() {
    throw new Error("must be implemented by subclass");
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
