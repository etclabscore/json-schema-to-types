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
    const title = this.getSafeTitle(s.title);
    return { typing: `${title} = NewType(${title}, bool)` };
  }

  protected handleNull(s: Schema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return { typing: `${title} = NewType(${title}, float)` };
    return {
      documentationComment: this.buildDocs(s),
      typing: "`${title} = NewType(${title}, None)`",
    };
  }

  protected handleNumber(s: Schema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return { typing: `${title} = NewType(${title}, float)` };
  }

  protected handleInteger(s: Schema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return { typing: `${title} = NewType(${title}, int)` };
  }

  protected handleNumericalEnum(s: Schema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("numericalEnum");
    if (s.type === "integer") {
      return this.handleInteger(s);
    } else {
      return this.handleNumber(s);
    }
  }

  protected handleString(s: Schema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return { typing: `${title} = NewType(${title}, str)` };
  }

  protected handleStringEnum(s: Schema): TypeIntermediateRepresentation {
    const typeLines = s.enum
      .filter((enumString: any) => typeof enumString === "string")
      .map((enumString: string, i: number) => `    ${enumString.toUpperCase()} = ${i}`);

    const title = this.getSafeTitle(s.title);
    return {
      macros: "from enum import Enum",
      typing: [
        `class ${title}(Enum):`,
        ...typeLines,
      ].join("\n"),
    };
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
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType(${title}, Mapping[Any, Any])`,
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
    const title = this.getSafeTitle(s.title);
    return { typing: `${title} = NewType(${title}, int)` };
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import Any",
      typing: `${title} = NewType(${title}, Any)`,
    };
  }

  private warnNotWellSupported(typing: string) {
    console.warn(`In Python, ${typing} is not well supported.`);
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
