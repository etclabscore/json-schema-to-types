import { Schema } from "@open-rpc/meta-schema";
import { CodeGen } from "./codegen-interface";
import traverse from "../traverse";
import { capitalize } from "../utils";

interface TypeIntermediateRepresentation {
  macros: string;
  prefix: string;
  typing: string;
}

export default class Rust extends CodeGen {
  public getTypesForSchema(schema: Schema): string {
    let typeIR = {
      prefix: "",
      typing: "",
      macros: "",
    };

    switch (schema.type) {
      case "boolean":
        typeIR.prefix = "type";
        typeIR.typing = "bool";
        break;

      case "null":
        typeIR.prefix = "type";
        typeIR.typing = "serde_json::Value";
        break;

      case "number":
        typeIR.prefix = "type";
        typeIR.typing = "f64";
        // not exactly sure how to best handle enums on numbers in rust.
        // if (schema.enum) { typeIR.typing = this.handleEnum(schema); }
        break;

      case "integer":
        typeIR.prefix = "type";
        typeIR.typing = "i64";
        // not exactly sure how to best handle enums on numbers in rust.
        // if (schema.enum) { typeIR.typing = this.handleEnum(schema); }
        break;

      case "string":
        typeIR.prefix = "type";
        typeIR.typing = "String";
        if (schema.enum) { typeIR = this.buildStringEnum(schema); }
        break;

      case "array":
        typeIR.prefix = "type";
        let typedArray = "";
        const tupleItems = "";
        if (schema.items instanceof Array) {
          typeIR.typing = `(${this.getJoinedTitles(schema.items)})`;
          break;
        } else if (schema.items !== undefined) {
          typedArray = this.refToName(schema.items);
        } else {
          typedArray = "serde_json::Value";
        }
        typeIR.typing = `Vec<${typedArray}>`;
        break;

      case "object":
        if (schema.properties === undefined) {
          typeIR.prefix = "type";
          typeIR.typing = "HashMap<String, Option<serde_json::Value>>";
          break;
        }
        typeIR = this.buildStruct(schema);
        break;

      default:
        if (schema.anyOf || schema.oneOf) {
          typeIR = this.buildEnum(schema.anyOf ? schema.anyOf : schema.oneOf);
        } else if (schema.allOf) {
          // this is flawed because allOf could be refs, and we dont want to follow them.
          // Gonna need to find a different way to make this one work...
          const mergedSchema = schema.allOf
            .filter((s: Schema) => s.type === "object")
            .reduce((merged: Schema, s: Schema) => ({ ...merged, ...s }), {});
          mergedSchema.title = schema.title;
          console.log(mergedSchema);//tslint:disable-line
          typeIR = this.buildStruct(mergedSchema);
        } else {
          typeIR.prefix = "type";
          typeIR.typing = "serde_json::Value";
        }
        break;
    }

    return [
      typeIR.macros,
      typeIR.macros ? "\n" : "",
      `pub ${typeIR.prefix} ${schema.title}`,
      typeIR.prefix === "type" ? " = " : " ",
      typeIR.typing,
      typeIR.prefix === "type" ? ";" : "",
    ].join("");
  }

  private getCodePrefix() {
    return "extern crate serde_json";
  }

  private handleNumberEnum(schema: Schema): string {
    throw new Error("not yet implemented");
  }

  private buildStringEnum(schema: Schema): TypeIntermediateRepresentation {
    const enumFields = schema.enum
      .filter((s: any) => typeof s === "string")
      .map((s: string) => [`  #[serde(rename = ${s})]`, `  ${capitalize(s)},`].join("\n"));

    return {
      macros: "#[derive(Serialize, Deserialize)]",
      prefix: "enum",
      typing: ["{", ...enumFields, "}"].join("\n"),
    };
  }

  private buildStruct(s: Schema): any {
    const propertyTypings = Object.keys(s.properties).reduce((typings: string[], key: string) => {
      return [...typings, `  pub(crate) ${key}: ${this.refToName(s.properties[key])},`];
    }, []);

    return {
      prefix: "struct",
      typing: [`{`, ...propertyTypings, "}"].join("\n"),
      macros: "#[derive(Serialize, Deserialize)]",
    };
  }

  private buildEnum(s: Schema[]): any {
    return {
      macros: "#[derive(Serialize, Deserialize)]",
      prefix: "enum",
      typing: [
        "{",
        this.getJoinedTitles(s, ",\n").split("\n").map((l) => `  ${l}`).join("\n"),
        "}",
      ].join("\n"),
    };
  }
}
