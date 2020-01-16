import { JSONSchema } from "@open-rpc/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";
import { mergeObjectProperties } from "../utils";

export default class Python extends CodeGen {
  protected generate(s: JSONSchema, ir: TypeIntermediateRepresentation) {
    return [
      ir.macros,
      "\n",
      ir.documentationComment,
      "\n",
      ir.typing,
    ].join("");
  }

  protected handleBoolean(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", bool)`,
    };
  }

  protected handleNull(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", None)`,
    };
  }

  protected handleNumber(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", float)`,
    };
  }

  protected handleInteger(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", int)`,
    };
  }

  protected handleNumericalEnum(s: JSONSchema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("numericalEnum");
    if (s.type === "integer") {
      return this.handleInteger(s);
    } else {
      return this.handleNumber(s);
    }
  }

  protected handleString(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", str)`,
    };
  }

  protected handleStringEnum(s: JSONSchema): TypeIntermediateRepresentation {
    const typeLines = s.enum
      .filter((enumString: any) => typeof enumString === "string")
      .map((enumString: string, i: number) => `    ${enumString.toUpperCase()} = ${i}`);

    const title = this.getSafeTitle(s.title);
    return {
      macros: "from enum import Enum",
      documentationComment: this.buildDocs(s),
      typing: [
        `class ${title}(Enum):`,
        ...typeLines,
      ].join("\n"),
    };
  }

  protected handleOrderedArray(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    const itemTitles = s.items.map((item: JSONSchema) => this.getSafeTitle(this.refToTitle(item)));
    return {
      macros: "from typing import NewType, Tuple",
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", Tuple[${itemTitles.join(", ")}])`,
    };
  }

  protected handleUnorderedArray(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    const itemsTitle = this.getSafeTitle(this.refToTitle(s.items));
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import List, NewType",
      typing: `${title} = NewType("${title}", List[${itemsTitle}])`,
    };
  }

  protected handleUntypedArray(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import List, Any, NewType",
      typing: `${title} = NewType("${title}", List[Any])`,
    };
  }

  protected handleObject(s: JSONSchema): TypeIntermediateRepresentation {
    const propertyTypings = Object.keys(s.properties).reduce((typings: string[], key: string) => {
      const propSchema = s.properties[key];
      let isRequired = false;
      if (s.required) {
        isRequired = s.required.indexOf(propSchema.title) !== -1;
      }
      const safeTitle = this.getSafeTitle(this.refToTitle(propSchema));
      // first expression of right hand side
      const rhs = isRequired ? title : `Optional[${safeTitle}]`;
      return [...typings, `    ${key}: ${rhs}`];
    }, []);

    if (s.additionalProperties !== false) {
      this.warnNotWellSupported("ObjectsWithAdditionalProperties");
      return this.handleUntypedObject(s);
    }

    const title = this.getSafeTitle(s.title);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import TypedDict, Optional",
      typing: [
        `class ${title}(TypedDict):`,
        ...propertyTypings,
      ].join("\n"),
    };
  }

  protected handleUntypedObject(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType, Any, Mapping",
      typing: `${title} = NewType("${title}", Mapping[Any, Any])`,
    };
  }

  protected handleAnyOf(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      macros: "from typing import NewType, Union",
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: `${title} = NewType("${title}", Union[${this.getJoinedSafeTitles(s.anyOf, ", ")}])`,
    };
  }

  protected handleAllOf(s: JSONSchema): TypeIntermediateRepresentation {
    const copy = { ...s };
    copy.properties = mergeObjectProperties(s.allOf);
    return this.handleObject(copy);
  }

  protected handleOneOf(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      macros: "from typing import NewType, Union",
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: `${title} = NewType("${title}", Union[${this.getJoinedSafeTitles(s.oneOf, ", ")}])`,
    };
  }

  protected handleUntyped(s: JSONSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import Any, NewType",
      typing: `${title} = NewType("${title}", Any)`,
    };
  }

  private warnNotWellSupported(typing: string) {
    console.warn(`In Python, ${typing} is not well supported.`);
  }

  private buildDocs(s: JSONSchema): string | undefined {
    const docStringLines: string[] = [];

    if (s.description) {
      docStringLines.push(`${s.description}`);
      docStringLines.push("");
    }

    if (docStringLines.length > 0) {
      return [
        `"""${s.description}`,
        `"""`,
      ].join("\n");
    }
  }
}
