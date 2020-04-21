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
      "\n",
      ir.macros,
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

    const tit = this.getSafeTitle(s.title as string);

    // Assuming that AnyOfs are either an {}, or an [];
    // ie. there are TWO possibilities of reduction;
    // either a single thing or an array (slice) of things.
    // ALSO
    // Assuming that the first title represents the single,
    // and the second represents the set (arraytype).

    const anyOfOneTit = titles[0];
    const anyOfTwoTit = titles[1];

    return {
      macros: `
func (t ${tit}) MarshalJSON() ([]byte, error) {
	if t.${anyOfOneTit} != nil {
		return json.Marshal(t.${anyOfOneTit})
	}
	return json.Marshal(t.${anyOfTwoTit})
}

func (t *${tit}) UnmarshalJSON(data []byte) error {
	var first byte
	if len(data) > 1 {
		first = data[0]
	}
	if first == '[' {
		var parsed = ${anyOfTwoTit}{}
		if err := json.Unmarshal(data, &parsed); err != nil {
			return err
		}
		t.${anyOfTwoTit} = &parsed
		return nil
	}
	var single ${anyOfOneTit}
	if err := json.Unmarshal(data, &single); err != nil {
		return err
	}
	t.${anyOfOneTit} = &single
	return nil
}`,
      prefix: "struct",
      typing: ["{", ...anyOfType, "}"].join("\n"),
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
        macros,
        ...typings,
        "\t" + [
          title.padEnd(titleMaxLength),
          `*${title}`,
        ].join(" "),
      ];
    }, []);

    // We need different templates for titles depending
    // on if they'll be used in the un/marshal function
    // last or not. For error handling.

    // Non-last.
    const titleMarshalers = titles.map((oneOfTitle: string) => {
      return `
  if t.${oneOfTitle} != nil {
    return json.Marshal(t.${oneOfTitle})
  }`;
    });

    const titleUnmarshalers = titles.map((oneOfTitle: string, ind: number) => {
      return `
  try${ind} := ${oneOfTitle}{}
  err = json.Unmarshal(bytes, &try${ind})
  if err == nil {
    t.${oneOfTitle} = &try${ind}
    return nil
  }`;
    });

    const lastTitIndex = titles.length - 1;
    const lastTit = titles[lastTitIndex];

    const tit = this.getSafeTitle(s.title as string);

    const marshaler = `func (t ${tit}) MarshalJSON() ([]byte, error) {
  ${titleMarshalers.slice(0, lastTitIndex).join("\n")}
  return json.Marshal(t.${lastTit})
}`;

    const unmarshaler = `func (t *${tit}) UnmarshalJSON(bytes []byte) error {
  var err error
  ${titleUnmarshalers.slice(0, lastTitIndex).join("\n")}
  try${lastTitIndex} := ${lastTit}{}
  err = json.Unmarshal(bytes, &try${lastTitIndex})
  if err != nil {
    return err
  }
  t.${lastTit} = &try${lastTitIndex}
  return nil
}`;

    const macros = [
      marshaler,
      "",
      unmarshaler,
    ].join("\n");

    return {
      macros,
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
