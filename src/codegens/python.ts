import { Schema } from "@open-rpc/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";
import traverse from "../traverse";

export default class Python extends CodeGen {
  protected generate(s: Schema, ir: TypeIntermediateRepresentation) {
    return [
      ir.documentationComment,
      `export ${ir.prefix} ${this.getSafeTitle(s.title)}`,
      ir.prefix === "type" ? " = " : " ",
      ir.typing,
      ir.prefix === "type" ? ";" : "",
    ].join("");
  }

  protected handleBoolean(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("boolean");
    return { typing: "" };
  }

  protected handleNull(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("null");
    return { typing: "" };
  }

  protected handleNumber(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("number");
    return { typing: "" };
  }

  protected handleInteger(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("integer");
    return { typing: "" };
  }

  protected handleNumericalEnum(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("numericalEnum");
    return { typing: "" };
  }

  protected handleString(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("string");
    return { typing: "" };
  }

  protected handleStringEnum(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("stringEnum");
    return { typing: "" };
  }

  protected handleOrderedArray(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("orderedArray");
    return { typing: "" };
  }

  protected handleUnorderedArray(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("unorderedArray");
    return { typing: "" };
  }

  protected handleUntypedArray(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("untypedArray");
    return { typing: "" };
  }

  protected handleObject(s: Schema): TypeIntermediateRepresentation {
    const propertyTypings = Object.keys(s.properties).reduce((typings: string[], key: string) => {
      const propSchema = s.properties[key];
      let isRequired = false;
      if (s.required) {
        isRequired = s.required.indexOf(propSchema.title) !== -1;
      }
      const title = this.getSafeTitle(this.refToTitle(propSchema));
      return [...typings, `  ${key}${isRequired ? "" : "?"}: ${title};`];
    }, []);

    if (s.additionalProperties !== false) {
      propertyTypings.push("  [k: string]: any;");
    }

    return {
      documentationComment: this.buildDocs(s),
      prefix: "interface",
      typing: [`{`, ...propertyTypings, "}"].join("\n"),
    };
  }

  protected handleUntypedObject(s: Schema): TypeIntermediateRepresentation {
    return {
      prefix: "interface",
      typing: "{ [key: string]: any }",
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleAnyOf(s: Schema): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: this.getJoinedSafeTitles(s.anyOf, " | "),
    };
  }

  protected handleAllOf(s: Schema): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: this.getJoinedSafeTitles(s.allOf, " & "),
    };
  }

  protected handleOneOf(s: Schema): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: this.getJoinedSafeTitles(s.oneOf, " | "),
    };
  }

  protected handleUntyped(s: Schema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "any" };
  }

  private warnNotWellSupported(typing: string) {
    console.warn(`In Python, ${typing} is not well supported.`);
  }

  private buildEnum(schema: Schema): string {
    const typeOf = schema.type === "string" ? "string" : "number";
    return schema.enum
      .filter((s: any) => typeof s === typeOf)
      .map((s: string) => typeOf === "string" ? `"${s}"` : s)
      .join(" | ");
  }

  private buildDocs(s: Schema): string | undefined {
    const docStringLines = [];

    if (s.description) {
      docStringLines.push(` * ${s.description}`);
      docStringLines.push(" *");
    }

    if (s.default) {
      docStringLines.push(` * @default  ${s.default}`);
      docStringLines.push(` *`);
    }

    if (s.examples) {
      s.examples.forEach((example: string) => {
        docStringLines.push(" * @example");
        docStringLines.push(` * \`${example}\``);
        docStringLines.push(" *");
      });
    }

    if (docStringLines.length > 0) {
      return [
        "/**",
        " *",
        ...docStringLines,
        " */",
        "",
      ].join("\n");
    }
  }
}
