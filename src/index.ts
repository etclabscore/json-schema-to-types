import { createHash } from "crypto";
import { Schema } from "@open-rpc/meta-schema";
import traverse from "./traverse";
import TypescriptGenerator from "./codegens/typescript";
import RustGenerator from "./codegens/rust";
import { ensureSubschemaTitles } from "./ensure-subschema-titles";
import { capitalize } from "./utils";
import { CodeGen } from "./codegens/codegen-interface";

const schemaToRef = (s: Schema) => ({ $ref: `#/definitions/${s.title}` });
const schemaSortComparator = (s1: Schema, s2: Schema) => s1.title > s2.title;
const sortKeys = (o: any) => Object.keys(o).sort().reduce((m, k) => ({ ...m, [k]: o[k] }), {});
const joinTitles = (s: Schema[]): string => s.map(({ title }: Schema) => title).join("_");
const hashRegex = new RegExp("[^A-z | 0-9]+", "g");

export type SupportedLanguages = "rust" | "rs" | "typescript" | "ts";
/**
 * Provides a high-level interface for getting typings given a schema.
 */
export class JsonSchemaToTypes {
  [toLang: string]: any;
  public megaSchema: Schema;

  constructor(s: Schema | Schema[]) {
    const inputSchema = s instanceof Array ? s : [s];
    const schemaWithTitles = inputSchema.map((ss) => this.ensureSchemaTitles(ss));
    const reffed = schemaWithTitles.map((ss) => this.collectAndRefSchemas(ss));
    this.megaSchema = this.combineSchemas(reffed);
  }

  /**
   * Generic transpile method.
   */
  public to(lang: SupportedLanguages): string {
    return this[`to${capitalize(lang)}`]();
  }

  /**
   * Returns the types in Typescript
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Typescript
   * @category TargetCodeGenerator
   *
   */
  public toTypescript(): string {
    return this.transpile(new TypescriptGenerator(this.megaSchema));
  }

  /**
   * Alias to [[JsonSchemaToTypes.toTypescript]]
   *
   * @category Typescript
   * @category TargetCodeGenerator
   *
   */
  public toTs(): string {
    return this.toTypescript();
  }

  /**
   * Returns the types in Rust
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Rust
   * @category TargetCodeGenerator
   *
   */
  public toRust(): string {
    return this.transpile(new RustGenerator(this.megaSchema));
  }

  /**
   * Returns the types in Rust
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Rust
   * @category TargetCodeGenerator
   *
   */
  public toRs(): string {
    return this.toRust();
  }

  /**
   * Returns the schema where if the schema.title is not set, a title will be generated based on the contents
   * of the schema. The properties of the schema are sorted such that the names are deterministic based on the
   * content of the schema. That being said, expect that any subtle change to the schema will result in a unique title.
   * If you've included titles on your schema, ensure that the titles are unique for their contents. If they are not,
   * ask yourself this: "why do two different schemas have the same name?".
   *
   * @param schema The JSON Schema to ensure has a title. If the schema is a composite schema (contains
   *                subschema(s)), the subschemas must already have titles.
   * @returns A new schema object that has all the fields of the one passed in, and a title if it didn't
   *          already have one.
   *
   * @category Utils
   * @category SchemaImprover
   *
   */
  public getDefaultTitleForSchema(schema: Schema): Schema {
    if (schema.title) { return schema; }

    const subSchemaTitleErrors = ensureSubschemaTitles(schema);
    if (subSchemaTitleErrors.length > 0) {
      subSchemaTitleErrors.forEach((e) => console.error);
      throw subSchemaTitleErrors[0];
    }

    let prefix = schema.type ? `${schema.type}_` : "any_";

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

  private transpile(gen: CodeGen): string {
    const codeLines = [];
    const prefix = gen.getCodePrefix();
    if (prefix) {
      codeLines.push(prefix);
      codeLines.push("");
    }
    codeLines.push(gen.transpile());
    return codeLines.join("\n");
  }

  /**
   * Returns a copy of the schema (deep) where if any subschema does not have a title, one will be created.
   * The subschemas can be considered a tree of schemas, and in this case, we are resolving titles on the leaves
   * of the tree. Think depth first traversal, but where the internal nodes' titles are not resolved until
   * it's entire subtree is complete.
   *
   * @param s The schema to ensure has names for it and all subschemas of it.
   *
   * @returns Deep schema copy of the input schema where the schema and all sub schemas have titles.
   *
   * @category Utils
   * @category SchemaImprover
   *
   */
  private ensureSchemaTitles(s: Schema) {
    return traverse(s, this.getDefaultTitleForSchema);
  }

  /**
   * Returns the schema where all subschemas have been replaced with $refs and added to definitions
   *
   * @param s The schema to ensure has names for it and all subschemas of it.
   *
   * @returns Deep schema copy of the input schema where the schema and all sub schemas have titles.
   *
   * @category Utils
   * @category SchemaImprover
   *
   */
  private collectAndRefSchemas(s: Schema): Schema {
    const definitions: any = {};
    return {
      ...traverse(s, (subSchema: Schema) => {
        definitions[subSchema.title] = subSchema;
        return { $ref: `#/definitions/${subSchema.title}` };
      }, { skipFirstMutation: true }),
      definitions,
    };
  }

  private combineSchemas(s: Schema[]): Schema {
    const combined = { ...s[0] };
    combined.definitions = {
      ...combined.definitions,
      ...s.slice(1).reduce((def, schema) => {
        const schemaCopy = { ...schema };
        delete schemaCopy.definitions;

        return {
          ...def,
          ...schema.definitions,
          [schema.title]: schemaCopy,
        };
      }, {}),
    };
    return combined;
  }
}

export default JsonSchemaToTypes;
