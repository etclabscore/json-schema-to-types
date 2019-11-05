import { Schema } from "@open-rpc/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";
import traverse from "../traverse";
import { capitalize } from "../utils";

export default class Rust extends CodeGen {
  public getCodePrefix() {
    return "extern crate serde_json;";
  }

  protected generate(s: Schema, ir: TypeIntermediateRepresentation) {
    return [
      ir.documentationComment,
      ir.macros,
      ir.macros ? "\n" : "",
      `pub ${ir.prefix} ${this.getSafeTitle(s.title)}`,
      ir.prefix === "type" ? " = " : " ",
      ir.typing,
      ir.prefix === "type" ? ";" : "",
    ].join("");
  }

  protected handleBoolean(s: Schema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "bool", documentationComment: this.buildDocs(s) };
  }

  protected handleNull(s: Schema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "serde_json::Value", documentationComment: this.buildDocs(s) };
  }

  protected handleNumber(s: Schema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "f64", documentationComment: this.buildDocs(s) };
  }

  protected handleInteger(s: Schema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "i64", documentationComment: this.buildDocs(s) };
  }

  /**
   * Currently I dont know of a good way to handle this with rust.
   */
  protected handleNumericalEnum(s: Schema): TypeIntermediateRepresentation {
    if (s.type === "integer") {
      return this.handleInteger(s);
    }
    return this.handleNumber(s);
  }

  protected handleString(s: Schema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "String" };
  }

  protected handleStringEnum(s: Schema): TypeIntermediateRepresentation {
    const enumFields = s.enum
      .filter((enumField: any) => typeof enumField === "string")
      .map((enumField: string) => [
        `    #[serde(rename = ${enumField})]`,
        `    ${this.getSafeTitle(enumField)},`,
      ].join("\n"));

    return {
      macros: "#[derive(Serialize, Deserialize)]",
      prefix: "enum",
      typing: ["{", ...enumFields, "}"].join("\n"),
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleOrderedArray(s: Schema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: `(${this.getJoinedSafeTitles(s.items)})`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUnorderedArray(s: Schema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: `Vec<${this.getSafeTitle(this.refToTitle(s.items))}>`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedArray(s: Schema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: `Vec<serde_json::Value>`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleObject(s: Schema): TypeIntermediateRepresentation {
    const propertyTypings = Object.keys(s.properties).reduce((typings: string[], key: string) => {
      return [...typings, `    pub(crate) ${key}: ${this.getSafeTitle(this.refToTitle(s.properties[key]))},`];
    }, []);

    return {
      prefix: "struct",
      typing: [`{`, ...propertyTypings, "}"].join("\n"),
      macros: "#[derive(Serialize, Deserialize)]",
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedObject(s: Schema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: "HashMap<String, Option<serde_json::Value>>",
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleAnyOf(s: Schema): TypeIntermediateRepresentation {
    return this.buildEnum(s.anyOf);
  }

  /**
   * I dont have a great way of doing this one either. The best I can do is call it an untyped object
   */
  protected handleAllOf(s: Schema): TypeIntermediateRepresentation {
    return this.handleUntypedObject(s);
  }

  protected handleOneOf(s: Schema): TypeIntermediateRepresentation {
    return this.buildEnum(s.oneOf);
  }

  protected handleUntyped(s: Schema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "serde_json::Value" };
  }

  private buildEnum(s: Schema[]): TypeIntermediateRepresentation {
    return {
      macros: "#[derive(Serialize, Deserialize)]",
      prefix: "enum",
      typing: [
        "{",
        this.getJoinedSafeTitles(s, ",\n").split("\n").map((l) => `    ${l}`).join("\n"),
        "}",
      ].join("\n"),
    };
  }

  private buildDocs(s: Schema): string | undefined {
    const docStringLines = [];

    if (s.description) {
      docStringLines.push(`/// ${s.description}`);
      docStringLines.push("///");
    }

    if (s.default) {
      docStringLines.push("/// # Default");
      docStringLines.push("///");
      docStringLines.push(`/// ${s.default}`);
    }

    if (s.examples) {
      s.examples.forEach((example: string) => {
        docStringLines.push("/// # Example");
        docStringLines.push("///");
        docStringLines.push(`/// \`${example}\``);
        docStringLines.push("///");
      });
    }

    if (docStringLines.length > 0) {
      return [
        `/// ${this.getSafeTitle(s.title)}`,
        "///",
        ...docStringLines,
        "",
      ].join("\n");
    }
  }
}
