import { createHash } from "crypto";
import { Schema } from "@open-rpc/meta-schema";
import mapValues from "lodash.mapvalues";
import compact from "lodash.compact";
import flatten from "lodash.flatten";
import traverse from "./traverse";

const schemaToRef = (s: Schema) => ({ $ref: `#/definitions/${s.title}` });

export class JsonSchemaToTypes {

  constructor(s: Schema) {
    // 1. apply title where title is missing. Use content hash
    const schemaWithTitles = this.ensureSchemaTitles(s);

    // 2. collect and ref all sub schemas (also uniques them)
    const reffedSchemas = this.collectAndRefSchemas(schemaWithTitles);

    // 3.
  }

  private getDefaultTitleForSchema(schema: Schema): Schema {
    if (schema.title) { return schema; }

    const hash = createHash("sha1").update(JSON.stringify(schema)).digest("base64").slice(0, 8);
    const { oneOf, anyOf, allOf } = schema;
    let prefix = schema.type;
    // a better way to handle this would be the pull the names from subschemas, and make this anyOf_TheSubSchemaNames
    if (!prefix) {
      if (oneOf) {
        prefix = "oneOf";
      } else if (allOf) {
        prefix = "allOf";
      } else if (anyOf) {
        prefix = "anyOf";
      } else {
        prefix = "unknown";
      }
    }

    return { ...schema, title: `${prefix}${hash}` };
  }

  private ensureSchemaTitles(s: Schema) {
    return traverse(s, this.getDefaultTitleForSchema);
  }

  private collectAndRefSchemas(schema: Schema): Schema {
    const definitions: any = {};
    return {
      ...traverse(schema, (subSchema: Schema) => {
        definitions[subSchema.title] = subSchema;
        return { $ref: `#/definitions/${subSchema.title}` };
      }),
      definitions,
    };
  }
}

export default JsonSchemaToTypes;
