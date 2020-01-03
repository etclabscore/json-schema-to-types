
import { Schema } from "@open-rpc/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";
import traverse from "../traverse";
import { capitalize } from "../utils";

export default class Golang extends CodeGen {
  protected generate(s: Schema, ir: TypeIntermediateRepresentation) {
    if (s.title === undefined) {
      console.log("boob balls"); //tslint:disable-line
      console.log(s); //tslint:disable-line
    }
    return [
      ir.documentationComment,
      [
        "type ",
        `${this.getSafeTitle(s.title)} `,
        ir.prefix ? `${ir.prefix} ` : "",
      ].join(""),
      ir.typing,
    ].join("");
  }

  protected handleBoolean(s: Schema): TypeIntermediateRepresentation {
    return { typing: "bool", documentationComment: this.buildDocs(s) };
  }

  protected handleNull(s: Schema): TypeIntermediateRepresentation {
    return { typing: "interface{}", documentationComment: this.buildDocs(s) };
  }

  protected handleNumber(s: Schema): TypeIntermediateRepresentation {
    return { typing: "float64", documentationComment: this.buildDocs(s) };
  }

  protected handleInteger(s: Schema): TypeIntermediateRepresentation {
    return { typing: "int64", documentationComment: this.buildDocs(s) };
  }

  protected handleNumericalEnum(s: Schema): TypeIntermediateRepresentation {
    const safeTitle = this.getSafeTitle(s.title);
    const enumFields = s.enum
      .filter((enumField: any) => typeof enumField === "number")
      .map((enumField: string, i: number) => `\t${safeTitle}Enum${i} ${safeTitle} = ${enumField},`)
      .join("\n");

    const ir = s.type === "number" ? this.handleNumber(s) : this.handleInteger(s);
    ir.typing = ir.typing + "\n" + ["const {", ...enumFields, "}"].join("\n");
    return ir;
  }

  protected handleString(s: Schema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), typing: "string" };
  }

  protected handleStringEnum(s: Schema): TypeIntermediateRepresentation {
    const safeTitle = this.getSafeTitle(s.title);
    const enumFields = s.enum
      .filter((enumField: any) => typeof enumField === "string")
      .map((enumField: string, i: number) => `\t${safeTitle}Enum${i} ${safeTitle} = "${enumField}",`)
      .join("\n");

    const ir = this.handleString(s);
    ir.typing = ir.typing + "\n" + ["const {", ...enumFields, "}"].join("\n");
    return ir;
  }

  protected handleOrderedArray(s: Schema): TypeIntermediateRepresentation {
    return {
      typing: `(${this.getJoinedSafeTitles(s.items)})`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUnorderedArray(s: Schema): TypeIntermediateRepresentation {
    return {
      typing: `[]${this.getSafeTitle(this.refToTitle(s.items))}`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedArray(s: Schema): TypeIntermediateRepresentation {
    const ir = this.handleUntyped(s);
    ir.typing = `[]${ir.typing}`;
    return ir;
  }

  protected handleObject(s: Schema): TypeIntermediateRepresentation {
    const propertyTypings = Object.keys(s.properties).reduce((typings: string[], key: string) => {
      const propSchema = s.properties[key];
      let isRequired = false;
      if (s.required) {
        isRequired = s.required.indexOf(key) !== -1;
      }
      const safeTitle = this.getSafeTitle(key);
      const safeTitleForPropSchema = this.getSafeTitle(this.refToTitle(propSchema));
      return [
        ...typings,
        `\t${safeTitle} *${safeTitleForPropSchema} \`json:"${key}${isRequired ? "" : ",omitempty"}"\``,
      ];
    }, []);
    return {
      prefix: "struct",
      typing: [`{`, ...propertyTypings, "}"].join("\n"),
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedObject(s: Schema): TypeIntermediateRepresentation {
    const ir = this.handleUntyped(s);
    ir.typing = `map[string]${ir.typing}`;
    return ir;
  }

  protected handleAnyOf(s: Schema): TypeIntermediateRepresentation {
    const anyOfType = s.anyOf.reduce((typings: string[], oneOfSchema: Schema) => {
      const title = this.getSafeTitle(this.refToTitle(oneOfSchema));

      return [...typings, `\t${title} *${title}`];
    }, []);

    return {
      prefix: "struct",
      typing: [`{`, ...anyOfType, "}"].join("\n"),
      documentationComment: this.buildDocs(s),
    };
  }

  /**
   * must be a set of schemas with type: object
   */
  protected handleAllOf(s: Schema): TypeIntermediateRepresentation {
    const allOf = s.allOf
      .filter(({ properties }: Schema) => properties)
      .map(({ properties }: Schema) => properties)
      .reduce((all: Schema, schema: Schema) => ({ ...all, ...schema }), {});

    const copy = { ...s };
    copy.properties = allOf;
    return this.handleObject(copy);
  }

  protected handleOneOf(s: Schema): TypeIntermediateRepresentation {
    const oneOfType = s.oneOf.reduce((typings: string[], oneOfSchema: Schema) => {
      const title = this.getSafeTitle(this.refToTitle(oneOfSchema));

      return [
        ...typings,
        "\t" + [
          title,
          `*${title}`,
        ].join(" "),
      ];
    }, []);

    return {
      prefix: "struct",
      typing: [`{`, ...oneOfType, "}"].join("\n"),
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntyped(s: Schema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "", typing: "interface{}" };
  }

  private buildDocs(s: Schema): string | undefined {
    const docStringLines = [];

    if (s.description) {
      docStringLines.push(`// ${s.description}`);
    }

    if (s.default) {
      docStringLines.push("//");
      docStringLines.push("// --- Default ---");
      docStringLines.push("//");
      docStringLines.push(`// ${s.default}`);
    }

    if (s.examples) {
      s.examples.forEach((example: string) => {
        docStringLines.push("//");
        docStringLines.push("// --- Example ---");
        docStringLines.push("//");
        docStringLines.push(`// \`${example}\``);
      });
    }

    if (docStringLines.length > 0) {
      docStringLines.push("");
      return docStringLines.join("\n");
    }
  }
}
