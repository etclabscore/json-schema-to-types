import { Schema } from "@open-rpc/meta-schema";
import { CodeGen } from "./codegen-interface";
import traverse from "../traverse";

export default class Typescript extends CodeGen {
  public getTypes() {
    let prefix = "";
    let typing = "";

    switch (this.schema.type) {
      case "boolean":
        prefix = "type";
        typing = "boolean";
        break;
      case "null":
        prefix = "type";
        typing = "null";
        break;
      case "number":
      case "integer":
        prefix = "type";
        typing = "number";
        if (this.schema.enum) { typing = this.handleEnum(); }
        break;
      case "string":
        prefix = "type";
        typing = "string";
        if (this.schema.enum) { typing = this.handleEnum(); }
        break;
      case "array":
        prefix = "type";
        let typedArray = "";
        let tupleItems = "";
        if (this.schema.items instanceof Array) {
          tupleItems = this.getJoinedTitles(this.schema.items);
        } else if (this.schema.items !== undefined) {
          typedArray = this.refToName(this.schema.items);
        } else {
          typedArray = "any";
        }
        typing = `${typedArray}[${tupleItems}]`;
        break;
      case "object":
        prefix = "interface";
        if (this.schema.properties === undefined) {
          typing = "{ [key: string]: any }";
          break;
        }
        const propertyTypings = Object.keys(this.schema.properties).reduce((typings: string[], key: string) => {
          return [...typings, `  ${key}: ${this.refToName(this.schema.properties[key])};`];
        }, []);
        typing = [`{`, ...propertyTypings, "}"].join("\n");
        break;
      default:
        if (this.schema.anyOf || this.schema.oneOf) {
          prefix = "type";
          const schemas = this.schema.anyOf === undefined ? this.schema.oneOf : this.schema.anyOf;
          typing = this.getJoinedTitles(schemas, " | ");
        } else if (this.schema.allOf) {
          prefix = "type";
          typing = this.getJoinedTitles(this.schema.allOf, " & ");
        } else {
          prefix = "type";
          typing = "any";
        }
        break;
    }

    return [
      `export ${prefix} ${this.schema.title}`,
      prefix === "type" ? " = " : " ",
      typing,
      prefix === "type" ? ";" : "",
    ].join("");
  }

  private handleEnum(): string {
    const typeOf = this.schema.type === "string" ? "string" : "number";
    return this.schema.enum
      .filter((s: any) => typeof s === typeOf)
      .map((s: string) => typeOf === "string" ? `"${s}"` : s)
      .join(" | ");
  }
}
