import { Schema } from "@open-rpc/meta-schema";
import { CodeGen } from "./codegen-interface";

export default class Typescript implements CodeGen {

  constructor(private schema: Schema) { }

  public getTypes(schema: Schema) {
    let prefix = "";
    let typing = "";

    switch (schema.type) {
      case "boolean":
        prefix = "type";
        typing = `boolean`;
        break;
      case "null":
        prefix = "type";
        typing = `null`;
        break;
      case "number":
      case "integer":
        prefix = "type";
        typing = `number`;
        break;
      case "string":
        prefix = "type";
        typing = `string`;
        break;
      case "array":
        prefix = "type";
        let typedArray = "";
        let tupleItems = "";
        if (schema.items instanceof Array) {
          tupleItems = this.getJoinedTitles(schema.anyOf);
        } else if (schema.items !== undefined) {
          typedArray = schema.items.title;
        } else {
          typedArray = "any";
        }
        typing = `${typedArray}[${tupleItems}]`;
        break;
      case "object":
        prefix = "interface";
        const propertyTypings = Object.keys(schema.properties).reduce((typings: string[], key: string) => {
          return [...typings, `  ${key}: schema.properties[key].title`];
        }, []);
        typing = [`{`, ...propertyTypings, "}"].join("\n");
        break;
      default:
        if (schema.anyOf || schema.oneOf) {
          prefix = "type";
          typing = this.getJoinedTitles(schema.anyOf, "| ");
        } else if (schema.allOf) {
          prefix = "type";
          typing = this.getJoinedTitles(schema.anyOf, "& ");
        } else if (schema.type === undefined) {
          prefix = "type";
          typing = `any`;
        }
        break;
    }

    return `${prefix} ${schema.title} ${prefix === "type" ? "=" : ""} ${typing} `;
  }

  private getJoinedTitles(schemas: Schema[], seperator = ", ") {
    return schemas.map(({ title }: Schema) => title).join(seperator);
  }
}
