import { Schema } from "@open-rpc/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen-interface";
import traverse from "../traverse";

export default class Typescript extends CodeGen {
  public getCodePrefix() {
    return "";
  }
  protected generate(s: Schema, ir: TypeIntermediateRepresentation) {
    return [
      `export ${ir.prefix} ${this.getSafeTitle(s.title)}`,
      ir.prefix === "type" ? " = " : " ",
      ir.typing,
      ir.prefix === "type" ? ";" : "",
    ].join("");
  }

  protected handleBoolean(s: Schema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "boolean", macros: "" };
  }

  protected handleNull(s: Schema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "null", macros: "" };
  }

  protected handleNumber(s: Schema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "number", macros: "" };
  }

  protected handleInteger(s: Schema): TypeIntermediateRepresentation {
    return this.handleNumber(s);
  }

  protected handleNumericalEnum(s: Schema): TypeIntermediateRepresentation {
    return {
      macros: "",
      prefix: "type",
      typing: this.buildEnum(s),
    };
  }

  protected handleString(s: Schema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "string", macros: "" };
  }

  protected handleStringEnum(s: Schema): TypeIntermediateRepresentation {
    return {
      macros: "",
      prefix: "type",
      typing: this.buildEnum(s),
    };
  }

  protected handleOrderedArray(s: Schema): TypeIntermediateRepresentation {
    return {
      macros: "",
      prefix: "type",
      typing: `[${this.getJoinedSafeTitles(s.items)}]`,
    };
  }

  protected handleUnorderedArray(s: Schema): TypeIntermediateRepresentation {
    return {
      macros: "",
      prefix: "type",
      typing: `${this.getSafeTitle(this.refToTitle(s.items))}[]`,
    };
  }

  protected handleUntypedArray(s: Schema): TypeIntermediateRepresentation {
    return {
      macros: "",
      prefix: "type",
      typing: `any[]`,
    };
  }

  protected handleObject(s: Schema): TypeIntermediateRepresentation {
    const propertyTypings = Object.keys(s.properties).reduce((typings: string[], key: string) => {
      const title = this.refToTitle(s.properties[key]);
      const safeTitle = this.getSafeTitle(title);
      return [...typings, `  ${key}: ${safeTitle};`];
    }, []);

    return {
      macros: "",
      prefix: "interface",
      typing: [`{`, ...propertyTypings, "}"].join("\n"),
    };
  }

  protected handleUntypedObject(schema: Schema): TypeIntermediateRepresentation {
    return {
      macros: "",
      prefix: "interface",
      typing: "{ [key: string]: any }",
    };
  }

  protected handleAnyOf(s: Schema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: this.getJoinedSafeTitles(s.anyOf, " | "),
      macros: "",
    };
  }

  protected handleAllOf(s: Schema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: this.getJoinedSafeTitles(s.allOf, " & "),
      macros: "",
    };
  }

  protected handleOneOf(s: Schema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: this.getJoinedSafeTitles(s.oneOf, " | "),
      macros: "",
    };
  }

  protected handleUntyped(s: Schema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "any", macros: "" };
  }

  private buildEnum(schema: Schema): string {
    const typeOf = schema.type === "string" ? "string" : "number";
    return schema.enum
      .filter((s: any) => typeof s === typeOf)
      .map((s: string) => typeOf === "string" ? `"${s}"` : s)
      .join(" | ");
  }
}
