import { createHash } from "crypto";
import { Schema } from "@open-rpc/meta-schema";
import mapValues from "lodash.mapvalues";
import compact from "lodash.compact";
import flatten from "lodash.flatten";
import traverse from "./traverse";

const schemaToRef = (s: Schema) => ({ $ref: `#/definitions/${s.title}` });
const schemaSortComparator = (s1: Schema, s2: Schema) => s1.title > s2.title;

const sortKeys = (o: any) => Object.keys(o).sort().reduce((m, k) => ({ ...m, [k]: o[k] }), {});

const joinTitles = (s: Schema[]): string => s.map(({ title }: Schema) => title).join("_");

export class NoTitleError extends Error {
  constructor(schema: Schema, subSchemaKey: string, subschema: Schema) {
    super([
      "Title is required on subschemas.",
      "Without title, identical schemas would return differing names.",
      "",
      "Schema in question:",
      JSON.stringify(schema),
      "",
      "Key containing problematic subschema:",
      subSchemaKey,
      "",
      "offending subschema:",
      JSON.stringify(subschema),
    ].join("\n"));
  }
}

export class JsonSchemaToTypes {

  constructor(s: Schema) {
    // 1. apply title where title is missing. Use content hash
    const schemaWithTitles = this.ensureSchemaTitles(s);

    // 2. collect and ref all sub schemas (also uniques them)
    const reffedSchemas = this.collectAndRefSchemas(schemaWithTitles);

    // 3.
  }

  public getDefaultTitleForSchema(schema: Schema): Schema {
    if (schema.title) { return schema; }
    console.log(schema); // tslint:disable-line
    let prefix = schema.type;

    ["anyOf", "oneOf", "allOf"].forEach((k) => {
      if (schema[k]) {
        schema[k] = schema[k].sort(schemaSortComparator);
        prefix = `${k} _${schema[k].map(({ title }: Schema) => title).join("_")} `;
      }
    });

    if (schema.type === "object" && schema.properties) {
      schema.properties = sortKeys(schema.properties);
      prefix = `objectOf_${joinTitles(Object.values(schema.properties))}`;
    }

    if (schema.type === "array" && schema.items instanceof Array === false) {
      schema.items = sortKeys(schema.items);
      prefix = `orderedSetOf_${joinTitles(schema.items)}`;
    }

    if (schema.enum) {
      schema.enum = schema.enum.sort();
    }

    const definitions = schema.definitions;
    schema.definitions = undefined;

    const hash = createHash("sha1").update(JSON.stringify(schema)).digest("base64").slice(0, 8);

    return { ...schema, title: `${prefix}${hash}`, definitions };
  }

  private ensureSchemaTitles(s: Schema) {
    return traverse(s, this.getDefaultTitleForSchema);
  }

  private collectAndRefSchemas(schema: Schema): Schema {
    const definitions: any = {};
    return {
      ...traverse(schema, (subSchema: Schema) => {
        definitions[subSchema.title] = subSchema;
        return { $ref: `#/definitions/${subSchema.title} ` };
      }, { skipFirstMutation: true }),
      definitions,
    };
  }
}

export default JsonSchemaToTypes;
