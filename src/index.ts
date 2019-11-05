import { createHash } from "crypto";
import { Schema } from "@open-rpc/meta-schema";
import traverse from "./traverse";
import TypescriptGenerator from "./codegens/typescript";
import RustGenerator from "./codegens/rust";
import { ensureSubschemaTitles } from "./ensure-subschema-titles";
import { capitalize, schemaToRef, sortKeys, sortSchemasByTitle, ensureSchemaTitles } from "./utils";
import { CodeGen } from "./codegens/codegen-interface";

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
    const schemaWithTitles = inputSchema.map((ss) => ensureSchemaTitles(ss));
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
