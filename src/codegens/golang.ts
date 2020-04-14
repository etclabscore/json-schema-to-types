import { JSONSchema, UnorderedSetOfAnyL9Fw4VUOyeAFYsFq } from "@open-rpc/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";

export default class Golang extends CodeGen {

  public getSafeTitle(title: string): string {
    const n = super.getSafeTitle(title);

    // Remove all non-capitalized-alpha characters before the first capitalized alpha character.
    return n.replace(/^[^A-Z]+/m, "");
  }

  protected generate(s: JSONSchema, ir: TypeIntermediateRepresentation) {
    return [
      ir.documentationComment,
      [
        "type ",
        `${this.getSafeTitle(s.title as string)} `,
        ir.prefix ? `${ir.prefix} ` : "",
      ].join(""),
      ir.typing,
    ].join("");
  }

  protected handleBoolean(s: JSONSchema): TypeIntermediateRepresentation {
    return { typing: "bool", documentationComment: this.buildDocs(s) };
  }

  protected handleNull(s: JSONSchema): TypeIntermediateRepresentation {
    return { typing: "interface{}", documentationComment: this.buildDocs(s) };
  }

  protected handleNumber(s: JSONSchema): TypeIntermediateRepresentation {
    return { typing: "float64", documentationComment: this.buildDocs(s) };
  }

  protected handleInteger(s: JSONSchema): TypeIntermediateRepresentation {
    return { typing: "int64", documentationComment: this.buildDocs(s) };
  }

  protected handleNumericalEnum(s: JSONSchema): TypeIntermediateRepresentation {
    const safeTitle = this.getSafeTitle(s.title as string);
    const sEnum = s.enum as UnorderedSetOfAnyL9Fw4VUOyeAFYsFq;
    const enumFields = sEnum
      .filter((enumField: any) => typeof enumField === "number")
      .map((enumField: string, i: number) => `\t${safeTitle}Enum${i} ${safeTitle} = ${enumField}`)
      .join("\n");

    const ir = s.type === "number" ? this.handleNumber(s) : this.handleInteger(s);
    ir.typing = ir.typing + "\n" + ["const (", enumFields, ")"].join("\n");
    return ir;
  }

  protected handleString(s: JSONSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), typing: "string" };
  }

  protected handleStringEnum(s: JSONSchema): TypeIntermediateRepresentation {
    const safeTitle = this.getSafeTitle(s.title as string);
    const sEnum = s.enum as UnorderedSetOfAnyL9Fw4VUOyeAFYsFq;
    const enumFields = sEnum
      .filter((enumField: any) => typeof enumField === "string")
      .map((enumField: string, i: number) => `\t${safeTitle}Enum${i} ${safeTitle} = "${enumField}"`)
      .join("\n");

    const ir = this.handleString(s);
    ir.typing = ir.typing + "\n" + ["const (", enumFields, ")"].join("\n");
    return ir;
  }

  protected handleOrderedArray(s: JSONSchema): TypeIntermediateRepresentation {
    return {
      typing: `(${this.getJoinedSafeTitles(s.items as JSONSchema[])})`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUnorderedArray(s: JSONSchema): TypeIntermediateRepresentation {
    return {
      typing: `[]${this.getSafeTitle(this.refToTitle(s.items as JSONSchema))}`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedArray(s: JSONSchema): TypeIntermediateRepresentation {
    const ir = this.handleUntyped(s);
    ir.typing = `[]${ir.typing}`;
    return ir;
  }

  protected handleObject(s: JSONSchema): TypeIntermediateRepresentation {
    const sProps = s.properties as { [k: string]: JSONSchema };
    const propKeys = Object.keys(sProps);
    const safeTitles = propKeys.map((k) => this.getSafeTitle(k));
    const propSchemaTitles = propKeys.map((k) => this.getSafeTitle(this.refToTitle(sProps[k])));

    const titleMaxLength = Math.max(...safeTitles.map((t) => t.length));
    const propTitleMaxLength = Math.max(...propSchemaTitles.map((t) => t.length));

    const propertyTypings = propKeys.reduce((typings: string[], key: string, i: number) => {
      let isRequired = false;
      if (s.required) {
        isRequired = s.required.indexOf(key) !== -1;
      }
      let safeTitle = safeTitles[i];
      safeTitle = safeTitle.padEnd(titleMaxLength);
      let safeTitleForPropSchema = propSchemaTitles[i];
      safeTitleForPropSchema = safeTitleForPropSchema.padEnd(propTitleMaxLength);
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

  protected handleUntypedObject(s: JSONSchema): TypeIntermediateRepresentation {
    const ir = this.handleUntyped(s);
    ir.typing = `map[string]${ir.typing}`;
    return ir;
  }

  protected handleAnyOf(s: JSONSchema): TypeIntermediateRepresentation {
    const sAny = s.anyOf as JSONSchema[];
    const titles = sAny.map((ss: JSONSchema) => this.getSafeTitle(this.refToTitle(ss)));
    const titleMaxLength = Math.max(...titles.map((t: string) => t.length));
    const anyOfType = titles.reduce((typings: string[], title: string) => {
      return [...typings, `\t${title.padEnd(titleMaxLength)} *${title}`];
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
  protected handleAllOf(s: JSONSchema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("allOf");
    return this.handleUntypedObject(s);
  }

  protected handleOneOf(s: JSONSchema): TypeIntermediateRepresentation {
    const sOne = s.oneOf as JSONSchema[];
    const titles = sOne.map((ss: JSONSchema) => this.getSafeTitle(this.refToTitle(ss)));
    const titleMaxLength = Math.max(...titles.map((t: string) => t.length));
    const oneOfType = sOne.reduce((typings: string[], oneOfSchema: JSONSchema, i: number) => {
      const title = titles[i];

      return [
        ...typings,
        "\t" + [
          title.padEnd(titleMaxLength),
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

  protected handleUntyped(s: JSONSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "", typing: "interface{}" };
  }

  private buildDocs(s: JSONSchema): string | undefined {
    const docStringLines = [];

    if (s.description) {
      docStringLines.push(`// ${s.description}`);
    }

    if (s.default) {
      const def = s.default;
      let defAsStr = `${def}`;
      if (def instanceof Array || (typeof def === "object" && def !== null)) {
        defAsStr = JSON.stringify(def);
      }
      docStringLines.push("//");
      docStringLines.push("// --- Default ---");
      docStringLines.push("//");
      docStringLines.push(`// ${defAsStr}`);
    }

    if (s.examples) {
      s.examples.forEach((example: any) => {
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

  private warnNotWellSupported(typing: string) {
    console.warn(`In Golang, ${typing} is not well supported.`);
  }
}
