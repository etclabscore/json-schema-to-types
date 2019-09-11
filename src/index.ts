import { createHash } from "crypto";
import { Schema } from "@open-rpc/meta-schema";
import mapValues from "lodash.mapvalues";
import compact from "lodash.compact";
import flatten from "lodash.flatten";

const schemaToRef = (s: Schema) => ({ $ref: `#/definitions/${s.title}` });

export class JsonSchemaToTypes {

  constructor(s: Schema) {
    // 1. apply title where title is missing. Use content hash
    const schemaWithTitles = this.ensureSchemaTitles(s);

    // 2. collect and ref all sub schemas (also uniques them)
    const reffedSchemas = this.collectAndRefSchemas(schemaWithTitles);

    // 3.
  }

  private getDefaultTitleForSchema(schema: Schema): string {
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
    return `${prefix}${hash}`;
  }

  private ensureSchemaTitles(s: Schema) {
    const newS: Schema = { ...s };

    if (s.anyOf) { newS.anyOf = s.anyOf.map(this.ensureSchemaTitles); }
    if (s.allOf) { newS.allOf = s.allOf.map(this.ensureSchemaTitles); }
    if (s.oneOf) { newS.oneOf = s.oneOf.map(this.ensureSchemaTitles); }
    if (s.items) {
      if (s.items instanceof Array) {
        newS.items = s.items.map(this.ensureSchemaTitles);
      } else {
        newS.items = this.ensureSchemaTitles(s.items);
      }
    }

    if (s.properties) { newS.properties = mapValues(s.properties, this.ensureSchemaTitles); }

    if (s.title === undefined) {
      newS.title = this.getDefaultTitleForSchema(s);
    }

    return newS;
  }

  private collectAndRefSchemas(schema: Schema): Schema[] {
    const newS: Schema = { ...schema };
    const subS: Schema[][] = [];

    if (schema.anyOf) {
      subS.push(schema.anyOf);
      newS.anyOf = schema.anyOf.map(schemaToRef);
    }

    if (schema.allOf) {
      subS.push(schema.allOf);
      newS.allOf = schema.allOf.map(schemaToRef);
    }

    if (schema.oneOf) {
      subS.push(schema.oneOf);
      newS.oneOf = schema.oneOf.map(schemaToRef);
    }

    if (schema.items) {
      subS.push(schema.items);

      if (schema.items instanceof Array) {
        newS.items = schema.items.map(schemaToRef);
      } else {
        newS.items = schemaToRef(schema.items);
      }
    }

    if (schema.properties) {
      subS.push(Object.values(schema.properties));
      newS.properties = mapValues(schema.properties, schemaToRef);
    }

    return [...compact(flatten(subS)).map(this.collectAndRefSchemas), newS];
  }

}

export default JsonSchemaToTypes;
