import { createHash } from "crypto";
import { Schema } from "@open-rpc/meta-schema";
import mapValues from "lodash.mapvalues";
import compact from "lodash.compact";
import flatten from "lodash.flatten";
import traverse from "./traverse";
import TypescriptGenerator from "./codegens/typescript";
import { ensureSubschemaTitles } from "./ensure-subschema-titles";

const schemaToRef = (s: Schema) => ({ $ref: `#/definitions/${s.title}` });
const schemaSortComparator = (s1: Schema, s2: Schema) => s1.title > s2.title;
const sortKeys = (o: any) => Object.keys(o).sort().reduce((m, k) => ({ ...m, [k]: o[k] }), {});
const joinTitles = (s: Schema[]): string => s.map(({ title }: Schema) => title).join("_");
const hashRegex = new RegExp("[^A-z | 0-9]+", "g");
export class JsonSchemaToTypes {
  public megaSchema: Schema;

  constructor(s: Schema) {
    const schemaWithTitles = this.ensureSchemaTitles(s);
    this.megaSchema = this.collectAndRefSchemas(schemaWithTitles);
  }

  public toTypescript() {
    const allTypes = [];
    allTypes.push(new TypescriptGenerator(this.megaSchema).getTypes());

    Object.entries(this.megaSchema.definitions)
      .forEach(([name, schema]: [string, any]) => allTypes.push(new TypescriptGenerator(schema).getTypes()));
    return allTypes.join("\n").trim();
  }

  public getDefaultTitleForSchema(schema: Schema): Schema {
    if (schema.title) { return schema; }

    const subSchemaTitleErrors = ensureSubschemaTitles(schema);
    if (subSchemaTitleErrors.length > 0) {
      subSchemaTitleErrors.forEach((e) => console.error);
      throw subSchemaTitleErrors[0];
    }

    let prefix = schema.type || "any_";

    ["anyOf", "oneOf", "allOf"].forEach((k) => {
      if (schema[k]) {
        schema[k] = schema[k].sort(schemaSortComparator);
        prefix = `${k}_${schema[k].map(({ title }: Schema) => title).join("_")}_`;
      }
    });

    if (schema.type === "object" && schema.properties) {
      schema.properties = sortKeys(schema.properties);
      prefix = `objectOf_${joinTitles(Object.values(schema.properties))}_`;
    }

    if (schema.type === "array") {
      if (schema.items instanceof Array === false) {
        schema.items = sortKeys(schema.items);
        prefix = `unorderedSetOf_${schema.items.title}`;
      } else {
        prefix = `unorderedSetOf_${joinTitles(schema.items)}`;
      }
    }

    if (schema.enum) {
      schema.enum = schema.enum.sort();
    }

    const definitions = schema.definitions;
    schema.definitions = undefined;

    const hash = createHash("sha1").update(JSON.stringify(schema)).digest("base64");
    const friendlyHash = hash.replace(hashRegex, "").slice(0, 8);
    return { ...schema, title: `${prefix}${friendlyHash}`, definitions };
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
      }, { skipFirstMutation: true }),
      definitions,
    };
  }

}

export default JsonSchemaToTypes;
